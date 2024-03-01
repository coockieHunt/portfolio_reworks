import React, { useState, useEffect } from 'react';
import {useSettingContext} from './context/Setting.context.jsx'
// Import
import GlobalStyle, { Content, LoadingContainer } from './styles/global.style.jsx';
import { COLOR, URL } from './config'
import HashLoader from "react-spinners/HashLoader";

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

//Hook
import { ScrollToTop } from './components/Button/Button.jsx';
import { LinkTextComponent } from './components/Text/Text.component.jsx'

//Provider
import { AlertProvider } from './context/alert.context.jsx';
import {SettingProvider} from "./context/Setting.context.jsx";

//Icon
import {
    BiSolidQuoteLeft,
    BiSolidQuoteRight
} from 'react-icons/bi';

//Navbar
const navigation = [
    ['A propos', "catch"],
    ['Competences', "benefit"],
    ['Projets', "project"],
    ['Contact', "contact"],
]

const GlobalStyleTheme = () => {
    const { settings } = useSettingContext();
    console.log(settings)
    return(<GlobalStyle theme={settings} />)
}

function App() {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const handleLoad = () => {
            setIsLoading(false);
        };

        window.addEventListener('load', handleLoad);

        return () => {
            window.removeEventListener('load', handleLoad);
        };
    }, []);

    return (

        <Content>
            <SettingProvider>
                <GlobalStyleTheme/>
                <NavigationComponent navConfig={navigation} />
                    <AlertProvider>
                        <SettingContainer/>
                        <HeroContainer id='hero' />
                        <CathContainer id='catch' />
                        <ProductContainer id='product'/>
                        <ServiceContainer id='service'/>
                        <BenefitContainer id='benefit' />
                        <QuoteContainer >
                            <BiSolidQuoteLeft /> Vous voulez voir comment le site est construit ? Il est en public pour le <LinkTextComponent to={URL.ghithudb_portfolio_rework}>Front</LinkTextComponent> et <LinkTextComponent to={URL.ghithudb_portfolio_rework_api}>Api</LinkTextComponent> <BiSolidQuoteRight />
                        </QuoteContainer>
                        <MyProjectContainer id='project' />
                        <ContactContainer id='contact' />
                        <StackContainer />
                        <FooterContainer />
                    </AlertProvider>
                {/* <ScrollToTop /> */}
            </SettingProvider>
        </Content>
    );
}

export default App;


