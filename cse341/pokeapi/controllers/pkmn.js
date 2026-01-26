const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => { 
  //#swagger.tags=['Pokemon'] 
  try { 
    const db = mongodb.getDb().db(); 
    const lists = await db.collection("pokemon").find().toArray(); 
    res.setHeader("Content-Type", "application/json"); 
    res.status(200).json(lists); 
  } catch (err) { 
    res.status(400).json({ message: err.message }); 
  } 
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Pokemon']
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json("Must use a valid Pokémon ID to find the Pokémon");
    }
    const pokeId = new ObjectId(req.params.id);
    try {
      const result = await mongodb
      .getDb()
      .db()
      .collection("pokemon")
      .find({ _id: pokeId })
      .toArray();
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(result[0]);
    } catch (err) {
        res.status(400).json({ message: err.message }); 
    }
};

const createPkmn = async (req, res) => {
  //#swagger.tags=['Pokemon']
  const pkmn = {
    pokemon: req.body.pokemon,
    types: req.body.types,
    evolution: req.body.evolution,
    level: req.body.level,
    nature: req.body.nature
  };
  const response = await mongodb.getDb().db().collection("pokemon").insertOne(pkmn);

  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error) || "Some error occurred while cataloging the new Pokémon";
  }
};

const updatePkmn = async (req, res) => {
  //#swagger.tags=['Pokemon']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid Pokémon ID to update the Pokémon's info");
  }
  const pokeId = new ObjectId(req.params.id);
  const pkmn = {
    pokemon: req.body.pokemon,
    types: req.body.types,
    evolution: req.body.evolution,
    level: req.body.level,
    nature: req.body.nature
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection("pokemon")
    .replaceOne({ _id: pokeId }, pkmn);

  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error) || "Some error occurred while updating the Pokémon information.";
  }
};

const deletePkmn = async (req, res) => {
  //#swagger.tags=['Pokemon']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid Pokémon ID to delete the Pokémon info");
  }
  const pokeId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db()
    .collection("pokemon")
    .deleteOne({ _id: pokeId }, true);

  if (response.deleteCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error) || "Some error occurred while deleting the user";
  }
};

module.exports = { getAll, getSingle, createPkmn, updatePkmn, deletePkmn };