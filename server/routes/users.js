const express = require('express');
const users = require('../controllers/users')
const ingredients = require('../controllers/ingredients');

const router = express.Router();

router.route('/')
    .get(users.getAllUsers)
    .post(users.postUser)
    .delete(users.deleteAllUsers);

router.route('/:userId')
    .get(users.getOneUser)
    .put(users.replaceUser)
    .delete(users.deleteUser)
    .patch(users.updateUser);

router.route('/:userId/shoppinglists')
    .get(users.getAllUserShoppingLists)
    .post(users.postUserShoppingList);

router.route('/:userId/shoppinglists/:shoppingListId')
    .get(users.getOneUserShoppingList)
    .delete(users.deleteOneUserShoppingList);

router.route('/:userId/ingredients')
    .get(ingredients.getAllUserIngredients)
    .post(ingredients.postOneUserIngredient);

router.route('/:userId/ingredients/:ingredientId')
    .get(ingredients.getOneUserIngredient)
    .delete(ingredients.deleteOneUserIngredient);

router.route('/:userId/ingredients')
    .get(ingredients.getAllUserIngredients)
    .post(ingredients.postOneUserIngredient);

router.route('/:userId/ingredients/:ingredientId')
    .get(ingredients.getOneUserIngredient)
    .delete(ingredients.deleteOneUserIngredient);

module.exports = router;
