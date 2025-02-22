//node index.js
const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');

app.use(cors());
app.use(express.json());

app.listen(3001, ()=>{
    console.log("Server listening on port 3001");
})

const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "",
        database: "tomillofics",
        port: 3306
    }
)

app.post("/createUser", (request, response)=>{
        const name = request.body.name;
        const email = request.body.email;
        const password = request.body.password;

        db.query('INSERT INTO User(username, email, password, mode_pref) VALUES(?,?,?,?)',
            [name, email, password, 0],
            (error, data)=>{
                if(error){
                    console.log(error);
                } else {
                    console.log(data);
                    console.log("Query successful");
                }
            }
        );

        response.send("Data received");
    }
)

app.post("/signinUser", (request, response)=>{
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
                    if(data.length == 0){ //use > instead
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