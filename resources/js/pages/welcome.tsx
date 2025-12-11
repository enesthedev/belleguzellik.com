import ShowService from '@/actions/App/Actions/ShowService';
import ShowServices from '@/actions/App/Actions/ShowServices';
import AppLogoIcon from '@/components/app-logo-icon';
import { SEOHead } from '@/components/seo-head';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from '@/components/ui/carousel';
import { Link } from '@inertiajs/react';
import Autoplay from 'embla-carousel-autoplay';
import { ArrowRight, Clock, MapPin, Phone, Quote } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActionButton } from './components/action-button';
import { Animated } from './components/animated';
import { CarouselDots } from './components/carousel-dots';
import { Section } from './components/section';
import { StarRating } from './components/star-rating';
import { VideoBackground } from './components/video-background';
import Layout from './layout';

interface Comment {
    id: number;
    author: string;
    content: string;
    rating: number;
    avatar_url: string | null;
}

interface Service {
    id: number;
    slug: string;
    name: string;
    description: string | null;
    duration: number;
    image_url: string | null;
}

interface Props {
    comments: Comment[];
    services: Service[];
    seo: {
        title: string;
        description: string;
    };
}

function getInitials(name: string): string {
    return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
}

export default function Welcome({ comments, services, seo }: Props) {
    const { t } = useTranslation();

    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);

    const [servicesApi, setServicesApi] = useState<CarouselApi>();
    const [servicesCurrent, setServicesCurrent] = useState(0);
    const [servicesCount, setServicesCount] = useState(0);

    const onSelect = useCallback(() => {
        if (!api) return;
        setCurrent(api.selectedScrollSnap());
    }, [api]);

    const onServicesSelect = useCallback(() => {
        if (!servicesApi) return;
        setServicesCurrent(servicesApi.selectedScrollSnap());
    }, [servicesApi]);

    useEffect(() => {
        if (!api) return;

        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap());

        api.on('select', onSelect);
        return () => {
            api.off('select', onSelect);
        };
    }, [api, onSelect]);

    useEffect(() => {
        if (!servicesApi) return;

        setServicesCount(servicesApi.scrollSnapList().length);
        setServicesCurrent(servicesApi.selectedScrollSnap());

        servicesApi.on('select', onServicesSelect);
        return () => {
            servicesApi.off('select', onServicesSelect);
        };
    }, [servicesApi, onServicesSelect]);

    return (
        <Layout>
            <SEOHead title={seo.title} description={seo.description} />

            <Section id="hero" ariaLabel={t('Home Page')} className="relative">
                <VideoBackground />

                <div className="relative z-10 flex h-full flex-col items-center justify-end px-6 pb-12 md:w-1/2 md:items-start md:justify-center md:px-12 md:pb-0 lg:w-2/5 lg:px-16">
                    <Animated
                        as="header"
                        className="mb-6 flex w-full justify-center delay-200 md:mb-8"
                    >
                        <AppLogoIcon className="h-44 w-auto" />
                    </Animated>

                    <div className="w-full max-w-md text-center md:max-w-none md:text-left">
                        <nav
                            aria-label={t('Quick Actions')}
                            className="flex w-full flex-col gap-4"
                        >
                            <Animated className="delay-300">
                                <ActionButton
                                    href="https://maps.app.goo.gl/ZEXiuMcWRDHEGtNz8"
                                    icon={
                                        <MapPin
                                            className="size-6 text-gray-700"
                                            aria-hidden="true"
                                        />
                                    }
                                    label={t('Get Directions')}
                                />
                            </Animated>
                            <Animated className="delay-[400ms]">
                                <ActionButton
                                    href="https://wa.me/905438966543?text=Merhaba%20hizmetleriniz%20hakkında%20bilgi%20almak%20istiyorum"
                                    icon={
                                        <Phone
                                            className="size-6 text-gray-700"
                                            aria-hidden="true"
                                        />
                                    }
                                    label={t('Book Appointment')}
                                />
                            </Animated>
                        </nav>
                    </div>
                </div>
            </Section>

            {services.length > 0 && (
                <Section
                    id="services"
                    ariaLabel={t('Our Services')}
                    className="flex flex-col items-center justify-center bg-gradient-to-b from-stone-100 via-white to-stone-50 px-4 py-12 md:px-12 md:py-20 lg:px-16"
                >
                    <div className="mx-auto w-full max-w-6xl">
                        <header className="mb-8 text-center md:mb-12">
                            <h2 className="mb-3 font-serif text-3xl font-semibold tracking-tight text-stone-800 md:mb-4 md:text-5xl lg:text-6xl">
                                {t('Our Services')}
                            </h2>
                            <p className="mx-auto max-w-2xl text-sm text-stone-600 sm:text-base md:text-xl">
                                {t(
                                    'Discover our wide range of beauty services',
                                )}
                            </p>
                        </header>

                        <Carousel
                            setApi={setServicesApi}
                            opts={{
                                align: 'start',
                                loop: true,
                            }}
                            className="mx-auto w-full"
                        >
                            <CarouselContent className="-ml-4">
                                {services.map((service) => (
                                    <CarouselItem
                                        key={service.id}
                                        className="pl-4 sm:basis-1/2 lg:basis-1/3"
                                    >
                                        <Link
                                            href={ShowService.url({
                                                service: service.slug,
                                            })}
                                            className="group relative block h-full overflow-hidden rounded-2xl border border-stone-200/60 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-amber-200/60"
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
                                                        <span className="text-4xl font-bold text-amber-600/30">
                                                            {service.name.charAt(
                                                                0,
                                                            )}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="p-5">
                                                <h3 className="mb-2 text-lg font-semibold text-stone-800 transition-colors group-hover:text-amber-700">
                                                    {service.name}
                                                </h3>

                                                {service.description && (
                                                    <p className="mb-4 line-clamp-2 text-sm text-stone-600">
                                                        {service.description}
                                                    </p>
                                                )}

                                                <div className="flex items-center justify-between">
                                                    <span className="flex items-center gap-1 text-sm text-stone-500">
                                                        <Clock className="size-3.5" />
                                                        {service.duration}{' '}
                                                        {t('min')}
                                                    </span>
                                                    <ArrowRight className="size-5 text-stone-400 transition-all group-hover:translate-x-1 group-hover:text-amber-600" />
                                                </div>
                                            </div>
                                        </Link>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>

                            <CarouselPrevious className="hidden border-stone-200 bg-white/90 text-stone-600 shadow-lg backdrop-blur-sm hover:bg-white hover:text-amber-600 md:-left-4 md:flex lg:-left-12" />
                            <CarouselNext className="hidden border-stone-200 bg-white/90 text-stone-600 shadow-lg backdrop-blur-sm hover:bg-white hover:text-amber-600 md:-right-4 md:flex lg:-right-12" />
                        </Carousel>

                        <CarouselDots
                            count={servicesCount}
                            current={servicesCurrent}
                        />

                        <div className="mt-10 text-center">
                            <Link
                                href={ShowServices.url()}
                                className="inline-flex items-center gap-2 rounded-full border border-amber-600 bg-amber-600 px-8 py-3 font-medium text-white shadow-lg shadow-amber-200/50 transition-all hover:bg-amber-700 hover:shadow-xl"
                            >
                                {t('View All Services')}
                                <ArrowRight className="size-4" />
                            </Link>
                        </div>
                    </div>
                </Section>
            )}

            {comments.length > 0 && (
                <Section
                    id="testimonials"
                    ariaLabel={t('Customer Reviews')}
                    className="flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-stone-50 via-amber-50/30 to-stone-100 px-4 py-8 md:px-12 md:py-16 lg:px-16"
                >
                    <div className="mx-auto flex h-full w-full max-w-5xl flex-col justify-center">
                        <header className="mb-6 text-center md:mb-12">
                            <h2
                                id="testimonials-title"
                                className="mb-3 font-serif text-3xl font-semibold tracking-tight text-stone-800 md:mb-4 md:text-5xl lg:text-6xl"
                            >
                                {t('What Our Clients Say')}
                            </h2>
                            <p className="mx-auto max-w-2xl text-sm text-stone-600 sm:text-base md:text-xl">
                                {t(
                                    'Hear from our satisfied customers about their experience',
                                )}
                            </p>
                        </header>

                        <div className="w-full">
                            <Carousel
                                setApi={setApi}
                                opts={{
                                    align: 'start',
                                    loop: true,
                                }}
                                plugins={[
                                    Autoplay({
                                        delay: 4000,
                                        stopOnInteraction: true,
                                        stopOnMouseEnter: true,
                                    }),
                                ]}
                                className="mx-auto w-full max-w-6xl"
                            >
                                <CarouselContent className="-ml-4">
                                    {comments.map((comment, index) => (
                                        <CarouselItem
                                            key={`${comment.author}-${index}`}
                                            className="pl-4 md:basis-1/2 lg:basis-1/3"
                                        >
                                            <article className="group relative flex h-full max-h-[280px] flex-col overflow-hidden rounded-3xl border border-stone-200/60 bg-gradient-to-br from-white via-stone-50/50 to-amber-50/30 p-6 transition-all duration-500 hover:border-amber-200/60">
                                                <div className="absolute -top-4 -right-4 opacity-[0.07] transition-all duration-500 group-hover:opacity-[0.12]">
                                                    <Quote className="size-24 rotate-180 text-amber-600" />
                                                </div>

                                                <div className="relative z-10 flex flex-1 flex-col">
                                                    <div className="mb-4">
                                                        <StarRating
                                                            rating={
                                                                comment.rating
                                                            }
                                                        />
                                                    </div>

                                                    <blockquote className="mb-2 flex-1">
                                                        <p className="font-serif text-base leading-relaxed text-stone-700 italic">
                                                            &quot;
                                                            {comment.content}
                                                            &quot;
                                                        </p>
                                                    </blockquote>

                                                    <footer className="mt-4 flex items-center gap-3 border-t border-stone-100 pt-4">
                                                        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-500 font-semibold text-white shadow-md shadow-amber-200/50">
                                                            {getInitials(
                                                                comment.author,
                                                            )}
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-stone-800">
                                                                {comment.author}
                                                            </p>
                                                            <p className="text-sm text-amber-600/80">
                                                                {t('Customer')}
                                                            </p>
                                                        </div>
                                                    </footer>
                                                </div>
                                            </article>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>

                                <CarouselPrevious className="hidden border-stone-200 bg-white/90 text-stone-600 shadow-lg backdrop-blur-sm hover:bg-white hover:text-amber-600 md:-left-4 md:flex lg:-left-12" />
                                <CarouselNext className="hidden border-stone-200 bg-white/90 text-stone-600 shadow-lg backdrop-blur-sm hover:bg-white hover:text-amber-600 md:-right-4 md:flex lg:-right-12" />
                            </Carousel>

                            <CarouselDots count={count} current={current} />
                        </div>
                    </div>
                </Section>
            )}
        </Layout>
    );
}
