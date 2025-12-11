import { Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface StarRatingProps {
    rating: number;
}

export function StarRating({ rating }: StarRatingProps) {
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

