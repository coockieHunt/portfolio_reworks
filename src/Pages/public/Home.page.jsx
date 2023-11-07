import { HeroContainer } from '../../containers/Hero/hero.container';
import { CathContainer } from '../../containers/Catch/catch.container';
import { ContactContainer } from '../../containers/Contact/Contact.container';
import { MyPorjectContainer } from '../../containers/MyProject/MyProject.container';
import { BenefitContainer } from '../../containers/Benefit/benefit.container';
import { QuoteContainer } from '../../containers/Quote/Quote.containers.jsx';
import { StackContainer } from '../../containers/Stack/Stack.containers.jsx';
import { LinkTextComponent } from '../../components/Text/Text.component.jsx';


export const HomePage = () => {
    return(
        <>
            <HeroContainer id='hero' />
            <CathContainer id='catch' />
            <BenefitContainer id='benefit' />
            <MyPorjectContainer id='project' />
            <QuoteContainer>
                Vous voulez voir comment le site est construit ? Il est en public pour le <LinkTextComponent to={URL.ghithudb_portfolio_rework}>Front</LinkTextComponent> et <LinkTextComponent to={URL.ghithudb_portfolio_rework_api}>Api</LinkTextComponent>
            </QuoteContainer>
            <ContactContainer id='contact' />
            <StackContainer />
        </>
    )
}
