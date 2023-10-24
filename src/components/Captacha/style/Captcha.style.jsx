import styled from 'styled-components';
import { COLOR } from "../../../config";

const backgroundColor = "#303134"
const FormColor = '#737272';
const BorderSize = '1px';
const FormFocusColor = COLOR.primary;



export const CaptchaContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin: 10px 0px;
`;

export const CaptchaForm = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
`

export const CaptchaLabel = styled.label`
    & span{
        color: ${COLOR.primary}
    }
`

export const CaptchaInput = styled.input`
    background-color: ${backgroundColor};
    border: ${BorderSize} solid ${FormColor};
    padding: 10px 5px 10px 5px;
    color: white;
    border-radius: 3px;
    outline: none;

    &:focus{
        border: ${BorderSize} solid ${FormFocusColor} !important;
    }
`

export const CaptchaMessage = styled.span`
    font-size: 16px;
    color: #6b6b6b;
`;