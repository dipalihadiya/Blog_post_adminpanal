const model = require('../models/singUp/signUpmodel')
const defaultController = async(req , res) => {
    res.render('src/html/index',{data:req.user, msg : req.flash('success')});
}
const profileController = async(req,res) =>{

    res.render('src/html/profile',{data:req.user})
    
}
module.exports={defaultController,profileController}