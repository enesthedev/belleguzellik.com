import UpdateService from '@/actions/App/Actions/Admin/Services/UpdateService';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';
import { useForm } from '@inertiajs/react';
import { Upload } from 'lucide-react';
import { type ChangeEvent, type FormEvent, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { type Service } from '../columns';

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    service: Service | null;
}

export function EditServiceSheet({ open, onOpenChange, service }: Props) {
    const { t } = useTranslation();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { data, setData, put, processing, errors, reset } = useForm({
        name: '',
        description: '',
        price: '',
        duration: '',
        is_active: true,
        image: null as File | null,
    });

    useEffect(() => {
        if (service) {
            setData({
                name: service.name,
                description: service.description || '',
                price: service.price,
                duration: service.duration.toString(),
                is_active: service.is_active,
                image: null,
            });
        }
    }, [service]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!service) return;

        put(UpdateService.url(service.id), {
            onSuccess: () => {
                reset();
                onOpenChange(false);
            },
            forceFormData: true,
        });
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData('image', file);
    };

    const handleOpenChange = (open: boolean) => {
        if (!open) {
            reset();
        }
        onOpenChange(open);
    };

    return (
        <Sheet open={open} onOpenChange={handleOpenChange}>
            <SheetContent side="left">
                <form onSubmit={handleSubmit} className="flex h-full flex-col">
                    <SheetHeader>
                        <SheetTitle>{t('Edit Service')}</SheetTitle>
                        <SheetDescription>
                            {t('Update service information')}
                        </SheetDescription>
                    </SheetHeader>

                    <div className="flex-1 space-y-4 overflow-y-auto p-4">
                        <div className="grid gap-2">
                            <Label htmlFor="edit-name">
                                {t('Service Name')}
                            </Label>
                            <Input
                                id="edit-name"
                                value={data.name}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                                placeholder={t('Enter service name')}
                            />
                            {errors.name && (
                                <p className="text-sm text-destructive">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="edit-description">
                                {t('Description')}
                            </Label>
                            <textarea
                                id="edit-description"
                                className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
                                value={data.description}
                                onChange={(e) =>
                                    setData('description', e.target.value)
                                }
                                placeholder={t('Enter service description')}
                            />
                            {errors.description && (
                                <p className="text-sm text-destructive">
                                    {errors.description}
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="edit-price">
                                    {t('Price')} (TL)
                                </Label>
                                <Input
                                    id="edit-price"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={data.price}
                                    onChange={(e) =>
                                        setData('price', e.target.value)
                                    }
                                    placeholder="0.00"
                                />
                                {errors.price && (
                                    <p className="text-sm text-destructive">
                                        {errors.price}
                                    </p>
                                )}
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="edit-duration">
                                    {t('Duration')} ({t('min')})
                                </Label>
                                <Input
                                    id="edit-duration"
                                    type="number"
                                    min="1"
                                    value={data.duration}
                                    onChange={(e) =>
                                        setData('duration', e.target.value)
                                    }
                                    placeholder="30"
                                />
                                {errors.duration && (
                                    <p className="text-sm text-destructive">
                                        {errors.duration}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-3 rounded-lg border p-3">
                            <Checkbox
                                id="edit-is-active"
                                checked={data.is_active}
                                onCheckedChange={(checked) =>
                                    setData('is_active', checked === true)
                                }
                            />
                            <div className="space-y-0.5">
                                <Label htmlFor="edit-is-active">
                                    {t('Active Status')}
                                </Label>
                                <p className="text-sm text-muted-foreground">
                                    {t(
                                        'When inactive, this service will not be displayed',
                                    )}
                                </p>
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label>{t('Image')}</Label>
                            {service?.image_url && !data.image && (
                                <div className="mb-2">
                                    <img
                                        src={service.image_url}
                                        alt={service.name}
                                        className="h-20 w-auto rounded-md object-cover"
                                    />
                                </div>
                            )}
                            <div className="flex items-center gap-2">
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() =>
                                        fileInputRef.current?.click()
                                    }
                                    className="w-full justify-start"
                                >
                                    <Upload className="mr-2 size-4" />
                                    {data.image
                                        ? data.image.name
                                        : t('Choose New Image')}
                                </Button>
                                {data.image && (
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setData('image', null)}
                                    >
                                        {t('Remove')}
                                    </Button>
                                )}
                            </div>
                            {errors.image && (
                                <p className="text-sm text-destructive">
                                    {errors.image}
                                </p>
                            )}
                        </div>
                    </div>

                    <SheetFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => handleOpenChange(false)}
                        >
                            {t('Cancel')}
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? t('Saving...') : t('Update Service')}
                        </Button>
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    );
}

