import { useTranslation } from 'react-i18next';

interface CarouselDotsProps {
    count: number;
    current: number;
}

export function CarouselDots({ count, current }: CarouselDotsProps) {
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

