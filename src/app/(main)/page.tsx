import { Header } from "./shared/Header";
import { Footer } from "./shared/Footer";
import { Navbar } from "./shared/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Welcome to the E-Commerce App
        </h1>
        <nav className="flex flex-wrap justify-center gap-4 mb-8">
          <Link href="/products" className="btn-primary">
            Products
          </Link>
          <Link href="/cart" className="btn-primary">
            Cart
          </Link>
          <Link href="/checkout" className="btn-primary">
            Checkout
          </Link>
          <Link href="/login" className="btn-primary">
            Login
          </Link>
          <Link href="/sign-up" className="btn-primary">
            Sign Up
          </Link>
          <Link href="/profile" className="btn-primary">
            Profile
          </Link>
        </nav>
        <section className="text-center text-gray-600">
          <p>
            Browse our products, manage your cart, and enjoy a seamless shopping
            experience.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
