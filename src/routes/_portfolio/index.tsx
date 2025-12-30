import { createFileRoute } from '@tanstack/react-router'
import { Suspense, lazy } from 'react'
import { Quote } from 'lucide-react'

//config 
import { URL } from '../../data'

// components
import { trackEvent } from '../../components/umami/umami.components'
import { GlobalLoader } from '../../components/Loading/GlobalLoader.compenent'

//containers
import { HeroContainer } from '../../containers/Hero/hero.container'
import { CatchContainer } from '../../containers/Catch/catch.container'



const MyProjectContainer = lazy(() => import('../../containers/MyProject/MyProject.container').then(module => ({ default: module.MyProjectContainer })))
const BenefitContainer = lazy(() => import('../../containers/Benefit/benefit.container').then(module => ({ default: module.BenefitContainer })))
const QuoteContainer = lazy(() => import('../../containers/Quote/Quote.containers').then(module => ({ default: module.QuoteContainer })))
const StackContainer = lazy(() => import('../../containers/Stack/Stack.containers').then(module => ({ default: module.StackContainer })))
const ServiceContainer = lazy(() => import('../../containers/Services/Service.containers').then(module => ({ default: module.ServiceContainer })))
const ProductContainer = lazy(() => import('../../containers/Product/product.container').then(module => ({ default: module.ProductContainer })))
const ProcessTimeLine = lazy(() => import('../../containers/ProcessTimeline/ProcessTileline.container').then(module => ({ default: module.ProcessTimeLine })))
const LinkTextComponent = lazy(() => import('../../components/Text/Text.component').then(module => ({ default: module.LinkTextComponent })))
const ContactContainer = lazy(() => import('../../containers/Contact/Contact.container').then(module => ({ default: module.ContactContainer })))

export const Route = createFileRoute('/_portfolio/' as any)({
    component: PortfolioPage,
})

// Portfolio Page Component
export function PortfolioPage() {


    return (
        <>
            <HeroContainer id='hero' />
            <CatchContainer id='catch' />

            <Suspense fallback={<GlobalLoader />}> 
                <ProductContainer id='product' />
                <ServiceContainer id='service' />
                <BenefitContainer id='benefit' />
                <ProcessTimeLine id='ProcessTimeline' />
                
                <QuoteContainer>
                    <Quote aria-hidden="true" focusable={false} /> 
                        Vous êtes 
                        <span className="fond_code"> développeur </span> ? Découvrez les coulisses du projet ! <br /> Code source disponible :&nbsp;
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
                    <Quote aria-hidden="true" focusable={false} style={{ transform: 'scaleX(-1)' }} />
                </QuoteContainer>

                <StackContainer />
                <MyProjectContainer id='project' />
                <ContactContainer id='contact' />
            </Suspense>
        </>
    )
}