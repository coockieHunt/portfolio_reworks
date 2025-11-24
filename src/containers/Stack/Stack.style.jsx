import styled from 'styled-components';
import {getColorSettings, SCREEN_SIZE} from '../../config.jsx'

export const Stack = styled.div`
    padding: 30px 150px;   
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
    gap: 30px;
    position: relative;
    background-color: ${props => getColorSettings(props.theme).primary};

    & a img{
        height: 80px;
        width: auto; 

        &:hover{
            transform: scale(1.04);
        }
    }

    @media (max-width: ${SCREEN_SIZE.mobile}) {
        padding: 30px 30px;   
        & a img{
            height: 50px;
        }
    }
`