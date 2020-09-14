const express = require('express');
const users = require('../controllers/users')

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

router.route('/:userId/recipes/:recipeId')
    .post(users.postRecipe);

module.exports = router;
