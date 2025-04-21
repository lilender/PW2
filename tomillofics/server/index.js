//node index.js
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');
const multer = require('multer');
const path = require('path');

app.use(cors());
app.use(express.json());

app.use('/public', express.static(path.join(__dirname, 'public')));

app.listen(3001, ()=>{
    console.log("Server listening on port 3001");
})

const db = mysql.createConnection(
    {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT
    }
)

const fs = require('fs');
const { title } = require('process');

const uploadPath = path.join(__dirname, 'public', 'uploads');
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

const temp = multer.memoryStorage();
const file = multer({
    storage: temp,
    fileFilter: (req, file, callback) => {
        const mimetypes = ["image/png", "image/jpeg", "image/jpg"];
        if(mimetypes.includes(file.mimetype)){
            callback(null, true);
        } else {
            return callback(new Error("Invalid file type"));
        }
    }
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, 'public', 'uploads');
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + '-' + file.originalname;
        cb(null, uniqueName);
    }
});
const upload = multer({
    storage: storage,
    fileFilter: (req, file, callback) => {
        const mimetypes = ["image/png", "image/jpeg", "image/jpg"];
        if (mimetypes.includes(file.mimetype)) {
            callback(null, true);
        } else {
            return callback(new Error("Invalid file type"));
        }
    }
});

//user
app.post("/createUser", file.none(),
(request, response)=>{
    const username = request.body.username;
    const email = request.body.email;
    const password = request.body.password;
    db.query('CALL sp_update_users("create", ?, ?, ?, null, ?, null)',
        [username, password, email, 0],
        (error, data)=>{
            if(error){
                console.log(error);
                if(error.code === 'ER_DUP_ENTRY'){
                    if(error.sqlMessage.includes("username")){
                        response.json({
                            message: "ER_DUP_USERNAME"
                        })
                    }
                    else if(error.sqlMessage.includes("email")){
                        response.json({
                            message: "ER_DUP_EMAIL"
                        })
                    }
                } else {
                    response.json({
                        message: error.code,
                    })
                }
            } else {
                response.json({
                    message: "Success"
                })
            }
        }
    );
}
)
app.post("/loginUser", (request, response)=>{
    const username = request.body.username;
    const password = request.body.password;

    db.query('CALL sp_update_users("login", ?, ?, null, null, null, null)',
        [username, password],
        (error, data)=>{
            if(error){
                console.log(error);
                response.json({
                    message: error.code,
                })
            } else {
                console.log(data[0][0]);
                if(data[0][0].error){
                    response.json({
                        message: data[0][0].error,
                    })
                }
                else {
                    response.json({
                        message: "Success",
                        iduser: data[0][0].iduser,
                        username: data[0][0].username,
                        profile_image: data[0][0].profile_image,
                        mode_pref: data[0][0].mode_pref
                    })
                }
            }
        }
    );
}
)
app.get("/userInfo", (request, response)=>{
    const iduser = request.query.iduser;
    db.query('CALL sp_update_users("info", null, null, null, null, null, ?)',
        [iduser],
        (error, data)=>{
            if(error){
                console.log(error);
                response.json({
                    message: error.code,
                })
            } else {
                if(data[0][0].error){
                    response.json({
                        message: data[0][0].error,
                    })
                }
                else {
                    response.json({
                        message: "Success",
                        iduser: data[0][0].iduser,
                        username: data[0][0].username,
                        email: data[0][0].email,
                        profile_image: data[0][0].profile_image,
                        written_fics: data[0][0].written_fics,
                        saved_fics: data[0][0].saved_fics,
                        mode_pref: data[0][0].mode_pref,
                        created: data[0][0].created
                    })
                }
            }
        }
    );
}
)
app.get("/userPublicInfo", (request, response)=>{
    const iduser = request.query.iduser;
    db.query('CALL sp_update_users("public", null, null, null, null, null, ?)',
        [iduser],
        (error, data)=>{
            if(error){
                console.log(error);
                response.json({
                    message: error.code,
                })
            } else {
                if(data[0][0].error){
                    response.json({
                        message: data[0][0].error,
                    })
                }
                else {
                    response.json({
                        message: "Success",
                        iduser: data[0][0].iduser,
                        username: data[0][0].username,
                        profile_image: data[0][0].profile_image,
                        written_fics: data[0][0].written_fics,
                        created: data[0][0].created
                    })
                }
            }
        }
    );
}
)
app.post("/updateUser", file.single('image'),
(request, response)=>{
    const username = request.body.username;
    const email = request.body.email;
    const password = request.body.password;
    const iduser = request.body.iduser;
    const img64 = request.file ? request.file.buffer.toString('base64') : null;
    const mode_pref = request.body.mode_pref;

    db.query('CALL sp_update_users("update", ?, null, ?, ?, ?, ?)',
        [username, email, img64, mode_pref, iduser],
        (error, data)=>{
            if(error){
                console.log(error);
                if(error.code === 'ER_DUP_ENTRY'){
                    if(error.sqlMessage.includes("username")){
                        response.json({
                            message: "ER_DUP_USERNAME"
                        })
                    }
                    else if(error.sqlMessage.includes("email")){
                        response.json({
                            message: "ER_DUP_EMAIL"
                        })
                    }
                } else {
                    response.json({
                        message: error.code,
                    })
                }
            } else {
                db.query('CALL sp_update_users("update", null, ?, null, null, null, ?)',
                    [password, iduser],
                    (error, data)=>{
                        if(error){
                            console.log(error);
                            response.json({
                                message: error.code,
                            })
                        } else {
                            response.json({
                                message: "Success"
                            })
                        }
                    }
                );
            }
        }
    );
}
)

