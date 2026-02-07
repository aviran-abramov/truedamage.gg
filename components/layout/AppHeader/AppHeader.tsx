import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { AdminBar } from './AdminNavigation/AdminBar';
import { UserRole } from '@/lib/generated/prisma/enums';
import { UserBar } from './UserNavigation/UserBar';
import { getSession } from '@/lib/auth-session';

export async function AppHeader() {
    const session = await getSession();

    const isSignedIn = !!session;
    const isAdmin = session?.user.role === UserRole.ADMIN;

    return (
        <header className="border-b">
            <UserBar isSignedIn={isSignedIn} />
            {isAdmin && <AdminBar />}
        </header>
    )
}