import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import LogoutForm from "../forms/Logout";

export function LogoutButton() {
    return (
        <LogoutForm>
            <Button type='submit' variant="outline" size="icon" className="cursor-pointer">
                <LogOut />
            </Button>
        </LogoutForm>
    )
}
