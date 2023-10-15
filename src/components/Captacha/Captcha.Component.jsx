import React, { useState, useImperativeHandle, forwardRef } from 'react';

import {
    CaptchaContainer,
    CaptchaInput,
    CaptchaForm,
    CaptchaMessage
} from './style/Captcha.style';

import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';

/**
 * Generates a random number between 1 and 10.
 * @returns {number} A random number.
 */
const generateRandomNumber = () => {
  return Math.floor(Math.random() * 10) + 1;
};

/**
 * A component for displaying a simple captcha.
 * @param {object} props - The component's props.
 * @param {boolean} props.isCaptchaValid - Indicates whether the captcha answer is valid.
 * @param {function} props.setIsCaptchaValid - A function to set the captcha's validity.
 * @returns {JSX.Element} The rendered captcha component.
 */
export const CaptchaComponent = forwardRef(({ isCaptchaValid, setIsCaptchaValid }, ref) => {
    const [number1, setNumber1] = useState(generateRandomNumber());
    const [number2, setNumber2] = useState(generateRandomNumber());
    const [userAnswer, setUserAnswer] = useState('');

    const handleCaptchaChange = (e) => {
        const userProvidedAnswer = parseInt(e.target.value, 10);
        setUserAnswer(e.target.value);
        const correctAnswer = number1 + number2;
        setIsCaptchaValid(correctAnswer === userProvidedAnswer);
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
            <label htmlFor="Captcha">Captcha *</label>
            <CaptchaForm>
                <span>{number1} + {number2} =</span>
                <CaptchaInput
                    type="text"
                    value={userAnswer}
                    onChange={handleCaptchaChange}
                    name="Captcha"
                    id="Captcha"
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
