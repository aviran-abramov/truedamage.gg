import { DialogTitle, DialogDescription } from "@radix-ui/react-dialog";
import { ArrowLeft } from "lucide-react";
import React from "react";
import Link from "next/link";
import { DialogHeader } from "@/components/ui/dialog";
import { SignUpForm } from "@/components/forms/auth/SignUp";
import { OAuthButton } from "./OAuthButton";
import { ContinueWithSeparator } from "./ContinueWithSeparator";


export function SignUpModal({ onAuthModalToShowClick }: { onAuthModalToShowClick: () => void }) {
    return (
        <React.Fragment>
            <DialogHeader>
                <DialogTitle className='text-2xl text-center font-bold'>Sign up</DialogTitle>
                <DialogDescription className="text-muted-foreground text-center">Create your account to get started</DialogDescription>
            </DialogHeader>

            <OAuthButton name='Google' provider='google' />
            <OAuthButton name="Facebook" provider='facebook' />
            <ContinueWithSeparator />

            <SignUpForm />

            <Link onClick={onAuthModalToShowClick} href="#" className='hover:underline text-blue-400 flex items-center justify-start gap-1 underline underline-offset-1'>
                <ArrowLeft />
                Back to login
            </Link>
        </React.Fragment>
    )
}
