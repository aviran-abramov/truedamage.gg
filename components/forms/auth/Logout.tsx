import { logout } from "@/lib/actions/auth";

export function LogoutForm({ children }: { children: React.ReactNode }) {
    return (
        <form action={logout}>
            {children}
        </form>
    )
}
