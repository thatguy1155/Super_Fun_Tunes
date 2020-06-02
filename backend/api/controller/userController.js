const express = require('express')
const router = express.Router()
const db = require('../../config/db.js')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const User = require("../model/User");

//here we have all the queries for users
//include stuff for sending jwt token
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../../config');

exports.getUser = async (req, res) => {
  try {
    let music = await User.findAll();
    res.status(200).json(music);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.addNewUser = async (req,res) => {
    let { username, userId, pw } = req.body
    console.log(req.body)
    User.__factory = {autoIncrementField: 'id'}
    User.id = ''
    //if there's already username with the same name as the submitted one, send back an error
    const foundUser = await User.findOne({ where: { userId: userId } });
    if (foundUser !== null) {
        return res.status(401).send({ auth: false, token: null,error: 'name already taken' });
    }
    //hash the pw
    const hashedPw = bcrypt.hashSync(req.body.pw, 8);
  try{
    let newUser = await User.create({
      id: User.id,
      username,
      userId,
      pw:hashedPw
    })
    //set a token
    const token = jwt.sign({ id: newUser.id}, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
    res.status(200).json({auth:true,token:token});
  } catch (err) {
    res.status(500).json(err);
  }
     
}

exports.login = async (req,res) => {
  let {  userId, pw } = req.body
  try{
    // find user w that userid
    const foundUser = await User.findOne({ where: { userId: userId } });
    if (foundUser === null) {
        return res.status(401).send({ auth: false, token: null,error: 'name not found' });
    } else {
        // if you find that user compare hashed passwords 
        const passwordIsValid = bcrypt.compareSync(pw, foundUser.pw);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null,error: 'name not found' });
        //if the passwords are good create and send token
        const token = jwt.sign({ id: foundUser.id}, config.secret, {
            expiresIn: 86400 // expires in 24 hours
          });
        res.status(200).json({auth:true,access_token:token});
    }
    
  } catch (err) {
    res.status(500).json(err);
  }
     
}
//part 2 of the login process where user gets their info from the token
exports.getUserByToken = async  (req, res, next) => {
    let token = req.headers['Authorization'];
    console.log("new Entry")
    
    const newToken = req.headers['authorization']
    console.log(newToken)
  
    if (!newToken) {
      return res.status(403).send({
        message: "No token provided!"
      });
    }
  
    jwt.verify(newToken, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized!"
        });
      }
      req.userId = decoded.id;
      res.status(200).send(decoded);
      //next();
    });
  };

//change password
  exports.changePassword = async (req, res) => {
    console.log(req.body)
    const newPW = bcrypt.hashSync(req.body.newPd, 8);
    try {
      let updated = await User.update(
        {pw: newPW},
        {where: {userId:req.body.userId}}
      );
      res.status(200).json(updated);
    } catch (err) {
      res.status(500).json(err);
    }
  };
  





