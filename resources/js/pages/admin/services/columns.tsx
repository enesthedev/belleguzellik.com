import ShowUpdateService from '@/actions/App/Actions/Admin/Services/ShowUpdateService';
import { Button } from '@/components/ui/button';
import { type Service } from '@/types/models';
import { Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { Clock, Edit, Trash2 } from 'lucide-react';

export type { Service };

interface ColumnsProps {
    onDelete: (id: number) => void;
    t: (key: string) => string;
}

export function getColumns({
    onDelete,
    t,
}: ColumnsProps): ColumnDef<Service>[] {
    return [
        {
            accessorKey: 'name',
            header: t('Service Name'),
            cell: ({ row }) => {
                const service = row.original;
                return (
                    <div className="flex items-center gap-3">
                        {service.image_url ? (
                            <img
                                src={service.image_url}
                                alt={service.name}
                                className="size-10 rounded-md object-cover"
                            />
                        ) : (
                            <div className="flex size-10 items-center justify-center rounded-md bg-muted">
                                <span className="text-xs text-muted-foreground">
                                    {service.name.charAt(0).toUpperCase()}
                                </span>
                            </div>
                        )}
                        <span className="font-medium">{service.name}</span>
                    </div>
                );
            },
        },
        {
            accessorKey: 'duration',
            header: t('Duration'),
            cell: ({ row }) => {
                const duration = row.getValue('duration') as number;
                return (
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Clock className="size-4" />
                        <span>
                            {duration} {t('min')}
                        </span>
                    </div>
                );
            },
        },
        {
            id: 'actions',
            cell: ({ row }) => {
                const service = row.original;
                return (
                    <div className="flex items-center justify-end gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="size-8 text-muted-foreground hover:text-primary"
                            asChild
                        >
                            <Link
                                href={ShowUpdateService.url({
                                    service: service.slug,
                                })}
                            >
                                <span className="sr-only">{t('Edit')}</span>
                                <Edit className="size-4" />
                            </Link>
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="size-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
                            onClick={() => onDelete(service.id)}
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
