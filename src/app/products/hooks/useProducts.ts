import { useQuery } from "@tanstack/react-query";
import { getProducts, type Product } from "@/queries/getProducts";

export function useProducts() {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getProducts,
  });
}
