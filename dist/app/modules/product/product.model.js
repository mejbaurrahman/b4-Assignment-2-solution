"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        validate: {
            validator: (value) => value > 0,
            message: 'Price must be a positive number',
        },
    },
    category: {
        type: String,
        enum: ['Mountain', 'Road', 'Hybrid', 'Electric'],
        required: true,
    },
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, required: true },
});
exports.Product = (0, mongoose_1.model)('Product', productSchema);
