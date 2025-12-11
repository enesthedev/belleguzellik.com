import { SubPageHeader } from '@/components/sub-page-header';
import { type PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white">
            <SubPageHeader />
            <main>{children}</main>
        </div>
    );
}
