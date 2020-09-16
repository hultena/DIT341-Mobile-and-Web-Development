const express = require('express');
const recipes = require('../controllers/recipes');
const queryString = require('../utilities/query-parser');

const router = express.Router();

router.route('/')
    .get(queryString.query(), recipes.getAllRecipes)
    .delete(recipes.deleteAllRecipes);

module.exports = router;