//tags
app.get("/staticTags", (request, response)=>{
    const text = request.query.text;
    const ntags = request.query.ntags;
    db.query('CALL sp_update_tags("static", null, ?, null, ?)',
        [text, ntags],
        (error, data)=>{
            if(error){
                console.log(error);
                response.json({
                    message: error.code,
                })
            } else {
                if(data[0].error){
                    response.json({
                        message: data[0].error,
                    })
                }
                else {
                    response.json({
                        message: "Success",
                        tags: data[0]
                    })
                }
            }
        }
    );
}
)
app.get("/userTags", (request, response)=>{
    const text = request.query.text;
    const ntags = request.query.ntags;
    db.query('CALL sp_update_tags("user", null, ?, null, ?)',
        [text, ntags],
        (error, data)=>{
            if(error){
                console.log(error);
                response.json({
                    message: error.code,
                })
            } else {
                if(data[0].error){
                    response.json({
                        message: data[0].error,
                    })
                }
                else {
                    response.json({
                        message: "Success",
                        tags: data[0]
                    })
                }
            }
        }
    );
}
)
app.post("/createTag", (request, response)=>{
    const name = request.body.name;
    db.query('CALL sp_update_tags("create", null, ?, null, null)',
        [name],
        (error, data)=>{
            if(error){
                console.log(error);
                response.json({
                    message: error.code,
                })
            } else {
                response.json({
                    message: "Success",
                    idtag: data[0][0].idtag,
                })
            }
        }
    );
}
)
app.post("/tagFic", (request, response)=>{
    const idtag = request.body.idtag;
    const idfic = request.body.idfic;
    
    db.query('CALL sp_update_tags("tagfic", ?, null, ?, null)',
        [idtag, idfic],
        (error, data)=>{
            if(error){
                console.log(error);
                response.json({
                    message: error.code,
                })
            } else {
                response.json({
                    message: "Success"
                })
            }
        }
    );
}
)

