const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();

const app = express();
app.use("/assets",express.static("assets"));

const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root123",
    database:"nodejs"
});

//connect to the database
connection.connect(function(error){
    if(error) throw error
    else console.log("connected to the database successfully!")
});

app.get("/",function(req,res){
    res.sendFile( __dirname + "/index.html");
})


app.post("/",encoder, function(req,res){
    var usermail = req.body.usermail;
    var userquery = req.body.userquery;

    connection.query("select * from visitorinfo where user_mail = ? and user_query = ?",[usermail,userquery],function(error,results,fields){
        if (results.length > 0) {
            res.redirect("/welcome");
        } else {
            res.redirect("/");
        }
        res.end();
    })
})

// when query gets success
app.get("/welcome",function(req,res){
    res.sendFile(__dirname + "/welcome.html")
})


// set app port
app.listen(4000);
