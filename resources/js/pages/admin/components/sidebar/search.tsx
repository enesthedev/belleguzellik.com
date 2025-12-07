import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarInput,
} from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { SearchIcon } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface SearchProps {
    items: NavItem[];
    onFilter: (filteredItems: NavItem[]) => void;
}

function filterItems(items: NavItem[], query: string): NavItem[] {
    if (!query.trim()) return items;

    const lowerQuery = query.toLowerCase();

    return items.reduce<NavItem[]>((acc, item) => {
        const titleMatch = item.title.toLowerCase().includes(lowerQuery);

        if (item.items && item.items.length > 0) {
            const filteredChildren = filterItems(item.items, query);

            if (titleMatch || filteredChildren.length > 0) {
                acc.push({
                    ...item,
                    items: titleMatch ? item.items : filteredChildren,
                });
            }
        } else if (titleMatch) {
            acc.push(item);
        }

        return acc;
    }, []);
}

export function Search({ items, onFilter }: SearchProps) {
    const { t } = useTranslation();
    const [query, setQuery] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSearch = useCallback(
        (value: string) => {
            setQuery(value);
            const filtered = filterItems(items, t(value));
            onFilter(filtered);
        },
        [items, onFilter, t],
    );

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
                event.preventDefault();
                inputRef.current?.focus();
            }

            if (
                event.key === 'Escape' &&
                document.activeElement === inputRef.current
            ) {
                handleSearch('');
                inputRef.current?.blur();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleSearch]);

    return (
        <SidebarGroup className="py-0">
            <SidebarGroupContent className="relative">
                <SearchIcon className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 text-muted-foreground" />
                <SidebarInput
                    ref={inputRef}
                    value={query}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder={t('Search...')}
                    className="pl-8"
                />
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
