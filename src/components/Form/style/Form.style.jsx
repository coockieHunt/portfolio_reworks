import styled from "styled-components";
import { BORDER_RADIUS, getColorSettings, GetLightSetting } from '../../../config';
import { SCREEN_SIZE } from '../../../config';

// ? CONFIG STYLE FORM
const LabelPadding = '10px';
const BorderSize = '1.5px';

export const FormLabel = styled.label`
    padding: ${LabelPadding} 0 8px 0;
    font-size: 0.95em;
    color: rgba(255, 255, 255, 0.8);
    font-weight: 500;
    transition: color 0.3s ease;

    &:first-letter { text-transform: uppercase; }
    & span { color: ${props => getColorSettings(props.theme).primary}; }
`;

export const FormInput = styled.input`
    padding: 14px 18px;
    outline: none;
    border: ${BorderSize} solid rgba(255, 255, 255, 0.1);
    width: 100%;
    background-color: rgba(255, 255, 255, 0.03);
    color: white;
    font-size: 1em;
    border-radius: ${BORDER_RADIUS.xlarge};
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &::placeholder {
        color: rgba(255, 255, 255, 0.3);
        transition: opacity 0.3s ease;
    }

    &:hover {
        border-color: rgba(255, 255, 255, 0.2);
        background-color: rgba(255, 255, 255, 0.04);
    }

    &:focus {
        border-color: ${props => getColorSettings(props.theme).primary};
        background-color: rgba(255, 255, 255, 0.05);
        box-shadow: 
            0 0 0 3px ${props => getColorSettings(props.theme).primary}15,
            0 4px 12px ${props => getColorSettings(props.theme).primary}20;
        transform: translateY(-1px);

        &::placeholder {
            opacity: 0.6;
        }
    }

    &:-webkit-autofill,
    &:-webkit-autofill:hover, 
    &:-webkit-autofill:focus, 
    &:-webkit-autofill:active {
        -webkit-text-fill-color: #ffffff;
        transition: background-color 5000s ease-in-out 0s;
        box-shadow: inset 0 0 20px 20px ${props => GetLightSetting(props.light).background_tertiary};
    }
`;

export const FormTextArea = styled.textarea`
    padding: 14px 18px;
    resize: vertical;
    min-height: 180px;
    outline: none;
    border: ${BorderSize} solid rgba(255, 255, 255, 0.1);
    border-radius: ${BORDER_RADIUS.xlarge};
    background-color: rgba(255, 255, 255, 0.03);
    color: white;
    font-size: 1em;
    font-family: inherit;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &::placeholder {
        color: rgba(255, 255, 255, 0.3);
        transition: opacity 0.3s ease;
    }

    &:hover {
        border-color: rgba(255, 255, 255, 0.2);
        background-color: rgba(255, 255, 255, 0.04);
    }

    &:focus {
        border-color: ${props => getColorSettings(props.theme).primary};
        background-color: rgba(255, 255, 255, 0.05);
        box-shadow: 
            0 0 0 3px ${props => getColorSettings(props.theme).primary}15,
            0 4px 12px ${props => getColorSettings(props.theme).primary}20;
        transform: translateY(-1px);

        &::placeholder {
            opacity: 0.6;
        }
    }

    @media (max-width: 850px) {
        min-height: 200px;
    }
`;

export const FormSubmit = styled.input`
    padding: 15px;
    margin-top: 15px;
    background-color: ${props => GetLightSetting(props.light).background_tertiary};
    border: none;
    color: white;
    text-transform: uppercase;
    border-radius: ${BORDER_RADIUS.small};
    cursor: pointer;

    &:hover {
        background-color: red;
    }
`;

export const FormElement = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const FormGroupe = styled.form`
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 24px;
    margin-top: 30px;
`;

export const FormInline = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    
    @media (max-width: 850px) {
        grid-template-columns: 1fr;
    }
`;

// CAPTCHA
export const CaptchaContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 10px;
`;

export const CaptchaLabel = styled.label`
    font-size: 0.95em;
    color: rgba(255, 255, 255, 0.8);
    font-weight: 500;

    & span {
        color: ${props => getColorSettings(props.theme).primary};
    }
`;

export const CaptchaForm = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    width: fit-content;
    background: rgba(255, 255, 255, 0.03);
    border: ${BorderSize} solid ${props => {
        if (!props.$hasValue) return 'rgba(255, 255, 255, 0.1)';
        return props.$isValid ? '#4caf50' : '#f44336';
    }};
    border-radius: ${BORDER_RADIUS.xlarge};
    padding: 12px 16px;
    transition: all 0.3s ease;

    & > span {
        color: rgba(255, 255, 255, 0.9);
        font-size: 1.1em;
        font-weight: 500;
        min-width: 80px;
    }

    &:focus-within {
        border-color: ${props => {
            if (!props.$hasValue) return getColorSettings(props.theme).primary;
            return props.$isValid ? '#4caf50' : '#f44336';
        }};
        background: rgba(255, 255, 255, 0.05);
        box-shadow: 0 0 0 3px ${props => {
            if (!props.$hasValue) return `${getColorSettings(props.theme).primary}15`;
            return props.$isValid ? '#4caf5015' : '#f4433615';
        }};
    }
`;

export const CaptchaInput = styled.input`
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: ${BORDER_RADIUS.large};
    padding: 10px 14px;
    color: white;
    width: 80px;
    text-align: center;
    font-size: 1em;
    outline: none;
    transition: all 0.3s ease;

    &:focus {
        border-color: ${props => getColorSettings(props.theme).primary};
        background: rgba(255, 255, 255, 0.08);
    }

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    -moz-appearance: textfield;
`;

export const CaptchaMessage = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4em;
    margin-left: auto;
    
    & svg {
        filter: drop-shadow(0 2px 4px currentColor);
    }
`;