class AuthModel{
    constructor(){  
        try{
            this.model = global.mongoose.model('auth');    
        }catch(e){
               const AuthSchema = new global.mongoose.Schema({
                   username:{
                       type:String
                   },
                   password:{
                       type:String
                   }
                },{
                    collection:'auth'   
               });
               this.model = global.mongoose.model('auth', AuthSchema);
        }
    }
}
module.exports = AuthModel;