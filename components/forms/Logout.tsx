import { logout } from "@/lib/actions/auth";

export default function LogoutForm({ children }: { children: React.ReactNode }) {
    return (
        <form action={logout}>
            {children}
        </form>
    )
}
