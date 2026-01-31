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
import { ForgotPasswordForm } from "@/components/forms/auth/ForgotPassword";
import { AuthModalType } from "@/lib/types/auth";


export function AuthModalButton() {
    const [authModalToShow, setAuthModalToShow] = useState<AuthModalType>("signIn");

    const handleAuthModalToShowClick = (type: AuthModalType) => setAuthModalToShow(type);
    const handleOpenChange = (isOpen: boolean) => {
        if (!isOpen) setAuthModalToShow("signIn");
    };

    return (
        <Dialog onOpenChange={handleOpenChange}>
            <UserIconButtonTrigger />

            <DialogContent>
                <AuthModalDialogHeader authModalToShow={authModalToShow} />

                {authModalToShow !== "forgotPassword" && (
                    <>
                        <OAuthButtons />
                        <ContinueWithSeparator />
                    </>
                )}

                {authModalToShow === "signIn" && <SignInForm onAuthModalToShowClick={handleAuthModalToShowClick} />}
                {authModalToShow === "signUp" && <SignUpForm />}
                {authModalToShow === "forgotPassword" && <ForgotPasswordForm />}

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
    authModalToShow: "signIn" | "signUp" | "forgotPassword";
}

const AuthModalDialogHeader = ({ authModalToShow }: AuthModalDialogHeaderProps) => {
    let title;
    let description;

    if (authModalToShow === "signIn") {
        title = "Sign in";
        description = "Sign in to your account to continue";
    }

    if (authModalToShow === "signUp") {
        title = "Sign up";
        description = "Create your account to get started";
    }

    if (authModalToShow === "forgotPassword") {
        title = "Forgot password"
        description = "Type in your email address in the form below to reset your password";
    }

    return (
        <DialogHeader>
            <DialogTitle className='text-2xl text-center font-bold'>
                {title}
            </DialogTitle>
            <DialogDescription className='text-muted-foreground text-center'>
                {description}
            </DialogDescription>
        </DialogHeader>
    )
}

interface AuthModalDialogFooterProps {
    authModalToShow: AuthModalType;
    onAuthModalToShowClick: (type: AuthModalType) => void;
}

const AuthModalDialogFooter = ({ authModalToShow, onAuthModalToShowClick }: AuthModalDialogFooterProps) => {

    return (
        authModalToShow === "signIn" ? (
            <div className='flex items-center justify-center gap-1'>
                <p>Not a member?</p>
                <Link onClick={() => onAuthModalToShowClick("signUp")} href="#" className='hover:underline text-blue-400 flex items-center justify-end gap-1 underline-offset-1'>
                    Join now
                    <ArrowRight />
                </Link>
            </div>
        ) : (
            <Link onClick={() => onAuthModalToShowClick("signIn")} href="#" className='hover:underline text-blue-400 flex items-center justify-start gap-1 underline-offset-1'>
                <ArrowLeft />
                Back to sign in
            </Link>
        )
    )
}