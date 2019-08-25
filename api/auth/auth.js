const authModelConstrutor = require('./auth-model');
const authModel = new authModelConstrutor().model;
const jwt = require('jsonwebtoken');
class Auth{
    async login(req,res){
        try{
            console.log(req.body.password)
            const user = await authModel.findOne({username: req.body.username, password: req.body.password}) 
            if(!user){
                res.send({'NotFound':'UserNot Found'});
            }
            res.send({"token": jwt.sign({ username: user.username , _id : user._id }, 'pragnesh',{})});
        }catch(e){
            throw e;
        }
        
    }
    async signup(req,res){
        const user = new authModel(req.body);
        await user.save();
        res.send({'Successful':'User Added Successfully'});
    }
}
module.exports = new Auth();