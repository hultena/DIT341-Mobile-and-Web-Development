const express = require('express');
const users = require('../controllers/users')

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

module.exports = router;
