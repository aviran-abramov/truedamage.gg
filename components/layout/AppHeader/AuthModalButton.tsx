"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, UserIcon } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ContinueWithSeparator } from "@/components/modals/auth/ContinueWithSeparator";
import { SignInForm } from "@/components/forms/auth/SignIn";
import { SignUpForm } from "@/components/forms/auth/SignUp";
import Link from "next/link";
import { OAuthButtons } from "@/components/modals/auth/OAuthButtons";

type AuthModalType = "signIn" | "signUp";

export function AuthModalButton() {
    const [authModalToShow, setAuthModalToShow] = useState<AuthModalType>("signIn");

    const handleAuthModalToShowClick = () => setAuthModalToShow(prevState => prevState === "signIn" ? "signUp" : "signIn");
    const handleOpenChange = (isOpen: boolean) => {
        if (!isOpen) setAuthModalToShow("signIn");
    };

    return (
        <Dialog onOpenChange={handleOpenChange}>
            <UserIconButtonTrigger />

            <DialogContent>
                <AuthModalDialogHeader authModalToShow={authModalToShow} />

                <OAuthButtons />
                <ContinueWithSeparator />

                {authModalToShow === "signIn" ? <SignInForm /> : <SignUpForm />}

                <AuthModalDialogFooter authModalToShow={authModalToShow} onAuthModalToShowClick={handleAuthModalToShowClick} />
            </DialogContent>
        </Dialog>
    )
}

const UserIconButtonTrigger = () => {

    return (
        <DialogTrigger asChild>
            <Button variant="outline" size="icon" className="cursor-pointer">
                <UserIcon />
            </Button>
        </DialogTrigger>
    )
}

interface AuthModalDialogHeaderProps {
    authModalToShow: "signIn" | "signUp";
}

const AuthModalDialogHeader = ({ authModalToShow }: AuthModalDialogHeaderProps) => {

    return (
        <DialogHeader>
            <DialogTitle className='text-2xl text-center font-bold'>
                {authModalToShow === "signIn" ? "Sign in" : "Sign up"}
            </DialogTitle>
            <DialogDescription className='text-muted-foreground text-center'>
                {authModalToShow === "signIn" ? "Sign in to your account to continue" : "Create your account to get started"}
            </DialogDescription>
        </DialogHeader>
    )
}

interface AuthModalDialogFooterProps {
    authModalToShow: "signIn" | "signUp";
    onAuthModalToShowClick: () => void;
}

const AuthModalDialogFooter = ({ authModalToShow, onAuthModalToShowClick }: AuthModalDialogFooterProps) => {

    return (
        authModalToShow === "signIn" ? (
            <div className='flex items-center justify-center gap-1'>
                <p>Not a member?</p>
                <Link onClick={onAuthModalToShowClick} href="#" className='hover:underline text-blue-400 flex items-center justify-end gap-1 underline-offset-1'>
                    Join now
                    <ArrowRight />
                </Link>
            </div>
        ) : (
            <Link onClick={onAuthModalToShowClick} href="#" className='hover:underline text-blue-400 flex items-center justify-start gap-1 underline-offset-1'>
                <ArrowLeft />
                Back to sign in
            </Link>
        )
    )
}