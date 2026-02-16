import { NavigationMenu, NavigationMenuList } from "@/components/ui/navigation-menu";

interface AdminNavigationMenuProps {
    children: React.ReactNode;
}

export function AdminNavigationMenu({ children }: AdminNavigationMenuProps) {

    return (
        <div className='flex items-center gap-2 ml-4'>
            <NavigationMenu>
                <NavigationMenuList>
                    {children}
                </NavigationMenuList>
            </NavigationMenu >
        </div>
    )
}