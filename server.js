const express = require("express");
const path = require("path");
const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");

// console.log("Server");

app.get("/", (req, res, next) => {
  console.log("GET URL : /");
  //   res.send("URL : /");
  res.render("index", { title: "divers univers" });
});

app.get("/download", (req, res, next) => {
  res.download("server.js");
});

app.get("/html", (req, res, next) => {
  res.sendFile(path.join(__dirname + "/public/html.html"));
});

const userApi = require("./routes/api");
const userRouter = require("./routes/users");

app.use("/api", userApi);
app.use("/users", userRouter);

app.get("/500", (req, res, next) => {
  //   res.sendStatus(500);
  res.status(500).json({ message: "Error 500" });
});

app.listen(3333);