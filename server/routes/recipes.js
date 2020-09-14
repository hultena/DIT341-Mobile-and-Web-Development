const express = require('express');
const recipes = require('../controllers/recipes');

const router = express.Router();

router.route('/')
    .post(recipes.postRecipe)
    .get(recipes.getAllRecipes)
    .delete(recipes.deleteAllRecipes)
    .patch(recipes.updateAllRecipes);

router.route('/:recipeId')
    .get(recipes.getOneRecipe)
    .delete(recipes.deleteRecipe)
    .patch(recipes.updateRecipe);

module.exports = router;