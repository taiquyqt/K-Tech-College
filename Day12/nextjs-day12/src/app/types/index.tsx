export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
    category: {
        id: number;
        name: string;
    };
 }