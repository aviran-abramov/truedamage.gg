import { AppLogo } from './AppLogo';
import { Navbar } from '@/components/layout/AppHeader/Navbar';
import { ModeToggle } from '@/components/mode-toggle';
import { SignOutButton } from './Auth/SignOutButton';
import { AuthModalButton } from './Auth/AuthModalTriggerButton';

interface UserBarProps {
    isSignedIn: boolean;
}

export function UserBar({ isSignedIn }: UserBarProps) {

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