const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});


// Authorization routes
const authRouter = require("./auth.routes");
router.use("/auth", authRouter);

module.exports = router;
