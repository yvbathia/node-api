class ProductModel {
    constructor(){
        try{
            this.model = global.mongoose.model('product');
        }catch(e){
            const ProductSchema = new global.mongoose.Schema({
                product_id:{
                    type:String
                },
                segment_id:{
                    type:String
                },
                video_url:{
                    type:String
                },
                start_time:{
                    type:String
                },
                end_time:{
                    type:String
                },
                images:{
                    type:Array 
                },
                sequence_number:{
                    type:Number
                },
                isPublished:{
                    type:Boolean,
                    default:false
                },
                isArchive:{
                    type:Boolean
                }
            },{
                collection:'product',
                versionKey: false
            });
            this.model = global.mongoose.model('product',ProductSchema);
        }
    }
}
module.exports =  ProductModel;