import AppLogo from '@/components/app-logo';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { NavFooter } from '@/pages/admin/components/sidebar/nav-footer';
import { NavMain } from '@/pages/admin/components/sidebar/nav-main';
import { NavUser } from '@/pages/admin/components/sidebar/nav-user';
import { dashboard } from '@/routes';
import { type NavItem, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Home } from 'lucide-react';

const mainNavItems: NavItem[] = [
    {
        title: 'Overview',
        href: dashboard(),
        icon: Home,
    },
];

const footerNavItems: NavItem[] = [];

export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <div className="flex">
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </div>
                    </SidebarMenuItem>
                </SidebarMenu>
                <span className="px-2 text-xs text-sidebar-foreground/70 group-data-[collapsible=icon]:hidden">
                    Hoşgeldin,
                    <br />
                    <span className="text-base font-bold">
                        {auth.user.name}
                    </span>
                </span>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
