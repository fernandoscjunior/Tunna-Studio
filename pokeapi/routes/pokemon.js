const express = require('express');
const router = express.Router();
const pkmnController = require('../controllers/pkmn');
const validation = require('../middleware/validate')

router.get('/', pkmnController.getAll);
router.get("/:id", pkmnController.getSingle);
router.post("/", validation.savePkmn, pkmnController.createPkmn);
router.put("/:id", validation.savePkmn, pkmnController.updatePkmn);
router.delete("/:id", pkmnController.deletePkmn);

module.exports = router;