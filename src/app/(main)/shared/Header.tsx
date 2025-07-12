import Link from "next/link";

export function Header() {
  return (
    <header className="w-full py-4 bg-white shadow mb-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold text-primary hover:text-primary/80 transition-colors"
        >
          E-Commerce
        </Link>
      </div>
    </header>
  );
}
