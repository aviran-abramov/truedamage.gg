"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, UserIcon } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { OAuthButton } from "@/components/modals/auth/OAuthButton";
import { ContinueWithSeparator } from "@/components/modals/auth/ContinueWithSeparator";
import { SignInForm } from "@/components/forms/auth/SignIn";
import { SignUpForm } from "@/components/forms/auth/SignUp";
import Link from "next/link";

type AuthModalType = "signIn" | "signUp";

export function AuthModalButton() {
    const [authModalToShow, setAuthModalToShow] = useState<AuthModalType>("signIn");

    const handleAuthModalToShowClick = () => setAuthModalToShow(prevState => prevState === "signIn" ? "signUp" : "signIn");
    const handleOpenChange = (isOpen: boolean) => {
        if (!isOpen) setAuthModalToShow("signIn");
    };

    return (
        <Dialog onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button variant="outline" size="icon" className="cursor-pointer">
                    <UserIcon />
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle className='text-2xl text-center font-bold'>
                        {authModalToShow === "signIn" ? "Sign in" : "Sign up"}
                    </DialogTitle>
                    <DialogDescription className='text-muted-foreground text-center'>
                        {authModalToShow === "signIn" ? "Sign in to your account to continue" : "Create your account to get started"}
                    </DialogDescription>
                </DialogHeader>

                {/* OAuth buttons container */}
                <div className="space-y-2.5">
                    <OAuthButton name='Google' provider='google' />
                    <OAuthButton name="Facebook" provider='facebook' />
                </div>
                <ContinueWithSeparator />

                {authModalToShow === "signIn" ? <SignInForm /> : <SignUpForm />}

                {authModalToShow === "signIn" ? (
                    <div className='flex items-center justify-center gap-1'>
                        <p>Not a member?</p>
                        <Link onClick={handleAuthModalToShowClick} href="#" className='hover:underline text-blue-400 flex items-center justify-end gap-1 underline-offset-1'>
                            Join now
                            <ArrowRight />
                        </Link>
                    </div>
                ) : (
                    <Link onClick={handleAuthModalToShowClick} href="#" className='hover:underline text-blue-400 flex items-center justify-start gap-1 underline underline-offset-1'>
                        <ArrowLeft />
                        Back to sign in
                    </Link>
                )}
            </DialogContent>
        </Dialog>
    )
}