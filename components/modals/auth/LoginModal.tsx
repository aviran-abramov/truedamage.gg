import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog'
import { ArrowRight } from 'lucide-react'
import React from 'react'
import Link from 'next/link'
import { DialogHeader } from '@/components/ui/dialog'
import { LoginForm } from '@/components/forms/auth/Login'
import { ContinueWithSeparator } from './ContinueWithSeparator'
import { OAuthButton } from './OAuthButton'

export function LoginModal({ onAuthModalToShowClick }: { onAuthModalToShowClick: () => void }) {

    return (
        <React.Fragment>
            <DialogHeader>
                <DialogTitle className='text-2xl text-center font-bold'>Login</DialogTitle>
                <DialogDescription className='text-muted-foreground text-center'>Sign in to your account to continue</DialogDescription>
            </DialogHeader>

            <div className='space-y-2.5'>
                <OAuthButton name='Google' provider='google' />
                <OAuthButton name="Facebook" provider='facebook' />
            </div>
            <ContinueWithSeparator />

            <LoginForm />

            <div className='flex items-center justify-center gap-1'>
                <p>Not a member?</p>
                <Link onClick={onAuthModalToShowClick} href="#" className='hover:underline text-blue-400 flex items-center justify-end gap-1 underline-offset-1'>
                    Join now
                    <ArrowRight />
                </Link>
            </div>

        </React.Fragment>
    )
}
