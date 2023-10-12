import React, { useState } from 'react';

import {
    CaptchaContainer,
    CaptchaInput,
    CaptchaForm,
    CaptchaMessage
} from './style/Captcha.style'

import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';


const generateRandomNumber = () => {
  return Math.floor(Math.random() * 10) + 1;
};

export const CaptchaComponent = ({ isCaptchaValid, setIsCaptchaValid }) => {
    const [number1, setNumber1] = useState(generateRandomNumber());
    const [number2, setNumber2] = useState(generateRandomNumber());
    const [userAnswer, setUserAnswer] = useState('');

    const handleCaptchaChange = (e) => {
        const userProvidedAnswer = parseInt(e.target.value, 10);
        setUserAnswer(e.target.value);
        const correctAnswer = number1 + number2;
        setIsCaptchaValid(correctAnswer === userProvidedAnswer);
    };

    return (
        <CaptchaContainer>
            Captcha *
            <CaptchaForm>
                <span>{number1} + {number2} =</span>
                <CaptchaInput
                    type="input"
                    value={userAnswer}
                    onChange={handleCaptchaChange}
                />
                {isCaptchaValid ? (
                    <CaptchaMessage style={{color: "green"}}><AiOutlineCheck/></CaptchaMessage>) : (
                    <CaptchaMessage style={{color: "red"}}><AiOutlineClose/></CaptchaMessage>
                )}
            </CaptchaForm>
        </CaptchaContainer>
    );
  };