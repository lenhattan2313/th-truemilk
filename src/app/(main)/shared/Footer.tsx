export function Footer() {
  return (
    <footer className="w-full py-4 bg-white shadow mt-4">
      <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} E-Commerce. All rights reserved.
      </div>
    </footer>
  );
}
