import { z } from 'zod';

export const BikeCategorySchema = z.enum([
  'Mountain',
  'Road',
  'Hybrid',
  'Electric',
]);

export const productSchemaValidation = z.object({
  name: z.string(),
  brand: z.string(),
  price: z.number(),
  category: BikeCategorySchema,
  description: z.string(),
  quantity: z.number(),
  inStock: z.boolean(),
});
