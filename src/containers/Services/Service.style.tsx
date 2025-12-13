import styled from 'styled-components';
import { BORDER_RADIUS, getColorSettings, GetLightSetting } from '../../config';
import { HexToRgbaConverter } from '../../utils/HexToRgbaConverter';

export const FenceContainer = styled.div`
    display: flex;
    gap: 50px;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    padding: 30px 19px;
    position: relative;

    & .desktop-contact-card {
        display: block;
    }

    @media (max-width: 768px) {
        flex-wrap: nowrap;
        overflow-x: auto;
        overflow-y: hidden;
        justify-content: flex-start;
        padding: 30px 20px;
        gap: 20px;
        scroll-snap-type: x mandatory;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none;
        -ms-overflow-style: none;
        
        &::-webkit-scrollbar {
            display: none;
        }

        & .desktop-contact-card {
            display: none;
        }
    }
`

export const ScrollIndicator = styled.div`
    display: none;

    @media (max-width: 768px) {
        display: block;
        position: relative;
        margin: 0 auto;
        width: 60px;
        height: 4px;
        background: linear-gradient(
            90deg,
            transparent 0%,
            ${props => getColorSettings(props.theme).primary} 20%,
            ${props => getColorSettings(props.theme).primary} 80%,
            transparent 100%
        );
        border-radius: 2px;
        opacity: 0.6;
        animation: scrollHint 2s ease-in-out infinite;
        pointer-events: none;

        @keyframes scrollHint {
            0%, 100% {
                transform: translateX(-10px);
                opacity: 0.6;
            }
            50% {
                transform: translateX(10px);
                opacity: 1;
            }
        }
    }
`;

export const IconList = styled.span`
    & > svg{
        color: ${props => getColorSettings(props.theme).primary};
        height: 100%;
    }
`

export const CatchModal = styled.span`
    display: block;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    font-size: 1rem;
    font-variation-settings: "wght" 200;
`

export const ListModal = styled.ul`
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding-top: 30px;
    & > li{
        display: flex;
        align-items: center;
        gap: 10px;
        font-variation-settings: "wght" 300;
    }
`

export const Fence = styled.div`
    cursor: pointer;
    min-height: 200px;
    min-width: 200px;
    padding: 50px 20px;
    display: flex;
    align-items: start;
    justify-content: end;
    flex-direction: column;
    gap: 15px;
    border-radius: ${BORDER_RADIUS.xlarge};
    border: 2px solid ${props => getColorSettings(props.theme).primary};
    position: relative;

    @media (max-width: 768px) {
        min-width: 280px;
        max-width: 280px;
        flex-shrink: 0;
        scroll-snap-align: center;
        scroll-snap-stop: always;
    }

    &.HightLighting {box-shadow: 0 0 30px ${props => HexToRgbaConverter(getColorSettings(props.theme).primary, 0.6)};}
    & .catch{ font-variation-settings: "wght" 400;}

    &::after{
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: ${props => HexToRgbaConverter(getColorSettings(props.theme).primary, GetLightSetting(props.theme) ? 0.05 : 0.1)};
        z-index: -1;
    }

    & > svg{
        color:  ${props => getColorSettings(props.theme).primary};
        font-size: 2em;
    }

    & span{
        color:  ${props => getColorSettings(props.theme).primary};
        transition: all .3s ease-in;
        display: inline-flex;
        align-items: center;
        & svg{
            transition: all .3s ease-in-out;
            margin-left: 5px
        }
    }

    &:hover{
        background-color: ${props => HexToRgbaConverter(getColorSettings(props.theme).primary, GetLightSetting(props.theme) ? 0.1 : 0.2)};
        & > span > svg{
            transition: all .3s ease-in-out;
            margin-left: 10px
        }
    }
`
