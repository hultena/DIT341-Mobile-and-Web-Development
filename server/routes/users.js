const express = require('express');
const users = require('../controllers/users');
const recipes = require('../controllers/recipes');
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

// ------------------ User's recipes
router.route('/:userId/recipes/:recipeId')
    .patch(validators.bodyValidator(validationSchemas.patchRecipeSchema), recipes.updateRecipe)
    .put(validators.bodyValidator(validationSchemas.newRecipeSchema), recipes.replaceRecipe)
    .get(queryString.query(), recipes.getUserRecipe)
    .delete(recipes.deleteUserRecipe);

router.route('/:userId/recipes')
    .post(validators.bodyValidator(validationSchemas.newRecipeSchema), recipes.createRecipe)
    .get(queryString.query(), recipes.getAllUserRecipes);


// ------------------ Shopping list

router.route('/:userId/shoppinglists')
    .get(queryString.query(), users.getAllUserShoppingLists)
    .post(users.postUserShoppingList);

router.route('/:userId/shoppinglists/:shoppingListId')
    .get(queryString.query(), users.getOneUserShoppingList)
    .patch(validators.bodyValidator(validationSchemas.patchShoppingListSchema), users.updateUserShoppingList)
    .put(validators.bodyValidator(validationSchemas.putShoppingListSchema), users.updateUserShoppingList)
    .delete(users.deleteOneUserShoppingList);

// ------------------ User's ingredients

router.route('/:userId/ingredients')
    .get(queryString.query(), ingredients.getAllUserIngredients)
    .post(validators.bodyValidator(validationSchemas.newIngredientSchema), ingredients.postOneUserIngredient);

router.route('/:userId/ingredients/:ingredientId')
    .get(queryString.query(), ingredients.getOneUserIngredient)
    .delete(ingredients.deleteOneUserIngredient)
    .patch(validators.bodyValidator(validationSchemas.patchIngredientSchema), ingredients.updateIngredient)
    .put(validators.bodyValidator(validationSchemas.newIngredientSchema), ingredients.replaceIngredient);

module.exports = router;
