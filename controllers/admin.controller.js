const Admin = require('../models/admin.model')
const util = require('../utils/util')

const registerAdmin = (req, res, next) => {
    const {userName, password} = req.body
    let admin = new Admin({userName, password})
    admin.save((err)=>{
        if(err){
            next(err)
        } else {
            res.send({message: 'Admin creation successful'})
        }
    })
}

const loginAdmin = (req, res, next) => {
    const {userName, password} = req.body
    Admin.findOne({userName: userName, password: password},(err,doc)=>{
        if(err)
            next(err)
        console.log('$$ doc: ',doc)
        if(util.isNullUndefinedOrEmpty(doc)){
            next(util.createError('Not Authorized to access requested resource',401))
        } else {
            res.send({userName, auth: true})
        }
    })
}

module.exports = {
    registerAdmin,
    loginAdmin
}