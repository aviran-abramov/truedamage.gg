import { Button } from "@/components/ui/button";
import { signInWithOAuth } from "@/lib/actions/auth";
import Image from "next/image";

export function OAuthButton({ name, provider }: { name: string, provider: "google" | "facebook" }) {

    return (
        <Button
            type="button"
            onClick={() => signInWithOAuth(provider)}
            className="w-full cursor-pointer"
        >
            <Image src={`/icons/auth/${provider}-20px.svg`} alt="Google Icon" height={20} width={20} />
            <span>Continue with {name}</span>
        </Button>
    )
}