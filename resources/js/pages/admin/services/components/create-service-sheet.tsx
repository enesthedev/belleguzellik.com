import CreateService from '@/actions/App/Actions/Admin/Services/CreateService';
import { Button } from '@/components/ui/button';
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
import { useSidebarCount } from '@/contexts/sidebar-count-context';
import { useForm } from '@inertiajs/react';
import { Upload } from 'lucide-react';
import { type ChangeEvent, type FormEvent, useRef } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function CreateServiceSheet({ open, onOpenChange }: Props) {
    const { t } = useTranslation();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { refetch } = useSidebarCount();

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        description: '',
        price: '',
        duration: '',
        image: null as File | null,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(CreateService.url(), {
            onSuccess: () => {
                reset();
                onOpenChange(false);
                refetch();
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
                        <SheetTitle>{t('Add New Service')}</SheetTitle>
                        <SheetDescription>
                            {t('Add a new service to your salon')}
                        </SheetDescription>
                    </SheetHeader>

                    <div className="flex-1 space-y-4 overflow-y-auto p-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">{t('Service Name')}</Label>
                            <Input
                                id="name"
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
                            <Label htmlFor="description">
                                {t('Description')}
                            </Label>
                            <textarea
                                id="description"
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
                                <Label htmlFor="price">{t('Price')} (TL)</Label>
                                <Input
                                    id="price"
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
                                <Label htmlFor="duration">
                                    {t('Duration')} ({t('min')})
                                </Label>
                                <Input
                                    id="duration"
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

                        <div className="grid gap-2">
                            <Label>{t('Image')}</Label>
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
                                        : t('Choose Image')}
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
                            {processing ? t('Saving...') : t('Save Service')}
                        </Button>
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    );
}
