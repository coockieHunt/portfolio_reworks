import Styled from 'styled-components';
import { BORDER_RADIUS, SCREEN_SIZE } from '@/config.js';

export const Container = Styled.div`
    margin: 40px auto 60px;
    padding: 20px 0;
    width: 85%;

    line-height: 1.8;
    position: relative;

    .header_describ{
        background-color: var(--background-elevated);
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 20px;
        border-radius: ${BORDER_RADIUS.medium};
        border: 1px dashed var(--primary);

        gap: 50px;

        @media (max-width: ${SCREEN_SIZE.tablet}) {
            flex-direction: column;
            gap: 15px;
            text-align: center;
        }
    }

    & h2 {
        font-size: 1.8rem;
        font-weight: 700;
        margin-top: 50px;
        margin-bottom: 25px;
        display: flex;
        align-items: center;
        
        &:before {
            content: '//';
            color: var(--primary); 
            margin-right: 10px;
            font-family: monospace;
            font-size: 0.8em;
            opacity: 0.8;
        }
    }

    & h3 {
        font-size: 1.3rem;
        font-weight: 600;
        margin-top: 30px;
        margin-bottom: 15px;
        
    }



    & a {
        color: var(--primary);
        text-decoration: none;
        border-bottom: 1px solid transparent;
        transition: all 0.2s ease;

        &:hover {
            border-bottom: 1px solid var(--accent);
        }
    }


    & ul {
        list-style: none;
        padding-left: 0;
        margin-bottom: 25px;

        & li {
            margin-bottom: 12px;
            padding-left: 30px;
            position: relative;
            
            &:before {
                content: "▹"; 
                position: absolute;
                left: 0;
                top: 0px;
                color: var(--primary, #8A2BE2);
                font-size: 1.2em;
            }

            & strong {
                font-weight: 600;
            }
        }
    }

    @media (max-width: ${SCREEN_SIZE.mobile}) {
        h2{font-size: 1.5rem;}
        h3{font-size: 1.1rem;}
    }
`;