import DeleteService from '@/actions/App/Actions/Admin/Services/DeleteService';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useSidebarCount } from '@/hooks/use-sidebar-count';
import { router } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    serviceId: number | null;
}

export function DeleteServiceDialog({ open, onOpenChange, serviceId }: Props) {
    const { t } = useTranslation();
    const { refetch } = useSidebarCount();

    const handleDelete = () => {
        if (serviceId) {
            router.delete(DeleteService.url(serviceId), {
                onSuccess: () => {
                    onOpenChange(false);
                    refetch();
                },
            });
        }
    };

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        {t('Are you sure you want to delete this service?')}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        {t(
                            'This action cannot be undone. This will permanently delete the service.',
                        )}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>{t('Cancel')}</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDelete}
                        className="bg-destructive text-white hover:bg-destructive/90"
                    >
                        {t('Delete')}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
