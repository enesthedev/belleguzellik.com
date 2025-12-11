import ShowService from '@/actions/App/Actions/ShowService';
import { SEOHead } from '@/components/seo-head';
import { Service } from '@/types';
import { Link } from '@inertiajs/react';
import { ArrowRight, Clock } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Layout from './layout';

interface Props {
    services: Service[];
    seo: {
        title: string;
        description: string;
    };
}

export default function ServicesIndex({ services, seo }: Props) {
    const { t } = useTranslation();
    const [searchQuery, setSearchQuery] = useState('');

    const filteredServices = services.filter((service) =>
        service.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    return (
        <Layout>
            <SEOHead title={seo.title} description={seo.description} />

            <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
                <header className="mb-10 text-center">
                    <h1 className="mb-4 font-serif text-4xl font-bold tracking-tight text-stone-800 md:text-5xl lg:text-6xl">
                        {t('Our Services')}
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg text-stone-600">
                        {t(
                            'Discover our comprehensive range of beauty treatments',
                        )}
                    </p>
                </header>

                {services.length === 0 ? (
                    <div className="py-16 text-center">
                        <p className="text-lg text-stone-500">
                            {t('No services found')}
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredServices.map((service) => (
                            <Link
                                key={service.id}
                                href={ShowService.url(service.slug)}
                                className="group relative overflow-hidden rounded-2xl border border-stone-200/60 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-amber-200/60 hover:shadow-xl"
                            >
                                <div className="aspect-[4/3] overflow-hidden">
                                    {service.image_url ? (
                                        <img
                                            src={service.image_url}
                                            alt={service.name}
                                            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="flex size-full items-center justify-center bg-gradient-to-br from-amber-100 to-amber-200">
                                            <span className="text-5xl font-bold text-amber-600/30">
                                                {service.name.charAt(0)}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div className="p-5">
                                    <h2 className="mb-2 text-xl font-semibold text-stone-800 transition-colors group-hover:text-amber-700">
                                        {service.name}
                                    </h2>

                                    {service.description && (
                                        <p className="mb-4 line-clamp-2 text-sm text-stone-600">
                                            {service.description}
                                        </p>
                                    )}

                                    <div className="flex items-center justify-between">
                                        <span className="flex items-center gap-1 text-sm text-stone-500">
                                            <Clock className="size-4" />
                                            {service.duration} {t('min')}
                                        </span>
                                        <ArrowRight className="size-5 text-stone-400 transition-all group-hover:translate-x-1 group-hover:text-amber-600" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    );
}
