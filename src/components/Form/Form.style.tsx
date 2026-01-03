import styled from 'styled-components';
import { BORDER_RADIUS } from '../../config.js';

export interface FormLabelProps {
    light?: boolean;
}

export interface FormInputProps {
    light?: boolean;
}

export interface CaptchaFormProps {
    $hasValue: boolean;
    $isValid: boolean;
}

export interface CaptchaInputProps {
    light?: boolean;
}

export interface FormSubmitProps {
    light?: boolean;
}

// ? CONFIG STYLE FORM
const LabelPadding = '10px';
const BorderSize = '1.5px';

export const FormLabel = styled.label<FormLabelProps>`
    padding: ${LabelPadding} 0 8px 0;
    font-size: 0.95em;
    font-weight: 500;
    transition: color 0.3s ease;

    &:first-letter {
        text-transform: uppercase;
    }
    & span {
        color: var(--primary);
    }
`;

export const FormInput = styled.input<FormInputProps>`
    padding: 14px 18px;
    outline: none;
    border: ${BorderSize} solid rgba(255, 255, 255, 0.1);
    width: 100%;
    background-color: rgba(255, 255, 255, 0.03);
    font-size: 1em;
    border-radius: ${BORDER_RADIUS.xlarge};
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &::placeholder {
        color: var(--font-subtle);
        transition: opacity 0.3s ease;
    }

    &:hover {
        border-color: rgba(255, 255, 255, 0.2);
        background-color: rgba(255, 255, 255, 0.04);
    }

    &:focus {
        border-color: var(--primary);
        background-color: rgba(255, 255, 255, 0.05);
        box-shadow:
            0 0 0 3px color-mix(in srgb, var(--primary) 8%, transparent),
            0 4px 12px color-mix(in srgb, var(--primary) 12%, transparent);
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
    font-size: 1em;
    font-family: inherit;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &::placeholder {
        color: var(--font-subtle);
        transition: opacity 0.3s ease;
    }

    &:hover {
        border-color: rgba(255, 255, 255, 0.2);
        background-color: rgba(255, 255, 255, 0.04);
    }

    &:focus {
        border-color: var(--primary);
        background-color: rgba(255, 255, 255, 0.05);
        box-shadow:
            0 0 0 3px color-mix(in srgb, var(--primary) 8%, transparent),
            0 4px 12px color-mix(in srgb, var(--primary) 12%, transparent);
        transform: translateY(-1px);

        &::placeholder {
            opacity: 0.6;
        }
    }

    @media (max-width: 850px) {
        min-height: 200px;
    }
`;

export const FormSubmit = styled.input<FormSubmitProps>`
    padding: 15px;
    margin-top: 15px;
    background-color: var(--background-tertiary);
    border: none;
    text-transform: uppercase;
    border-radius: ${BORDER_RADIUS.small};
    cursor: pointer;
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
    font-weight: 500;

    & span {
        color: var(--primary);
    }
`;

export const CaptchaForm = styled.div<CaptchaFormProps>`
    display: flex;
    align-items: center;
    gap: 12px;
    width: fit-content;
    background: rgba(255, 255, 255, 0.03);
    border: ${BorderSize} solid
        ${(props) => {
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
        border-color: ${(props) => {
            if (!props.$hasValue) return 'var(--primary)';
            return props.$isValid ? '#4caf50' : '#f44336';
        }};
        background: rgba(255, 255, 255, 0.05);
        box-shadow: 0 0 0 3px
            ${(props) => {
                if (!props.$hasValue)
                    return `color-mix(in srgb, var(--primary) 8%, transparent)`;
                return props.$isValid ? '#4caf5015' : '#f4433615';
            }};
    }
`;

export const CaptchaInput = styled.input<CaptchaInputProps>`
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: ${BORDER_RADIUS.large};
    padding: 10px 14px;
    width: 80px;
    text-align: center;
    font-size: 1em;
    outline: none;
    transition: all 0.3s ease;

    &:focus {
        border-color: var(--primary);
        background: rgba(255, 255, 255, 0.08);
    }

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`;
