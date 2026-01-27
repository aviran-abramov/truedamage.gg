import { Button } from "@/components/ui/button";
import { loginWithGoogle } from "@/lib/actions/auth";
import Image from "next/image";

export function GoogleAuthButton() {

    return (
        <Button
            type="button"
            onClick={loginWithGoogle}
            className="w-full cursor-pointer"
        >
            <Image src="/icons/google-20px.svg" alt="Google Icon" height={20} width={20} />
            <span>Continue with Google</span>
        </Button>
    )
}