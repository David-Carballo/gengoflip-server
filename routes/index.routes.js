const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

//User routes

// Deck routes
const deckRouter = require("./deck.routes");
router.use("/decks", deckRouter);

// Flashcards routes
const flashcardRouter = require("./flashcard.routes");
router.use("/flashcards", flashcardRouter);

//Upload routes
const uploadRoutes = require("./upload.routes");
router.use("/upload", uploadRoutes);

// User routes
const userRouter = require("./user.routes");
router.use("/users", userRouter);

// Authorization routes
const authRouter = require("./auth.routes");
router.use("/auth", authRouter);

module.exports = router;
