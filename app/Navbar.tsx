"use client";

import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
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

const AuthStatus = () => {
  const { data: session, status } = useSession();
  if (status === "loading") return null;
  if (status === "unauthenticated") {
    return (
      <Link className="nav-link" href="/api/auth/signin">
        Log in
      </Link>
    );
  }
  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            src={session!.user!.image!}
            fallback="?"
            radius="full"
            size="2"
            className="cursor-pointer"
            referrerPolicy="no-referrer"
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text>{session!.user?.email}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <Link href="/api/auth/signout">Log out</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};

const NavLinks = () => {
  const pathname = usePathname();
  return (
    <ul className="flex space-x-6">
      {Links.map((link) => {
        return (
          <li
            key={link.label}
            className={classnames({
              "nav-link": true,
              "!text-zinc-900": pathname === link.href,
            })}
          >
            <Link href={link.href}>{link.label}</Link>
          </li>
        );
      })}
    </ul>
  );
};

const Navbar = () => {
  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/">
              <AiFillBug />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};

export default Navbar;
