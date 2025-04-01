//node index.js
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');
const multer = require('multer');

app.use(cors());
app.use(express.json());

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

app.post("/createUser", file.none(),
(request, response)=>{
    const username = request.body.username;
    const email = request.body.email;
    const password = request.body.password;
    db.query('INSERT INTO User(username, email, password, mode_pref) VALUES(?,?,?,?)',
        [username, email, password, 0],
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

app.post("/signinUser", (request, response)=>{
    const username = request.body.username;
    const password = request.body.password;

    db.query('SELECT * FROM User WHERE username = ? AND password = ?',
        [username, password],
        (error, data)=>{
            if(error){
                console.log(error);
                response.send({
                    message: error.code,
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
                        profile_image: data[0].profile_image
                    })
                }
                console.log("Query successful");
            }
        }
    );

}
)

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
                console.log(data);
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