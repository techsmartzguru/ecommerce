export interface Category {
  id: string;
  name: string;
  description: string;
  productCount: number;
  status: 'active' | 'inactive';
}

export const categories: Category[] = [
  { id: '1', name: 'Electronics', description: 'Gadgets, devices, and tech accessories', productCount: 124, status: 'active' },
  { id: '2', name: 'Accessories', description: 'Fashion and lifestyle accessories', productCount: 89, status: 'active' },
  { id: '3', name: 'Footwear', description: 'Shoes, sneakers, and boots', productCount: 56, status: 'active' },
  { id: '4', name: 'Clothing', description: 'Apparel and fashion wear', productCount: 203, status: 'active' },
  { id: '5', name: 'Home & Living', description: 'Home decor and furniture', productCount: 67, status: 'inactive' },
  { id: '6', name: 'Sports', description: 'Sports equipment and gear', productCount: 45, status: 'active' },
];
