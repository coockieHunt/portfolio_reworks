import * as Styled from "./Layer.style";
import { Link  } from '@tanstack/react-router';

export const LayerComponent = ({ text, link }) => {
    return (
      <>
        <Styled.LayerBorder />
        
        <Styled.LayerContainer>
          <Styled.LayerText>
                {text} {link && <Link to={link} style={{ color: 'inherit', textDecoration: 'underline' }}>En savoir plus</Link>}
          </Styled.LayerText>
        </Styled.LayerContainer>
      </>
    );
}