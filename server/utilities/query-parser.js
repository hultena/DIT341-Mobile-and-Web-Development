module.exports = {
    query: function () {
        return function (req,res,next){
            console.log(req.query);
            if (!req.value) {
                req.value = {};
            }
            if (!req.value['sort']) {
                req.value['sort'] = {};
            }
            if (!req.value['filter']) {
                req.value['filter'] = {};
            }
            if(req.query.sort){
                const attribute = req.query.sort;
                if(req.query.order){
                    req.value.sort[attribute]=req.query.order;
                }else{
                    req.value.sort[attribute] = "";
                }
            }
            if(req.query.filter){
                const attribute = req.query.filter;
                //no else statement to ensure that no filtering occurs if a value isn't supplied with the query string.
                if(req.query.value){
                    req.value.filter[attribute] = req.query.value;
                }
            }
            next();
        }
    }
}