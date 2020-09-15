const Joi = require('joi');
const regexPattern = /^[0-9a-fA-F]{24}$/;

module.exports = {
    newUserSchema: Joi.object().keys({
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }),

    patchUserSchema: Joi.object().keys({
        username: Joi.string(),
        email: Joi.string().email(),
        password: Joi.string()
    }),

    newRecipeSchema: Joi.object().keys({
        name: Joi.string().required(),
        category: Joi.string().valid('Baking', 'Cooking').required(),
        cuisine: Joi.string(),
        dietaryRestriction: Joi.array().items(
            Joi.string().valid(
            'Vegan',
            'Ovo-Vegetarian',
            'Lacto-Vegetarian',
            'Lacto-Ovo Vegetarian',
            'Halaal',
            'Kosher',
            'Pescetarian')
        ),
        allergies: Joi.array().items(
            Joi.string().valid(
            'Gluten',
            'Peanut',
            'Nuts',
            'Lactose',
            'Egg',
            'Wheat',
            'Soy',
            'Fish',
            'Shellfish')
        ),
        user: Joi.string().regex(regexPattern),
        ingredients: Joi.array().items(
            Joi.string().regex(regexPattern)
        ).required(),
        instructions: Joi.array().items(
            Joi.string()
        )
    }),

    patchRecipeSchema: Joi.object().keys({
        name: Joi.string(),
        category: Joi.string().valid('Baking', 'Cooking'),
        cuisine: Joi.string(),
        dietaryRestriction: Joi.array().items(
            Joi.string().valid(
                'Vegan',
                'Ovo-Vegetarian',
                'Lacto-Vegetarian',
                'Lacto-Ovo Vegetarian',
                'Halaal',
                'Kosher',
                'Pescetarian')
        ),
        allergies: Joi.array().items(
            Joi.string().valid(
                'Gluten',
                'Peanut',
                'Nuts',
                'Lactose',
                'Egg',
                'Wheat',
                'Soy',
                'Fish',
                'Shellfish')
        ),
        user: Joi.string().regex(regexPattern),
        ingredients: Joi.array().items(
            Joi.string().regex(regexPattern)
        ),
        instructions: Joi.array().items(
            Joi.string()
        )
    }),

    newIngredientSchema: Joi.object().keys({
        user: Joi.string().regex(regexPattern).required(),
        name: Joi.string().required(),
        foodType: Joi.string(),
        description: Joi.string().max(140)
    }),

    patchIngredientSchema: Joi.object().keys({
        user: Joi.string().regex(regexPattern),
        name: Joi.string(),
        foodType: Joi.string(),
        description: Joi.string().max(140)
    })
}