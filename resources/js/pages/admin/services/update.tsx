import ShowServices from '@/actions/App/Actions/Admin/Services/ShowServices';
import ShowUpdateService from '@/actions/App/Actions/Admin/Services/ShowUpdateService';
import UpdateService from '@/actions/App/Actions/Admin/Services/UpdateService';
import UploadContentImage from '@/actions/App/Actions/Admin/Services/UploadContentImage';
import { TiptapEditor } from '@/components/tiptap/tiptap-editor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Service, type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Upload } from 'lucide-react';
import { useMemo, useRef, type ChangeEvent, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import Layout from '../layout';

interface Props {
    service: Service;
}

export default function UpdateServicePage({ service }: Props) {
    const { t } = useTranslation();

    const fileInputRef = useRef<HTMLInputElement>(null);
    const sessionKey = useMemo(() => uuidv4(), []);

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('Services'),
            href: ShowServices.url(),
        },
        {
            title: service.name,
            href: ShowUpdateService.url({ service: service.slug }),
        },
    ];

    const { data, setData, put, processing, errors } = useForm({
        name: service.name,
        description: service.description || '',
        content: service.content || '',
        duration: service.duration.toString(),
        image: null as File | null,
        session_key: sessionKey,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        put(UpdateService.url(service.slug), {
            forceFormData: true,
        });
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData('image', file);
    };

    return (
        <Layout breadcrumbs={breadcrumbs}>
            <Head title={t('Edit Service')} />

            <div className="space-y-6">
                <form onSubmit={handleSubmit} className="w-full space-y-6">
                    <div className="grid gap-2">
                        <Input
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder={t('Enter service name')}
                            className="rounded-none border-none px-0 py-0 text-xl shadow-none focus-visible:ring-0 md:text-2xl"
                        />
                        {errors.name && (
                            <p className="text-sm text-destructive">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    <div className="grid gap-2">
                        <Label>{t('Cover Image')}</Label>
                        {service.image_url && !data.image && (
                            <div className="mb-2">
                                <img
                                    src={service.image_url}
                                    alt={service.name}
                                    className="h-[20vh] w-full rounded-md object-cover"
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
                                onClick={() => fileInputRef.current?.click()}
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

                    <div className="grid grid-cols-4 items-start gap-4">
                        <div className="col-span-3 grid gap-2">
                            <Label htmlFor="description">
                                {t('Description')}
                            </Label>
                            <textarea
                                id="description"
                                className="min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
                                value={data.description}
                                onChange={(e) =>
                                    setData('description', e.target.value)
                                }
                                placeholder={t(
                                    'Short description for homepage',
                                )}
                            />
                            {errors.description && (
                                <p className="text-sm text-destructive">
                                    {errors.description}
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

                    <div className="flex items-center gap-4">
                        <Button type="submit" disabled={processing}>
                            {processing ? t('Saving...') : t('Update Service')}
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href={ShowServices.url()}>{t('Cancel')}</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </Layout>
    );
}
