const router = require("express").Router();

router.use("/", require("./swagger"));

router.get("/", (req, res) => {
  //#swagger.tags=['Home Page']
  res.send("Welcome to PokéAPI!");
});

router.use("/pokemon", require("./pokemon"));
//router.use("/trainer", require("./trainer"));

module.exports = router;