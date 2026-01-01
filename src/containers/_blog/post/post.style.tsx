import styled, { keyframes } from 'styled-components';
import { HeroContainer } from '@/containers/_blog/hero/hero.container';

export const CustomHero = styled(HeroContainer)`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 100px 20px;

    position: relative;

    & .action{
        position: absolute;
        top: 70px;
        left: 70px;
    }

    & .center{
        display: flex;
        align-items: center;
        justify-content: center;
        & h1 {
            color: #fff;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);

            font-size: 3rem;
            width: 70%;
        }
    }
`;

export const Container = styled.div`
    width: 90%;
    margin: 0 auto;

    padding: 20px 0;

    position: relative;

    
    & .resume{
        background-color: var(--secondary);
        padding: 20px;
        border-radius: 5px;

        & span{
            font-weight: bold;
        }

        & p{
            margin-top: 10px;
            color: var(--font-subtle);
        }
    }

    & .author-info{
        margin-top: 40px;
        padding: 20px;
        border-top: 2px solid var(--border);

        & h3{
            margin-bottom: 15px;
            color: var(--font);
        }

        & p{
            color: var(--font-subtle);
            margin: 5px 0;
        }
    }
`
