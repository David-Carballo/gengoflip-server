const router = require("express").Router();
const Flashcard = require("../models/Flashcard.model")
const {verifyToken} = require("../middlewares/auth.middlewares")

//POST /api/flashcards/ -> Create new Flashcard
router.post("/", verifyToken, async (req, res, next) =>{
  const {cardName, description, originalLang, translations, imageUrl} = req.body
  console.log(req.payload);
  try {
    const response = await Flashcard.create({
      cardName,
      description,
      originalLang,
      translations,
      imageUrl,
      owner: req.payload._id
    })

    res.status(201).json(response);
  } 
  catch (error) {
    next(error)
  }
})

//POST MANY /api/flashcards/many -> Create new Flashcards
router.post("/many", async (req,res,next) => {
  try {
    const response = await Flashcard.insertMany(req.body);
    res.status(201).json(response);
  } 
  catch (error) {
    next(error)
  }
})

//GET /api/flashcards/:flashcardId -> Return a flashcard by Id
router.get("/:flashcardId", async (req, res, next) =>{
  try {
    const response = await Flashcard.findById(req.params.flashcardId);
    res.status(200).json(response);
  } 
  catch (error) {
    next(error)
  }
})

//PUT /api/flashcards/:flashcardId -> Update all flashcards details
router.put("/:flashcardId", verifyToken, async (req, res, next) =>{
  const {cardName, description, originalLang, translations, imageUrl} = req.body

  try {
    const response = await Flashcard.findByIdAndUpdate(req.params.flashcardId,{
      cardName,
      description,
      originalLang,
      translations,
      imageUrl,
      owner: req.payload._id
    } ,{new:true});
    res.status(200).json(response);
  } 
  catch (error) {
    next(error)
  }
})

//TODO PATCH /api/flashcards/:flashcardId -> Update all flashcards details

//TODO DELETE MANY FLASHCARDS

//DELETE /api/flashcards/:flashcardId -> Delete this flashcard
router.delete("/:flashcardId", verifyToken, async (req, res, next) =>{

  try {
    await Flashcard.findByIdAndDelete(req.params.flashcardId);
    res.sendStatus(202);
  } 
  catch (error) {
    next(error)
  }
})

module.exports = router;