//get fics
app.get("/favoriteFics", (request, response)=>{
    db.query('CALL sp_get_fics("favorite", null, null, null, null, null, null, null)',
        (error, data)=>{
            if(error){
                console.log(error);
                response.json({
                    message: error.code,
                })
            } else {
                if(data[0].error){
                    response.json({
                        message: data[0].error,
                    })
                }
                else {
                    response.json({
                        message: "Success",
                        fics: data[0]
                    })
                }
            }
        }
    );
}
)
app.get("/lastReadFics", (request, response)=>{
    const iduser = request.query.iduser;

    db.query('CALL sp_get_fics("lastread", ?, null, null, null, null, null, null)',
        [iduser],
        (error, data)=>{
            if(error){
                console.log(error);
                response.json({
                    message: error.code,
                })
            } else {
                if(data[0].error){
                    response.json({
                        message: data[0].error,
                    })
                }
                else {
                    response.json({
                        message: "Success",
                        fics: data[0]
                    })
                }
            }
        }
    );
}
)
app.get("/libraryFics", (request, response)=>{
    const iduser = request.query.iduser;
    const nfics = request.query.nfics;
    const npage = request.query.npage;

    db.query('CALL sp_get_fics("library", ?, ?, ?, null, null, null, null)',
        [iduser, nfics, npage],
        (error, data)=>{
            if(error){
                console.log(error);
                response.json({
                    message: error.code,
                })
            } else {
                if(data[0].error){
                    response.json({
                        message: data[0].error,
                    })
                }
                else {
                    response.json({
                        message: "Success",
                        fics: data[0]
                    })
                }
            }
        }
    );
}
)
app.get("/mostCommentedFics", (request, response)=>{
    db.query('CALL sp_get_fics("commented", null, null, null, null, null, null, null)',
        (error, data)=>{
            if(error){
                console.log(error);
                response.json({
                    message: error.code,
                })
            } else {
                if(data[0].error){
                    response.json({
                        message: data[0].error,
                    })
                }
                else {
                    response.json({
                        message: "Success",
                        fics: data[0]
                    })
                }
            }
        }
    );
}
)
app.get("/newestFics", (request, response)=>{
    db.query('CALL sp_get_fics("newest", null, null, null, null, null, null, null)',
        (error, data)=>{
            if(error){
                console.log(error);
                response.json({
                    message: error.code,
                })
            } else {
                if(data[0].error){
                    response.json({
                        message: data[0].error,
                    })
                }
                else {
                    response.json({
                        message: "Success",
                        fics: data[0]
                    })
                }
            }
        }
    );
}
)
app.get("/longestFics", (request, response)=>{
    db.query('CALL sp_get_fics("longest", null, null, null, null, null, null, null)',
        (error, data)=>{
            if(error){
                console.log(error);
                response.json({
                    message: error.code,
                })
            } else {
                if(data[0].error){
                    response.json({
                        message: data[0].error,
                    })
                }
                else {
                    response.json({
                        message: "Success",
                        fics: data[0]
                    })
                }
            }
        }
    );
}
)
app.get("/userWrittenFics", (request, response)=>{
    const iduser = request.query.iduser;
    const nfics = request.query.nfics;
    const npage = request.query.npage;

    db.query('CALL sp_get_fics("user", ?, ?, ?, null, null, null, null)',
        [iduser, nfics, npage],
        (error, data)=>{
            if(error){
                console.log(error);
                response.json({
                    message: error.code,
                })
            } else {
                if(data[0].error){
                    response.json({
                        message: data[0].error,
                    })
                }
                else {
                    response.json({
                        message: "Success",
                        fics: data[0]
                    })
                }
            }
        }
    );
}
)
app.get("/filteredFics", (request, response)=>{
    const nfics = request.query.nfics;
    const npage = request.query.npage;
    const text = request.query.text;
    const idtags = request.query.idtags;

    db.query('CALL sp_get_fics("filtered", null, ?, ?, null, ?, ?, null)',
        [nfics, npage, text, idtags],
        (error, data)=>{
            if(error){
                console.log(error);
                response.json({
                    message: error.code,
                })
            } else {
                if(data[0].error){
                    response.json({
                        message: data[0].error,
                    })
                }
                else {
                    response.json({
                        message: "Success",
                        fics: data[0]
                    })
                }
            }
        }
    );
}
)

