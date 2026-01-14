import Link from 'next/link'
import { Navbar } from './Navbar'
import { ModeToggle } from './mode-toggle'
import { Button } from './ui/button'
import { UserIcon } from 'lucide-react'

export const AppHeader = () => {
    // TODO: Replace with better-auth session check
    const isAdmin = true;

    return (
        <header className="border-b">
            <UserBar />
            {isAdmin && <AdminBar />}
        </header>
    )
}

const UserBar = () => {
    return (
        <div className='border-b px-6 py-2.5 bg-[#F1F1F5] dark:bg-slate-900 shadow-md'>
            <div className="flex items-center justify-between max-w-7xl mx-auto">
                <Link href="/" className="font-extrabold tracking-tight text-xl">TrueDamage.gg</Link>
                <Navbar />

                <div className='flex items-center gap-1'>
                    <ModeToggle />
                    <Button variant="outline" size="icon" className="cursor-pointer">
                        <UserIcon />
                    </Button>
                </div>
            </div>
        </div>
    )
}

const adminLinks = [
    { href: '/admin/games/create', label: 'New Game' },
    { href: '/admin/teams/create', label: 'New Team' },
    { href: '/admin/matches/create', label: 'New Match' },
    { href: '/admin/forecasts/create', label: 'New Forecast' },
];

const AdminBar = () => {

    return (
        <div className='px-6 py-0.5 bg-red-400 dark:bg-red-900 flex items-center border-b shadow-md'>
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
    )
}