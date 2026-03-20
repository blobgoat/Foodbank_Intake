interface Client {
    id: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    zipCode: string;
    householdSize: number;
    dietaryRestrictions: string;
    notes: string;
    lastVisit: string;
    visits: string[];
}

interface InventoryItem {
    id: string;
    name: string;
    category: string;
    quantity: number;
    limitPerHousehold: number;
}

export type { Client, InventoryItem };