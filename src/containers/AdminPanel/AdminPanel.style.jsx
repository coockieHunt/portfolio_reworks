import styled from 'styled-components';
import { COLOR } from '../../config';

export const Container = styled.div`
    display: flex;
    align-items: center;

    justify-content: space-between;
    color: #fff;
    height: 5vh;
    z-index: 999;
    position: relative;

    padding: 5px 15px;


    & .left{
        display: flex;
        gap: 15px;
    }

    
    & .right{
        display: flex;
        gap: 15px;
    }
`;

export const Logo = styled.img`
    max-width: 20px;
    padding:  0 10px;
    border-right: 1px solid #ffffff3b;

    box-sizing: content-box;
    width: 100%;
    cursor: pointer;

`;

export const Logout = styled.div`
    cursor: pointer;
    & svg{
        color: red;
    }
`

