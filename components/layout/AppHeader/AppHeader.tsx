import { UserRole } from '@/lib/generated/prisma/enums';
import { getSession } from '@/lib/auth-session';
import { UserNavbar } from './UserNavbar/UserNavbar';
import { AdminNavbar } from './AdminNavbar/AdminNavbar';

export async function AppHeader() {
    const session = await getSession();

    const isSignedIn = !!session;
    const isAdmin = session?.user.role === UserRole.ADMIN;

    return (
        <header className="border-b">
            <UserNavbar isSignedIn={isSignedIn} />
            {isAdmin && <AdminNavbar />}
        </header>
    )
}