const http = require("http");
const express = require("express");
const app = express();
app.use(express.static("public"));
app.get("/", function (request, response) {
  response.sendFile(__dirname + "/views/index.html");
});
app.get("/", (request, response) => {
  response.sendStatus(200);
});

setInterval(() => {
  http.get(`http://backtosafety.herokuapp.com/`);
}, 900000);

const listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});


app.get("/invite", function (request, response) {
  response.redirect("https://discord.com/oauth2/authorize?client_id=738556017792778262&scope=bot&permissions=8");
});

app.get("/support", function (request, response) {
  response.redirect("https://discord.gg/Ex5wGRz");
});

app.get("/", (request, response) => {
  response.sendStatus(200);
});

app.listen(3000);
