"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { UserIcon } from "lucide-react";
import LoginModal from "../auth/LoginModal";
import SignUpModal from "../auth/SignUpModal";

export const AuthModalButton = () => {
    const [authModalToShow, setAuthModalToShow] = useState<"login" | "signup">("login");

    const handleAuthModalToShowClick = () => setAuthModalToShow(prevState => prevState === "login" ? "signup" : "login");
    const handleOpenChange = (isOpen: boolean) => {
        if (!isOpen) setAuthModalToShow("login");
    };

    return (
        <Dialog onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button variant="outline" size="icon" className="cursor-pointer">
                    <UserIcon />
                </Button>
            </DialogTrigger>

            <DialogContent>
                {authModalToShow === "login" && (
                    <LoginModal onAuthModalToShowClick={handleAuthModalToShowClick} />
                )}

                {authModalToShow === "signup" && (
                    <SignUpModal onAuthModalToShowClick={handleAuthModalToShowClick} />
                )}
            </DialogContent>
        </Dialog>
    )
}