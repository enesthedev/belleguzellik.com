import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuBadge,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSkeleton,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

function isActiveUrl(currentUrl: string, itemUrl?: string): boolean {
    if (!itemUrl) return false;
    return currentUrl === itemUrl || currentUrl.startsWith(itemUrl + '/');
}

function NavLink({ item }: { item: NavItem }) {
    const { url: currentUrl } = usePage();
    const { t } = useTranslation();

    const isActive = isActiveUrl(currentUrl, item.url);

    return (
        <SidebarMenuButton
            asChild
            isActive={isActive}
            tooltip={{ children: t(item.title) }}
        >
            <Link href={item.url ?? '#'} prefetch>
                {item.icon && <item.icon />}
                <span>{t(item.title)}</span>
            </Link>
        </SidebarMenuButton>
    );
}

function NavCollapsible({ item }: { item: NavItem }) {
    const { url: currentUrl } = usePage();
    const { t } = useTranslation();

    const hasActiveChild = item.items?.some((child) =>
        isActiveUrl(currentUrl, child.url),
    );

    return (
        <Collapsible
            asChild
            defaultOpen={hasActiveChild}
            className="group/collapsible"
        >
            <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={{ children: t(item.title) }}>
                        {item.icon && <item.icon />}
                        <span>{t(item.title)}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <SidebarMenuSub>
                        {item.items?.map((child) => (
                            <SidebarMenuSubItem key={child.title}>
                                <SidebarMenuSubButton
                                    asChild
                                    isActive={isActiveUrl(currentUrl, child.url)}
                                >
                                    <Link href={child.url ?? '#'} prefetch>
                                        {child.icon && <child.icon />}
                                        <span>{t(child.title)}</span>
                                    </Link>
                                </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                        ))}
                    </SidebarMenuSub>
                </CollapsibleContent>
            </SidebarMenuItem>
        </Collapsible>
    );
}

interface NavigationProps {
    items: NavItem[];
    isLoading?: boolean;
}

export function Navigation({ items, isLoading = false }: NavigationProps) {
    if (isLoading) {
        return (
            <SidebarGroup>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {Array.from({ length: 5 }).map((_, index) => (
                            <SidebarMenuItem key={index}>
                                <SidebarMenuSkeleton showIcon />
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        );
    }

    return (
        <SidebarGroup>
            <SidebarGroupContent>
                <SidebarMenu>
                    {items.map((item) => {
                        if (item.items && item.items.length > 0) {
                            return (
                                <NavCollapsible key={item.title} item={item} />
                            );
                        }

                        return (
                            <SidebarMenuItem key={item.title}>
                                <NavLink item={item} />
                                {item.badge !== undefined && (
                                    <SidebarMenuBadge>
                                        {item.badge}
                                    </SidebarMenuBadge>
                                )}
                            </SidebarMenuItem>
                        );
                    })}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
