const Recipe = require('../models/recipe');
const User = require('../models/user');

module.exports = {

    // ------------------ User specific recipes
    createRecipe: async function (req, res, next) {
        try {
            const user = await User.findById(req.params.userId).populate('recipes');

            if (user === null) next();
            else {
                const recipe = new Recipe(req.value.body);
                recipe.user = user._id;

                await recipe.save();
                await user.recipes.push(recipe);
                await user.save();

                res.status(201).json(recipe);
            }

        } catch (err) {
            next(err);
        }
    },

    updateRecipe: async function (req, res, next) {
        try {
            const recipe = await Recipe.findByIdAndUpdate(req.params.recipeId, req.value.body).populate('user');
            res.status(200).json(recipe);

        } catch (error) {
            next(error);
        }
    },

    replaceRecipe: async function (req, res, next) {
        try {
            const recipe = await Recipe.findByIdAndUpdate(req.params.recipeId, req.value.body).populate('user');
            res.status(200).json(recipe);

        } catch (error) {
            next(error);
        }
    },

    getUserRecipe: async function (req, res, next) {
        try {
            const recipe = await Recipe.findById(req.params.recipeId)
                .populate('user')
                .select(req.value.select);

            if (recipe === null) next();
            else {
                if(recipe.user._id == req.params.userId) res.status(200).json(recipe);
                else next();
            }

        } catch (error) {
            next(error);
        }
    },

    getAllUserRecipes: async function (req, res, next) {
        try {
            const user = await User.findById(req.params.userId)
                .populate('recipes')
                .select(req.value.select)
                .sort(req.value.sort)
                .skip(req.value.page)
                .limit(req.value.limit);

            if (user === null) next();
            else res.status(200).json(user.recipes);

        } catch (error) {
            next(error);
        }
    },

    deleteUserRecipe: async function (req, res, next) {
        try {
            const user = await User.findById(req.params.userId).populate('recipe');

            await user.recipes.pull(req.params.recipeId);
            await user.save();

            const query = await Recipe.findByIdAndDelete(req.params.recipeId);
            res.status(200).json(query);

        } catch (error) {
            next(error);
        }
    },

    // ------------------ All recipes in database

    getDatabaseRecipe: async function (req, res, next) {
        try {
            const recipe = await Recipe.findById(req.params.recipeId);

            if (recipe === null) next();
            else res.status(200).json(recipe);

        } catch (error) {
            next(error);
        }
    },

    getAllDatabaseRecipes: async function (req, res, next) {
        try {
            const recipes = await Recipe.find(req.value.filter).populate('ingredients user')
                .select(req.value.select)
                .sort(req.value.sort)
                .skip(req.value.page)
                .limit(req.value.limit);
            res.status(200).json(recipes);

        } catch (error) {
            next(error);
        }
    }
};
