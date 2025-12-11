import { type PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
    return (
        <main className="h-screen snap-y snap-mandatory overflow-y-auto">
            {children}
        </main>
    );
}
