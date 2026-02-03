
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
        { label: "Upcoming Matches", href: "/matches/upcoming" },
        { label: "Match Results", href: "/matches/results" },
    ],
    predictions: [
        { label: "Upcoming Predictions", href: "/matches/predictions/upcoming" },
        { label: "Prediction Results", href: "/matches/predictions/results" }
    ],
    esportsData: [
        { label: "Games", href: "/games" },
        { label: "Tournaments", href: "/tournaments" },
        { label: "Teams", href: "/teams" },
        { label: "Players", href: "/players" },
    ]
}

export const Navbar = () => {
    return (
        <NavigationMenu viewport={false}>
            <NavigationMenuList>
                {/* MATCHES */}
                <NavigationMenuItem className="hidden md:block">
                    <NavigationMenuTrigger>Matches</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <NavLinkMenu data={data.matches} />
                    </NavigationMenuContent>
                </NavigationMenuItem>

                {/* PREDICTIONS */}
                <NavigationMenuItem className="hidden md:block">
                    <NavigationMenuTrigger>Predictions</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <NavLinkMenu data={data.predictions} />
                    </NavigationMenuContent>
                </NavigationMenuItem>

                {/* WIKI */}
                <NavigationMenuItem className="hidden md:block">
                    <NavigationMenuTrigger>Esports Data</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <NavLinkMenu data={data.esportsData} />
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