import { createFileRoute } from '@tanstack/react-router';
import { Suspense, lazy } from 'react';
import { Quote } from 'lucide-react';

//config
import { URL } from '../../data';

// hooks
import { useDocumentMeta } from '@/hooks/useDocumentMeta.hook';

// components
import { trackEvent } from '../../components/umami/umami.components';
import { GlobalLoader } from '../../components/Loading/GlobalLoader.compenent';

import { HeroContainer } from '@/containers/_portfolio/Hero/hero.container';
import { CatchContainer } from '../../containers/_portfolio/Catch/catch.container';
import { TitleTextComponent } from '@/components/Text/Text.component';
import { ServiceStatusApi } from '@/containers/_portfolio/ServiceStatus/ServiceStatus.container';
import { FaqContainer } from '@/containers/_portfolio/Faq/Faq.container';

const MyProjectContainer = lazy(() =>
    import('@/containers/_portfolio/MyProject/MyProject.container').then(
        (module) => ({ default: module.MyProjectContainer }),
    ),
);
const BenefitContainer = lazy(() =>
    import('@/containers/_portfolio/Benefit/benefit.container').then(
        (module) => ({ default: module.BenefitContainer }),
    ),
);
const QuoteContainer = lazy(() =>
    import('@/containers/_portfolio/Quote/Quote.containers').then((module) => ({
        default: module.QuoteContainer,
    })),
);
const StackContainer = lazy(() =>
    import('@/containers/_portfolio/Stack/Stack.containers').then((module) => ({
        default: module.StackContainer,
    })),
);
const ServiceContainer = lazy(() =>
    import('@/containers/_portfolio/Services/Service.containers').then(
        (module) => ({ default: module.ServiceContainer }),
    ),
);
const ProductContainer = lazy(() =>
    import('@/containers/_portfolio/Product/product.container').then(
        (module) => ({ default: module.ProductContainer }),
    ),
);
const ProcessTimeLine = lazy(() =>
    import('@/containers/_portfolio/ProcessTimeline/ProcessTileline.container').then(
        (module) => ({ default: module.ProcessTimeLine }),
    ),
);
const LinkTextComponent = lazy(() =>
    import('@/components/Text/Text.component').then((module) => ({
        default: module.LinkTextComponent,
    })),
);
const ContactContainer = lazy(() =>
    import('@/containers/_portfolio/Contact/Contact.container').then(
        (module) => ({ default: module.ContactContainer }),
    ),
);

const NewPostContainer = lazy(() =>
    import('@/containers/_portfolio/NewPost/NewPost.container').then(
        (module) => ({ default: module.NewPostContainer }),
    ),
);

const preloadComponents = () =>
    Promise.all([
        import('@/containers/_portfolio/MyProject/MyProject.container'),
        import('@/containers/_portfolio/Benefit/benefit.container'),
        import('@/containers/_portfolio/Quote/Quote.containers'),
        import('@/containers/_portfolio/ServiceStatus/ServiceStatus.container'),
        import('@/containers/_portfolio/Stack/Stack.containers'),
        import('@/containers/_portfolio/Services/Service.containers'),
        import('@/containers/_portfolio/Product/product.container'),
        import('@/containers/_portfolio/ProcessTimeline/ProcessTileline.container'),
        import('@/containers/_portfolio/Contact/Contact.container'),
        import('@/containers/_portfolio/NewPost/NewPost.container'),
        import('@/components/Text/Text.component'),
    ]);

export const Route = createFileRoute('/_portfolio/' as any)({
    component: PortfolioIndex,
    beforeLoad: preloadComponents,
});

export function PortfolioIndex() {
    const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://jonathangleyze.fr';
    
    useDocumentMeta({
        title: 'Jonathan Gleyze - Développeur Web & Mobile (Portfolio)',
        description: 'Jonathan Gleyze, développeur web créatif expert en Node.js, React, et API REST. Découvrez mon portfolio et mes solutions numériques sur mesure.',
        canonical: `${SITE_URL}/`,
    });

    return (
        <>
            
            <HeroContainer id="hero" />
            <CatchContainer id="catch" />

            <TitleTextComponent
                subtitle={'Vous voulez lire les'}
                subtitleOpacity={0.3}
            >Dernier article</TitleTextComponent>
            
            <NewPostContainer />

            <Suspense fallback={<GlobalLoader />}>
                <ProductContainer id="product" />
                <ServiceContainer id="service" />
                <BenefitContainer id="benefit" />
                <ProcessTimeLine id="ProcessTimeline" />

                <QuoteContainer>
                    <Quote aria-hidden="true" focusable={false} />
                    Vous êtes
                    <span className="fond_code"> développeur </span> ? Découvrez
                    les coulisses du projet ! <br /> Code source disponible
                    :&nbsp;
                    <LinkTextComponent
                        to={URL.github_portfolio_rework}
                        onClick={() =>
                            trackEvent('github_click', {
                                repo: 'portfolio_frontend',
                            })
                        }
                    >
                        Front-end
                    </LinkTextComponent>
                    &nbsp;|&nbsp;
                    <LinkTextComponent
                        to={URL.github_portfolio_rework_api}
                        onClick={() =>
                            trackEvent('github_click', {
                                repo: 'portfolio_api',
                            })
                        }
                    >
                        API
                    </LinkTextComponent>
                    <Quote
                        aria-hidden="true"
                        focusable={false}
                        style={{ transform: 'scaleX(-1)' }}
                    />
                </QuoteContainer>
                <ServiceStatusApi />
                <StackContainer />
                <MyProjectContainer id="project" />
                <FaqContainer id="faq" />
                <ContactContainer id="contact" />
            </Suspense>
        </>
    );
}
