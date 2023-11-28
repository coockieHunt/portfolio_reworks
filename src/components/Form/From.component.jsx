import React, { useState, useImperativeHandle, forwardRef } from 'react';


import {
    FormInput,
    FormTextArea,
    FormElement,
    FormLabel,
    FormGroupe,
    FormInline,
    CaptchaContainer,
    CaptchaInput,
    CaptchaForm,
    CaptchaMessage,
    CaptchaLabel
} from './style/Form.style';

import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';

const renderLabel = (label, required, name) => {
    if (label !== undefined) {
        if (required) {
            return (
                <FormLabel htmlFor={name}>
                    {label} <span>*</span>
                </FormLabel>
            );
        }
        return <FormLabel htmlFor={name}>{label}</FormLabel>;
    }

    return null;
};


/**
 * * Generates a random number between 1 and 10.
 * 
 * @returns {number} A random number.
 */
const generateRandomNumber = () => {
    return Math.floor(Math.random() * 10) + 1;
  };

/**
 * * Parent Form
 * 
 * @param children child form all input
 */
export const Groupe = ({ children }) => (
    <FormGroupe>
        {children}
    </FormGroupe>
);

/**
 * * Inline style form
 * 
 * @param children form element inline
 */
export const Inline = ({ children }) => (
    <FormInline>
        {children}
    </FormInline>
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
        <FormElement>
            {labelElement}
            <FormInput name={name} id={name} type="text" placeholder={placeholderElement} value={value} onChange={onChange} />
        </FormElement>
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
        <FormElement>
            {labelElement}
            <FormInput name={name} id={name} type="email" placeholder={placeholderElement} value={value} onChange={onChange}  autoComplete="email"/>
        </FormElement>
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
                <FormLabel htmlFor={name}>
                    {label} {required && <span>*</span>}
                </FormLabel>
            );
        }
        return null;
    };

    let placeholderElement = placeHolder;
    if (required && label === undefined) {
        placeholderElement = `${placeHolder} *`;
    }

    return (
        <FormElement>
            {renderLabel()}
            <FormTextArea name={name} id={name} placeholder={placeholderElement} value={value} onChange={onChange} />
        </FormElement>
    );
};

/**
 ** A component for displaying a simple captcha.
 * 
 * @param {boolean} isCaptchaValid - Indicates whether the captcha answer is valid.
 * @param {function} setIsCaptchaValid - A function to set the captcha validity.
 * @returns {JSX.Element} The rendered captcha component.
 */
export const CaptchaComponent = forwardRef(({ isCaptchaValid, setIsCaptchaValid }, ref) => {
    const [number1, setNumber1] = useState(generateRandomNumber());
    const [number2, setNumber2] = useState(generateRandomNumber());
    const [userAnswer, setUserAnswer] = useState('');

    const handleCaptchaChange = (e) => {
        const userProvidedAnswer = e.target.value.replace(/\D/g, '');;
        setUserAnswer(userProvidedAnswer);
        const correctAnswer = number1 + number2;
        setIsCaptchaValid(correctAnswer === parseInt(userProvidedAnswer));
    };

    const handleReset = () => {
        setNumber1(generateRandomNumber());
        setNumber2(generateRandomNumber());
        setUserAnswer('');
        setIsCaptchaValid(false);
    };

    useImperativeHandle(ref, () => ({
        handleReset: handleReset
    }));

    return (
        <CaptchaContainer>
            <CaptchaLabel htmlFor="Captcha">Captcha <span>*</span></CaptchaLabel>
            <CaptchaForm>
                <span>{number1} + {number2} =</span>

                <CaptchaInput
                    type="text"
                    value={userAnswer}
                    onChange={handleCaptchaChange}
                    name="Captcha"
                    id="Captcha"
                    pattern="[0-9]*"
                />
                {isCaptchaValid ? (
                    <CaptchaMessage style={{ color: "green" }}><AiOutlineCheck /></CaptchaMessage>
                ) : (
                    <CaptchaMessage style={{ color: "red" }}><AiOutlineClose /></CaptchaMessage>
                )}
            </CaptchaForm>
        </CaptchaContainer>
    );
});