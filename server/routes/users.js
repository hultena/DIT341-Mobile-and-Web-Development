const express = require('express');
const users = require('../controllers/users')

const router = express.Router();

router.route('/')
    .get(users.getAll);

router.route('/:userId')
    .get(users.getOne);

router.route('/:userId/recipes')
    .get(users.getAllRecipes);

router.route('/:userId/recipes/:recipeId')
    .get(users.getOneRecipe);



module.exports = router;
