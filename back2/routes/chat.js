const router = require("express").Router();
const User = require("../DB/models/user").Users;


//get all chats for a user
router.get("/conversations/:userName" , async(req,res)=>{
    const chat = await User.find({ userName:req.params.userName }, {chats:1});
    res.json(chat[0].chats);
})

//new chat
router.put("/addConv/:username1/:username2", async (req, res) => {
    await User.updateOne({ userName: req.params.username1 }, { $push: { chats: req.body.newConv } });
    await User.updateOne({ userName: req.params.username2 }, { $push: { chats: req.body.newConv1 } });
    res.json("the chat has been added");
  
  });
//add message
router.put("/addMsg/:username/:chatID", async (req, res) => {
  try {
    const chatID = parseInt(req.params.chatID)
    const chat = await User.updateOne({ userName: req.params.username, chats: { $elemMatch: { chatID: chatID } } }, { $push:{"chats.$.messages": req.body } })
      res.status(200).json(chat);
  } catch (err) {
      res.status(500).json(err);
  }

});
//delete conversation

module.exports = router;