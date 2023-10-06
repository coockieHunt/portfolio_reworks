import styled from 'styled-components';
import { COLOR } from '../../config';


export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    font-size: 2em;
    margin: 0 auto;
    background-color: #202020;
    padding: 20px 0;
    & .listContainer{
        width: 95%;
    }
`
export const Title = styled.div`
    
`
export const Text = styled.span`
    font-size: .6em;
`

export const List = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding: 30px 0;
    justify-content: center;


    & div{
        background-color: ${COLOR.primary};
        width: 300px;
        margin-bottom: 20px;
        display: flex;
        flex-direction: column;

        & img{
            max-width: 400px;
        }

        & .title{
            padding: 20px 10px;
            font-size: .6em;
        }
    }
`
