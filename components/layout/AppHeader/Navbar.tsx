
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
                    <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
                        <Link href="/">Home</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                {/* MATCHES */}
                <NavigationMenuItem className="hidden md:block">
                    <NavigationMenuTrigger>Match Center</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <MatchLinkList />
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
        </NavigationMenu >
    )
}

const matchLinks = [
    { id: "matches", label: 'Matches', href: '/matches/upcoming' },
    { id: "results", label: 'Results', href: '/matches/results' },
    { id: "predictions", label: 'Predictions', href: '/matches/predictions/upcoming' },
    { id: "prediction-results", label: 'Prediction Results', href: '/matches/predictions/results' },
    { id: "tournaments", label: 'Tournaments', href: '/matches/tournaments' },
    { id: "teams", label: 'Teams', href: '/matches/teams' },
    { id: "players", label: 'Players', href: '/matches/players' },
];

function MatchLinkList() {

    return (
        <ul className="grid w-50 gap-4">
            {matchLinks.map((match) => (
                <MatchLink
                    key={match.id}
                    label={match.label}
                    href={match.href}
                />
            ))}
        </ul>
    )
}

interface MatchLinkProps {
    label: string;
    href: string;
}

function MatchLink({ label, href }: MatchLinkProps) {

    return (
        <li>
            <NavigationMenuLink asChild>
                <Link href={href}>{label}</Link>
            </NavigationMenuLink>
        </li>
    )
}