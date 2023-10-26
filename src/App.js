import React, { useState } from 'react';

// Import
import GlobalStyle, {Content, LoadingContainer} from './styles/global.style.jsx';
import {COLOR, URL} from './config'
import HashLoader from "react-spinners/HashLoader";

// Container
import { NavigationComponent } from './containers/Navigation/navigations.container';
import { HeroContainer } from './containers/Hero/hero.container';
import { CathContainer } from './containers/Catch/catch.container';
import { FooterContainer } from './containers/Footer/footer.container';
import { ContactContainer } from './containers/Contact/Contact.container';
import { MyPorjectContainer } from './containers/MyProject/MyProject.container';
import { BenefitContainer} from './containers/Benefit/benefit.container';
import { QuoteContainer } from './containers/Quote/Quote.containers.jsx';
import { StackContainer } from './containers/Stack/Stack.containers.jsx';

//Hook
import { ScroolToTop } from './components/Buttton/Button.component';
import {LinkTextComponent} from './components/Text/Text.component.jsx'

//Provider
import { AlertProvider } from './context/alert.context.jsx';

//Navabar
const navigation = [
  ['A propos', "catch"],
  ['Competences', "benefit"],
  ['Projets', "project"],
  ['Contact', "contact"],
]

function App() {
  const [isLoading, setIsLoading] = useState(false);

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
        {isLoading ? (
          <Loader/>
        ):(
          <>
              <NavigationComponent navConfig={navigation}/>
              <AlertProvider>
                <HeroContainer id='hero'/>
                <CathContainer id='catch'/>
                <BenefitContainer id ='benefit'/>
                <MyPorjectContainer id='project'/>
                <QuoteContainer >
                  Vous voulez voir comment le site est construit ? Il est en public pour le <LinkTextComponent to={URL.ghithudb_portfolio_rework}>Front</LinkTextComponent> et <LinkTextComponent to={URL.ghithudb_portfolio_rework_api}>Api</LinkTextComponent>
                </QuoteContainer>
                <ContactContainer id='contact'/>
                <StackContainer/>
                <FooterContainer/>
              </AlertProvider>

              <ScroolToTop hide_position={400}/>
          </>
        )}
      </Content>
  );
}

export default App;


