import Link from "next/link";
import { Button } from "../ui/button";

const adminLinks = [
    { href: '/admin/games/create', label: 'New Game' },
    { href: '/admin/teams/create', label: 'New Team' },
    { href: '/admin/matches/create', label: 'New Match' },
    { href: '/admin/predictions/create', label: 'New Prediction' },
];

export function AdminBar() {

    return (
        <div className='px-6 py-0.5 bg-red-400 dark:bg-red-900 border-b shadow-md'>
            <div className='flex items-center max-w-7xl mx-auto'>
                <h2 className='text-md font-semibold'>Admin Panel</h2>

                <ul className='flex items-center gap-2 ml-4'>
                    {adminLinks.map((link) => (
                        <li key={link.href}>
                            <Button variant="link" asChild className="px-0 font-semibold">
                                <Link href={link.href} className="px-0">{link.label}</Link>
                            </Button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}