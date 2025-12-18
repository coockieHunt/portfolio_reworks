//library
import { Suspense, lazy, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { LazyMotion, domAnimation } from "framer-motion";

// Import
import GlobalStyle, { Content } from './styles/global.style';
import { URL } from './data'
import { ReactNode } from 'react';

//context
import { useSettingContext } from './context/Setting.context'
import { HeroContainer } from './containers/Hero/hero.container';
import { CatchContainer } from './containers/Catch/catch.container';
import { SettingContainer } from './containers/Setting/Setting.container';
import { NavigationComponent } from './containers/Navigation/navigations.container';


// Container lazy loaded
const FooterContainer = lazy(() => import('./containers/Footer/footer.container').then(module => ({ default: module.FooterContainer })));
const ContactContainer = lazy(() => import('./containers/Contact/Contact.container').then(module => ({ default: module.ContactContainer })));
const MyProjectContainer = lazy(() => import('./containers/MyProject/MyProject.container').then(module => ({ default: module.MyProjectContainer })));
const BenefitContainer = lazy(() => import('./containers/Benefit/benefit.container').then(module => ({ default: module.BenefitContainer })));
const QuoteContainer = lazy(() => import('./containers/Quote/Quote.containers').then(module => ({ default: module.QuoteContainer })));
const StackContainer = lazy(() => import('./containers/Stack/Stack.containers').then(module => ({ default: module.StackContainer })));
const ServiceContainer = lazy(() => import('./containers/Services/Service.containers').then(module => ({ default: module.ServiceContainer })));
const ProductContainer = lazy(() => import('./containers/Product/product.container').then(module => ({ default: module.ProductContainer })));
const ProcessTimeLine = lazy(() => import('./containers/ProcessTimeline/ProcessTileline.container').then(module => ({ default: module.ProcessTimeLine })));
const LinkTextComponent = lazy(() => import('./components/Text/Text.component').then(module => ({ default: module.LinkTextComponent })));

//components loaded default
import { GlobalLoader } from './components/Loading/GlobalLoader.compenent'

//Provider
import { AlertProvider } from './context/alert.context';
import { AlertContainerComponent } from './components/Alert/Alert.component';
import { SettingProvider } from "./context/Setting.context";
import { LoadingProvider } from './context/loading.context';

//import ee
import { ConnectedToSecretSystem } from './utils/rb';

//Icon
import {
    BiSolidQuoteLeft,
    BiSolidQuoteRight
} from 'react-icons/bi';

//font
import "@fontsource/montserrat";
import "@fontsource/montserrat/600.css";
import "@fontsource/montserrat/700.css";
import "@fontsource/source-code-pro";

//Navbar
const navigation: [string, string][] = [
    ['A propos', "catch"],
    ['Competences', "benefit"],
    ['Projets', "project"],
    ['Contact', "contact"],
]

//tracking
import { UmamiTracker, trackEvent } from './components/umami/umami.components';
interface ThemeWrapperProps {
    children: ReactNode;
}

const ThemeWrapper = ({ children }: ThemeWrapperProps) => {
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


const AppProviders = ({ children }) => {
    return (
        <LazyMotion features={domAnimation}>
            <SettingProvider>
                <ThemeWrapper>
                    <LoadingProvider>
                        <AlertProvider>
                            <Content>
                                {children}
                            </Content>
                        </AlertProvider>
                    </LoadingProvider>
                </ThemeWrapper>
            </SettingProvider>
        </LazyMotion>
    );
};


function App() {
    useEffect(() => {
        ConnectedToSecretSystem();
    }, []); // Run after initial render not on updates re render

    return (
        <AppProviders>
            <UmamiTracker />
            <NavigationComponent navConfig={navigation} />
            <AlertContainerComponent />
            <SettingContainer />
            <HeroContainer id='hero' />
            <CatchContainer id='catch' />

            <Suspense fallback={<GlobalLoader />}> 
                <ProductContainer id='product' />
                <ServiceContainer id='service' />
                <BenefitContainer id='benefit' />
                <ProcessTimeLine id='ProcessTimeline' />
                
                <QuoteContainer>
                    <BiSolidQuoteLeft /> 
                        Vous êtes 
                        <span  className="fond_code"> développeur </span> ? Découvrez les coulisses du projet ! <br /> Code source disponible :&nbsp;
                        <LinkTextComponent 
                            to={URL.github_portfolio_rework}
                            onClick={() => trackEvent('github_click', { repo: 'portfolio_frontend' })}
                        >
                        Front-end
                        </LinkTextComponent> 
                        &nbsp;|&nbsp;
                        <LinkTextComponent 
                            to={URL.github_portfolio_rework_api}
                            onClick={() => trackEvent('github_click', { repo: 'portfolio_api' })}
                        >
                        API
                        </LinkTextComponent> 
                    <BiSolidQuoteRight />
                </QuoteContainer>

                <StackContainer />

                <MyProjectContainer id='project' />
                <ContactContainer id='contact' />
                <FooterContainer id='footer' />

            </Suspense>
        </AppProviders>
    );
}

export default App;


