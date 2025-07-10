import Image from "next/image";
import type { Product } from "../../../queries/getProducts";
import Link from "next/link";

export function ProductList({ products }: { products: Product[] }) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products?.map(renderProductCard)}
    </section>
  );
}

function renderProductCard(product: Product) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="block"
      tabIndex={0}
      aria-label={`View details for ${product.name}`}
      key={product.id}
    >
      <article
        key={product.id}
        className="p-4 border rounded shadow-sm bg-white flex flex-col items-center hover:shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <Image
          src={`https://picsum.photos/seed/${product.id}/240/128`}
          alt={product.name}
          width={240}
          height={128}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="w-full h-32 object-cover mb-2 rounded"
          style={{ aspectRatio: "15/8" }}
          loading="lazy"
          priority={false}
        />
        <h2 className="text-lg font-semibold mb-1 text-center">
          {product.name}
        </h2>
        <p className="text-primary font-bold">${product.price}</p>
      </article>
    </Link>
  );
}
