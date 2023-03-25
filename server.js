const bcrypt = require("bcrypt");
const express = require("express");
const { default: mongoose } = require("mongoose");
require("dotenv").config();

const app = express();
const saltRounds = 10;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/public/login.html");
});

app.get("/signup", (req, res) => {
  res.sendFile(__dirname + "/public/signup.html");
});

app.get("/forgot", (req, res) => {
  res.sendFile(__dirname + "/public/forgotPassword.html");
});

app.post("/log-in", (req, res) => {
  let email = req.body.email;
  if (!req.body.password) {
    User.findOne({ email: email }).then((found) => {
      try {
        bcrypt.compare(req.body.password, found.password, (err, result) => {
          if (result) {
            res.send(`Logged In`);
          } else {
            res.redirect("/login");
          }
        });
      } catch (err) {
        console.log(err);
        res.sendFile(__dirname + "/public/login.html");
      }
    });
  }
});

app.post("/sign-up", (req, res) => {
  let email = req.body.email;
  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    if (err) {
      console.log(err);
    }
    if (!err) {
      const usr = new User({
        email: email,
        password: hash,
      });

      usr.save().then(
        () => console.log("User Added..."),
        (err) => console.log(err)
      );
    }
  });
  res.redirect("/login");
});

app.listen(5001, () => {
  console.log("Server is listening on port 5001....");
});
