import AuthSplitLayout from '@/pages/auth/components/layouts/auth-split-layout';

export default function Layout({
    children,
    title,
    description,
    ...props
}: {
    children: React.ReactNode;
    title: string;
    description: string;
}) {
    return (
        <AuthSplitLayout title={title} description={description} {...props}>
            {children}
        </AuthSplitLayout>
    );
}
