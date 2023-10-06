import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import GlobalStyle, {Content} from './styles/global.style.jsx';
import {COLOR} from './config'

import {NavigationComponent} from './containers/Navigation/navigations.container';
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
  ['Contacte', "contact"],
]

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.onload = () => {
      setTimeout(function(){
        setIsLoading(false);
      }, 2000);
    };
  }, []);


const LoadingContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 1em;
    font-size: 5vw;
    height: 100vh;
    position: relative;

    overflow: hidden;

    & span {
        color: ${COLOR.primary};
        font-variation-settings: "wght" 700;
        position: absolute; 
        top: 50%; 
        left: 50%; 
        transform: translate(-50%, -50%); 
        z-index: 2; 
    }

    & .loader {
        position: relative; 
        z-index: 1; 
        top: 0; 
        left: 0; 
        transform: translate(-50%, -50%); 
    }
  `;

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
                text={"Vous voulée voir comment le site et construit ? Il et en public Ici"}
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


