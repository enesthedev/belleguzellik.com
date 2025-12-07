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
import { Link, usePage } from '@inertiajs/react';
import {
    FileText,
    FolderKanban,
    LayoutDashboard,
    MessageSquare,
    Scissors,
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
                    <Navigation
                        items={[
                            {
                                title: t('Overview'),
                                url: dashboard.url(),
                                icon: LayoutDashboard,
                            },
                            {
                                title: t('Content Management'),
                                icon: FolderKanban,
                                items: [
                                    {
                                        title: t('Comments'),
                                        url: '/admin/comments',
                                        icon: MessageSquare,
                                    },
                                    {
                                        title: t('Services'),
                                        url: '/admin/services',
                                        icon: Scissors,
                                    },
                                    {
                                        title: t('Posts'),
                                        url: '/admin/posts',
                                        icon: FileText,
                                    },
                                ],
                            },
                        ]}
                    />
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
