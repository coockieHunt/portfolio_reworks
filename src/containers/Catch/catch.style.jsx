import styled from 'styled-components';
import {SCREEN_SIZE, getColorSettings} from '../../config.jsx'

export const Section = styled.div`
    position: relative;
    overflow: hidden;

    padding: 60px 20px ;
`;

export const SkillCard = styled.div`
    position: relative;
    overflow: hidden;
    border-radius: 12px;
    background: #1818184c;
    backdrop-filter: blur(15px);
    color: white;
    z-index: 1;
`;

export const WaveBackground = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 0; 
`;

export const Text = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    gap: 50px;
    

    & .left{
        display: flex;
        flex-direction: column;
        flex: 1;
        text-align: right; 
        align-items: flex-end;
        justify-content: center;
        z-index: 1;

        & h3{
            font-size: 28px;
            margin-bottom: 20px;
        }

        & p{
            font-size: 16px;
            line-height: 1.5;
        }
    }

    & .right{
        flex: 1;
        text-align: left; 

        @media (max-width: ${SCREEN_SIZE.mobile}) {
            font-size: 16px;
        }
    }

    @media (max-width: ${SCREEN_SIZE.mobile}) {
        flex-direction: column;
        align-items: center; 
        padding: 40px 20px; 

        & .left, & .right{
            width: 100%;
            text-align: left; 
        }
        
        & .left{
            align-items: flex-start; 

            & h3{
                font-size: 24px;
            }
        }
    }
`;


export const CardList = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    justify-items: center;
    gap: 30px;
    max-width: 1100px;

    & .card{
        border-radius: 12px;
        border: 1px solid ${props => getColorSettings().primary};
        border-bottom: 4px solid ${props => getColorSettings().primary};
        
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        
        width: 100%;
        min-height: 100px;

        transition: transform 0.3s ease, border-color 0.3s ease, border-bottom-color 0.3s ease; 
        padding: 15px 15px;

        &:hover {
            transform: translateY(-5px);
            border-color: ${props => getColorSettings().accent};
            border-bottom-color: ${props => getColorSettings().accent}; /* Correction du border-bottom au hover */
        }



        & .header-card{

            display: flex;
            flex-direction: column;
            align-items: flex-start; 
            justify-content: space-between;
            
            margin-bottom: 15px;
            gap: 10px;

            min-height: 100px;

            &::after{
                content: '';
                display: block;
                width: 40px;
                height: 0; 
                border-bottom: 1px solid ${props => getColorSettings().accent};
            }

            & h2{
                margin: 0; 
                line-height: 1.2; 
                color: ${props => getColorSettings().accent};
                font-size: 1.3em;
                text-align: left;
            }
        }
        
        & p{
            font-size: 15px;
            line-height: 1.4;
            opacity: 0.8;
            text-align: left;
        }
    }
`