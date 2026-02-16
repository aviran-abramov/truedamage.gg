import { SignOutForm } from "@/components/auth/forms/SignOutForm";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export function SignOutButton() {
    return (
        <SignOutForm>
            <Button type='submit' variant="outline" size="icon" className="cursor-pointer">
                <LogOut />
            </Button>
        </SignOutForm>
    )
}
