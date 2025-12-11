import ShowService from '@/actions/App/Actions/ShowService';
import { SEOHead } from '@/components/seo-head';
import { TiptapRenderer } from '@/components/tiptap/tiptap-renderer';
import { Service } from '@/types/models';
import { Link } from '@inertiajs/react';
import { ArrowRight, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Layout from './layout';

interface Props {
    service: Service;
    relatedServices: Service[];
    seo: {
        title: string;
        description: string;
        image?: string | null;
    };
}

export default function ServiceShow({ service, relatedServices, seo }: Props) {
    const { t } = useTranslation();

    return (
        <Layout>
            <SEOHead
                title={seo.title}
                description={seo.description}
                image={seo.image}
                type="article"
            />

            <article className="mx-auto pb-12">
                {service.image_url && (
                    <div className="mb-8 overflow-hidden">
                        <img
                            src={service.image_url}
                            alt={service.name}
                            className="aspect-video max-h-[40vh] w-full object-cover"
                        />
                    </div>
                )}
                <div className="mx-auto max-w-4xl px-4">
                    <h1 className="mb-4 font-serif text-4xl font-bold tracking-tight text-stone-800 md:text-5xl">
                        {service.name}
                    </h1>

                    <div className="flex flex-wrap items-center gap-4">
                        <span className="flex items-center gap-1.5 rounded-full bg-stone-100 px-3 py-1.5 text-sm text-stone-600">
                            <Clock className="size-4" />
                            {service.duration} {t('min')}
                        </span>
                    </div>

                    {service.content && (
                        <div className="mt-5 mb-12">
                            <TiptapRenderer
                                content={service.content}
                                className="text-stone-700"
                            />
                        </div>
                    )}

                    {relatedServices.length > 0 && (
                        <section>
                            <h2 className="mb-6 text-2xl font-bold text-stone-800">
                                {t('You Might Also Like')}
                            </h2>
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {relatedServices.map((related) => (
                                    <Link
                                        key={related.id}
                                        href={ShowService.url(related.slug)}
                                        className="group overflow-hidden rounded-2xl border border-stone-200/60 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-amber-200/60 hover:shadow-xl"
                                    >
                                        <div className="aspect-[4/3] overflow-hidden">
                                            {related.image_url ? (
                                                <img
                                                    src={related.image_url}
                                                    alt={related.name}
                                                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="flex size-full items-center justify-center bg-gradient-to-br from-amber-100 to-amber-200">
                                                    <span className="text-4xl font-bold text-amber-600/30">
                                                        {related.name.charAt(0)}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-4">
                                            <h3 className="mb-1 font-semibold text-stone-800 group-hover:text-amber-700">
                                                {related.name}
                                            </h3>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="flex items-center gap-1 text-stone-500">
                                                    <Clock className="size-3.5" />
                                                    {related.duration}{' '}
                                                    {t('min')}
                                                </span>
                                                <ArrowRight className="size-4 text-stone-400 transition-all group-hover:translate-x-1 group-hover:text-amber-600" />
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </article>
        </Layout>
    );
}
