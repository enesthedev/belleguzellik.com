import CreateComment from '@/actions/App/Actions/Admin/Comments/CreateComment';
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
import { useSidebarCount } from '@/hooks/use-sidebar-count';
import { useForm } from '@inertiajs/react';
import { Star, Upload } from 'lucide-react';
import { type ChangeEvent, type FormEvent, useRef } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function CreateCommentSheet({ open, onOpenChange }: Props) {
    const { t } = useTranslation();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { refetch } = useSidebarCount();

    const { data, setData, post, processing, errors, reset } = useForm({
        author: '',
        content: '',
        rating: 5,
        avatar: null as File | null,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(CreateComment.url(), {
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
        setData('avatar', file);
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
                        <SheetTitle>{t('Add New Comment')}</SheetTitle>
                        <SheetDescription>
                            {t(
                                'Add a customer review to display on your website',
                            )}
                        </SheetDescription>
                    </SheetHeader>

                    <div className="flex-1 space-y-4 overflow-y-auto p-4">
                        <div className="grid gap-2">
                            <Label htmlFor="author">{t('Author Name')}</Label>
                            <Input
                                id="author"
                                value={data.author}
                                onChange={(e) =>
                                    setData('author', e.target.value)
                                }
                                placeholder={t('Enter author name')}
                            />
                            {errors.author && (
                                <p className="text-sm text-destructive">
                                    {errors.author}
                                </p>
                            )}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="content">{t('Comment')}</Label>
                            <textarea
                                id="content"
                                className="min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
                                value={data.content}
                                onChange={(e) =>
                                    setData('content', e.target.value)
                                }
                                placeholder={t('Enter customer review')}
                            />
                            {errors.content && (
                                <p className="text-sm text-destructive">
                                    {errors.content}
                                </p>
                            )}
                        </div>

                        <div className="grid gap-2">
                            <Label>{t('Rating')}</Label>
                            <div className="flex items-center gap-1">
                                {Array.from({ length: 5 }, (_, i) => (
                                    <button
                                        key={i}
                                        type="button"
                                        onClick={() => setData('rating', i + 1)}
                                        className="focus:outline-none"
                                    >
                                        <Star
                                            className={`size-7 cursor-pointer transition-colors ${
                                                i < data.rating
                                                    ? 'fill-yellow-400 text-yellow-400'
                                                    : 'text-gray-300 hover:text-yellow-300'
                                            }`}
                                        />
                                    </button>
                                ))}
                            </div>
                            {errors.rating && (
                                <p className="text-sm text-destructive">
                                    {errors.rating}
                                </p>
                            )}
                        </div>

                        <div className="grid gap-2">
                            <Label>{t('Avatar')}</Label>
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
                                    {data.avatar
                                        ? data.avatar.name
                                        : t('Choose Image')}
                                </Button>
                                {data.avatar && (
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setData('avatar', null)}
                                    >
                                        {t('Remove')}
                                    </Button>
                                )}
                            </div>
                            {errors.avatar && (
                                <p className="text-sm text-destructive">
                                    {errors.avatar}
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
                            {processing ? t('Saving...') : t('Save Comment')}
                        </Button>
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    );
}
