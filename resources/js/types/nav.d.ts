import { LucideIcon } from 'lucide-react';

/**
 * Dropdown menü öğesi
 */
export interface NavDropdownItem {
    label: string;
    href?: string;
    onClick?: () => void;
    icon?: LucideIcon;
    destructive?: boolean;
    separator?: boolean;
}

/**
 * Menü öğesi action'ı (sağ taraftaki buton veya dropdown)
 */
export interface NavItemAction {
    icon: LucideIcon;
    label: string;
    onClick?: () => void;
    showOnHover?: boolean;
    dropdownItems?: NavDropdownItem[];
}

/**
 * Tekil navigasyon öğesi
 */
export interface NavItem {
    title: string;
    url?: string;
    /** @deprecated Use `url` instead. Kept for backward compatibility */
    href?: string;
    icon?: LucideIcon | null;
    badge?: string | number;
    isActive?: boolean;
    disabled?: boolean;
    action?: NavItemAction;
    items?: NavItem[];
}

/**
 * Navigasyon grubu - birden fazla NavItem'ı gruplar
 */
export interface NavGroup {
    title?: string;
    collapsible?: boolean;
    defaultOpen?: boolean;
    action?: {
        icon: LucideIcon;
        label: string;
        onClick?: () => void;
    };
    items: NavItem[];
}
