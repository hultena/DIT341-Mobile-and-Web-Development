const express = require('express');
const recipes = require('../controllers/recipes');

const router = express.Router();

router.route('/')
    .get(recipes.getAllRecipes);

router.route('/:recipeId')
    .get(recipes.getOneRecipe);

module.exports = router;