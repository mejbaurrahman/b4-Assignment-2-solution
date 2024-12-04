export type TProductCategory = 'Mountain' | 'Road' | 'Hybrid' | 'Electric';

export type TProduct = {
  name: string;
  brand: string;
  price: number;
  category: TProductCategory;
  description: string;
  quantity: number;
  inStock: boolean;
};
