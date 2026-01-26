

import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { UserBar } from './UserBar';
import { AdminBar } from './AdminNavigation/AdminBar';
import { UserRole } from '@/lib/generated/prisma/enums';

export async function AppHeader() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const isLoggedIn = !!session;
    const isAdmin = session?.user.role === UserRole.ADMIN;

    return (
        <header className="border-b">
            <UserBar isLoggedIn={isLoggedIn} />
            {isAdmin && <AdminBar />}
        </header>
    )
}