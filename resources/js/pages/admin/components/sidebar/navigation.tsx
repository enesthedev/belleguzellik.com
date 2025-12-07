import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    SidebarGroup,
    SidebarGroupAction,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuBadge,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSkeleton,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import type { NavGroup, NavItem, NavItemAction } from '@/types/nav';
import { Link, usePage } from '@inertiajs/react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * URL'in aktif olup olmadığını kontrol eder
 */
function isActiveUrl(currentUrl: string, itemUrl?: string): boolean {
    if (!itemUrl) return false;
    return currentUrl === itemUrl || currentUrl.startsWith(itemUrl + '/');
}

/**
 * Menü öğesi action bileşeni (dropdown menü veya tek buton)
 */
function MenuAction({ action }: { action: NavItemAction }) {
    const { t } = useTranslation();

    // Dropdown menü varsa
    if (action.dropdownItems && action.dropdownItems.length > 0) {
        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <SidebarMenuAction showOnHover={action.showOnHover}>
                        <action.icon />
                        <span className="sr-only">{t(action.label)}</span>
                    </SidebarMenuAction>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" align="start">
                    {action.dropdownItems.map((item, index) =>
                        item.separator ? (
                            <DropdownMenuSeparator key={index} />
                        ) : (
                            <DropdownMenuItem
                                key={index}
                                onClick={item.onClick}
                                asChild={!!item.href}
                                className={
                                    item.destructive
                                        ? 'text-destructive focus:text-destructive'
                                        : ''
                                }
                            >
                                {item.href ? (
                                    <Link href={item.href}>
                                        {item.icon && <item.icon />}
                                        <span>{t(item.label)}</span>
                                    </Link>
                                ) : (
                                    <>
                                        {item.icon && <item.icon />}
                                        <span>{t(item.label)}</span>
                                    </>
                                )}
                            </DropdownMenuItem>
                        ),
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        );
    }

    // Tek buton
    return (
        <SidebarMenuAction
            onClick={action.onClick}
            showOnHover={action.showOnHover}
        >
            <action.icon />
            <span className="sr-only">{t(action.label)}</span>
        </SidebarMenuAction>
    );
}

/**
 * Basit navigasyon linki (alt menü olmadan)
 */
function NavLink({ item }: { item: NavItem }) {
    const { url: currentUrl } = usePage();
    const { t } = useTranslation();

    const isActive = item.isActive ?? isActiveUrl(currentUrl, item.url);

    return (
        <SidebarMenuItem>
            <SidebarMenuButton
                asChild
                isActive={isActive}
                tooltip={{ children: t(item.title) }}
                disabled={item.disabled}
            >
                <Link href={item.url ?? '#'} prefetch>
                    {item.icon && <item.icon />}
                    <span>{t(item.title)}</span>
                </Link>
            </SidebarMenuButton>

            {/* Badge - SidebarMenuButton'dan hemen sonra gelmeli (peer selector için) */}
            {item.badge !== undefined && (
                <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
            )}

            {/* Action butonu */}
            {item.action && <MenuAction action={item.action} />}
        </SidebarMenuItem>
    );
}

/**
 * Alt menüsü olan collapsible navigasyon öğesi
 */
function NavCollapsible({ item }: { item: NavItem }) {
    const { url: currentUrl } = usePage();
    const { t } = useTranslation();

    const hasActiveChild = item.items?.some(
        (child) =>
            isActiveUrl(currentUrl, child.url) ||
            child.items?.some((grandChild) =>
                isActiveUrl(currentUrl, grandChild.url),
            ),
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

                {/* Badge - collapsible için de destek */}
                {item.badge !== undefined && (
                    <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
                )}

                {/* Action butonu */}
                {item.action && <MenuAction action={item.action} />}

                <CollapsibleContent>
                    <SidebarMenuSub>
                        {item.items?.map((child) => (
                            <NavSubItem key={child.title} item={child} />
                        ))}
                    </SidebarMenuSub>
                </CollapsibleContent>
            </SidebarMenuItem>
        </Collapsible>
    );
}

/**
 * Alt menü öğesi (submenu item)
 */
function NavSubItem({ item }: { item: NavItem }) {
    const { url: currentUrl } = usePage();
    const { t } = useTranslation();

    const isActive = item.isActive ?? isActiveUrl(currentUrl, item.url);

    // Nested submenu desteği
    if (item.items && item.items.length > 0) {
        return (
            <Collapsible asChild defaultOpen={false}>
                <SidebarMenuSubItem>
                    <CollapsibleTrigger asChild>
                        <SidebarMenuSubButton>
                            {item.icon && <item.icon />}
                            <span>{t(item.title)}</span>
                            <ChevronRight className="ml-auto size-3 transition-transform duration-200 group-data-[state=open]:rotate-90" />
                        </SidebarMenuSubButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        <SidebarMenuSub>
                            {item.items.map((child) => (
                                <NavSubItem key={child.title} item={child} />
                            ))}
                        </SidebarMenuSub>
                    </CollapsibleContent>
                </SidebarMenuSubItem>
            </Collapsible>
        );
    }

    return (
        <SidebarMenuSubItem>
            <SidebarMenuSubButton asChild isActive={isActive}>
                <Link href={item.url ?? '#'} prefetch>
                    {item.icon && <item.icon />}
                    <span>{t(item.title)}</span>
                </Link>
            </SidebarMenuSubButton>
        </SidebarMenuSubItem>
    );
}

/**
 * Collapsible grup bileşeni
 */
function CollapsibleGroup({ group }: { group: NavGroup }) {
    const { t } = useTranslation();
    const { url: currentUrl } = usePage();

    // Grup içinde aktif öğe var mı kontrol et
    const hasActiveItem = group.items.some(
        (item) =>
            isActiveUrl(currentUrl, item.url) ||
            item.items?.some((child) => isActiveUrl(currentUrl, child.url)),
    );

    const defaultOpen = group.defaultOpen ?? hasActiveItem;

    return (
        <Collapsible defaultOpen={defaultOpen} className="group/collapsible">
            <SidebarGroup>
                <SidebarGroupLabel asChild>
                    <CollapsibleTrigger className="flex w-full cursor-pointer items-center">
                        {group.title && t(group.title)}
                        <ChevronDown className="ml-auto size-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                    </CollapsibleTrigger>
                </SidebarGroupLabel>

                {group.action && (
                    <SidebarGroupAction
                        title={t(group.action.label)}
                        onClick={group.action.onClick}
                    >
                        <group.action.icon />
                        <span className="sr-only">{t(group.action.label)}</span>
                    </SidebarGroupAction>
                )}

                <CollapsibleContent>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {group.items.map((item) =>
                                item.items && item.items.length > 0 ? (
                                    <NavCollapsible
                                        key={item.title}
                                        item={item}
                                    />
                                ) : (
                                    <NavLink key={item.title} item={item} />
                                ),
                            )}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </CollapsibleContent>
            </SidebarGroup>
        </Collapsible>
    );
}

/**
 * Normal (collapsible olmayan) grup bileşeni
 */
function NormalGroup({ group }: { group: NavGroup }) {
    const { t } = useTranslation();

    return (
        <SidebarGroup>
            {group.title && (
                <SidebarGroupLabel>{t(group.title)}</SidebarGroupLabel>
            )}

            {group.action && (
                <SidebarGroupAction
                    title={t(group.action.label)}
                    onClick={group.action.onClick}
                >
                    <group.action.icon />
                    <span className="sr-only">{t(group.action.label)}</span>
                </SidebarGroupAction>
            )}

            <SidebarGroupContent>
                <SidebarMenu>
                    {group.items.map((item) =>
                        item.items && item.items.length > 0 ? (
                            <NavCollapsible key={item.title} item={item} />
                        ) : (
                            <NavLink key={item.title} item={item} />
                        ),
                    )}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}

/**
 * Tek bir navigasyon grubunu render eder
 */
function NavigationGroup({ group }: { group: NavGroup }) {
    if (group.collapsible) {
        return <CollapsibleGroup group={group} />;
    }

    return <NormalGroup group={group} />;
}

// =============================================================================
// ANA NAVİGASYON BİLEŞENİ
// =============================================================================

interface NavigationProps {
    /**
     * Navigasyon grupları - grup başlıkları, collapsible gruplar vb. için kullanın
     */
    groups?: NavGroup[];

    /**
     * Basit navigasyon öğeleri (geriye dönük uyumluluk için)
     * Eğer groups belirtilmişse, bu alan yok sayılır
     */
    items?: NavItem[];

    /**
     * Yüklenme durumu
     */
    isLoading?: boolean;
}

export function Navigation({
    groups,
    items,
    isLoading = false,
}: NavigationProps) {
    // Yüklenme durumu
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

    // Grup bazlı navigasyon (yeni yapı)
    if (groups && groups.length > 0) {
        return (
            <>
                {groups.map((group, index) => (
                    <NavigationGroup key={group.title ?? index} group={group} />
                ))}
            </>
        );
    }

    // Geriye dönük uyumluluk: items prop'u ile basit kullanım
    if (items && items.length > 0) {
        return (
            <SidebarGroup>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {items.map((item) =>
                            item.items && item.items.length > 0 ? (
                                <NavCollapsible key={item.title} item={item} />
                            ) : (
                                <NavLink key={item.title} item={item} />
                            ),
                        )}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        );
    }

    return null;
}

// Tip exports
export type { NavGroup, NavItem, NavItemAction };