//fic info
app.get("/ficTopInfo", (request, response)=>{
    const idfic = request.query.idfic;
    db.query('CALL sp_get_fics("top", null, null, null, ?, null, null, null)',
        [idfic],
        (error, data)=>{
            if(error){
                console.log(error);
                response.json({
                    message: error.code,
                })
            } else {
                if(data[0][0].error){
                    response.json({
                        message: data[0][0].error,
                    })
                }
                else {
                    response.json({
                        message: "Success",
                        title: data[0][0].title,
                        username: data[0][0].username,
                        description: data[0][0].description,
                        img_route: data[0][0].img_route,
                        profile_image: data[0][0].profile_image,
                    })
                }
            }
        }
    );
}
)
app.get("/ficBasicInfo", (request, response)=>{
    const idfic = request.query.idfic;
    db.query('CALL sp_get_fics("basic", null, null, null, ?, null, null, null)',
        [idfic],
        (error, data)=>{
            if(error){
                console.log(error);
                response.json({
                    message: error.code,
                })
            } else {
                if(data[0][0].error){
                    response.json({
                        message: data[0][0].error,
                    })
                }
                else {
                    response.json({
                        message: "Success",
                        title: data[0][0].title,
                        img_route: data[0][0].img_route,
                    })
                }
            }
        }
    );
}
)
app.get("/ficInfoWTag", (request, response)=>{
    const idfic = request.query.idfic;
    db.query('CALL sp_get_fics("tagged", null, null, null, ?, null, null, null)',
        [idfic],
        (error, data)=>{
            if(error){
                console.log(error);
                response.json({
                    message: error.code,
                })
            } else {
                if(data[0][0].error){
                    response.json({
                        message: data[0][0].error,
                    })
                }
                else {
                    const tags = data[0][0].tags.split(',');
                    const tagsWithType = tags.map(tag => {
                        /*if(tag.includes('romance')){
                            return {type: 'romance', content: tag};
                        } else if(tag.includes('action')){
                            return {type: 'action', content: tag};
                        } else if(tag.includes('drama')){
                            return {type: 'drama', content: tag};
                        } else if(tag.includes('comedy')){
                            return {type: 'comedy', content: tag};
                        } else {
                            return {type: 'other', content: tag};
                        }
                            { type: '1', content: 'Completada' },
                            { type: '2', content: 'Contenido sexual' },
                            { type: '3', content: 'Amor' },
                            { type: '3', content: 'Time travel' },
                            { type: '3', content: 'Enemies to lovers' },
                            { type: '3', content: 'Drama' },
                            { type: '4', content: '+'}
                            */
                        return {type: '3', content: tag};
                    }
                    );
                    response.json({
                        message: "Success",
                        title: data[0][0].title,
                        username: data[0][0].username,
                        description: data[0][0].description,
                        img_route: data[0][0].img_route,
                        tags: tagsWithType
                    })
                }
            }
        }
    );
}
)
app.get("/ficCompleteInfo", (request, response)=>{
    const idfic = request.query.idfic;
    const iduser = request.query.iduser;
    db.query('CALL sp_get_fics("complete", ?, null, null, ?, null, null, null)',
        [iduser, idfic],
        (error, data)=>{
            if(error){
                console.log(error);
                response.json({
                    message: error.code,
                })
            } else {
                if(data[0][0].error){
                    response.json({
                        message: data[0][0].error,
                    })
                }
                else {
                    const tags = data[0][0].tags.split(',');
                    const tagsWithType = tags.map(tag => {
                        /*if(tag.includes('romance')){
                            return {type: 'romance', content: tag};
                        } else if(tag.includes('action')){
                            return {type: 'action', content: tag};
                        } else if(tag.includes('drama')){
                            return {type: 'drama', content: tag};
                        } else if(tag.includes('comedy')){
                            return {type: 'comedy', content: tag};
                        } else {
                            return {type: 'other', content: tag};
                        }
                            { type: '1', content: 'Completada' },
                            { type: '2', content: 'Contenido sexual' },
                            { type: '3', content: 'Amor' },
                            { type: '3', content: 'Time travel' },
                            { type: '3', content: 'Enemies to lovers' },
                            { type: '3', content: 'Drama' },
                            { type: '4', content: '+'}
                            */
                        return {type: '3', content: tag};
                    }
                    );
                    response.json({
                        message: "Success",
                        title: data[0][0].title,
                        iduser: data[0][0].iduser,
                        username: data[0][0].username,
                        description: data[0][0].description,
                        img_route: data[0][0].img_route,
                        tags: tagsWithType,
                        nfavs: data[0][0].nfavs,
                        ncomments: data[0][0].ncomments,
                        nviews: data[0][0].nviews,
                        saved: data[0][0].saved
                    })
                }
            }
        }
    );
}
)
app.post("/viewFic", (request, response)=>{
    const iduser = request.body.iduser;
    const idfic = request.body.idfic;
    const lastread = request.body.lastread;
    db.query('CALL sp_get_fics("view", ?, null, null, ?, null, null, ?)',
        [iduser, idfic, lastread],
        (error, data)=>{
            if(error){
                console.log(error);
                response.json({
                    message: error.code,
                })
            } else {
                response.json({
                    message: "Success"
                })
            }
        }
    );
}
)
app.post("/saveFic", (request, response)=>{
    console.log(request.body);
    const iduser = request.body.iduser;
    const idfic = request.body.idfic;
    db.query('CALL sp_get_fics("save", ?, null, null, ?, null, null, null)',
        [iduser, idfic],
        (error, data)=>{
            if(error){
                console.log(error);
                response.json({
                    message: error.code,
                })
            } else {
                response.json({
                    message: "Success"
                })
            }
        }
    );
}
)
//fic
app.post("/createFic", upload.single('cover'), (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const iduser = req.body.iduser;
    const completed = req.body.completed;
    const img_route = req.file ? `/uploads/${req.file.filename}` : null;

    db.query('CALL sp_update_fics("create", ?, ?, ?, ?, ?, null)',
        [iduser, title, description, img_route, completed],
        (error, data) => {
            if (error) {
                console.log(error);
                res.json({ 
                    message: error.code 
                });
            } else {
                res.json({ 
                    message: "Success",
                    idfic: data[0][0].idfic
                });
            }
        }
    );
}
)

