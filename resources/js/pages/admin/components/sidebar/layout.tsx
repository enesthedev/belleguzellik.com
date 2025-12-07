import AppLogo from '@/components/app-logo';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarRail,
    SidebarSeparator,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { SharedData, type BreadcrumbItem } from '@/types';
import type { NavGroup } from '@/types/nav';
import { Link, usePage } from '@inertiajs/react';
import {
    FileText,
    FolderKanban,
    LayoutDashboard,
    MessageSquare,
    MoreHorizontal,
    Plus,
    Scissors,
    Settings,
    Star,
    Trash2,
    Users,
} from 'lucide-react';
import { type PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { Content } from '../shell/content';
import { Shell } from '../shell/shell';
import { ContentHeader } from './content-header';
import { Navigation } from './navigation';
import { UserNavigation } from './user-navigation';

export default function Layout({
    children,
    breadcrumbs = [],
    className,
}: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[]; className?: string }>) {
    const { auth } = usePage<SharedData>().props;
    const { t } = useTranslation();

    // Navigasyon grupları
    const navigationGroups: NavGroup[] = [
        // Ana navigasyon grubu (başlıksız)
        {
            items: [
                {
                    title: t('Overview'),
                    url: dashboard.url(),
                    icon: LayoutDashboard,
                },
            ],
        },
        // İçerik yönetimi grubu
        {
            title: t('Content Management'),
            collapsible: true,
            defaultOpen: true,
            items: [
                {
                    title: t('Comments'),
                    url: '/admin/comments',
                    icon: MessageSquare,
                    badge: 12, // Badge örneği
                },
                {
                    title: t('Services'),
                    url: '/admin/services',
                    icon: Scissors,
                    badge: 5,
                    // Action dropdown örneği
                    /*action: {
                        icon: MoreHorizontal,
                        label: t('More'),
                        showOnHover: true,
                        dropdownItems: [
                            {
                                label: t('Add to favorites'),
                                icon: Star,
                                onClick: () => console.log('Favorilere eklendi'),
                            },
                            { separator: true, label: '' },
                            {
                                label: t('Delete'),
                                icon: Trash2,
                                destructive: true,
                                onClick: () => console.log('Silindi'),
                            },
                        ],
                    },*/
                },
                {
                    title: t('Posts'),
                    url: '/admin/posts',
                    icon: FileText,
                    badge: 2,
                },
            ],
        },
    ];

    return (
        <Shell variant="sidebar" className={className}>
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
                        {t('Welcome')},
                        <br />
                        <span className="text-base font-bold">
                            {auth.user.name}
                        </span>
                    </span>
                </SidebarHeader>

                <SidebarContent>
                    <SidebarSeparator className="mx-0" />
                    <Navigation groups={navigationGroups} />
                </SidebarContent>

                <SidebarFooter>
                    <UserNavigation />
                </SidebarFooter>
                <SidebarRail />
            </Sidebar>
            <Content variant="sidebar" className="overflow-x-hidden">
                <ContentHeader breadcrumbs={breadcrumbs} />
                <div className="p-6">{children}</div>
            </Content>
        </Shell>
    );
}
