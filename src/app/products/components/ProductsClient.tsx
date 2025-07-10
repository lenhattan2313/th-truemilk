"use client";
import { useState } from "react";
import { useProducts } from "../hooks/useProducts";
import { ProductList } from "./ProductList";

export function ProductsClient() {
  const { data: products } = useProducts();
  const [search, setSearch] = useState("");

  // Optionally filter products by search here
  // const filtered = products?.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <section className="mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/3 px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring"
        />
        {/* Future: Add filter/sort dropdowns here */}
      </section>
      <ProductList products={products || []} />
    </>
  );
}
