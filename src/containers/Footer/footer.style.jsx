import styled from "styled-components";
import { SCREEN_SIZE, GetLightSetting } from "../../config";

export const Container = styled.div`
   overflow-x: hidden;
   overflow-Y: hidden;
`;

export const Block = styled.div`
    padding: 10px;
    text-align: center;
`;

export const Header = styled.div`
    background-color: ${props => GetLightSetting(props.light).background_secondary};

    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const Content = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: ${props => GetLightSetting(props.light).font};
    margin-top: 20px;
    text-align: center;
    gap: 0px;
    overflow-y: hidden;
    overflow-x: hidden;

    @media (max-width: ${SCREEN_SIZE.mobile}) {
        flex-direction: column;
        align-items: center;
        gap: 20px;
    }

    & .text{
        width: 90%;
        padding-left: 10px;
        @media (min-width: ${SCREEN_SIZE.mobile}) {
            display: flex;
            justify-content: space-between;
        }
    }

    & .action{
        flex: 1;
        padding: 0 0 10px 0;
    }
`;

