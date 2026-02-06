import { createFileRoute, Outlet } from '@tanstack/react-router';
import { Suspense, lazy } from 'react';

import { NavigationComponent, INavItem } from '@/containers/_root/Navigation/navigations.container';



const SettingContainer = lazy(() =>
    import('@/containers/_root/Setting/Setting.container').then(m => ({ default: m.SettingContainer }))
);

const FooterContainer = lazy(() =>
    import('@/containers/_root/Footer/footer.container').then((module) => ({
        default: module.FooterContainer,
    })),
);

const navigation: INavItem[] = [
    { display : 'Accueil', to: '', type: "scroll" },
    { display : 'A propos', to: 'catch', type: "scroll", offset: -50 },
    { display : 'Competences', to: 'benefit', type: "scroll", offset: 30 },
    { display : 'Projets', to: 'project', type: "scroll", offset: -25 },
    { display : 'FAQ', to: 'faq', type: "scroll", offset: -130 },
    { display : 'Contact', to: 'contact', type: "scroll", offset: 25 },
    { display : 'CV', to: 'cv', type: "spacer" },
    { display : 'blog', to: 'blog', type: "route" },
];

export const Route = createFileRoute('/_portfolio' as any)({
    component: PortfolioLayout,
});

function PortfolioLayout() {
    return (
        <>
            <NavigationComponent navConfig={navigation}/>

            <Outlet />

            <Suspense fallback={null}>
                <SettingContainer />
            </Suspense>

            <Suspense fallback={<div style={{height: 100}} />}>
                <FooterContainer id="footer" />
            </Suspense>
        </>
    );
}