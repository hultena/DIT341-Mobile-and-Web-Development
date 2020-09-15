const express = require('express');
const ingredients = require('../controllers/ingredients');

const router = express.Router();

router.route('/')
    .get(ingredients.getAllIngredients)
    .delete(ingredients.deleteAllIngredients);

router.route('/:ingredientId')
    .get(ingredients.getIngredient);

module.exports = router;