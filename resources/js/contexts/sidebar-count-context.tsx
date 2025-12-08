import GetSidebarCounts from '@/actions/App/Actions/Admin/GetSidebarCounts';
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from 'react';

interface SidebarCounts {
    comments: number;
    services: number;
}

interface SidebarCountContextValue {
    counts: SidebarCounts | undefined;
    isLoading: boolean;
    refetch: () => void;
}

const SidebarCountContext = createContext<SidebarCountContextValue | null>(
    null,
);

interface SidebarCountProviderProps {
    children: ReactNode;
}

export function SidebarCountProvider({ children }: SidebarCountProviderProps) {
    const [counts, setCounts] = useState<SidebarCounts | undefined>();
    const [isLoading, setIsLoading] = useState(true);

    const fetchCounts = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await fetch(GetSidebarCounts.url());
            if (response.ok) {
                const data: SidebarCounts = await response.json();
                setCounts(data);
            }
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCounts();
    }, [fetchCounts]);

    return (
        <SidebarCountContext.Provider
            value={{ counts, isLoading, refetch: fetchCounts }}
        >
            {children}
        </SidebarCountContext.Provider>
    );
}

export function useSidebarCount(): SidebarCountContextValue {
    const context = useContext(SidebarCountContext);
    if (!context) {
        throw new Error(
            'useSidebarCount must be used within SidebarCountProvider',
        );
    }
    return context;
}

