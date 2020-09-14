const express = require('express');
const recipes = require('../controllers/recipes');

const router = express.Router();

router.route('/')
    .get(recipes.getAllRecipes)
    .delete(recipes.deleteAllRecipes);

module.exports = router;