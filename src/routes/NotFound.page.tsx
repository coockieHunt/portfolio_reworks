import styled from 'styled-components'
import { useNavigate } from '@tanstack/react-router'

//effect
import { GridEffect } from '../styles/effect'

//components
import { GradientTextContainer } from '../components/Text/Text.component'
import { Button } from '../components/Button/Button'

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  text-align: center;
`

const Subtitle = styled.h2`
  font-size: 2rem;
  margin: 1rem 0;
  color: #333;
`

const Description = styled.p`
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
`

// 404 Not Found Page Component
export function NotFound() {
  const navigate = useNavigate()

  return (
    <GridEffect>
      <NotFoundContainer>
        <GradientTextContainer style={{ fontSize: "8rem" }}>
          404
        </GradientTextContainer>
        <Subtitle>Page non trouvée</Subtitle>
        <Description>
          Oups ! La page que vous cherchez n'existe pas.
        </Description>
        <Button onClick={() => navigate({ to: '/' })}>
          ← Retour à l'accueil
        </Button>
      </NotFoundContainer>
    </GridEffect>
  )
}