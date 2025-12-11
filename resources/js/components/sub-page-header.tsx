import ShowWelcome from '@/actions/App/Actions/ShowWelcome';
import { Link } from '@inertiajs/react';
import { t } from 'i18next';
import { ArrowLeft, Phone } from 'lucide-react';
import AppLogoIcon from './app-logo-icon';

export function SubPageHeader() {
    return (
        <header className="sticky top-0 z-50 border-b border-stone-200/60 bg-white/80 backdrop-blur-md">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
                <Link
                    href={ShowWelcome.url()}
                    className="flex items-center gap-2 text-stone-600 transition-colors hover:text-stone-900"
                >
                    <ArrowLeft className="size-5" />
                    <span className="hidden font-medium sm:inline">
                        {t('Back to Home')}
                    </span>
                </Link>

                <Link href={ShowWelcome.url()}>
                    <AppLogoIcon className="h-16 w-auto" />
                </Link>

                <a
                    href="https://wa.me/905438966543?text=Merhaba%20hizmetleriniz%20hakkında%20bilgi%20almak%20istiyorum"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-full bg-amber-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-amber-700"
                >
                    <Phone className="size-4" />
                    <span className="hidden sm:inline">{t('Book Now')}</span>
                </a>
            </div>
        </header>
    );
}
