const allUsers = require('./models/user').Users;
const ObjectId = require('mongodb').ObjectID;
const bcrypt = require("bcrypt");

//const {ObjectId} = require('mongodb');


const getall = async () => {
    const x = await allUsers.find();
    return JSON.parse(JSON.stringify(x));
   };
exports.getall = getall;

const checkUsernameAndPassword = async (username,password) => {
    const x = await allUsers.findOne({ userName: username });
    if (x.userName === username && x.password === password) {
        return x;
   }
   return null;
};
exports.checkUsernameAndPassword = checkUsernameAndPassword;
   
const findUserByUsername = async (username) => {
    const x = await allUsers.findOne({ userName: username })
    // console.log("----");
    console.log(x);
    // console.log("*****");
    return x;
   };
exports.findUserByUsername = findUserByUsername;

const addUser = async (newuser) => {
    const theNewUser = new allUsers(newuser);
    const x = await theNewUser.save();
    console.log(`addNewUser ${JSON.stringify(x)}`);
    return true;
   };
exports.addUser = addUser;

const deleteUserByUsername = async (username) => {
    const x = await allUsers.deleteOne({ userName: username });
    console.log(`deleteuserbyusername ${JSON.stringify(x)}`);
    return true;
   };
exports.deleteUserByUsername = deleteUserByUsername;

const updateUserByUsername = async (params) => {
    const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(params.password, salt);
    const username = params.userName;
    const x = await allUsers.updateOne({userName:username},{$set: {firstName:params.firstName,lastName:params.lastName,password:hashedPassword}} );
    return true;
   };
exports.updateUserByUsername = updateUserByUsername;
