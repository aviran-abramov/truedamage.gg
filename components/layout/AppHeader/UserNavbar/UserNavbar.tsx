import { ModeToggle } from '@/components/mode-toggle';
import { Navbar } from './Navbar';
import { AppLogo } from './AppLogo';
import { SignOutButton } from './SignOutButton';
import { AuthModalButton } from './AuthModalButton';

interface UserNavbarProps {
    isSignedIn: boolean;
}

export function UserNavbar({ isSignedIn }: UserNavbarProps) {

    return (
        <div className='border-b px-6 py-2.5 bg-[#F1F1F5] dark:bg-slate-900 shadow-md'>
            <div className="flex items-center justify-between max-w-7xl mx-auto">
                <AppLogo />
                <Navbar />

                {/* RIGHT SIDE */}
                <div className='flex items-center gap-1'>
                    <ModeToggle />
                    {isSignedIn ? <SignOutButton /> : <AuthModalButton />}
                </div>
            </div>
        </div>
    )
}