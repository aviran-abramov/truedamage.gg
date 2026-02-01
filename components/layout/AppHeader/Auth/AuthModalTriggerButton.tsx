"use client";

import { useState } from "react";
import { UserIcon } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AuthModalType } from "@/lib/types/auth";
import { AuthModal } from "./AuthModal";


export function AuthModalButton() {
    const [authModalToShow, setAuthModalToShow] = useState<AuthModalType>("signIn");

    const handleAuthModalToShowClick = (type: AuthModalType) => setAuthModalToShow(type);
    const handleOpenChange = (isOpen: boolean) => {
        if (!isOpen) setAuthModalToShow("signIn");
    };

    return (
        <Dialog onOpenChange={handleOpenChange}>
            <UserIconButtonTrigger />

            <AuthModal
                authModalToShow={authModalToShow}
                onAuthModalToShowClick={handleAuthModalToShowClick}
            />
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
