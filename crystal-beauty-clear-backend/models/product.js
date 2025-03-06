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
    