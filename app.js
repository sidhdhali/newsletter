//es6 version
const express = require ("express");
const https = require("https");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(express.static("public"))


app.get("/", function(req,res){
  res.sendFile(__dirname + "/signup.html")
})

app.post("/", function(req,res){
 const firstname = req.body.fName;
 const lastname= req.body.lName;
 const email = req.body.eMail;
 const data = {
  members :[
    {
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstname,
        LNAME: lastname
      }
    }
  ]
 }

 const jsonData = JSON.stringify(data);
 const url = "https://us21.api.mailchimp.com/3.0/lists/list id";//use your list id
 const options = {
  method: "POST",
  auth: "sidhdhali:API key" //add your API key
 }

 const request = https.request(url , options , function(response){
  if (response.statusCode === 200){
    res.sendFile(__dirname + "/success.html");
  }else{
    res.sendFile(__dirname + "/failure.html");
  }
  response.on("data" , function(data){
    console.log(JSON.parse(data));
  })
 })
 request.write(jsonData);
 request.end();
})

app.post("/failure", function(req,res){
  res.redirect("/")
})

app.listen(3000, function(){
  console.log("running on port 3000")
})