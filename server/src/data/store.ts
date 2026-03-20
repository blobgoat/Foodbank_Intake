// In-memory data store (replace with DynamoDB or RDS for production)
import { v4 as uuidv4 } from 'uuid';
import { type Client, type InventoryItem } from '../../../datastructs/global_types';

//testing if i can push to main
type Intake = {
  id: string;
  clientId: string;
  items: { itemId: string; quantity: number }[];
  notes: string;
  date: string;
  createdAt: string;
};

const clients: Client[] = [
  {
    id: 'CLI-001',
    firstName: 'Jane',
    lastName: 'Doe',
    dateOfBirth: '1985-04-12',
    phone: '555-123-4567',
    email: 'jane.doe@example.com',
    address: '123 Main St',
    city: 'Springfield',
    zipCode: '62701',
    householdSize: 3,
    dietaryRestrictions: '',
    notes: '',
    lastVisit: '2024-01-15',
    visits: [],
  },
];

const inventory: InventoryItem[] = [
  { id: 'INV-001', name: 'Canned Beans', category: 'Canned Goods', quantity: 45, limitPerHousehold: 2 },
  { id: 'INV-002', name: 'Canned Corn', category: 'Canned Goods', quantity: 30, limitPerHousehold: 2 },
  { id: 'INV-003', name: 'Brown Rice (2 lb)', category: 'Grains', quantity: 20, limitPerHousehold: 1 },
  { id: 'INV-004', name: 'Whole Wheat Bread', category: 'Grains', quantity: 15, limitPerHousehold: 1 },
  { id: 'INV-005', name: 'Apples (bag)', category: 'Produce', quantity: 10, limitPerHousehold: 1 },
  { id: 'INV-006', name: 'Baby Carrots', category: 'Produce', quantity: 8, limitPerHousehold: 1 },
  { id: 'INV-007', name: 'Chicken Breast (frozen)', category: 'Proteins', quantity: 12, limitPerHousehold: 1 },
  { id: 'INV-008', name: 'Peanut Butter', category: 'Proteins', quantity: 25, limitPerHousehold: 1 },
  { id: 'INV-009', name: '2% Milk (gallon)', category: 'Dairy', quantity: 0, limitPerHousehold: 1 },
  { id: 'INV-010', name: 'Eggs (dozen)', category: 'Dairy', quantity: 6, limitPerHousehold: 1 },
  { id: 'INV-011', name: 'Orange Juice (half gallon)', category: 'Beverages', quantity: 14, limitPerHousehold: 1 },
  { id: 'INV-012', name: 'Dish Soap', category: 'Household', quantity: 20, limitPerHousehold: 1 },
  { id: 'INV-013', name: 'Laundry Detergent', category: 'Household', quantity: 0, limitPerHousehold: 1 },
];

const intakes: Intake[] = [];



export { clients, inventory, intakes, uuidv4, type Intake };
