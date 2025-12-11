import { SharedData } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { useCallback, useState } from 'react';

export function useSidebarCount() {
    const { counts } = usePage<SharedData>().props;
    const [isLoading, setIsLoading] = useState(false);

    const refetch = useCallback(() => {
        router.reload({
            only: ['counts'],
            onStart: () => setIsLoading(true),
            onFinish: () => setIsLoading(false),
        });
    }, []);

    return { counts, isLoading, refetch };
}
