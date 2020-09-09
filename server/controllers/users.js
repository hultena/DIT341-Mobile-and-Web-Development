const User = require('../models/user');
const Recipe = require('../models/recipe');

module.exports = {

    getAllUsers: async function (req, res, next){
        try {
            const users = await User.find();
            res.status(200).json(users);
        }catch (err) {
            next(err);
        }
    },

    postUser: async function(req, res, next){
        try{
            const user = new User(req.body);
            await user.save();
            res.status(201).json(user);
        }catch(err){
            next(err);
        }
    },

    getOneUser: async function(req, res, next){
        try {
            const user = await User.findById(req.params.userId);
            if(user === null){
                next();
            }else {
                res.status(200).json(user);
            }
        }catch (err) {
            next(err);
        }
    },

    getAllUserRecipes: async function(req, res, next){
        try {
            const user = await User.findById(req.params.userId)
                .populate('recipes');
            if(user === null){
                next();
            }else {
                res.status(200).json(user.recipes);
            }
        }catch (err) {
            next(err);
        }
    },

    getOneUserRecipe: async function(req, res, next){
        try {
            const recipe = await Recipe.findById(req.params.recipeId);
            if(recipe === null){
                next();
            }else{
                if(recipe.user._id == req.params.userId) {
                    res.status(200).json(recipe);
                }else{
                    next();
                }
            }
        }catch (err) {
            next(err);
        }
    }
};
