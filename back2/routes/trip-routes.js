const router = require("express").Router();
const User = require("../DB/models/user").Users;

//get all trips
router.get("/allTrips/:userName" , async(req,res)=>{
    const trip = await User.find({ userName:req.params.userName }, {trips:1});
    res.json(trip);
})

//create a trip 
router.put("/:username", async (req, res) => {
    console.log("part1",req.body);
    await User.updateOne({ userName: req.params.username }, { $push: { trips: req.body } });
    res.json("the trip has been added");
  
  });

  //join a trip 
router.put("/join/:username", async (req, res) => {
    console.log("part1",req.body);
    await User.updateOne({ userName: req.params.username }, { trips:{ $push: { members: req.body } }});
    res.json("successfully joined");
  
  });
module.exports = router;