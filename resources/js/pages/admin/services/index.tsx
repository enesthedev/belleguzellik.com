import ShowCreateService from '@/actions/App/Actions/Admin/Services/ShowCreateService';
import ShowServices from '@/actions/App/Actions/Admin/Services/ShowServices';
import { Button } from '@/components/ui/button';
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from '@/components/ui/empty';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Plus, Scissors } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Layout from '../layout';
import { getColumns, type Service } from './columns';
import { DeleteServiceDialog } from './components/delete-service-dialog';
import { DataTable } from './data-table';

interface Props {
    services: Service[];
}

export default function ServicesIndex({ services }: Props) {
    const { t } = useTranslation();
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [serviceToDelete, setServiceToDelete] = useState<number | null>(null);

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('Services'),
            href: ShowServices.url(),
        },
    ];

    const handleDeleteClick = (id: number) => {
        setServiceToDelete(id);
        setDeleteDialogOpen(true);
    };

    const columns = useMemo(
        () =>
            getColumns({
                onDelete: handleDeleteClick,
                t,
            }),
        [t],
    );

    return (
        <Layout breadcrumbs={breadcrumbs}>
            <Head title={t('Manage Services')} />

            <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <Button size="sm" asChild>
                        <Link href={ShowCreateService.url()}>
                            <Plus className="mr-1.5 size-3.5" />
                            {t('Add Service')}
                        </Link>
                    </Button>
                </div>

                {services.length === 0 ? (
                    <Empty className="border border-dashed">
                        <EmptyHeader>
                            <EmptyMedia variant="icon">
                                <Scissors />
                            </EmptyMedia>
                            <EmptyTitle>{t('No services yet')}</EmptyTitle>
                            <EmptyDescription>
                                {t('Add your first service')}
                            </EmptyDescription>
                        </EmptyHeader>
                        <EmptyContent></EmptyContent>
                    </Empty>
                ) : (
                    <DataTable columns={columns} data={services} />
                )}
            </div>

            <DeleteServiceDialog
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
                serviceId={serviceToDelete}
            />
        </Layout>
    );
}
