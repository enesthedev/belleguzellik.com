import { LucideIcon } from 'lucide-react';

export type { Comment, Service, TemporaryUpload, User } from './models';

type Auth = {
    user: User;
};

type BreadcrumbItem = {
    title: string;
    href: string;
};

type NavItem = {
    title: string;
    url?: string;
    /** @deprecated Use `url` instead. Kept for backward compatibility */
    href?: string;
    icon?: LucideIcon | null;
    badge?: string | number;
    items?: NavItem[];
};

type SharedData = {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    locale: string;
    app_url: string;
    current_url: string;
    counts?: {
        comments: number;
        services: number;
    };
    [key: string]: unknown;
};

export type { Auth, BreadcrumbItem, NavItem, SharedData };
