const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
// Load input validation
const validateClientInput = require("../../validation/clientSignUp");
// Load User model
const Client = require("../../models/ClientInfo");
const User = require("../../models/User");

//https://medium.com/@siddharthac6/json-web-token-jwt-the-right-way-of-implementing-with-node-js-65b8915d550e
//pass token to create user
//pass token to get users

// @route POST api/clients/clientInfo
// @desc Add client
// @access Public
router.post("/clientInfo", (req, res) => {
//access headers
let headerInfo = req.header('X-Custom-Token');
console.log(headerInfo);

  // Form validation
const { errors, isValid } = validateClientInput(req.body);
// Check validation
  if (!isValid) {
    //console.log("not valid");
    console.log(errors)
    return res.status(400).json(errors);
  }
Client.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newClient = new Client({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phonenumber: req.body.phonenumber,
        description: req.body.description,
      });
// Hash password before saving in database
newClient
  .save()
  .then(user => res.json(user))
  .catch(err => console.log(err));
    }
  });
});


// @route POST api/clients/getClients
// @desc Login user and return JWT token
// @access Public
router.get("/getClients", (req, res) => {

  //access headers
  let headerInfo = req.header('X-Custom-Token');
  console.log(headerInfo);

  const email = headerInfo;

if(!email){
  return res.status(404).json({ emailnotfound: "Email not defined" });
}

console.log(email);

User.findOne({email}).then(user => {
  // Check if user exists
  console.log(user)
  if (!user) {
    return res.status(404).json({ emailnotfound: "Email not found cannot authenticate" });
  }
  console.log(user.role)
  let role = user.role;

  if(role !== "Role.Admin"){
    return res.status(404).json({ noaccess: "You do not have the permissions to access this client list" });
  }

  // Get All Accounts
    Client.find().then(clients => {
      // Check if user exists
      if (clients && clients.length < 0) {
        return res.status(404).json({ clientNone: "There are no clients" });
      }else{
        return res.status(200).json({ data: clients });
      }

    });

})


});

module.exports = router;
