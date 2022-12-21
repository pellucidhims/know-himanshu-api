const Resource = require('../models/resource.model');
const util = require('../utils/util');

const getResourcesByType = (req, res, next) => {
    const { type = '' } = req.query;
    if(!type){
        res.status(400).send('Bad request: Missing resource type');
    }
    if(util.nodeCache.has(type)){
        console.log('$$ serving from cache', util.nodeCache.get(type));
        res.send(util.nodeCache.get(type));
    } else {
        Resource.findOne({docType: type},(err,doc)=>{
            if(err)
                next(err)
            if(util.isNullUndefinedOrEmpty(doc)){
                next(util.createError('Not Authorized to access requested resource',401))
            } else {
                util.nodeCache.set(type, JSON.stringify(doc));
                res.send(doc)
            }
        })
    }
}

module.exports = {
    getResourcesByType
}