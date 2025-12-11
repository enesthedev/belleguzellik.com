import ShowComments from '@/actions/App/Actions/Admin/Comments/ShowComments';
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
import { Head } from '@inertiajs/react';
import { Bell, Plus } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Layout from '../layout';
import { getColumns, type Comment } from './columns';
import { CreateCommentSheet } from './components/create-comment-sheet';
import { DeleteCommentDialog } from './components/delete-comment-dialog';
import { ViewCommentDialog } from './components/view-comment-dialog';
import { DataTable } from './data-table';

interface Props {
    comments: Comment[];
}

export default function CommentsIndex({ comments }: Props) {
    const { t } = useTranslation();
    const [sheetOpen, setSheetOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [viewDialogOpen, setViewDialogOpen] = useState(false);
    const [commentToDelete, setCommentToDelete] = useState<number | null>(null);
    const [commentToView, setCommentToView] = useState<Comment | null>(null);

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('Comments'),
            href: ShowComments.url(),
        },
    ];

    const handleDeleteClick = (id: number) => {
        setCommentToDelete(id);
        setDeleteDialogOpen(true);
    };

    const handleViewClick = (comment: Comment) => {
        setCommentToView(comment);
        setViewDialogOpen(true);
    };

    const columns = useMemo(
        () =>
            getColumns({
                onDelete: handleDeleteClick,
                onView: handleViewClick,
                t,
            }),
        [t],
    );

    return (
        <Layout breadcrumbs={breadcrumbs}>
            <Head title={t('Manage Comments')} />

            <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <Button size="sm" onClick={() => setSheetOpen(true)}>
                        <Plus className="mr-1.5 size-3.5" />
                        {t('Add Comment')}
                    </Button>
                </div>

                {comments.length === 0 ? (
                    <Empty className="border border-dashed">
                        <EmptyHeader>
                            <EmptyMedia variant="icon">
                                <Bell />
                            </EmptyMedia>
                            <EmptyTitle>{t('No comments yet')}</EmptyTitle>
                            <EmptyDescription>
                                {t('Add your first customer comment')}
                            </EmptyDescription>
                        </EmptyHeader>
                        <EmptyContent></EmptyContent>
                    </Empty>
                ) : (
                    <DataTable columns={columns} data={comments} />
                )}
            </div>

            <CreateCommentSheet open={sheetOpen} onOpenChange={setSheetOpen} />
            <DeleteCommentDialog
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
                commentId={commentToDelete}
            />
            <ViewCommentDialog
                open={viewDialogOpen}
                onOpenChange={setViewDialogOpen}
                comment={commentToView}
            />
        </Layout>
    );
}
