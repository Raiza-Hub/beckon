import Image from "next/image";
import Link from "next/link";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-6">
        <Link href="/">
          <Image
            src="/beckon-logo.png"
            width={100}
            height={20}
            alt="Beckon"
            priority
          />
        </Link>

        <ul className="flex items-center gap-6">
          <li>
            <Link
              href="/about"
              className="text-sm font-medium text-gray-600 px-4 py-2 hover:bg-primary/5 rounded-md transition-colors"
            >
              How It Works
            </Link>
          </li>
          <li>
            <Link
              href="/faq"
              className="text-sm font-medium text-gray-600 px-4 py-2 hover:bg-primary/5 rounded-md transition-colors"
            >
              FAQ
            </Link>
          </li>
          <li>
            <Link
              href="/drive-for-beckon"
              className="text-sm font-medium text-gray-600 px-4 py-2 hover:bg-primary/5 rounded-md transition-colors"
            >
              Become a Driver
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="h-8 px-4 py-1.5 text-sm font-medium text-gray-600 rounded-md hover:bg-primary/5 transition-colors"
          >
            Log in
          </Link>
          <Link
            href="/register"
            className="bg-primary text-white text-sm font-medium h-8 px-4 py-1.5 rounded-md"
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
}
