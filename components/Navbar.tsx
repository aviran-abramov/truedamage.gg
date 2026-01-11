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

export const Navbar = () => {

    return (
        <NavigationMenu>
            <NavigationMenuList>
                {/* HOME */}
                <NavigationMenuItem>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        <Link href="/">Home</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                {/* MATCHES */}
                <NavigationMenuItem className="hidden md:block">
                    <NavigationMenuTrigger>Matches</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-50 gap-4">
                            <li>
                                <NavigationMenuLink>
                                    <Link href="/matches/upcoming">Upcoming Matches</Link>
                                </NavigationMenuLink>
                                <NavigationMenuLink >
                                    <Link href="/matches/results">Results</Link>
                                </NavigationMenuLink>
                            </li>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                {/* FORECASTS */}
                <NavigationMenuItem className="hidden md:block">
                    <NavigationMenuTrigger>Forecasts</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-50 gap-4">
                            <li>
                                <NavigationMenuLink>
                                    <Link href="/forecasts/create">Today's Forecasts</Link>
                                </NavigationMenuLink>
                                <NavigationMenuLink >
                                    <Link href="/forecasts/my-forecasts">Results</Link>
                                </NavigationMenuLink>
                            </li>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                {/* ARTICLES */}
                <NavigationMenuItem className="hidden md:block">
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        <Link href="/articles">Articles</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                {/* FAQ */}
                <NavigationMenuItem className="hidden md:block">
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        <Link href="/faq">FAQ</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}
