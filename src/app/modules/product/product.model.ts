import { model, Schema } from 'mongoose';
import { TProduct } from './product.interface';
const productSchema = new Schema<TProduct>({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    validate: {
      validator: (value: number) => value > 0,
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

export const Product = model<TProduct>('Product', productSchema);