//chapters
app.post("/createChapter", (request, response)=>{
    const title = request.body.title;
    const text = request.body.text;
    const idfic = request.body.idfic;
    const idchapter = request.body.idchapter;

    db.query('CALL sp_update_chapters("create", ?, ?, ?, ?)',
        [title, text, idfic, idchapter],
        (error, data)=>{
            if(error){
                console.log(error);
                response.json({
                    message: error.code,
                })
            } else {
                response.json({
                    message: "Success"
                })
            }
        }
    );
}
)
app.post("/updateChapter", (request, response)=>{
    const title = request.body.title;
    const text = request.body.text;
    const idfic = request.body.idfic;
    const idchapter = request.body.idchapter;

    db.query('CALL sp_update_chapters("update", ?, ?, ?, ?)',
        [title, text, idfic, idchapter],
        (error, data)=>{
            if(error){
                console.log(error);
                response.json({
                    message: error.code,
                })
            } else {
                response.json({
                    message: "Success"
                })
            }
        }
    );
}
)
app.post("/deleteChapter", (request, response)=>{
    const idfic = request.body.idfic;
    const idchapter = request.body.idchapter;

    db.query('CALL sp_update_chapters("delete", null, null, ?, ?)',
        [idfic, idchapter],
        (error, data)=>{
            if(error){
                console.log(error);
                response.json({
                    message: error.code,
                })
            } else {
                response.json({
                    message: "Success"
                })
            }
        }
    );
}
)
app.get("/ficChapters", (request, response)=>{
    const idfic = request.query.idfic;
    db.query('CALL sp_get_chapters("chapters", ?, null)',
        [idfic],
        (error, data)=>{
            if(error){
                console.log(error);
                response.json({
                    message: error.code,
                })
            } else {
                if(data[0].error){
                    response.json({
                        message: data[0].error,
                    })
                }
                else {
                    response.json({
                        message: "Success",
                        chapters: data[0]
                    })
                }
            }
        }
    );
}
)
app.get("/chapterText", (request, response)=>{
    const idfic = request.query.idfic;
    const idchapter = request.query.idchapter;
    db.query('CALL sp_get_chapters("text", ?, ?)',
        [idfic, idchapter],
        (error, data)=>{
            if(error){
                console.log(error);
                response.json({
                    message: error.code,
                })
            } else {
                if(data[0].error){
                    response.json({
                        message: data[0].error,
                    })
                }
                else {
                    response.json({
                        message: "Success",
                        text: data[0][0].text,
                        title: data[0][0].title,
                    })
                }
            }
        }
    );
}
)

