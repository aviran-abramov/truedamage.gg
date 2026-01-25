import { DialogTitle, DialogDescription } from "@radix-ui/react-dialog";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { DialogHeader } from "../ui/dialog";
import Link from "next/link";
import { SignUpForm } from "../forms/SignUp";


export function SignUpModal({ onAuthModalToShowClick }: { onAuthModalToShowClick: () => void }) {
    return (
        <React.Fragment>
            <DialogHeader>
                <DialogTitle className='text-2xl font-bold'>Sign up</DialogTitle>
                <DialogDescription>Create your account to get started</DialogDescription>
            </DialogHeader>

            <SignUpForm />

            <Link onClick={onAuthModalToShowClick} href="#" className='hover:underline text-blue-400 flex items-center justify-start gap-1 underline underline-offset-1'>
                <ArrowLeft />
                Back to login
            </Link>
        </React.Fragment>
    )
}
