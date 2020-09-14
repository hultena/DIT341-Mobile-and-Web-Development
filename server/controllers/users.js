const User = require('../models/user');
const ShoppingList = require('../models/shoppinglist');

module.exports = {

    getAllUsers: async function (req, res, next){
        try {
            console.log(req.query);
            const users = await User.find(req.query).select('-password');
            res.status(200).json(users);
        }catch (err) {
            next(err);
        }
    },

    postUser: async function(req, res, next){
        try{
            const user = new User(req.value.body);
            await user.save();
            res.status(201).json(user);
        }catch(err){
            next(err);
        }
    },

    deleteAllUsers: async function(req, res, next){
        try{
            const users = await User.deleteMany({});
            res.status(200).json(users);
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

    replaceUser: async function(req, res, next){
        try{
            console.log(req.params.userId);
            console.log(req.value.body);
            const user = await User.findByIdAndUpdate(req.params.userId, req.value.body);
            res.status(200).json(user);
        }catch(err){
            next(err);
        }
    },

    deleteUser: async function(req, res, next){
        try{
            const user = await User.findByIdAndDelete(req.params.userId);
            if(user === null){
                next();
            }else{
                res.status(200).json(user);
            }
        }catch(err){
            next(err);
        }
    },

    updateUser: async function(req, res, next){
        try{
            const user = await User.findByIdAndUpdate(req.params.userId, req.value.body);
            res.status(200).json(user);
        }catch(err){
            next(err);
        }
    },

    getAllUserShoppingLists: async function(req, res, next){
        try {
            const user = await User.findById(req.params.userId)
                .populate('shoppingLists');
            if(user === null){
                next();
            }else {
                res.status(200).json(user.shoppingLists);
            }
        }catch (err) {
            next(err);
        }
    },

    postUserShoppingList: async function(req, res, next){
        try {
            const user = await User.findById(req.params.userId).populate('shoppingLists');
            if(user === null){
                next();
            }else {
                const shoppingList = new ShoppingList(req.body);
                shoppingList.user = user._id;
                await shoppingList.save();
                await user.shoppingLists.push(shoppingList);
                await user.save();
                res.status(201).json(shoppingList);
            }
        } catch (err) {
            next(err);
        }
    },

    getOneUserShoppingList: async function(req, res, next){
        try {
            const shoppingList = await ShoppingList
                .findById(req.params.shoppingListId).populate('user');
            if(shoppingList === null){
                next();
            }else{
                if(shoppingList.user._id == req.params.userId) {
                    res.status(200).json(shoppingList);
                }else{
                    next();
                }
            }
        }catch (err) {
            next(err);
        }
    },

    deleteOneUserShoppingList: async function(req, res, next){
        try{
            const user = await User.findById(req.params.userId).populate('shoppingLists');
            await user.shoppingLists.pull(req.params.shoppingListId);
            await user.save();
            const query = await ShoppingList.findByIdAndDelete(req.params.shoppingListId);
            res.status(200).json(query);
        } catch (err) {
            next(err);
        }
    }
};
