import Link from "next/link";
import React from "react";
import { AiFillBug } from "react-icons/ai";

interface LinkType {
  href: string;
  label: string;
}

const Links: LinkType[] = [
  {
    href: "/dashboard",
    label: "Dashboard",
  },
  {
    href: "/issues",
    label: "Issues",
  },
];

const Navbar = () => {
  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href="/">
        <AiFillBug />
      </Link>
      <ul className="flex space-x-6">
        {Links.map((link) => (
          <li
            key={link.label}
            className="text-zinc-500 hover:text-zinc-800 transition-colors"
          >
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
