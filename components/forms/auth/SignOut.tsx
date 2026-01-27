import { signOut } from "@/lib/actions/auth";

export function SignOutForm({ children }: { children: React.ReactNode }) {
    return (
        <form action={signOut}>
            {children}
        </form>
    )
}
