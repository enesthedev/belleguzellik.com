import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { Quote, Star } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Section } from './section';

interface Comment {
    id: number;
    author: string;
    content: string;
    rating: number;
    is_active: boolean;
    avatar_url: string | null;
    created_at: string;
}

interface Props {
    comments: Comment[];
}

function StarRating({ rating }: { rating: number }) {
    const { t } = useTranslation();
    return (
        <div
            className="flex gap-1"
            aria-label={t('Rated {{rating}} out of 5', { rating })}
        >
            {Array.from({ length: 5 }).map((_, i) => (
                <Star
                    key={i}
                    className={`size-4 ${
                        i < rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'fill-stone-300 text-stone-300'
                    }`}
                    aria-hidden="true"
                />
            ))}
        </div>
    );
}

function getInitials(name: string): string {
    return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
}

function CarouselDots({ count, current }: { count: number; current: number }) {
    const { t } = useTranslation();
    return (
        <div className="mt-6 flex justify-center gap-2">
            {Array.from({ length: count }).map((_, i) => (
                <button
                    key={i}
                    className={`h-2 rounded-full transition-all duration-300 ${
                        i === current
                            ? 'w-6 bg-amber-500'
                            : 'w-2 bg-stone-300 hover:bg-stone-400'
                    }`}
                    aria-label={t('Go to comment {{index}}', { index: i + 1 })}
                />
            ))}
        </div>
    );
}

export function CommentsSection({ comments }: Props) {
    const { t } = useTranslation();
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);

    const onSelect = useCallback(() => {
        if (!api) return;
        setCurrent(api.selectedScrollSnap());
    }, [api]);

    useEffect(() => {
        if (!api) return;

        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap());

        api.on('select', onSelect);
        return () => {
            api.off('select', onSelect);
        };
    }, [api, onSelect]);

    if (comments.length === 0) {
        return null;
    }

    return (
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
                                    <article className="group relative flex h-full max-h-[280px] flex-col overflow-hidden rounded-3xl border border-stone-200/60 bg-gradient-to-br from-white via-stone-50/50 to-amber-50/30 p-6 shadow-lg shadow-stone-200/40 transition-all duration-500 hover:border-amber-200/60 hover:shadow-xl hover:shadow-amber-100/40">
                                        <div className="absolute -top-4 -right-4 opacity-[0.07] transition-all duration-500 group-hover:opacity-[0.12]">
                                            <Quote className="size-24 rotate-180 text-amber-600" />
                                        </div>

                                        <div className="relative z-10 flex flex-1 flex-col">
                                            <div className="mb-4">
                                                <StarRating
                                                    rating={comment.rating}
                                                />
                                            </div>

                                            <blockquote className="mb-2 flex-1">
                                                <p className="font-serif text-base leading-relaxed text-stone-700 italic">
                                                    &quot;{comment.content}
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
    );
}
