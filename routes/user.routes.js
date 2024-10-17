const router = require("express").Router();
const User = require("../models/User.model")
const {verifyToken} = require("../middlewares/auth.middlewares")

//GET /api/users/profile -> Return user info
router.get("/profile", verifyToken, async (req, res, next) => {
  try {
    const response = await User.findById(req.payload._id);
    res.status(200).json(response);
  } 
  catch (error) {
    next(error)  
  }
})

//PUT /api/users/profile -> Update user info
router.put("/profile", verifyToken, async (req, res, next) => {
  const {email, username, firstName, lastName, profileImg} = req.body
  try {
    const response = await User.findByIdAndUpdate(req.payload._id, {
      email,
      username,
      firstName,
      lastName,
      profileImg
    }, {new:true});

    res.status(200).json(response);
  } 
  catch (error) {
    next(error)  
  }
})

//DELETE /api/users/delete -> Delete account from this user
router.delete("/delete", verifyToken, async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.payload._id)
    res.sendStatus(202)
  } 
  catch (error) {
    next(error)  
  }
})

module.exports = router;