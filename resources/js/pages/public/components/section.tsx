import { cn } from '@/lib/utils';
import {
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
    type PropsWithChildren,
} from 'react';

interface SectionContextValue {
    isVisible: boolean;
}

const SectionContext = createContext<SectionContextValue>({ isVisible: false });

export function useSectionVisibility() {
    return useContext(SectionContext);
}

interface SectionProps extends PropsWithChildren {
    id: string;
    ariaLabel: string;
    className?: string;
}

export function Section({ id, ariaLabel, className, children }: SectionProps) {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            {
                root: section.closest('.snap-y'),
                threshold: 0.5,
            },
        );

        observer.observe(section);

        return () => observer.disconnect();
    }, []);

    return (
        <SectionContext.Provider value={{ isVisible }}>
            <section
                ref={sectionRef}
                id={id}
                aria-label={ariaLabel}
                className={cn(
                    'h-screen w-full shrink-0 snap-start snap-always transition-opacity duration-500',
                    isVisible ? 'opacity-100' : 'opacity-0',
                    className,
                )}
            >
                {children}
            </section>
        </SectionContext.Provider>
    );
}
