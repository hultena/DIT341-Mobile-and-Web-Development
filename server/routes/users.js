const express = require('express');
const users = require('../controllers/users')
const ingredients = require('../controllers/ingredients');

const router = express.Router();

router.route('/')
    .get(users.getAllUsers)
    .post(users.postUser);

router.route('/:userId')
    .get(users.getOneUser)

router.route('/:userId/shoppinglists')
    .get(users.getAllUserShoppingLists)

router.route('/:userId/shoppinglists/:shoppingListId')
    .get(users.getOneUserShoppingList)

router.route('/:userId/ingredients')
    .get(ingredients.getAllUserIngredients);

router.route('/:userId/ingredients/:ingredientId')
    .get(ingredients.getOneUserIngredient);

module.exports = router;
