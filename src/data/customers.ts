export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  orders: number;
  totalSpent: number;
  status: 'active' | 'inactive';
  joinDate: string;
}

export const customers: Customer[] = [
  { id: '1', name: 'John Smith', email: 'john@example.com', phone: '+1 234-567-8901', orders: 12, totalSpent: 2549.88, status: 'active', joinDate: '2023-06-15' },
  { id: '2', name: 'Sarah Johnson', email: 'sarah@example.com', phone: '+1 234-567-8902', orders: 8, totalSpent: 1899.92, status: 'active', joinDate: '2023-07-22' },
  { id: '3', name: 'Michael Brown', email: 'michael@example.com', phone: '+1 234-567-8903', orders: 15, totalSpent: 3299.85, status: 'active', joinDate: '2023-05-10' },
  { id: '4', name: 'Emily Davis', email: 'emily@example.com', phone: '+1 234-567-8904', orders: 3, totalSpent: 459.97, status: 'inactive', joinDate: '2023-09-01' },
  { id: '5', name: 'David Wilson', email: 'david@example.com', phone: '+1 234-567-8905', orders: 22, totalSpent: 4899.78, status: 'active', joinDate: '2023-03-18' },
  { id: '6', name: 'Lisa Anderson', email: 'lisa@example.com', phone: '+1 234-567-8906', orders: 6, totalSpent: 1299.94, status: 'active', joinDate: '2023-08-05' },
];
