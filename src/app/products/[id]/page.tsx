import { notFound } from "next/navigation";
import Image from "next/image";
import { getProductById } from "@queries/getProducts";
import { Header } from "@shared/Header";
import { Footer } from "@shared/Footer";
import { Navbar } from "@shared/Navbar";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const id = (await params).id;
  const product = await getProductById(id);
  if (!product) return notFound();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-lg shadow p-6">
          <div className="flex justify-center items-center">
            <Image
              src={
                product.image ||
                `https://picsum.photos/seed/${product.id}/480/320`
              }
              alt={product.name}
              width={480}
              height={320}
              className="rounded-lg object-cover w-full h-auto max-h-96"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
            <p className="text-lg text-primary font-semibold mb-2">
              ${product.price.toFixed(2)}
            </p>
            <p className="text-gray-600 mb-4">
              This is a placeholder for the product description. Highlight
              features, benefits, and details here to help customers make
              informed decisions.
            </p>
            <form className="flex flex-col gap-4 max-w-xs">
              <label className="flex items-center gap-2">
                <span className="text-sm font-medium">Quantity</span>
                <input
                  type="number"
                  name="quantity"
                  min={1}
                  defaultValue={1}
                  className="w-20 px-2 py-1 border rounded focus:outline-none focus:ring"
                />
              </label>
              <button
                type="submit"
                className="bg-primary text-white font-semibold py-2 px-4 rounded hover:bg-primary/90 transition-colors shadow"
                disabled
              >
                Add to Cart
              </button>
              <span className="text-xs text-gray-400">
                (Cart integration coming soon)
              </span>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
