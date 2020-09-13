const Recipe = require('../models/user');

module.exports = {
    getAllRecipes: async function (req, res, next) {
        try {
            const recipes = await Recipe.find();
            res.status(200).json(recipes);

        } catch (error) {
            next(error);
        }
    },

    getOneRecipe: async function (req, res, next) {
        try {
            const recipe = await Recipe.findById(req.params.recipeId);

            if (recipe === null) next();
            else res.status(200).json(recipe);

        } catch (error) {
            next(error);
        }
    }
};