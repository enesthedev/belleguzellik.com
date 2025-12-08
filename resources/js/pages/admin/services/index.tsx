import { Button } from '@/components/ui/button';
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from '@/components/ui/empty';
import admin from '@/routes/admin';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Plus, Scissors } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Layout from '../layout';
import { getColumns, type Service } from './columns';
import { CreateServiceSheet } from './components/create-service-sheet';
import { DeleteServiceDialog } from './components/delete-service-dialog';
import { EditServiceSheet } from './components/edit-service-sheet';
import { DataTable } from './data-table';

interface Props {
    services: Service[];
}

export default function ServicesIndex({ services }: Props) {
    const { t } = useTranslation();
    const [createSheetOpen, setCreateSheetOpen] = useState(false);
    const [editSheetOpen, setEditSheetOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [serviceToEdit, setServiceToEdit] = useState<Service | null>(null);
    const [serviceToDelete, setServiceToDelete] = useState<number | null>(null);

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('Services'),
            href: admin.services.index().url,
        },
    ];

    const handleEditClick = (service: Service) => {
        setServiceToEdit(service);
        setEditSheetOpen(true);
    };

    const handleDeleteClick = (id: number) => {
        setServiceToDelete(id);
        setDeleteDialogOpen(true);
    };

    const columns = useMemo(
        () =>
            getColumns({
                onEdit: handleEditClick,
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
                    <Button size="sm" onClick={() => setCreateSheetOpen(true)}>
                        <Plus className="mr-1.5 size-3.5" />
                        {t('Add Service')}
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

            <CreateServiceSheet
                open={createSheetOpen}
                onOpenChange={setCreateSheetOpen}
            />
            <EditServiceSheet
                open={editSheetOpen}
                onOpenChange={setEditSheetOpen}
                service={serviceToEdit}
            />
            <DeleteServiceDialog
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
                serviceId={serviceToDelete}
            />
        </Layout>
    );
}

