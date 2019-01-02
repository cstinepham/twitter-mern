const mongoose = require('mongoose');
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const User = require('./models/User');
const db = require('./config/keys').mongoURI;
const passport = require('passport');


app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

mongoose
  .connect(db, {
    useNewUrlParser: true
  })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

// app.get("/", (req, res) => {
//   const user = new User({
//     handle: "demo",
//     email: "demo@email.com",
//     password: "password"
//   })
//   user.save();
//   res.send("Hello World.");
// });


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));

const users = require("./routes/api/users");
const tweets = require("./routes/api/tweets");

app.use(passport.initialize());
require('./config/passport')(passport);

app.use("/api/users", users);
app.use("/api/tweets", tweets);
