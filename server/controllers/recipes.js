const Recipe = require('../models/recipe');

module.exports = {

    getAllRecipes: async function (req, res, next) {
        try {
            const recipes = await Recipe.find(req.value.filter)
                .select(req.value.select)
                .sort(req.value.sort)
                .skip(req.value.page)
                .limit(req.value.limit);
            res.status(200).json(recipes);

        } catch (error) {
            next(error);
        }
    },

    // TODO: get all recipes by most likes, returning 5 at a time (?)

    // TODO: get all recipes filtered by newest, returning 5 at a time (?)

    deleteAllRecipes: async function (req, res, next) {
        try {
            const recipes = await Recipe.deleteMany({});
            res.status(200).json(recipes);

        } catch (error) {
            next(error);
        }
    }

};