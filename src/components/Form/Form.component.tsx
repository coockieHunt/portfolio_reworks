import { useState, useImperativeHandle, forwardRef } from 'react';
import * as styled from './Form.style';
import { GenerateRandomNumber } from '../../utils/number';

export interface CaptchaComponentProps {
    isCaptchaValid: boolean;
    setIsCaptchaValid: (isValid: boolean) => void;
}

const renderLabel = (label, required, name) => {
    if (label !== undefined) {
        if (required) {
            return (
                <styled.FormLabel htmlFor={name}>
                    {label} <span>*</span>
                </styled.FormLabel>
            );
        }
        return <styled.FormLabel htmlFor={name}>{label}</styled.FormLabel>;
    }

    return null;
};

/**
 * * Parent Form
 * 
 * @param children child form all input
 */
export const Groupe = ({ children }) => (
    <styled.FormGroupe>
        {children}
    </styled.FormGroupe>
);

/**
 * * Inline style form
 * 
 * @param children form element inline
 */
export const Inline = ({ children }) => (
    <styled.FormInline>
        {children}
    </styled.FormInline>
);

/**
 * * Add input text
 *
 * ? if label not define the label will not be added
 *
 * @param name Var name of input
 * @param value Value default input value
 * @param onChange Callback onChange function
 * @param label Displayed text on label
 * @param placeHolder Place Holder text on label
 * @param required
 */
export const InputText = ({ name, value, onChange, label, placeHolder, required }) => {
    const labelElement = renderLabel(label, required, name);

    let placeholderElement = placeHolder;
    if (required && label === undefined) {
        placeholderElement = `${placeHolder} *`;
    }

    return (
        <styled.FormElement>
            {labelElement}
            <styled.FormInput name={name} id={name} type="text" placeholder={placeholderElement} value={value} onChange={onChange} />
        </styled.FormElement>
    );
}

/**
 * * Add input email
 *
 * ? if label not define the label will not be added
 *
 * @param name Var name of input
 * @param value Value default input value
 * @param onChange Callback onChange function
 * @param label Displayed text on label
 * @param placeHolder PlaceHolder text on label
 * @param required
 */
export const InputEmail = ({ name, value, onChange, label, placeHolder, required }) => {
    const labelElement = renderLabel(label, required, name);

    let placeholderElement = placeHolder;
    if (required && label === undefined) {
        placeholderElement = `${placeHolder} *`;
    }

    return (
        <styled.FormElement>
            {labelElement}
            <styled.FormInput name={name} id={name} type="email" placeholder={placeholderElement} value={value} onChange={onChange}  autoComplete="email"/>
        </styled.FormElement>
    );
};

/**
 * * Add text area
 *
 * ? if label not define the label will not be added
 *
 * @param name Var name of input
 * @param value Value default text area value
 * @param onChange Callback onChange function
 * @param label Displayed text on text area
 * @param placeHolder Place Holder text on label
 * @param required if label required
 */
export const InputTextArea = ({ name, value, onChange, label, placeHolder, required }) => {
    const renderLabel = () => {
        if (label !== undefined) {
            return (
                <styled.FormLabel htmlFor={name}>
                    {label} {required && <span>*</span>}
                </styled.FormLabel>
            );
        }
        return null;
    };

    let placeholderElement = placeHolder;
    if (required && label === undefined) {
        placeholderElement = `${placeHolder} *`;
    }

    return (
        <styled.FormElement>
            {renderLabel()}
            <styled.FormTextArea name={name} id={name} placeholder={placeholderElement} value={value} onChange={onChange} />
        </styled.FormElement>
    );
};

/**
 ** A component for displaying a simple captcha.
 * 
 * @param {boolean} isCaptchaValid - Indicates whether the captcha answer is valid.
 * @param {function} setIsCaptchaValid - A function to set the captcha validity.
 * @returns {JSX.Element} The rendered captcha component.
 */


export const CaptchaComponent = forwardRef(({ isCaptchaValid, setIsCaptchaValid }: CaptchaComponentProps, ref) => {
    const [number1, setNumber1] = useState(GenerateRandomNumber(1, 10));
    const [number2, setNumber2] = useState(GenerateRandomNumber(1, 10));
    const [userAnswer, setUserAnswer] = useState('');

    const handleCaptchaChange = (e) => {
        const userProvidedAnswer = e.target.value.replace(/\D/g, '');;
        setUserAnswer(userProvidedAnswer);
        const correctAnswer = number1 + number2;
        setIsCaptchaValid(correctAnswer === parseInt(userProvidedAnswer));
    };

    const handleReset = () => {
        setNumber1(GenerateRandomNumber(1, 10));
        setNumber2(GenerateRandomNumber(1, 10));
        setUserAnswer('');
        setIsCaptchaValid(false);
    };

    useImperativeHandle(ref, () => ({
        handleReset: handleReset
    }));

    return (
        <styled.CaptchaContainer>
            <styled.CaptchaLabel htmlFor="Captcha">Captcha <span>*</span></styled.CaptchaLabel>
            <styled.CaptchaForm $isValid={isCaptchaValid} $hasValue={userAnswer !== ''}>
                <span>{number1} + {number2} =</span>

                <styled.CaptchaInput
                    type="text"
                    value={userAnswer}
                    onChange={handleCaptchaChange}
                    name="Captcha"
                    id="Captcha"
                    pattern="[0-9]*"
                />
            </styled.CaptchaForm>
        </styled.CaptchaContainer>
    );
});