//comments
app.get("/chapterComments", (request, response)=>{
    const idfic = request.query.idfic;
    const idchapter = request.query.idchapter;
    const ncomments = request.query.ncomments;
    const npage = request.query.npage;
    db.query('CALL sp_get_comments(?, ?, ?, ?)',
        [idfic, idchapter, ncomments, npage],
        (error, data)=>{
            if(error){
                console.log(error);
                response.json({
                    message: error.code,
                })
            } else {
                if(data[0].error){
                    response.json({
                        message: data[0].error,
                    })
                }
                else {
                    response.json({
                        message: "Success",
                        comments: data[0]
                    })
                }
            }
        }
    );
}
)
app.post("/createComment", (request, response)=>{
    const idfic = request.body.idfic;
    const idchapter = request.body.idchapter;
    const iduser = request.body.iduser;
    const text = request.body.text;
    db.query('CALL sp_update_comments("create", ?, ?, ?, ?)',
        [idfic, idchapter, iduser, text],
        (error, data)=>{
            if(error){
                console.log(error);
                response.json({
                    message: error.code,
                })
            } else {
                response.json({
                    message: "Success"
                })
            }
        }
    );
}
)

//tests

app.post("/testCreateUser", file.single('image'), /*el nombre de como lo estoy mandando desde el form */ 
(request, response)=>{
    const name = request.body.name;
    const email = request.body.email;
    const password = request.body.password;
    const img64 = request.file.buffer.toString('base64');

    db.query('INSERT INTO User(username, email, password, profile_image, mode_pref) VALUES(?,?,?,?,?)',
        [name, email, password, img64, 0],
        (error, data)=>{
            if(error){
                console.log(error);
                response.send({
                    message: error,
                })
            } else {
                response.send({
                    message: "Registered"
                })
            }
        }
    );
}
)

app.post("/signinUserTest", (request, response)=>{
        const email = request.body.email;
        const password = request.body.password;

        db.query('SELECT * FROM User WHERE email = ? AND password = ?',
            [email, password],
            (error, data)=>{
                if(error){
                    console.log(error);
                    response.send({
                        message: error,
                    })
                } else {
                    console.log(data);
                    if(data.length == 0){
                        response.send({
                            message: "User not found"
                        })
                    } else {
                        response.json({
                            message: "Success",
                            iduser: data[0].iduser,
                            username: data[0].username,
                        })
                    }
                    console.log("Query successful");
                }
            }
        );

    }
)

app.get("/getUser", (request, response)=>{
        db.query('SELECT * FROM User',
            (error, data)=>{
                if(error){
                    console.log(error);
                    response.send({
                        message: error,
                    })
                } else {
                    console.log(data);
                    if(data.length == 0){
                        response.send({
                            message: "No users"
                        })
                    } else {
                        response.json(data);
                        console.log("Query successful");
                    }
                }
            }
        );
    }
)


app.post("/modifyUserTest", file.none(),
(request, response)=>{
    const username = request.body.name;
    const email = request.body.email;
    const iduser = request.body.iduser;
    db.query('UPDATE User SET username = ?, email = ? WHERE iduser = ?',
        [username, email, iduser],
        (error, data)=>{
            if(error){
                console.log(error);
                response.send({
                    message: error.code,
                })
            } else {
                console.log(data);
                response.send({
                    message: "Success"
                })
            }
        }
    );
}
)

app.put('/modificar/:idU',
    (request, response)=>{
        const username = request.body.newName;
        const email = request.body.newCorreo;
        const iduser = request.params.idU;
        db.query('UPDATE User SET username = ?, email = ? WHERE iduser = ?',
            [username, email, iduser],
            (error, data)=>{
                if(error){
                    console.log(error);
                    response.send({
                        message: error.code,
                    })
                } else {
                    console.log(data);
                    response.send({
                        message: "Success"
                    })

                    /**which is better response.json is better */
                }
            }
        );
    }
)

app.delete('/eliminar/:idU',
    (request, response)=>{
        const iduser = request.params.idU;
        db.query('DELETE FROM User WHERE iduser = ?',
            [iduser],
            (error, data)=>{
                if(error){
                    console.log(error);
                    response.send({
                        message: error.code,
                    })
                } else {
                    console.log(data);
                    response.json({
                        message: "Success"
                    });
                }
            }
        );        
    }
)