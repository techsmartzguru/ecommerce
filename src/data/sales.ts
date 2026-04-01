export interface Sale {
  id: string;
  orderId: string;
  customer: string;
  amount: number;
  date: string;
  paymentMethod: string;
}

export const sales: Sale[] = [
  { id: '1', orderId: 'ORD-001', customer: 'John Smith', amount: 549.99, date: '2024-01-15', paymentMethod: 'Credit Card' },
  { id: '2', orderId: 'ORD-003', customer: 'Michael Brown', amount: 879.97, date: '2024-01-14', paymentMethod: 'PayPal' },
  { id: '3', orderId: 'ORD-004', customer: 'Emily Davis', amount: 159.99, date: '2024-01-14', paymentMethod: 'Credit Card' },
  { id: '4', orderId: 'ORD-006', customer: 'Lisa Anderson', amount: 1299.97, date: '2024-01-13', paymentMethod: 'Debit Card' },
  { id: '5', orderId: 'ORD-008', customer: 'Jennifer Martinez', amount: 649.98, date: '2024-01-12', paymentMethod: 'Credit Card' },
  { id: '6', orderId: 'ORD-009', customer: 'Robert Taylor', amount: 299.99, date: '2024-01-11', paymentMethod: 'PayPal' },
  { id: '7', orderId: 'ORD-010', customer: 'Amanda White', amount: 449.99, date: '2024-01-10', paymentMethod: 'Credit Card' },
  { id: '8', orderId: 'ORD-011', customer: 'Christopher Lee', amount: 189.99, date: '2024-01-09', paymentMethod: 'Debit Card' },
];

export const monthlyOrdersData = [
  { month: 'Jan', orders: 145 },
  { month: 'Feb', orders: 178 },
  { month: 'Mar', orders: 203 },
  { month: 'Apr', orders: 189 },
  { month: 'May', orders: 234 },
  { month: 'Jun', orders: 256 },
  { month: 'Jul', orders: 278 },
  { month: 'Aug', orders: 312 },
  { month: 'Sep', orders: 298 },
  { month: 'Oct', orders: 334 },
  { month: 'Nov', orders: 389 },
  { month: 'Dec', orders: 421 },
];

export const revenueData = [
  { month: 'Jan', revenue: 24500 },
  { month: 'Feb', revenue: 29800 },
  { month: 'Mar', revenue: 35200 },
  { month: 'Apr', revenue: 32100 },
  { month: 'May', revenue: 41500 },
  { month: 'Jun', revenue: 45800 },
  { month: 'Jul', revenue: 52300 },
  { month: 'Aug', revenue: 58900 },
  { month: 'Sep', revenue: 54200 },
  { month: 'Oct', revenue: 62800 },
  { month: 'Nov', revenue: 71500 },
  { month: 'Dec', revenue: 82400 },
];

export const dashboardStats = {
  totalOrders: 3237,
  totalProducts: 584,
  totalCustomers: 1892,
  totalRevenue: 591000,
};
