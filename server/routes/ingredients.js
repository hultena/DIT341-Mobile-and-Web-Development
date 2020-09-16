const express = require('express');
const ingredients = require('../controllers/ingredients');
const queryString = require('../utilities/query-parser');

const router = express.Router();

router.route('/')
    .get(queryString.query(), ingredients.getAllIngredients)
    .delete(ingredients.deleteAllIngredients);

router.route('/:ingredientId')
    .get(queryString.query(), ingredients.getIngredient);

module.exports = router;