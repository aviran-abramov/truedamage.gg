"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { adminCreateLinks } from "@/lib/data/navigation/admin";
import Link from "next/link";

export function AdminNavigationMenu() {
  return (
    <NavigationMenu className="flex items-center gap-2 ml-4">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Create</NavigationMenuTrigger>

          <NavigationMenuContent>
            <ul className="grid w-50 gap-4">
              {adminCreateLinks.map((link) => (
                <li key={link.id}>
                  <NavigationMenuLink asChild>
                    <Link href={link.href}>{link.label}</Link>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
