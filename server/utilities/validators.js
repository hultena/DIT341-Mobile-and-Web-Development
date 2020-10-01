module.exports = {
    //did it like this in case we need other validators, e.g. validating parameters.
    bodyValidator: function(schema){
        return function(req, res, next){
            const result = schema.validate(req.body, {abortEarly: false});
            console.log(result.error)
            if(result.error){
                const key = result.error.message.slice(1,result.error.message.lastIndexOf('"'));
                const value = result.error.message.slice(result.error.message.lastIndexOf('"')+1);
                const message = {};
                message[key]=`${key}${value}.`;
                res.status(400).json(message);
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