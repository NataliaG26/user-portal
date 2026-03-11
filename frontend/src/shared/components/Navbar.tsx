"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SHARED_LABELS } from "../labels";

/**
 * Global navigation bar component.
 * Highlights the active route.
 */
export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/users", label: SHARED_LABELS.navbar.usersLink },
    { href: "/posts", label: SHARED_LABELS.navbar.postsLink },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <Link href="/users" className="font-bold text-gray-800 text-lg">
          {SHARED_LABELS.navbar.title}
        </Link>
        <div className="flex gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                pathname.startsWith(link.href)
                  ? "text-blue-600"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
