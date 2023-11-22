import React, { useState, useEffect } from 'react';

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
import { MyPorjectContainer } from './containers/MyProject/MyProject.container';
import { BenefitContainer } from './containers/Benefit/benefit.container';
import { QuoteContainer } from './containers/Quote/Quote.containers.jsx';
import { StackContainer } from './containers/Stack/Stack.containers.jsx';
import { ServiceContainer } from './containers/Services/Service.containers.jsx';
//Hook
import { ScroolToTop } from './components/Buttton/Button.component';
import { LinkTextComponent } from './components/Text/Text.component.jsx'

//Provider
import { AlertProvider } from './context/alert.context.jsx';

//Icon
import {
    BiSolidQuoteLeft,
    BiSolidQuoteRight
} from 'react-icons/bi';
import { ColorProvider } from './context/color.context.jsx';

//Navabar
const navigation = [
    ['A propos', "catch"],
    ['Competences', "benefit"],
    ['Projets', "project"],
    ['Contact', "contact"],
]

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

    const Loader = () => {
        return (
            <LoadingContainer>
                <span>Chargement</span>
                <HashLoader
                    color={COLOR.primary}
                    loading={isLoading}
                    size={"12em"}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                    className="loader"
                />
            </LoadingContainer>
        );
    };

    return (

        <Content>
            <GlobalStyle />
            <>
                {/* {isLoading && <Loader/>} */}
                <NavigationComponent navConfig={navigation} />
                    <ColorProvider>
                        <AlertProvider>
                            <HeroContainer id='hero' />
                            <CathContainer id='catch' />
                            <ServiceContainer id='catch'/>
                            <BenefitContainer id='benefit' />
                            <QuoteContainer >
                                <BiSolidQuoteLeft /> Vous voulez voir comment le site est construit ? Il est en public pour le <LinkTextComponent to={URL.ghithudb_portfolio_rework}>Front</LinkTextComponent> et <LinkTextComponent to={URL.ghithudb_portfolio_rework_api}>Api</LinkTextComponent> <BiSolidQuoteRight />
                            </QuoteContainer>
                            <MyPorjectContainer id='project' />
                            <ContactContainer id='contact' />
                            <StackContainer />
                            <FooterContainer />
                        </AlertProvider>
                    </ColorProvider>
                <ScroolToTop />
            </>
        </Content>
    );
}

export default App;


