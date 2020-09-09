const express = require('express');
const users = require('../controllers/users')

const router = express.Router();

router.route('/')
    .get(users.getAllUsers)
    .post(users.postUser);

router.route('/:userId')
    .get(users.getOneUser)

router.route('/:userId/recipes')
    .get(users.getAllUserRecipes)

router.route('/:userId/recipes/:recipeId')
    .get(users.getOneUserRecipe)

module.exports = router;
