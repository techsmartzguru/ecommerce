export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'active' | 'inactive' | 'low-stock';
  image: string;
}

export const products: Product[] = [
  { id: '1', name: 'Wireless Headphones Pro', category: 'Electronics', price: 299.99, stock: 45, status: 'active', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop' },
  { id: '2', name: 'Smart Watch Series X', category: 'Electronics', price: 449.99, stock: 28, status: 'active', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop' },
  { id: '3', name: 'Leather Messenger Bag', category: 'Accessories', price: 189.99, stock: 5, status: 'low-stock', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=100&h=100&fit=crop' },
  { id: '4', name: 'Running Shoes Elite', category: 'Footwear', price: 159.99, stock: 0, status: 'inactive', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop' },
  { id: '5', name: 'Mechanical Keyboard RGB', category: 'Electronics', price: 179.99, stock: 62, status: 'active', image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=100&h=100&fit=crop' },
  { id: '6', name: 'Minimalist Wallet', category: 'Accessories', price: 49.99, stock: 120, status: 'active', image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=100&h=100&fit=crop' },
  { id: '7', name: 'Bluetooth Speaker', category: 'Electronics', price: 129.99, stock: 3, status: 'low-stock', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=100&h=100&fit=crop' },
  { id: '8', name: 'Sunglasses Classic', category: 'Accessories', price: 89.99, stock: 78, status: 'active', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=100&h=100&fit=crop' },
];
