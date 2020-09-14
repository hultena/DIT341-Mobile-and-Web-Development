const express = require('express');
const users = require('../controllers/users');
const validators = require('../utilities/validators');
const validationSchemas = require('../utilities/schemas');

const router = express.Router();

router.route('/')
    .get(users.getAllUsers)
    .post(validators.bodyValidator(validationSchemas.newUserSchema), users.postUser)
    .delete(users.deleteAllUsers);

router.route('/:userId')
    .get(users.getOneUser)
    .put(validators.bodyValidator(validationSchemas.newUserSchema),users.replaceUser)
    .delete(users.deleteUser)
    .patch(validators.bodyValidator(validationSchemas.patchUserSchema),users.updateUser);

router.route('/:userId/shoppinglists')
    .get(users.getAllUserShoppingLists)
    .post(users.postUserShoppingList);

router.route('/:userId/shoppinglists/:shoppingListId')
    .get(users.getOneUserShoppingList)
    .delete(users.deleteOneUserShoppingList);

module.exports = router;
