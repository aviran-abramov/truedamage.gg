"use client";

import Link from "next/link"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { useIsMobile } from "@/hooks/use-mobile"

export const Navbar = () => {
    const isMobile = useIsMobile();

    return (
        <NavigationMenu viewport={isMobile}>
            <NavigationMenuList>
                {/* HOME */}
                <NavigationMenuItem>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
                        <Link href="/">Home</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                {/* MATCHES */}
                <NavigationMenuItem className="hidden md:block">
                    <NavigationMenuTrigger>Matches</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-50 gap-4">
                            <li>
                                <NavigationMenuLink asChild>
                                    <Link href="/matches/upcoming">Upcoming Matches</Link>
                                </NavigationMenuLink>
                                <NavigationMenuLink asChild>
                                    <Link href="/matches/results">Results</Link>
                                </NavigationMenuLink>
                            </li>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                {/* PREDICTIONS */}
                <NavigationMenuItem className="hidden md:block">
                    <NavigationMenuTrigger>Predictions</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-50 gap-4">
                            <li>
                                <NavigationMenuLink asChild>
                                    <Link href="/predictions/upcoming">Upcoming Predictions</Link>
                                </NavigationMenuLink>
                                <NavigationMenuLink asChild>
                                    <Link href="/predictions/my-predictions">Results</Link>
                                </NavigationMenuLink>
                            </li>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                {/* ARTICLES */}
                <NavigationMenuItem className="hidden md:block">
                    <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
                        <Link href="/articles">Articles</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                {/* FAQ */}
                <NavigationMenuItem className="hidden md:block">
                    <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
                        <Link href="/faq">FAQ</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}
