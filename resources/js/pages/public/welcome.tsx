import AppLogoIcon from '@/components/app-logo-icon';
import { Head } from '@inertiajs/react';
import { MapPin, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ActionButton } from './components/action-button';
import { VideoBackground } from './components/video-background';

import Layout from './layout';

export default function Welcome() {
    const { t } = useTranslation();

    return (
        <Layout>
            <Head title={t('welcome.title')} />
            <section
                id="hero"
                aria-label="Ana Sayfa"
                className="relative h-screen w-full shrink-0 snap-start snap-always"
            >
                <VideoBackground />

                <div className="relative z-10 flex h-full flex-col items-center justify-end px-6 pb-12 md:w-1/2 md:items-start md:justify-center md:px-12 md:pb-0 lg:w-2/5 lg:px-16">
                    <header className="mb-6 flex w-full justify-center md:mb-8">
                        <AppLogoIcon className="h-44 w-auto animate-in delay-200 duration-500 fill-mode-backwards fade-in" />
                    </header>

                    <nav
                        aria-label="Hızlı Erişim"
                        className="w-full max-w-md text-center md:max-w-none md:text-left"
                    >
                        <nav
                            aria-label="Hızlı İşlemler"
                            className="flex w-full flex-col gap-4"
                        >
                            <ActionButton
                                href="https://maps.app.goo.gl/ZEXiuMcWRDHEGtNz8"
                                icon={
                                    <MapPin
                                        className="size-6 text-gray-700"
                                        aria-hidden="true"
                                    />
                                }
                                label="Yol Tarifi Alın"
                                className="animate-in delay-300 duration-500 fill-mode-backwards fade-in"
                            />
                            <ActionButton
                                href="https://wa.me/905438966543?text=Merhaba%20hizmetleriniz%20hakkında%20bilgi%20almak%20istiyorum"
                                icon={
                                    <Phone
                                        className="size-6 text-gray-700"
                                        aria-hidden="true"
                                    />
                                }
                                label="Randevu Alın"
                                className="animate-in delay-[400ms] duration-500 fill-mode-backwards fade-in"
                            />
                        </nav>
                    </nav>
                </div>
            </section>
        </Layout>
    );
}
