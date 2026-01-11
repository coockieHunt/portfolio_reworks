import { createFileRoute, Outlet } from '@tanstack/react-router';
import { Suspense, lazy } from 'react';

// components
import { AlertContainerComponent } from '@/components/Alert/Alert.component';
import { GlobalLoader } from '@/components/Loading/GlobalLoader.compenent';

//containers
import { NavigationComponent, INavItem } from '@/containers/_root/Navigation/navigations.container';
import { SettingContainer } from '@/containers/_root/Setting/Setting.container';

const FooterContainer = lazy(() =>
    import('@/containers/_root/Footer/footer.container').then((module) => ({
        default: module.FooterContainer,
    })),
);

const navigation: INavItem[] = [
    {
        display : 'Accueil', 
        to: 'home', 
        type: "scroll"
    },
    {
        display : 'A propos', 
        to: 'home', 
        type: "scroll"
    },
    {
        display : 'Competences', 
        to: 'benefit', 
        type: "scroll"
    },
    {
        display : 'Projets', 
        to: 'project', 
        type: "scroll"
    },
    {
        display : 'Contact', 
        to: 'contact', 
        type: "scroll"
    },
    {
        display : 'blog', 
        to: 'blog', 
        type: "route"
    },
];

export const Route = createFileRoute('/_portfolio' as any)({
    component: PortfolioLayout,
});

function PortfolioLayout() {
    return (
        <>
            <NavigationComponent navConfig={navigation}/>
            <AlertContainerComponent />
            <SettingContainer />

            <Outlet />

            <Suspense fallback={<GlobalLoader />}>
                <FooterContainer id="footer" />
            </Suspense>
        </>
    );
}
