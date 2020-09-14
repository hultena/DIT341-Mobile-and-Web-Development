const Recipe = require('../models/recipe');
const User = require('../models/user');

module.exports = {

    postRecipe: async function (req, res, next) {
        try {
            const user = await User.findById(req.params.userId).populate('recipes');

            if (user === null) next();
            else {
                const recipe = new Recipe(req.body);
                recipe.user = user._id;

                await recipe.save();
                await user.recipes.push(recipe);
                await user.save();

                res.status(201).json(recipe);
            }
        } catch (error) {
            next(error);
        }
    },

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
    },

    // TODO: getUserRecipe, should this be here or in the user controller?

    // TODO: get all recipes by most likes, returning 5 at a time (?)

    // TODO: get all recipes filtered by newest, returning 5 at a time (?)

    /*
    * In case we come up with changes in the fields
    * of all existing recipes, we can use below.
    * Don't know if it's needed though?
    */
    updateAllRecipes: async function (req, res, next) {
        try {
            const recipes = await Recipe.updateMany({});

            res.status(200).json(recipes);

        } catch (error) {
            next(error);
        }
    },

    updateRecipe: async function (req, res, next) {
        try {
            const recipe = await Recipe.findByIdAndUpdate(req.params.recipeId, req.body);

            res.status(200).json(recipe);

        } catch (error) {
            next(error);
        }
    },

    deleteAllRecipes: async function (req, res, next) {
        try {
            const recipes = await Recipe.deleteMany({});
            res.status(200).json(recipes);

        } catch (error) {
            next(error);
        }
    },

    deleteRecipe: async function (req, res, next) {
        try {
            const recipe = await Recipe.findByIdAndDelete(req.params.recipeId);

            if (recipe === null) next();
            else res.status(200).json(recipe);

        } catch (error) {
            next(error);
        }
    }

};