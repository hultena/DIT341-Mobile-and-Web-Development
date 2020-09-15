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
            if (!req.value['select']) {
                req.value['select'] = {};
            }
            if(req.query.sort){
                const attribute = req.query.sort;
                //making sure order is asc or desc to prevent errors.
                if(req.query.order&&(req.query.order==="asc"||req.query.order==="desc")){
                    req.value.sort[attribute] = req.query.order;
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
            if(req.query.select){
                //selecting what fields to not show to prevent leaking passwords
                const attribute = req.query.select;
                const selection = {};
                if(Array.isArray(attribute)){
                    for(const value of attribute){
                        selection[value]=0;
                    }
                }
                req.value.select = selection;
            }
            next();
        }
    }
}