const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/users");
const clients = require("./routes/api/clientInfo");

const MongoClient = require('mongodb').MongoClient;
const app = express();
// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
// DB Config
const db = require("./config/keys").mongoURI,
      rep = require("./config/keys").replicaSet;
// Connect to MongoDB

// const uri = "mongodb+srv://shahid:<PASSWORD>@cluster0-1q7ty.mongodb.net/test"
// MongoClient.connect(uri, function(err, client) {
//    if(err) {
//         console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
//    }
//    console.log('Connected...');
//    const collection = client.db("test").collection("devices");
//    // perform actions on the collection object
//    client.close();
// });
mongoose
  .connect(
    db,
    {
      // reconnectTries: 100,
      // reconnectInterval: 500,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      //dbName: 'test'
   }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log('heelo ' + err) );

  // Passport middleware
  app.use(passport.initialize());
  // Passport config
  require("./config/passport")(passport);
  // Routes
  app.use("/api/users", users);
  app.use("/api/clients", clients);


const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(() => console.log(process.env.PORT))
app.listen(port, () => console.log(`Server up and running on port ${port} !`));
