import styled from "styled-components";
import { getColorSettings, GetLightSetting } from "../../config";

const border_radius = "10px";

export const Container = styled.div`
    transition: transform 2s ease-in-out;

    & .accent{
        color: ${(props) => getColorSettings(props.theme).primary};
    }
`;

export const ProductContainer = styled.div`
    width: 80%;
    margin: 0 auto;
    display: flex;
    gap: 5px;
    & button {
        background-color: transparent;
        color: ${(props) => GetLightSetting(props.light).font};
    }
`;

export const Tab = styled.ul`
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 10px;
    transition: width 1s;

    &.reduce {
        width: ${(props) => (props.$mobile ? "30px" : "50px")};
        & li {
            padding: ${(props) => (props.$mobile ? "15px 10px" : "15px 18px")};
        }
    }
    &.expand {
        width: ${(props) => (props.$mobile ? "100%" : "300px")};
        & li {
            padding: 15px 18px;
        }
    }

    & li {
        background-color: ${(props) =>
            GetLightSetting(props.light).background_secondary};
        border-radius: ${border_radius};
        display: inline-flex;
        align-items: center;
        gap: 16px;
        cursor: pointer;
        overflow: hidden;

        &:hover {
            background-color: ${(props) =>
                getColorSettings(props.theme).background_secondary};
        }

        &.current_item {
            background-color: ${(props) =>
                getColorSettings(props.theme).primary};
        }

        &.current_item,
        &:hover {
            color: white;
        }

        & svg {
            flex-shrink: 0;
            flex-grow: 0;
            font-size: ${(props) => (props.$mobile ? ".8em" : "1em")};
        }

        & span {
            flex-shrink: 0;
            flex-grow: 0;
            white-space: nowrap;
            transition: opacity 0.5s ease-in-out;
        }
    }
`;

export const ItemProduct = styled.div`
    & .productFrame{
        background-color: ${(props) =>
            GetLightSetting(props.light).background_secondary};
        border-radius: ${border_radius};

        padding: 25px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 60px;

        min-height: 60vh;
        cursor: pointer;

        &:hover {
            & .bottom .viewMore svg {
                transition: transform 0.3s ease-in;
                transform: translateX(5px);
            }
        }

        & .description {
            & .subtitle {
                font-variation-settings: "wght" 600;
                font-size: 1.5em;

                display: flex;
                flex-direction: column;
                gap: 20px;

                padding: 10px 0;

                & svg {
                    font-size: 1.6em;
                }
            }
        }

        & .bottom {
            display: flex;
            justify-content: space-between;
            align-items: end;

            @media (max-width: 700px) {
                flex-direction: column;
                align-items: start;
                gap: 20px;
            }

            & span {
                display: inline-flex;
                align-items: center;
            }

            & .ProductInfo {
                display: flex;
                flex-direction: column;

                gap: 10px;

                & svg {
                    color: ${(props) => getColorSettings(props.theme).primary};
                }

                & .title {
                    font-variation-settings: "wght" 600;
                    color: ${(props) => getColorSettings(props.theme).primary};
                }
            }

            & .viewMore {
                color: ${(props) => getColorSettings(props.theme).primary};

                & svg {transition: transform 0.3s ease-in;}
            }
        }
    }


    & .warning{
        padding: 10px 0;
        display: block;
        margin-top: 10px;
        
        & svg{color: ${(props) => getColorSettings(props.theme).primary};}
    }
   
`;
