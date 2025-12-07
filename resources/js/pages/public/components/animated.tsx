import { cn } from '@/lib/utils';
import { type ElementType, type PropsWithChildren } from 'react';
import { useSectionVisibility } from './section';

interface AnimatedProps extends PropsWithChildren {
    className?: string;
    as?: ElementType;
}

export function Animated({
    className,
    as: Component = 'div',
    children,
}: AnimatedProps) {
    const { isVisible } = useSectionVisibility();

    return (
        <Component
            className={cn(
                isVisible
                    ? 'animate-in duration-500 fill-mode-backwards fade-in'
                    : 'animate-out duration-500 fade-out',
                className,
            )}
        >
            {children}
        </Component>
    );
}
