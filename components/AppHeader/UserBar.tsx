import React from 'react'
import { ModeToggle } from '../mode-toggle';
import { Navbar } from '../Navbar';
import { LogoutButton } from './LogoutButton';
import { AuthModalButton } from './AuthModalButton';
import Link from 'next/link';
import { AppLogo } from './AppLogo';

interface UserBarProps {
    isLoggedIn: boolean;
}

export function UserBar({ isLoggedIn }: UserBarProps) {

    return (
        <div className='border-b px-6 py-2.5 bg-[#F1F1F5] dark:bg-slate-900 shadow-md'>
            <div className="flex items-center justify-between max-w-7xl mx-auto">
                <AppLogo />
                <Navbar />

                {/* RIGHT SIDE */}
                <div className='flex items-center gap-1'>
                    <ModeToggle />
                    {isLoggedIn ? <LogoutButton /> : <AuthModalButton />}
                </div>
            </div>
        </div>
    )
}