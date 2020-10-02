module.exports = {
    validSess: function(){
        return function(req, res, next){
            if (req.session.loggedin&&(req.params.userId===req.session._id)) {
                next();
            } else {
                // TODO: change response to whatever is suitable when we know this.
                res.status(401).json({message:"Not allowed"})
            }
        }
    }
}