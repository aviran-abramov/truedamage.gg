"use client";

import { useState } from "react";
import { UserIcon } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SignInModal } from "@/components/modals/auth/SignInModal";
import { SignUpModal } from "@/components/modals/auth/SignUpModal";

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
                {authModalToShow === "signIn" && (
                    <SignInModal onAuthModalToShowClick={handleAuthModalToShowClick} />
                )}

                {authModalToShow === "signUp" && (
                    <SignUpModal onAuthModalToShowClick={handleAuthModalToShowClick} />
                )}
            </DialogContent>
        </Dialog>
    )
}