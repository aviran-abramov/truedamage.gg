import { LogoutForm } from "@/components/forms/auth/Logout";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export function LogoutButton() {
    return (
        <LogoutForm>
            <Button type='submit' variant="outline" size="icon" className="cursor-pointer">
                <LogOut />
            </Button>
        </LogoutForm>
    )
}
