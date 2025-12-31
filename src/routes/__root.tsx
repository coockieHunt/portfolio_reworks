import { Outlet, createRootRoute } from '@tanstack/react-router'
import { ReactLenis } from 'lenis/react'
import { LazyMotion, domAnimation } from "framer-motion"

//components
import { UmamiTracker } from '@/components/umami/umami.components'

//style
import { Content } from '@/styles/global.style'

//context providers
import { SettingProvider } from "@/context/Setting.context"
import { LoadingProvider } from '@/context/loading.context'
import { AlertProvider } from '@/context/alert.context'

//pages
import { NotFound } from '@/containers/_notFound/NotFound'

//library
import { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';

// Import
import GlobalStyle from '@/styles/global.style';

//context
import { useSettingContext } from '@/context/Setting.context'


export const ThemeWrapper = ({children}) : React.ReactNode => {
    const { settings } = useSettingContext();
    useEffect(() => {
        const body = document.body;
        
        if (settings.highContrast) {body.classList.add('high-contrast');
        } else {body.classList.remove('high-contrast');}

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
})

// Layout for the root section (all routes)
function RootComponent() {
    return (
        <ReactLenis root options={{
            duration: .8,
            lerp: 0.1,
            smoothWheel: true
        }}>
            <LazyMotion features={domAnimation}>
                <SettingProvider>
                    <ThemeWrapper>
                        <LoadingProvider>
                            <AlertProvider>
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
    )
}