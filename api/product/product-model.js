class ProductModel {
  constructor() {
    try {
      this.model = global.mongoose.model("product");
    } catch (e) {
      const ProductSchema = new global.mongoose.Schema(
        {
          name: {
            type: String
          },
          isPublished: {
            type: Boolean,
            default: false
          },
          isArchive: {
            type: Boolean
          }
        },
        {
          collection: "product",
          versionKey: false
        }
      );
      this.model = global.mongoose.model("product", ProductSchema);
    }
  }
}
module.exports = ProductModel;
