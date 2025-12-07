import { AppContent } from '@/pages/admin/components/shell/app-content';
import { AppHeader } from '@/pages/admin/components/shell/app-header';
import { AppShell } from '@/pages/admin/components/shell/app-shell';
import { type BreadcrumbItem } from '@/types';
import type { PropsWithChildren } from 'react';

export default function AdminHeaderLayout({
    children,
    breadcrumbs,
}: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    return (
        <AppShell>
            <AppHeader breadcrumbs={breadcrumbs} />
            <AppContent>{children}</AppContent>
        </AppShell>
    );
}
