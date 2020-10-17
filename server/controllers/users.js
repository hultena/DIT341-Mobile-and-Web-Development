const User = require('../models/user');
const ShoppingList = require('../models/shoppinglist');

module.exports = {

    // ------------------ Auth User
    authUser: async function(req, res, next){
        try {
            const user = await User.findOne(req.body).populate({
                path: 'favourites',
                populate: {
                    path: 'ingredients user'
                }
            });
            if(user === null){
                // TODO: Probably fix this res but who knows.
                res.status(401).json({username:"Invalid credentials",password:"Invalid credentials"});
            }else {
                req.session.loggedin = true;
                req.session._id = user._id;
                res.status(200).json(user);
            }
        }catch (err) {
            next(err);
        }
    },
    deauthUser: async function(req, res, next){
        try {
            if (req.session.loggedin) {
                req.session.destroy(function () {
                    res.clearCookie('connect.sid');
                    res.status(204).json(null);
                });
            }else{
                res.status(204);
            }
        }catch (err) {
            next(err);
        }
    },

    // ------------------ User

    getAllUsers: async function (req, res, next){
        try {
            const users = await User.find(req.value.filter)
                .select(req.value.select)
                .sort(req.value.sort)
                .skip(req.value.page)
                .limit(req.value.limit);
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
            const user = await User.findById(req.params.userId)
                .select(req.value.select);
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

    // ------------------ User's shopping list

    getAllUserShoppingLists: async function(req, res, next){
        try {
            const shoppingLists = await ShoppingList.find({user: req.params.userId})
                .populate('ingredients')
                .select(req.value.select)
                .sort(req.value.sort)
                .skip(req.value.page)
                .limit(req.value.limit);

            if(shoppingLists === null){
                next();
            }else {
                res.status(200).json(shoppingLists);
            }
        }catch (err) {
            next(err);
        }
    },

    postUserShoppingList: async function(req, res, next){
        try {
            const user = await User.findById(req.params.userId);
            if(user === null){
                next();
            }else {
                const shoppingList = new ShoppingList(req.value.body);
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
            const shoppingList = await ShoppingList.findById(req.params.shoppingListId)
                .populate('ingredients')
                .select(req.value.select);
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
    },

    updateUserShoppingList: async function (req, res, next){
        try{
            const shoppingList = await ShoppingList
                .findByIdAndUpdate(req.params.shoppingListId, req.value.body)
                .populate('ingredients');
            res.status(200).json(shoppingList);
        }catch (err){
            next(err);
        }
    }
};
