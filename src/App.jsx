//library
import { Suspense, lazy, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { LazyMotion, domAnimation } from "framer-motion";

// Import
import GlobalStyle, { Content } from './styles/global.style.jsx';
import { URL } from './data.jsx'

//context
import { useSettingContext } from './context/Setting.context.jsx'
import { HeroContainer } from './containers/Hero/hero.container';
import { CathContainer } from './containers/Catch/catch.container';
import { SettingContainer } from './containers/Setting/Setting.container.jsx';
import { NavigationComponent } from './containers/Navigation/navigations.container';


// Container lazy loaded
const FooterContainer = lazy(() => import('./containers/Footer/footer.container').then(module => ({ default: module.FooterContainer })));
const ContactContainer = lazy(() => import('./containers/Contact/Contact.container').then(module => ({ default: module.ContactContainer })));
const MyProjectContainer = lazy(() => import('./containers/MyProject/MyProject.container').then(module => ({ default: module.MyProjectContainer })));
const BenefitContainer = lazy(() => import('./containers/Benefit/benefit.container').then(module => ({ default: module.BenefitContainer })));
const QuoteContainer = lazy(() => import('./containers/Quote/Quote.containers.jsx').then(module => ({ default: module.QuoteContainer })));
const StackContainer = lazy(() => import('./containers/Stack/Stack.containers.jsx').then(module => ({ default: module.StackContainer })));
const ServiceContainer = lazy(() => import('./containers/Services/Service.containers.jsx').then(module => ({ default: module.ServiceContainer })));
const ProductContainer = lazy(() => import('./containers/Product/product.container.jsx').then(module => ({ default: module.ProductContainer })));
const ProcessTimeLine = lazy(() => import('./containers/ProcessTimeline/ProcessTileline.container.jsx').then(module => ({ default: module.ProcessTimeLine })));
const LinkTextComponent = lazy(() => import('./components/Text/Text.component.jsx').then(module => ({ default: module.LinkTextComponent })));

//components loaded default
import { GlobalLoader } from './components/Loading/GlobalLoader.compenent.jsx'


//Provider
import { AlertProvider } from './context/alert.context.jsx';
import { AlertContainerComponent } from './components/Alert/Alert.component';
import { SettingProvider } from "./context/Setting.context.jsx";
import { LoadingProvider } from './context/loading.context.jsx';

//import ee
import { ConnectedToSecretSystem } from './utils/rb.jsx';

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
import "@fontsource/source-code-pro/700.css";
import "@fontsource/source-code-pro/400-italic.css";
import "@fontsource/source-code-pro/200.css";

//Navbar
const navigation = [
    ['A propos', "catch"],
    ['Competences', "benefit"],
    ['Projets', "project"],
    ['Contact', "contact"],
]

const ThemeWrapper = ({ children }) => {
    const { settings } = useSettingContext();
    return (
        <ThemeProvider theme={settings}>
            <GlobalStyle theme={settings} />
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
    useEffect(() => {ConnectedToSecretSystem();}, []); // Run after initial render not on updates re render

    return (
        <AppProviders>
            {/* no Lazy for cretical content */}
            <NavigationComponent navConfig={navigation} />
            <AlertContainerComponent />
            <SettingContainer />
            <HeroContainer id='hero' />
            <CathContainer id='catch' />

            <Suspense fallback={<GlobalLoader />}> {/* lazy load for non critical content */}
                <ProductContainer id='product' />
                <ServiceContainer id='service' />
                <BenefitContainer id='benefit' />
                <ProcessTimeLine id='ProcessTimeline' />
                
                <QuoteContainer>
                    <BiSolidQuoteLeft /> 
                        Vous êtes 
                        <span style={{ fontStyle: "italic" }} className="fond_code">
                            développeur
                        </span> 
                            ? Découvrez les coulisses du projet ! <br /> Code source disponible : 
                        <LinkTextComponent to={URL.github_portfolio_rework}>
                            Front-end
                        </LinkTextComponent> 
                        | 
                        <LinkTextComponent to={URL.github_portfolio_rework_api}>
                            API
                        </LinkTextComponent> 
                    <BiSolidQuoteRight />
                </QuoteContainer>

                <StackContainer />

                <MyProjectContainer id='project' />
                <ContactContainer id='contact' />
                <FooterContainer />

            </Suspense>
        </AppProviders>
    );
}

export default App;


