const express = require('express');
const users = require('../controllers/users')
const ingredients = require('../controllers/ingredients');
const validators = require('../utilities/validators');
const validationSchemas = require('../utilities/schemas');
const queryString = require('../utilities/query-parser');

const router = express.Router();

// ------------------ User

router.route('/')
    .get(queryString.query(), users.getAllUsers)
    .post(validators.bodyValidator(validationSchemas.newUserSchema), users.postUser)
    .delete(users.deleteAllUsers);

router.route('/:userId')
    .get(queryString.query(), users.getOneUser)
    .put(validators.bodyValidator(validationSchemas.newUserSchema), users.replaceUser)
    .delete(users.deleteUser)
    .patch(validators.bodyValidator(validationSchemas.patchUserSchema), users.updateUser);

// ------------------ Recipe

router.route('/:userId/recipes')
    .post(validators.bodyValidator(validationSchemas.newRecipeSchema), users.postUserRecipe)
    .get(queryString.query(),users.getAllUserRecipes);

router.route('/:userId/recipes/:recipeId')
    .get(queryString.query(), users.getOneUserRecipe)
    .patch(validators.bodyValidator(validationSchemas.patchRecipeSchema), users.updateOneUserRecipe)
    .delete(users.deleteOneUserRecipe);

// ------------------ Shopping list

router.route('/:userId/shoppinglists')
    .get(queryString.query(), users.getAllUserShoppingLists)
    .post(users.postUserShoppingList);

router.route('/:userId/shoppinglists/:shoppingListId')
    .get(queryString.query(), users.getOneUserShoppingList)
    .delete(users.deleteOneUserShoppingList);

router.route('/:userId/ingredients')
    .get(ingredients.getAllUserIngredients)
    .post(ingredients.postOneUserIngredient);

router.route('/:userId/ingredients/:ingredientId')
    .get(ingredients.getOneUserIngredient)
    .delete(ingredients.deleteOneUserIngredient)
    .patch(ingredients.updateIngredient)
    .put(ingredients.replaceIngredient);

module.exports = router;
