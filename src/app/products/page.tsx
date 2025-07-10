import { dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/getQueryClient";
import { getProducts } from "@queries/getProducts";
import { ProductsClient } from "./components/ProductsClient";
import { Header } from "../shared/Header";
import { Footer } from "../shared/Footer";
import { Navbar } from "../shared/Navbar";
import { HydrationBoundaryProvider } from "@/provider/ReactQueryProvider";

export default async function ProductsPage() {
  const queryClient = getQueryClient();

  // Prefetch products data
  await queryClient.prefetchQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const dehydratedState = dehydrate(queryClient);
  console.log("Dehydrated state:", dehydratedState);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6 text-center">All Products</h1>
        <HydrationBoundaryProvider dehydratedState={dehydratedState}>
          <ProductsClient />
        </HydrationBoundaryProvider>
      </main>
      <Footer />
    </div>
  );
}
