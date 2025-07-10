export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

export const GET_PRODUCTS = "/api/products";

export async function getProducts(): Promise<Product[]> {
  const isServer = typeof window === "undefined";
  const baseUrl = isServer
    ? process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
    : "";
  try {
    const res = await fetch(`${baseUrl}/api/products`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch products");
    const data = await res.json();
    return data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function getProductById(id: string): Promise<Product | undefined> {
  const isServer = typeof window === "undefined";
  const baseUrl = isServer
    ? process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
    : "";
  const res = await fetch(`${baseUrl}/api/products/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) return undefined;
  return await res.json();
}
