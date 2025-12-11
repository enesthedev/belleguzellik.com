import ShowComments from '@/actions/App/Actions/Admin/Comments/ShowComments';
import ShowServices from '@/actions/App/Actions/Admin/Services/ShowServices';
import ShowOverview from '@/actions/App/Actions/Admin/ShowOverview';
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
import { useSidebarCount } from '@/hooks/use-sidebar-count';
import { SharedData, type BreadcrumbItem } from '@/types';
import type { NavGroup } from '@/types/nav';
import { Link, usePage } from '@inertiajs/react';
import { LayoutDashboard, MessageSquare, Scissors } from 'lucide-react';
import { type PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { Content } from '../shell/content';
import { Shell } from '../shell/shell';
import { ContentHeader } from './content-header';
import { Navigation } from './navigation';
import { UserNavigation } from './user-navigation';

function LayoutContent({
    children,
    breadcrumbs = [],
    className,
}: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[]; className?: string }>) {
    const { auth } = usePage<SharedData>().props;
    const { t } = useTranslation();
    const { counts } = useSidebarCount();

    const navigationGroups: NavGroup[] = [
        {
            items: [
                {
                    title: t('Overview'),
                    url: ShowOverview.url(),
                    icon: LayoutDashboard,
                    exactMatch: true,
                },
            ],
        },
        {
            title: t('Content Management'),
            collapsible: true,
            defaultOpen: true,
            items: [
                {
                    title: t('Comments'),
                    url: ShowComments.url(),
                    icon: MessageSquare,
                    badge: counts?.comments,
                },
                {
                    title: t('Services'),
                    url: ShowServices.url(),
                    icon: Scissors,
                    badge: counts?.services,
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
                                <Link href={ShowOverview.url()} prefetch>
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

export default function Layout(
    props: PropsWithChildren<{
        breadcrumbs?: BreadcrumbItem[];
        className?: string;
    }>,
) {
    return <LayoutContent {...props} />;
}
