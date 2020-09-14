const express = require('express');
const users = require('../controllers/users')

const router = express.Router();

// ------------------ User

router.route('/')
    .get(users.getAllUsers)
    .post(users.postUser)
    .delete(users.deleteAllUsers);

router.route('/:userId')
    .get(users.getOneUser)
    .put(users.replaceUser)
    .delete(users.deleteUser)
    .patch(users.updateUser);

// ------------------ Recipe

router.route('/:userId/recipes/:recipeId')
    .post(users.postUserRecipe)
    .get(users.getOneUserRecipe)
    .patch(users.updateOneUserRecipe)
    .delete(users.deleteOneUserRecipe);

router.route('/:userId/recipes')
    .get(users.getAllUserRecipes);

// ------------------ Shopping list

router.route('/:userId/shoppinglists')
    .get(users.getAllUserShoppingLists)
    .post(users.postUserShoppingList);

router.route('/:userId/shoppinglists/:shoppingListId')
    .get(users.getOneUserShoppingList)
    .delete(users.deleteOneUserShoppingList);

module.exports = router;
