const router = require("express").Router();
const Flashcard = require("../models/Flashcard.model")


//POST /api/flashcards/ -> Create new Flashcard
router.post("/", async (req, res, next) =>{
  const {cardName, description, originalLang, translations} = req.body

  try {
    const response = await Flashcard.create({
      cardName,
      description,
      originalLang,
      translations
    })

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
router.put("/:flashcardId", async (req, res, next) =>{
  const {cardName, description, originalLang, translations, imageUrl, owner} = req.body

  try {
    const response = await Flashcard.findByIdAndUpdate(req.params.flashcardId,{
      cardName,
      description,
      originalLang,
      translations,
      imageUrl,
      owner
    } ,{new:true});
    res.status(200).json(response);
  } 
  catch (error) {
    next(error)
  }
})

//TODO PATCH /api/flashcards/:flashcardId -> Update all flashcards details

module.exports = router;