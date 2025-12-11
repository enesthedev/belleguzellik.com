import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { type Comment } from '@/types/models';
import { ColumnDef } from '@tanstack/react-table';
import { Eye, Star, Trash2 } from 'lucide-react';

export type { Comment };

interface ColumnsProps {
    onDelete: (id: number) => void;
    onView: (comment: Comment) => void;
    t: (key: string) => string;
}

export function getColumns({
    onDelete,
    onView,
    t,
}: ColumnsProps): ColumnDef<Comment>[] {
    return [
        {
            accessorKey: 'author',
            header: t('Author'),
            cell: ({ row }) => {
                const comment = row.original;
                return (
                    <div className="flex items-center gap-2">
                        <Avatar className="size-8">
                            <AvatarImage
                                src={comment.avatar_url || undefined}
                                alt={comment.author}
                            />
                            <AvatarFallback className="text-xs">
                                {comment.author.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{comment.author}</span>
                    </div>
                );
            },
        },
        {
            accessorKey: 'content',
            header: t('Comment'),
            cell: ({ row }) => (
                <span className="line-clamp-2 max-w-xs text-muted-foreground">
                    {row.getValue('content')}
                </span>
            ),
        },
        {
            accessorKey: 'rating',
            header: t('Rating'),
            cell: ({ row }) => {
                const rating = row.getValue('rating') as number;
                return (
                    <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }, (_, i) => (
                            <Star
                                key={i}
                                className={`size-3.5 ${
                                    i < rating
                                        ? 'fill-yellow-400 text-yellow-400'
                                        : 'text-gray-300'
                                }`}
                            />
                        ))}
                    </div>
                );
            },
        },
        {
            accessorKey: 'created_at',
            header: t('Date'),
            cell: ({ row }) => {
                const date = new Date(row.getValue('created_at'));
                return (
                    <span className="text-muted-foreground">
                        {date.toLocaleDateString()}
                    </span>
                );
            },
        },
        {
            id: 'actions',
            cell: ({ row }) => {
                const comment = row.original;
                return (
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="size-8 text-muted-foreground hover:text-primary"
                            onClick={() => onView(comment)}
                        >
                            <span className="sr-only">{t('View details')}</span>
                            <Eye className="size-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="size-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
                            onClick={() => onDelete(comment.id)}
                        >
                            <span className="sr-only">{t('Delete')}</span>
                            <Trash2 className="size-4" />
                        </Button>
                    </div>
                );
            },
        },
    ];
}
