import CreateService from '@/actions/App/Actions/Admin/Services/CreateService';
import UploadContentImage from '@/actions/App/Actions/Admin/Services/UploadContentImage';
import HeadingSmall from '@/components/heading-small';
import { TiptapEditor } from '@/components/tiptap/tiptap-editor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSidebarCount } from '@/contexts/sidebar-count-context';
import admin from '@/routes/admin';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Upload } from 'lucide-react';
import { type ChangeEvent, type FormEvent, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import Layout from '../layout';

export default function CreateServicePage() {
    const { t } = useTranslation();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { refetch } = useSidebarCount();

    const sessionKey = useMemo(() => uuidv4(), []);

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('Services'),
            href: admin.services.index().url,
        },
        {
            title: t('Add New Service'),
            href: admin.services.create().url,
        },
    ];

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        content: '',
        price: '',
        duration: '',
        image: null as File | null,
        session_key: sessionKey,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(CreateService.url(), {
            onSuccess: () => {
                refetch();
            },
            forceFormData: true,
        });
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData('image', file);
    };

    return (
        <Layout breadcrumbs={breadcrumbs}>
            <Head title={t('Add New Service')} />

            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href={admin.services.index().url}>
                            <ArrowLeft className="size-4" />
                        </Link>
                    </Button>
                    <HeadingSmall
                        title={t('Add New Service')}
                        description={t('Add a new service to your salon')}
                    />
                </div>

                <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name">{t('Service Name')}</Label>
                        <Input
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder={t('Enter service name')}
                        />
                        {errors.name && (
                            <p className="text-sm text-destructive">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="description">{t('Description')}</Label>
                        <textarea
                            id="description"
                            className="min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
                            value={data.description}
                            onChange={(e) =>
                                setData('description', e.target.value)
                            }
                            placeholder={t('Short description for homepage')}
                        />
                        {errors.description && (
                            <p className="text-sm text-destructive">
                                {errors.description}
                            </p>
                        )}
                    </div>

                    <div className="grid gap-2">
                        <Label>{t('Content')}</Label>
                        <TiptapEditor
                            content={data.content}
                            onChange={(content) => setData('content', content)}
                            placeholder={t('Detailed service content...')}
                            editorClassName="min-h-[200px]"
                            uploadEndpoint={UploadContentImage.url()}
                            sessionKey={sessionKey}
                        />
                        {errors.content && (
                            <p className="text-sm text-destructive">
                                {errors.content}
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
                                onClick={() => fileInputRef.current?.click()}
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

                    <div className="flex items-center gap-4">
                        <Button type="submit" disabled={processing}>
                            {processing ? t('Saving...') : t('Save Service')}
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href={admin.services.index().url}>
                                {t('Cancel')}
                            </Link>
                        </Button>
                    </div>
                </form>
            </div>
        </Layout>
    );
}
