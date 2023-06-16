const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const modules = require("express");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
    const firstname = req.body.fname;
    const lastname = req.body.lname;
    const email = req.body.email;
    const password = req.body.password;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstname,
                    LNAME: lastname,
                },
            },
        ],
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us9.api.mailchimp.com/3.0/lists/5db8f650ff";
    const options = {
        method: "POST",
        auth:"mynewsletterzieco :bcd58b37061f76b45b84f61f38efa2c6-us9"
       };      
           
      
   

    const mailchimpRequest = https.request(url, options, function (response) {
        response.on("data", function (data) {
            console.log(JSON.parse(data));
        });
       
       
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        }else{
            res.sendFile(__dirname + "/failure.html");
        };
    });

    mailchimpRequest.write(jsonData);
    mailchimpRequest.end();
});

app.post("/failure", function (req, res) {
  res.redirect("/"); 
})

app.listen(3000, function () {
    console.log("The server is currently running on port 3000");
});

