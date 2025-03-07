import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    altNames: { 
        type: [String],
        default: []
    },
    price: {
        type: Number,
        required: true
    },
    labeledPrice: {
        type: Number,
        required: true
    },
    images:{
        type: [String],
        required: true,
        default: ["https://www.cubesnjuliennes.com/wp-content/uploads/2024/02/Shrimp-Fried-Rice-2-1024x1534.jpg"]
    },
    stock:{
        type: Number,
        required: true
    },
})
const Product = mongoose.model("product",productSchema)
export default Product;


