import { createFileRoute, Outlet } from '@tanstack/react-router'
import { Suspense, lazy } from 'react';
import { NavigationComponent, INavItem } from '@/containers/_root/Navigation/navigations.container';
import { GlobalLoader } from '@/components/Loading/GlobalLoader.compenent';

const SettingContainer = lazy(() =>
    import('@/containers/_root/Setting/Setting.container').then(m => ({ default: m.SettingContainer }))
);

const FooterContainer = lazy(() =>
    import('@/containers/_root/Footer/footer.container').then((module) => ({
        default: module.FooterContainer,
    }))
);

export const Route = createFileRoute('/_page')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigation: INavItem[] = [
    { display : 'Accueil', to: '/', type: "route" },
    { display : 'blog', to: 'blog', type: "route" },
];
  return (<>
    <NavigationComponent navConfig={navigation}/>
    <Outlet />
    <Suspense fallback={<GlobalLoader />}>
      <SettingContainer />
      <FooterContainer id="footer" />
    </Suspense>
  </>
  );
}
