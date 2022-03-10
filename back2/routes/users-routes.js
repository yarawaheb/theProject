const myRepository = require('../DB/user-repository')
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const User = require("../DB/models/user").Users;

router.get("/all", (req, res) => {
    res.send(myRepository.getall(req.params.all));
});
//follow a user
router.put("/follow/:username", async (req, res) => {
    await User.updateOne({ userName: req.params.username }, { $push: { followers: req.body.username } });
    await User.updateOne({ userName: req.body.username }, { $push: { followings: req.params.username } });
    res.json("followed!");
  
  });

  //unfollow a user
router.put("/unfollow/:username", async (req, res) => {
    await User.updateOne({ userName: req.params.username }, { $pull: { followers: req.body.username } });
    await User.updateOne({ userName: req.body.username }, { $pull: { followings: req.params.username } });
    res.json("followed!");
  
  });

router.post("/login", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    let results = [];
    results = myRepository.checkUsernameAndPassword(username,password);
    const token = jwt.sign({username},'shhhhh')
    res.json({auth: true , token:token ,results:results});
});

const verifyJWT = (req,res,next)=>{
    const token = req.headers.accessToken
    if(!token){
        res.send("you need a token")
    }
    else{
        jwt.verify(token,"shhhhh",(err,decoded)=>{
            if(err){
                res.json({auth:false , message:"you faild to authenticate"});
            }
            else{
                req.userName=decoded.userName;
                next();
            }
        })
    }
}
router.get('/isUserAuth',verifyJWT, (req,res)=>{
    res.send("yor are authenticated")
})

router.get("/", (req, res) => {
    let results = [];
    let username = req.query.userName;
    console.log(username);

    if (username !== undefined) {
        console.log("hi0");
        results = myRepository.findUserByUsername(username)
        
        results.then(response =>{
            console.log("1111",response);
            res.send(response);
        })
    }
    
});

router.get("/username", (req, res) => {
    let username = req.query[0];
    console.log(username);

    if (username !== undefined) {
        console.log("hi0");
        results = myRepository.findUserByUsername(username)
        
        results.then(response =>{
            console.log("1111",response);
            res.send(response);
        })
    }
    
});


router.post("/", (req, res) => {
    let isAllOK = myRepository.addUser(req.body);
    if (isAllOK === true) {
        res.send("added new user");
    }
    else {
        res.send("unsuccessful adding new user");
    }
});

router.put("/:id", (req, res ) => {
    let result = myRepository.updateUserByUsername(req.body)
    result.then(response =>{
        console.log("the res",response);
        if (response === true) {
            res.send("updated the user")
        }
        else {
            res.send("user with the provided username does not exist")
        }
        
    })
    
});


router.delete("/:id", (req, res) => {
    console.log(req.params.id);
    let result = myRepository.deleteUserByUsername(req.params.id)
    if (result === true) {
        res.send("deleted the user")
    }
    else {
        res.send("user with the provided username does not exist")
    }
});

//get friends
router.get("/friends/:userId", async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      const friends = await Promise.all(
        user.followings.map((friendId) => {
          return User.findById(friendId);
        })
      );
      let friendList = [];
      friends.map((friend) => {
        const { _id, username, profilePicture } = friend;
        friendList.push({ _id, username, profilePicture });
      });
      res.status(200).json(friendList)
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;