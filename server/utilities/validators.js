module.exports = {
    //did it like this in case we need other validators, e.g. validating parameters.
    bodyValidator: function(schema){
        return function(req, res, next){
            const result = schema.validate(req.body);
            if(result.error){
                res.status(400).json(result.error.message);
            }else {
                if (!req.value) {
                    req.value = {};
                }
                if (!req.value['body']) {
                    req.value['body'] = {};
                }
                req.value['body'] = result.value;
                next();
            }
        }
    }
}