import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

interface ActionButtonProps {
    href: string;
    icon: React.ReactNode;
    label: string;
    className?: string;
}

export function ActionButton({
    href,
    icon,
    label,
    className,
}: ActionButtonProps) {
    const { t } = useTranslation();

    return (
        <Button
            variant="action"
            className={cn(
                'relative h-auto w-full rounded-xl px-5 py-4',
                className,
            )}
            asChild
        >
            <a href={href} target="_blank" rel="noopener noreferrer">
                <span className="absolute left-5 shrink-0">{icon}</span>
                <span className="w-full text-center font-medium">{label}</span>
                <span className="sr-only">({t('Opens in new tab')})</span>
            </a>
        </Button>
    );
}
