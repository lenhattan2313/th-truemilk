import Link from "next/link";

export function Navbar() {
  return (
    <nav className="w-full bg-gray-100 py-2 mb-4">
      <div className="container mx-auto px-4 flex gap-4 justify-center">
        <Link href="/products" className="hover:underline">
          Products
        </Link>
        <Link href="/cart" className="hover:underline">
          Cart
        </Link>
        <Link href="/checkout" className="hover:underline">
          Checkout
        </Link>
        <Link href="/login" className="hover:underline">
          Login
        </Link>
        <Link href="/sign-up" className="hover:underline">
          Sign Up
        </Link>
        <Link href="/profile" className="hover:underline">
          Profile
        </Link>
      </div>
    </nav>
  );
}
