const express = require('express');
const users = require('../controllers/users');
const recipes = require('../controllers/recipes');
const ingredients = require('../controllers/ingredients');
const validators = require('../utilities/validators');
const validationSchemas = require('../utilities/schemas');
const queryString = require('../utilities/query-parser');
const session = require('../utilities/session')

const router = express.Router();


// ------------------ Login
// TODO: Perhaps change this endpoint if needed
router.route('/auth')
    .post(users.authUser);
router.route('/deauth')
    .post(users.deauthUser)

// ------------------ User

router.route('/')
    .get(queryString.query(), users.getAllUsers)
    .post(validators.bodyValidator(validationSchemas.newUserSchema), users.postUser)
    .delete(users.deleteAllUsers);

router.route('/:userId')
    .get(queryString.query(), users.getOneUser)
    .put(validators.bodyValidator(validationSchemas.newUserSchema), session.validSess(), users.replaceUser)
    .delete(session.validSess(), users.deleteUser)
    .patch(validators.bodyValidator(validationSchemas.patchUserSchema), session.validSess(), users.updateUser);

// ------------------ User's recipes
router.route('/:userId/recipes/:recipeId')
    .patch(validators.bodyValidator(validationSchemas.patchRecipeSchema), session.validSess(), recipes.updateRecipe)
    .put(validators.bodyValidator(validationSchemas.newRecipeSchema), session.validSess(), recipes.replaceRecipe)
    .get(queryString.query(), recipes.getUserRecipe)
    .delete(session.validSess(), recipes.deleteUserRecipe);

router.route('/:userId/recipes')
    .post(validators.bodyValidator(validationSchemas.newRecipeSchema), session.validSess(), recipes.createRecipe)
    .get(queryString.query(), recipes.getAllUserRecipes);


// ------------------ Shopping list

router.route('/:userId/shoppinglists')
    .get(queryString.query(), users.getAllUserShoppingLists)
    .post(session.validSess(), users.postUserShoppingList);

router.route('/:userId/shoppinglists/:shoppingListId')
    .get(queryString.query(), users.getOneUserShoppingList)
    .patch(validators.bodyValidator(validationSchemas.patchShoppingListSchema), session.validSess(), users.updateUserShoppingList)
    .put(validators.bodyValidator(validationSchemas.putShoppingListSchema), session.validSess(), users.updateUserShoppingList)
    .delete(session.validSess(), users.deleteOneUserShoppingList);

// ------------------ User's ingredients

router.route('/:userId/ingredients')
    .get(queryString.query(), ingredients.getAllUserIngredients)
    .post(validators.bodyValidator(validationSchemas.newIngredientSchema), session.validSess(), ingredients.postOneUserIngredient);

router.route('/:userId/ingredients/:ingredientId')
    .get(queryString.query(), ingredients.getOneUserIngredient)
    .delete(session.validSess(), ingredients.deleteOneUserIngredient)
    .patch(validators.bodyValidator(validationSchemas.patchIngredientSchema), session.validSess(), ingredients.updateIngredient)
    .put(validators.bodyValidator(validationSchemas.newIngredientSchema), session.validSess(), ingredients.replaceIngredient);

module.exports = router;
