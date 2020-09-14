const express = require('express');
const recipes = require('../controllers/recipes');

const router = express.Router();

router.route('/')
    .get(recipes.getAllRecipes)
    .delete(recipes.deleteAllRecipes);

router.route('/:recipeId')
    .get(recipes.getOneRecipe);

module.exports = router;