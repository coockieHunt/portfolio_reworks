import { Outlet, createRootRoute } from '@tanstack/react-router';
import { ReactLenis, useLenis } from 'lenis/react';
import { LazyMotion, domAnimation } from 'framer-motion';

//components
import { UmamiTracker } from '@/components/umami/umami.components';

//style
import { Content } from '@/styles/global.style';

//context providers
import { SettingProvider } from '@/context/Setting.context';
import { LoadingProvider } from '@/context/loading.context';
import { AlertProvider } from '@/context/alert.context';

//pages
import { NotFound } from '@/containers/_notFound/NotFound';

//library
import { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';

// Import
import GlobalStyle from '@/styles/global.style';

//context
import { useSettingContext } from '@/context/Setting.context';

import {AlertContainerComponent} from '@/components/Alert/Alert.component';


export const ThemeWrapper = ({ children }): React.ReactNode => {
    const { settings } = useSettingContext();
    useEffect(() => {
        const body = document.body;

        if (settings.highContrast) {
            body.classList.add('high-contrast');
        } else {
            body.classList.remove('high-contrast');
        }

        return () => body.classList.remove('high-contrast');
    }, [settings.highContrast]);

    return (
        <ThemeProvider theme={settings}>
            <GlobalStyle />
            {children}
        </ThemeProvider>
    );
};

export const Route = createRootRoute({
    component: RootComponent,
    notFoundComponent: () => <NotFound />,
});

function RootComponent() {
    const lenis = useLenis();

    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash.slice(1);
            if (!hash || !lenis) return;

            const scrollToElement = () => {
                const element = document.getElementById(hash);
                if (element) {
                    lenis.scrollTo(element, {
                        duration: 1.5,
                        offset: -150,
                    });
                    return true;
                }
                return false;
            };

            if (scrollToElement()) return;

            const observer = new MutationObserver(() => {
                if (scrollToElement()) {
                    observer.disconnect();
                }
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true,
            });

            const timeout = setTimeout(() => {
                observer.disconnect();
                scrollToElement();
            }, 2000);
        };

        if (window.location.hash) {
            handleHashChange();
        }

        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, [lenis]);

    return (
        <ReactLenis
            root
            options={{
                duration: 0.8,
                lerp: 0.1,
                smoothWheel: true,
            }}
        >
            <LazyMotion features={domAnimation}>
                <SettingProvider>
                    <ThemeWrapper>
                        <LoadingProvider>
                            <AlertProvider>
                            <AlertContainerComponent />
                                <Content>
                                    <UmamiTracker />
                                    <Outlet />
                                </Content>
                            </AlertProvider>
                        </LoadingProvider>
                    </ThemeWrapper>
                </SettingProvider>
            </LazyMotion>
        </ReactLenis>
    );
}
