const router = require("express").Router();
const User = require("../DB/models/user").Users;
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const jwtKey = 'my_secret_key';
const jwtExpiryTimeInMilliSeconds = 1000 * 60 * 1500; // 15 min
//REGISTER
router.post("/register", async (req, res) => {
  try {
    console.log("-----",req.body.userName);
    const user = await User.findOne({ userName: req.body.userName });
    console.log(user);
    if(user){ 
       res.send("user already exist");
    }
    else{
      //generate new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      //create new user
      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        password: hashedPassword,
      });

      //save user and respond
      const user = await newUser.save();
      res.json(user);
  }
  } catch (err) {
    res.json(err)
  }
});

//LOGIN
router.post("/login", async (req, res) => {
    console.log("1->  ",req.body.password);
    const user = await User.findOne({ userName: req.body.username });

    if (!user) {
      res.json("user not found")
  }
  else {
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) {
      res.json("wrong password")
    }
    else {
        let X = jwtExpiryTimeInMilliSeconds;
      const token = jwt.sign({ user }, jwtKey, {
        algorithm: 'HS256',
        expiresIn: X
      })
      console.log('signin - creaeted token:', token);
      res.cookie('token', token, { maxAge: jwtExpiryTimeInMilliSeconds })
      //res.json();
        res.json({user,"Token was set": "set" ,token})
    }
}
  });

module.exports = router;