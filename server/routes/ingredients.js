const express = require('express');
const ingredients = require('../controllers/ingredients');

const router = express.Router();

router.route('/ingredients')
    .get(ingredients.getAllIngredients);

router.route('/ingredients/:ingredientId')
    .get(ingredients.getIngredient);

module.exports = router;