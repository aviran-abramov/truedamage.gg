import { NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { LinkListItem } from "@/lib/types/navigation";
import Link from "next/link";

interface NavMenuItemWithTriggerProps {
    title: string;
    linkList: LinkListItem[];
}

export function NavMenuItemWithTrigger({ title, linkList }: NavMenuItemWithTriggerProps) {

    return (
        <NavigationMenuItem className="hidden md:block">
            <NavigationMenuTrigger>{title}</NavigationMenuTrigger>
            <NavigationMenuContent>
                {/* ADMIN CREATE LINKS */}
                <ul className="grid w-50 gap-4">
                    {linkList.map((link) => (
                        <NavigationMenuContentLink
                            key={link.id}
                            label={link.label}
                            href={link.href}
                        />
                    ))}
                </ul>
            </NavigationMenuContent>
        </NavigationMenuItem>
    )
}

interface NavigationMenuContentLinkProps {
    label: string;
    href: string;
}

function NavigationMenuContentLink({ label, href }: NavigationMenuContentLinkProps) {

    return (
        <li>
            <NavigationMenuLink asChild>
                <Link href={href}>{label}</Link>
            </NavigationMenuLink>
        </li>
    )
}