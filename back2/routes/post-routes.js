const router = require("express").Router();
const Post = require("../DB/models/post").Posts;
const User = require("../DB/models/user").Users;

//create a post 

router.put("/:username", async (req, res) => {
  console.log("part1",req.body);
  await User.updateOne({ userName: req.params.username }, { $push: { posts: req.body } });
  res.json("the post has been updated");

});

//get all posts
router.get("/allPosts" , async(req,res)=>{
    const post = await User.find({ posts: {$ne: []} }, { userName:1,posts:1});
    res.json(post);
})

//get all posts of specific user
router.get("/allThePosts/:userName" , async(req,res)=>{
  const post = await User.find({ userName:req.params.userName }, {posts:1});
  res.json(post);
})

//update a post
router.put("/put/:userName/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id)
      const post = await User.updateOne({ userName: req.params.userName, posts: { $elemMatch: { postID: id } } }, { $set: { posts: req.body } })
      res.status(200).json(post);
  } catch (err) {
      res.status(500).json(err);
  }
});


//delete a post
router.delete("/deletePost/:id/:userName", async (req, res) => {
  try {
      const id = parseInt(req.params.id)
      await User.updateOne({ userName: req.params.userName }, { $pull: { posts: { postID: id } } })

      res.status(200).json("the post has been deleted");

  } catch (err) {
      res.status(500).json(err);
  }
});

////////////////////////////////////////////comment////////////////////////////////////////////////
//Add comment 
router.put("/AddComment/:postId/:userId", async (req, res) => {
  const id = parseInt(req.params.id)

  await User.updateOne({ userName: req.params.userName, posts: { $elemMatch: { postID: id } } }, { $push: { "posts.$.comment": req.body } })

  res.send("your comment is added ")
})

//delete comment 
router.delete("/DeleteComment/:userId/:postId/:commentId", async (req, res) => {
  const id = parseInt(req.params.id)

  await user.updateOne({userName: req.params.userName, posts: { $elemMatch: { postID: id} } }, { $pull: { "posts.$.comment": { commentId: { $eq: req.params.commentId } } } })

  res.send("your comment is deleted")
})


module.exports = router;