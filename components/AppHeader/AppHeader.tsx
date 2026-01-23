

import Link from 'next/link'
import { Navbar } from '../Navbar'
import { ModeToggle } from '../mode-toggle'
import { Button } from '../ui/button'
import React from 'react';
import { AuthModalButton } from './AuthModalButton';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { LogoutButton } from './LogoutButton';

export async function AppHeader() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const isLoggedIn = session ? true : false;
    const isAdmin = session?.user.role === "ADMIN" ? true : false;

    return (
        <header className="border-b">
            <UserBar>
                <AppLogo />
                <Navbar />

                {/* RIGHT SIDE */}
                <div className='flex items-center gap-1'>
                    <ModeToggle />
                    {isLoggedIn ? (
                        <LogoutButton />
                    ) : (
                        <AuthModalButton />
                    )}
                </div>
            </UserBar>

            {isAdmin && (
                <AdminBar>
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
                </AdminBar>
            )}
        </header>
    )
}

const UserBar = ({ children }: { children: React.ReactNode }) => {

    return (
        <div className='border-b px-6 py-2.5 bg-[#F1F1F5] dark:bg-slate-900 shadow-md'>
            <div className="flex items-center justify-between max-w-7xl mx-auto">
                {children}
            </div>
        </div>
    )
}

const AppLogo = () => {

    return (
        <Link href="/" className="font-extrabold tracking-tight text-xl">TrueDamage.gg</Link>
    )
}

// const AuthModalButton = () => {
//     const [authModalToShow, setAuthModalToShow] = useState<"login" | "signup">("login");

//     const handleAuthModalToShowClick = () => setAuthModalToShow(prevState => prevState === "login" ? "signup" : "login");
//     const handleOpenChange = (isOpen: boolean) => {
//         if (!isOpen) setAuthModalToShow("login");
//     };

//     return (
//         <Dialog onOpenChange={handleOpenChange}>
//             <DialogTrigger asChild>
//                 <Button variant="outline" size="icon" className="cursor-pointer">
//                     <UserIcon />
//                 </Button>
//             </DialogTrigger>

//             <DialogContent>
//                 {authModalToShow === "login" && (
//                     <LoginModal onAuthModalToShowClick={handleAuthModalToShowClick} />
//                 )}

//                 {authModalToShow === "signup" && (
//                     <SignUpModal onAuthModalToShowClick={handleAuthModalToShowClick} />
//                 )}
//             </DialogContent>
//         </Dialog>
//     )
// }

const adminLinks = [
    { href: '/admin/games/create', label: 'New Game' },
    { href: '/admin/teams/create', label: 'New Team' },
    { href: '/admin/matches/create', label: 'New Match' },
    { href: '/admin/predictions/create', label: 'New Prediction' },
];

const AdminBar = ({ children }: { children: React.ReactNode }) => {

    return (
        <div className='px-6 py-0.5 bg-red-400 dark:bg-red-900 border-b shadow-md'>
            <div className='flex items-center max-w-7xl mx-auto'>
                {children}
            </div>
        </div>
    )
}