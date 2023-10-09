import React, { useState, useEffect } from 'react';

import GlobalStyle, {Content, LoadingContainer} from './styles/global.style.jsx';
import {COLOR} from './config'

import { NavigationComponent } from './containers/Navigation/navigations.container';
import { HeroContainer } from './containers/Hero/hero.container';
import { CathContainer } from './containers/Catch/catch.container';
import { FooterContainer } from './containers/Footer/footer.container';
import { ContactContainer } from './containers/Contact/Contact.container';
import { MyPorjectContainer } from './containers/MyProject/MyProject.container';
import { BenefitContainer} from './containers/Benefit/benefit.container';
import { QuoteContainer } from './containers/Quote/Quote.containers.jsx'

import { ScroolToTop } from './components/Buttton/Button.component';
import HashLoader from "react-spinners/HashLoader";

//Navabar
const navigation = [
  ['A propos', "catch"],
  ['Competences', "benefit"],
  ['Projets', "project"],
  ['Contact', "contact"],
]

function App() {
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   window.onload = () => {
  //     setTimeout(function(){
  //       setIsLoading(false);
  //     }, 2000);
  //   };
  // }, []);

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
              <HeroContainer id='hero'/>
              <CathContainer id='catch'/>
              <BenefitContainer id ='benefit'/>
              
              <MyPorjectContainer id='project'/>
              <QuoteContainer 
                text={"Vous voulez voir comment le site est construit ? Il est en public Ici"}
              />
              <ContactContainer id='contact'/>
              <FooterContainer/>

              <ScroolToTop hide_position={400}/>
          </>
        )}
      </Content>
  );
}

export default App;


