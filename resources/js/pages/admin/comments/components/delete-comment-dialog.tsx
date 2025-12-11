import DeleteComment from '@/actions/App/Actions/Admin/Comments/DeleteComment';
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
    commentId: number | null;
}

export function DeleteCommentDialog({ open, onOpenChange, commentId }: Props) {
    const { t } = useTranslation();
    const { refetch } = useSidebarCount();

    const handleDelete = () => {
        if (commentId) {
            router.delete(DeleteComment.url(commentId), {
                onSuccess: () => {
                    refetch();
                    onOpenChange(false);
                },
            });
        }
    };

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        {t('Are you sure you want to delete this comment?')}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        {t(
                            'This action cannot be undone. This will permanently delete the comment.',
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
