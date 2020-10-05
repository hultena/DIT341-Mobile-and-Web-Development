module.exports = {
    query: function () {
        return function (req,res,next){
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
            if(!req.value['page']){
                req.value['page'] = {};
            }
            if(!req.value['limit']){
                req.value['limit'] = {};
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

            if(req.query.filters){
                const filters = {}
                // If multiple filters are passed in.
                if (Array.isArray(req.query.filters)) {
                    for (const filter of req.query.filters) {
                        let [key, value] = filter.split('=')
                        // If it's name then we enable partial matches
                        if(key==='name'){
                            filters[key] = {$regex: value, $options: "i"}
                        } else {
                            // if it's not name then all must match as they are important
                            value = value.split(',')
                            filters[key] = {$all: value}
                        }
                    }
                    // same as above but for the case where it's only 1 filter
                } else {
                    let [key, value] = req.query.filters.split('=')
                    if(key==='name'){
                        filters[key] = {$regex: value, $options: "i"}
                    }else {
                        value = value.split(',')
                        filters[key] = {$all: value}
                    }
                }
                req.value.filter = filters
            }

            if(req.query.select){
                //selecting what fields to not show to prevent leaking passwords
                const attribute = req.query.select;
                let selection = {};
                if(Array.isArray(attribute)){
                    for(const value of attribute){
                        selection[value]=0;
                    }
                }else{
                    selection[attribute]=0;
                }
                req.value.select = selection;
            }

            if(req.query.page && req.query.limit){
                const page = parseInt(req.query.page)
                const limit = parseInt(req.query.limit)
                // page-1 because index starts at 0 but page starts at 1
                req.value.page = (page-1)*limit
                req.value.limit = limit
            }else{
                req.value.page=0;
                req.value.limit=0;
            }
            next();
        }
    }
}