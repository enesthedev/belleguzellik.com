import { SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';

interface SEOHeadProps {
    title: string;
    description: string;
    image?: string | null;
    canonical?: string;
    noindex?: boolean;
    type?: 'website' | 'article';
    structuredData?: Record<string, unknown>;
}

export function SEOHead({
    title,
    description,
    image,
    canonical,
    noindex = false,
    type = 'website',
    structuredData,
}: SEOHeadProps) {
    const { name, app_url, current_url } = usePage<SharedData>().props;

    const fullTitle = `${title} | ${name}`;
    const canonicalUrl = canonical || current_url;
    const ogImage = image || `${app_url}/og-image.jpg`;
    const robotsContent = noindex ? 'noindex, nofollow' : 'index, follow';

    const defaultStructuredData = {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: name,
        url: app_url,
        image: ogImage,
        description: description,
        address: {
            '@type': 'PostalAddress',
            addressLocality: 'Türkiye',
        },
        openingHoursSpecification: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: [
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
            ],
            opens: '09:00',
            closes: '19:00',
        },
    };

    const jsonLd = structuredData || defaultStructuredData;

    return (
        <Head title={title}>
            <meta name="description" content={description} />
            <meta name="robots" content={robotsContent} />
            <link rel="canonical" href={canonicalUrl} />

            <meta property="og:type" content={type} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:site_name" content={name} />
            <meta property="og:locale" content="tr_TR" />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={ogImage} />

            <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        </Head>
    );
}
