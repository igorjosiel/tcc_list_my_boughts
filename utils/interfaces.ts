export interface Category {
    id: number;
    name: string;
    icon: string;
    library: string;
}

export interface Priority {
    id: number,
    name: string,
    value: boolean,
    icon: string,
    library: string;
}

export interface Product {
    id: number;
    amount: number;
    productName: string;
    category: string;
    price: number;
    priority: boolean;
}