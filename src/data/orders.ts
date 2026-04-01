export interface Order {
  id: string;
  customer: string;
  email: string;
  amount: number;
  status: 'pending' | 'completed' | 'cancelled' | 'processing';
  date: string;
  items: number;
}

export const orders: Order[] = [
  { id: 'ORD-001', customer: 'John Smith', email: 'john@example.com', amount: 549.99, status: 'completed', date: '2024-01-15', items: 3 },
  { id: 'ORD-002', customer: 'Sarah Johnson', email: 'sarah@example.com', amount: 299.99, status: 'pending', date: '2024-01-15', items: 1 },
  { id: 'ORD-003', customer: 'Michael Brown', email: 'michael@example.com', amount: 879.97, status: 'processing', date: '2024-01-14', items: 5 },
  { id: 'ORD-004', customer: 'Emily Davis', email: 'emily@example.com', amount: 159.99, status: 'completed', date: '2024-01-14', items: 2 },
  { id: 'ORD-005', customer: 'David Wilson', email: 'david@example.com', amount: 449.99, status: 'cancelled', date: '2024-01-13', items: 1 },
  { id: 'ORD-006', customer: 'Lisa Anderson', email: 'lisa@example.com', amount: 1299.97, status: 'completed', date: '2024-01-13', items: 7 },
  { id: 'ORD-007', customer: 'James Taylor', email: 'james@example.com', amount: 89.99, status: 'pending', date: '2024-01-12', items: 1 },
  { id: 'ORD-008', customer: 'Jennifer Martinez', email: 'jennifer@example.com', amount: 649.98, status: 'processing', date: '2024-01-12', items: 4 },
];
