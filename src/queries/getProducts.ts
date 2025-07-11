export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

export const GET_PRODUCTS = "/api/products";

const MOCK_PRODUCTS = [
  { id: "1", name: "Milk", price: 2.5, image: "" },
  { id: "2", name: "Yogurt", price: 3.0, image: "" },
  { id: "3", name: "Cheese", price: 4.5, image: "" },
  { id: "4", name: "Butter", price: 5.0, image: "" },
  { id: "5", name: "Ice Cream", price: 6.5, image: "" },
  { id: "6", name: "Chocolate Milk", price: 3.2, image: "" },
  { id: "7", name: "Cream", price: 4.0, image: "" },
  { id: "8", name: "Condensed Milk", price: 2.8, image: "" },
  { id: "9", name: "Sour Cream", price: 3.7, image: "" },
  { id: "10", name: "Whipped Cream", price: 4.3, image: "" },
];

export async function getProducts(): Promise<Product[]> {
  return MOCK_PRODUCTS;
}

export async function getProductById(id: string): Promise<Product | undefined> {
  return MOCK_PRODUCTS.find((p) => p.id === id);
}
