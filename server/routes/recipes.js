const express = require('express');
const recipes = require('../controllers/recipes');

const router = express.Router();

router.route('/')
    .get(recipes.getAllRecipes)
    .patch(recipes.updateAllRecipes)
    .delete(recipes.deleteAllRecipes);

router.route('/:recipeId')
    .get(recipes.getOneRecipe)
    .patch(recipes.updateRecipe)
    .delete(recipes.deleteRecipe);

module.exports = router;