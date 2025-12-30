import { createFileRoute, Outlet } from '@tanstack/react-router'
import { Suspense, lazy } from 'react'

// components
import { AlertContainerComponent } from '../components/Alert/Alert.component'
import { GlobalLoader } from '../components/Loading/GlobalLoader.compenent'


//containers
import { NavigationComponent } from '../containers/Navigation/navigations.container'
import { SettingContainer } from '../containers/Setting/Setting.container'

const FooterContainer = lazy(() => import('../containers/Footer/footer.container').then(module => ({ default: module.FooterContainer })))

const navigation: [string, string][] = [
    ['A propos', "catch"],
    ['Competences', "benefit"],
    ['Projets', "project"],
    ['Contact', "contact"],
]

export const Route = createFileRoute('/_portfolio' as any)({
  component: PortfolioLayout,
})

// Layout for the portfolio section
function PortfolioLayout() {
  return (
    <>
      <NavigationComponent navConfig={navigation} />
      <AlertContainerComponent />
      <SettingContainer />
      
      <Outlet />
      
      <Suspense fallback={<GlobalLoader />}>
        <FooterContainer id='footer' />
      </Suspense>
    </>
  )
}