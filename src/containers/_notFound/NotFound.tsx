import styled from 'styled-components';
import { useNavigate } from '@tanstack/react-router';

//effect
import { GridEffect } from '@/styles/effect';

//components
import { GradientTextContainer } from '@/components/Text/Text.component';
import { Button } from '@/components/Button/Button';

import { StickyNote, HomeIcon } from 'lucide-react';

const NotFoundContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 2rem;
    text-align: center;
`;

const Subtitle = styled.h2`
    font-size: 2rem;
    margin: 1rem 0;
    color: #333;
`;

const Description = styled.p`
    font-size: 1.2rem;
    color: #666;
    margin-bottom: 2rem;
`;

const CTA = styled.div`
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
`;

// 404 Not Found Page Component
export function NotFound() {
    const navigate = useNavigate();

    return (
        <GridEffect>
            <NotFoundContainer>
                <GradientTextContainer style={{ fontSize: '8rem' }}>
                    404
                </GradientTextContainer>
                <Subtitle>Page non trouvée</Subtitle>
                <Description>
                    Oups ! La page que vous cherchez n'existe pas.
                </Description>
                <CTA>
                    <Button onClick={() => navigate({ to: '/' })} icon={<HomeIcon />}>
                        Retour à l'accueil
                    </Button>
                    <Button onClick={() => navigate({ to: '/blog' })} icon={<StickyNote />}  icon_right={true}>
                        Aller aux blogs
                    </Button>
                </CTA>
            </NotFoundContainer>
        </GridEffect>
    );
}
