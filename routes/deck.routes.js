const router = require("express").Router();
const Deck = require("../models/Deck.model");
const {verifyToken} = require("../middlewares/auth.middlewares");
const User = require("../models/User.model");

//All deck routes

//GET /api/decks/ -> Returns array with all db decks
router.get("/", async (req, res, next)=>{
  try {
      const response = await Deck.find()
      console.log("Decks recibidos!")
      res.status(200).json(response);
  } 
  catch (error) {
    next(error);
  }
})

//GET /api/decks/:deckId -> Returns object with deck datails and all flashcards(populate)
router.get("/:deckId", async (req, res, next)=>{
  try {
    const response = await Deck.findById(req.params.deckId).populate("owner").populate("flashcards");
    // console.log("Deck: ", response)
    res.status(200).json(response);
  } 
  catch (error) {
    console.log(error)
  }
})

//POST /api/decks/ -> {deck object} -> Create a new Deck
router.post("/", verifyToken, async (req, res, next)=>{
  const {deckName, description, tags, languages, imageUrl, flashcards} = req.body;

  try {
    const newDeck = await Deck.create({
      deckName,
      description,
      tags,
      languages,
      imageUrl,
      flashcards,
      owner: req.payload._id
    })

    res.status(201).json(newDeck);
  } 
  catch (error) {
    next(error)
  }
})

//PUT /api/decks/:deckId -> {deck object} -> Update all details of Deck
router.put("/:deckId", async (req, res, next)=>{
  const {deckName, description, tags, languages, savedCount, flashcards, imageUrl, owner} = req.body;
  try {
    const response = await Deck.findByIdAndUpdate(req.params.deckId, 
    {
      deckName,
      description,
      tags,
      languages,
      savedCount,
      imageUrl,
      flashcards,
      owner
    }, {new: true})

    res.status(200).json(response);
  } 
  catch (error) {
    next(error)
  }
})

//TODO check necessary PATCHES(add flashcard, update savedCount)
//PATCH /api/decks/:deckId -> {++count} -> update saved count value
router.patch("/:deckId", async (req, res, next)=>{
  const {savedCount} = req.body
  try {
    const response = await Deck.findByIdAndUpdate(req.params.deckId, {savedCount} ,{new: true})
    res.status(200).json(response);
  } 
  catch (error) {
    next(error)  
  }
})

//DELETE /api/decks/:deckId -> Delete deck and all flashcards
//TODO check owner????
router.delete("/:deckId", async(req,res, next) => {
  try {
    await Deck.findByIdAndDelete(req.params.deckId);
    res.sendStatus(202);  
  } 
  catch (error) {
    next(error)
  }
})


module.exports = router;
