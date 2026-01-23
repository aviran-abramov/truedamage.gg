import { DialogTitle } from '@radix-ui/react-dialog'
import { ArrowRight } from 'lucide-react'
import React from 'react'
import LoginForm from '../forms/Login'
import { DialogHeader } from '../ui/dialog'
import Link from 'next/link'

export default function LoginModal({ onAuthModalToShowClick }: { onAuthModalToShowClick: () => void }) {
    return (
        <React.Fragment>
            <DialogHeader>
                <DialogTitle className='text-2xl font-bold'>Login</DialogTitle>
            </DialogHeader>

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
