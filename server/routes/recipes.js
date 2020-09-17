const express = require('express');
const recipes = require('../controllers/recipes');
const queryString = require('../utilities/query-parser');

const router = express.Router();

// ------------------ All recipes in database
router.route('/')
    .get(queryString.query(), recipes.getAllDatabaseRecipes);

router.route('/:recipeId')
    .get(queryString.query(), recipes.getDatabaseRecipe);

module.exports = router;
