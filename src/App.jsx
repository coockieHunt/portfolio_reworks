import {useSettingContext} from './context/Setting.context.jsx'
import { ThemeProvider } from 'styled-components';
// Import
import GlobalStyle, { Content } from './styles/global.style.jsx';
import { URL } from './data.jsx'

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
//Hook
import { LinkTextComponent } from './components/Text/Text.component.jsx'

//Provider
import { AlertProvider } from './context/alert.context.jsx';
import { AlertContainerComponent } from './components/Alert/Alert.component';
import {SettingProvider} from "./context/Setting.context.jsx";
import { LoadingProvider } from './context/loading.context.jsx';

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
    return (
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
                        <ProductContainer id='product'/>
                        <ServiceContainer id='service'/>
                        <BenefitContainer id='benefit' />
                        <ProcessTimeLine id='ProcessTimeline' />
                        <QuoteContainer >
                            <BiSolidQuoteLeft /> Vous êtes un <span style={{fontStyle: "italic"}} className="fond_code">Techos</span> ? vous voulez voir comment le site est construit ? <br/> Il est en public ici <LinkTextComponent to={URL.github_portfolio_rework}> [Code Source Front-end] </LinkTextComponent> <LinkTextComponent to={URL.github_portfolio_rework_api}>[Code Source API]</LinkTextComponent> <BiSolidQuoteRight />
                        </QuoteContainer>
                        <StackContainer />
                        <MyProjectContainer id='project' />  
                        <ContactContainer id='contact' />
                        <FooterContainer />
                    </AlertProvider>
                    </LoadingProvider>
                </ThemeWrapper>
            </SettingProvider>
        </Content>
    );
}

export default App;


