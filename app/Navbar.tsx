"use client";

import { Box } from "@radix-ui/themes";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";

interface LinkType {
  href: string;
  label: string;
}

const Links: LinkType[] = [
  {
    href: "/",
    label: "Dashboard",
  },
  {
    href: "/issues",
    label: "Issues",
  },
];

const Navbar = () => {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href="/">
        <AiFillBug />
      </Link>
      <ul className="flex space-x-6">
        {Links.map((link) => (
          <li
            key={link.label}
            className={classnames({
              "text-zinc-900": pathname === link.href,
              "text-zinc-500": pathname !== link.href,
              "hover:text-zinc-800 transition-colors": true,
            })}
          >
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
      <Box>
        {status === "authenticated" && (
          <Link href="/api/auth/signout">Log out</Link>
        )}
        {status === "unauthenticated" && (
          <Link href="/api/auth/signin">Log in</Link>
        )}
      </Box>
    </nav>
  );
};

export default Navbar;
