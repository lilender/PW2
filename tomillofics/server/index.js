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

        db.query('INSERT INTO User(username, password, email, mode_pref) VALUES(?,?,?,?)',
            [name, email, password, 0],
            (error, data)=>{
                if(error){
                    console.log(error);
                } else {
                    console.log("Query successful");
                }
            }
        );

        response.send("Data received");
    }
)