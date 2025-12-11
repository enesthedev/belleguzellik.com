import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import admin from '@/routes/admin';
import { Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { Clock, Edit, Trash2 } from 'lucide-react';

export interface Service {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    content: string | null;
    price: string;
    duration: number;
    is_active: boolean;
    image_url: string | null;
    created_at: string;
}

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
            accessorKey: 'price',
            header: t('Price'),
            cell: ({ row }) => {
                const price = parseFloat(row.getValue('price'));
                return (
                    <span className="font-medium">
                        {new Intl.NumberFormat('tr-TR', {
                            style: 'currency',
                            currency: 'TRY',
                        }).format(price)}
                    </span>
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
            accessorKey: 'is_active',
            header: t('Status'),
            cell: ({ row }) => {
                const isActive = row.getValue('is_active') as boolean;
                return (
                    <Badge variant={isActive ? 'default' : 'secondary'}>
                        {isActive ? t('Active') : t('Inactive')}
                    </Badge>
                );
            },
        },
        {
            id: 'actions',
            cell: ({ row }) => {
                const service = row.original;
                return (
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="size-8 text-muted-foreground hover:text-primary"
                            asChild
                        >
                            <Link href={admin.services.edit(service.slug).url}>
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
