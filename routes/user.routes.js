const router = require("express").Router();
const User = require("../models/User.model")
const {verifyToken} = require("../middlewares/auth.middlewares")

//GET /api/users/profile -> Return user info
router.get("/profile", verifyToken, async (req, res, next) => {
  try {
    const response = await User.findById(req.payload._id).populate({path: "deckLibrary.deckId", model:"Deck"});
    res.status(200).json(response);
  } 
  catch (error) {
    next(error)  
  }
})

//GET /api/users/profile/library -> Return user's deck
router.get("/profile/library", verifyToken, async (req, res, next) => {
  try {
    const response = await User.findById(req.payload._id).select({deckLibrary:1}).populate({path: "deckLibrary.deckId", model:"Deck"});
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

//PATCH  /api/users/profile/add-deck -> Update deck Library adding item
router.patch("/profile/add-deck", verifyToken, async (req, res, next) => {
  const newDeck = req.body
  try {
    const response = await User.findByIdAndUpdate(req.payload._id, {$push: {
      deckLibrary: newDeck
    }
    }, {new:true});

    res.status(200).json(response);
  } 
  catch (error) {
    next(error)  
  }
})

//PATCH  /api/users/profile/remove-deck -> Update deck Library removing item
router.patch("/profile/remove-deck", verifyToken, async (req, res, next) => {
  const delDeck = req.body
  try {
    const response = await User.findByIdAndUpdate(req.payload._id, {$pull: {
      deckLibrary: delDeck
    }
    }, {new:true});

    res.status(200).json(response);
  } 
  catch (error) {
    next(error)  
  }
})


//PATCH  /api/users/profile/ -> Update deck Library updating deck learn
router.patch("/profile/:deckId", verifyToken, async (req, res, next) => {
  const {id, learnedFlashcard} = req.body
  const currentDate = Date.now();
  try {
    console.log(id,learnedFlashcard);
    const response = await User.findByIdAndUpdate(req.payload._id, 
    {$set: { "deckLibrary.$[elem].passedFlashcards": learnedFlashcard, "deckLibrary.$[elem].previousLesson": currentDate} },
    {arrayFilters: [{ "elem.deckId": id }], new:true});
    
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