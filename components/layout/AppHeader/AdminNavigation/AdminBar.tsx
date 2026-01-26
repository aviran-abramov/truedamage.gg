import { NavMenuItemWithTrigger } from "../NavMenuItemWithTrigger";
import { adminCreateLinks } from "@/lib/data/navigation/admin";
import { AdminNavigationMenu } from "./AdminNavigationMenu";

export function AdminBar() {

    return (
        <nav className='px-6 py-0.5 bg-red-400 dark:bg-red-900 border-b shadow-md'>
            <div className='flex items-center max-w-7xl mx-auto'>
                <p className='text-base font-semibold'>Admin Panel</p>

                <AdminNavigationMenu>
                    <NavMenuItemWithTrigger
                        title="Create"
                        linkList={adminCreateLinks}
                    />
                </AdminNavigationMenu>
            </div>
        </nav>
    )
}