import { Button } from "@/components/ui/button";
import Link from "next/link";

export function AdminBar() {

    return (
        <div className='px-6 py-0.5 bg-red-400 dark:bg-red-900 border-b shadow-md'>
            <div className='flex items-center max-w-7xl mx-auto'>
                <Title>Admin Panel</Title>

                <AdminCreateLinkList />
            </div>
        </div>
    )
}

interface TitleProps {
    children: React.ReactNode
}

function Title({ children }: TitleProps) {

    return (
        <h2 className='text-md font-semibold'>{children}</h2>
    )
}

const adminLinks = [
    { id: 'new-game', label: 'New Game', href: '/admin/games/create' },
    { id: 'new-team', label: 'New Team', href: '/admin/teams/create' },
    { id: 'new-match', label: 'New Match', href: '/admin/matches/create' },
    { id: 'new-prediction', label: 'New Prediction', href: '/admin/predictions/create' },
];

function AdminCreateLinkList() {

    return (
        <ul className='flex items-center gap-2 ml-4'>
            {adminLinks.map((link) => (
                <AdminCreateLink
                    key={link.id}
                    label={link.label}
                    href={link.href}
                />
            ))}
        </ul>
    )
}

interface AdminCreateLinkProps {
    label: string;
    href: string;
}

function AdminCreateLink({ label, href }: AdminCreateLinkProps) {

    return (
        <li>
            <Button variant="link" asChild className="px-0 font-semibold">
                <Link href={href} className="px-0">{label}</Link>
            </Button>
        </li>
    )
}
