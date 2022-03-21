const router = require("express").Router();
const User = require("../DB/models/user").Users;

//get all trips of a user
router.get("/allTrips/:userName" , async(req,res)=>{
    const trip = await User.find({ userName:req.params.userName }, {trips:1});
    res.json(trip[0].trips  );
})

//get a trips of a user
router.get("/aTrip/:userName/:tripID" , async(req,res)=>{
  const tripID = parseInt(req.params.tripID)
  const trip = await User.find({ userName:req.params.userName,trips: { $elemMatch: { tripId: tripID } }  }, {trips:1});
  res.json(trip[0].trips  );
})

//get all trips
router.get("/allTheTrips" , async(req,res)=>{
  const trip = await User.find({trips:{$ne:[]}}, {trips:1,_id:0});
  res.json(trip  );
})

//create a trip 
router.put("/:username", async (req, res) => {
    await User.updateOne({ userName: req.params.username }, { $push: { trips: req.body } });
    res.json("the trip has been added");
  
  });

  //add post to a trip 
router.put("/:username/:tripID", async (req, res) => {
  try {
    const tripID = parseInt(req.params.tripID)
    const trip = await User.updateOne({ userName: req.params.username, trips: { $elemMatch: { tripId: tripID } } }, { $push:{"trips.$.posts": req.body } })
      res.status(200).json(trip);
  } catch (err) {
      res.status(500).json(err);
  }

});

  //join a trip 
router.put("/join/:username/:tripID", async (req, res) => {
  const tripID = parseInt(req.params.tripID)
    await User.updateOne({ userName: req.params.username ,trips: { $elemMatch: { tripId: tripID } }}, { $push:{ "trips.$.members": req.body.member } });
    res.json("successfully joined");
  
  });
module.exports = router;