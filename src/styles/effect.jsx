import styled from 'styled-components';

export const GridEffect = styled.div`
  background-image: 
    linear-gradient(${props => props.bigColor || '#38373753'} 2px, transparent 2px), 
    linear-gradient(90deg, ${props => props.bigColor || '#38373753'} 2px, transparent 2px),
    linear-gradient(${props => props.smallColor || '#38373753'} 1px, transparent 1px), 
    linear-gradient(90deg, ${props => props.smallColor || '#38373753'} 1px, transparent 1px);

  background-size: 
    ${props => props.bigSize || '100px'} ${props => props.bigSize || '100px'}, 
    ${props => props.bigSize || '100px'} ${props => props.bigSize || '100px'}, 
    ${props => props.smallSize || '20px'} ${props => props.smallSize || '20px'},    
    ${props => props.smallSize || '20px'} ${props => props.smallSize || '20px'};

  background-position: 
    ${props => props.bigOffset || '-2px'} ${props => props.bigOffset || '-2px'}, 
    ${props => props.bigOffset || '-2px'} ${props => props.bigOffset || '-2px'}, 
    ${props => props.smallOffset || '-1px'} ${props => props.smallOffset || '-1px'}, 
    ${props => props.smallOffset || '-1px'} ${props => props.smallOffset || '-1px'};
`;
