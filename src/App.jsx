//library
import { Suspense } from 'react';
import { ThemeProvider } from 'styled-components';
import { LazyMotion, domAnimation } from "framer-motion";

// Import
import GlobalStyle, { Content } from './styles/global.style.jsx';
import { URL } from './data.jsx'

//context
import {useSettingContext} from './context/Setting.context.jsx'

// Container
import { NavigationComponent } from './containers/Navigation/navigations.container';
import { HeroContainer } from './containers/Hero/hero.container';
import { CathContainer } from './containers/Catch/catch.container';
import { FooterContainer } from './containers/Footer/footer.container';
import { ContactContainer } from './containers/Contact/Contact.container';
import { MyProjectContainer } from './containers/MyProject/MyProject.container';
import { BenefitContainer } from './containers/Benefit/benefit.container';
import { QuoteContainer } from './containers/Quote/Quote.containers.jsx';
import { StackContainer } from './containers/Stack/Stack.containers.jsx';
import { ServiceContainer } from './containers/Services/Service.containers.jsx';
import { SettingContainer } from './containers/Setting/Setting.container.jsx';
import { ProductContainer } from './containers/Product/product.container.jsx';
import { ProcessTimeLine } from './containers/ProcessTimeline/ProcessTileline.container.jsx';
import { LinkTextComponent } from './components/Text/Text.component.jsx'
import {GlobalLoader} from './components/Loading/GlobalLoader.compenent.jsx' //loader leazy

//Provider
import { AlertProvider } from './context/alert.context.jsx';
import { AlertContainerComponent } from './components/Alert/Alert.component';
import {SettingProvider} from "./context/Setting.context.jsx";
import { LoadingProvider } from './context/loading.context.jsx';

//import ee
import{ ConnectedToSecretSystem } from './utils/rb.jsx';

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

function App() {
    ConnectedToSecretSystem();
    return (
        <LazyMotion features={domAnimation}>
            <Content>
                <SettingProvider>
                    <ThemeWrapper>
                        <LoadingProvider>
                        <NavigationComponent navConfig={navigation} />
                        <AlertProvider>
                            <AlertContainerComponent />
                            <SettingContainer/>
                            <HeroContainer id='hero' />
                            <CathContainer id='catch' />
                              <Suspense fallback={<GlobalLoader />}>
                                <ProductContainer id='product'/>
                                <ServiceContainer id='service'/>
                                <BenefitContainer id='benefit' />
                                <ProcessTimeLine id='ProcessTimeline' />
                                <QuoteContainer >
                                   <BiSolidQuoteLeft /> Vous êtes <span style={{fontStyle: "italic"}} className="fond_code">développeur</span> ? Découvrez les coulisses du projet ! <br/> Code source disponible : <LinkTextComponent to={URL.github_portfolio_rework}>Front-end</LinkTextComponent> | <LinkTextComponent to={URL.github_portfolio_rework_api}>API</LinkTextComponent> <BiSolidQuoteRight />
                                </QuoteContainer>
                                <StackContainer />
                                <MyProjectContainer id='project' />  
                                <ContactContainer id='contact' />
                            </Suspense>
                            <FooterContainer />
                        </AlertProvider>
                        </LoadingProvider>
                    </ThemeWrapper>
                </SettingProvider>
            </Content>
        </LazyMotion>
    );
}

export default App;


