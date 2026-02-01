
import Link from "next/link";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const data = {
    matches: [
        { label: "Matches", href: "/matches/upcoming" },
        { label: "Results", href: "/matches/results" },
        { label: "Tournaments", href: "/matches/tournaments" },
        { label: "Teams", href: "/matches/teams" },
        { label: "Players", href: "/matches/players" },
    ],
    predictions: [
        { label: "Predictions", href: "/matches/predictions/upcoming" },
        { label: "Prediction Results", href: "/matches/predictions/results" }
    ]
}

export const Navbar = () => {
    return (
        <NavigationMenu viewport={false}>
            <NavigationMenuList>
                {/* HOME */}
                <NavigationMenuItem>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
                        <Link href="/">Home</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                {/* MATCHES */}
                <NavigationMenuItem className="hidden md:block">
                    <NavigationMenuTrigger>Match Center</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <NavLinkMenu data={data.matches} />
                    </NavigationMenuContent>
                </NavigationMenuItem>

                {/* PREDICTIONS */}
                <NavigationMenuItem className="hidden md:block">
                    <NavigationMenuTrigger>Prediction Center</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <NavLinkMenu data={data.predictions} />
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu >
    )
}

interface NavLinkMenuProps {
    label: string;
    href: string;
}

function NavLinkMenu({ data }: { data: NavLinkMenuProps[] }) {

    return (
        <ul className="grid w-50 gap-4">
            {data.map((match) => (
                <NavLinkItem
                    key={match.href}
                    label={match.label}
                    href={match.href}
                />
            ))}
        </ul>
    )
}

interface NavLinkItemProps {
    label: string;
    href: string;
}

function NavLinkItem({ label, href }: NavLinkItemProps) {

    return (
        <li>
            <NavigationMenuLink asChild>
                <Link href={href}>{label}</Link>
            </NavigationMenuLink>
        </li>
    )
}