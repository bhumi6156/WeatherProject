//jshint esversion:6

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extented: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
  console.log(req.body.cityName);

  const cityName = req.body.cityName;
  const apiKey = "f935da672e480f6a6a44680f7d7b71cc";
  const unit = "imperial";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName +"&units=" + unit +"&appid=" + apiKey +"";
  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
    const weatherData = JSON.parse(data);
    const temp = weatherData.main.temp;
    const desc = weatherData.weather[0].description;
    const icon = weatherData.weather[0].icon;
    const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
    res.write("<p>The weather is currently " + desc + ". </p>");
    res.write("<h1>The temperature in "+ cityName + " is " + temp + " degrees Kelvin.</h1>");
    res.write("<img src=" + imageUrl + ">");
    res.send();
    });
  });
});


app.listen(3000, function(){
  console.log("Server running on port 3000");
});
