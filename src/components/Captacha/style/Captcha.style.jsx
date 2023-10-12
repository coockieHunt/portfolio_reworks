import styled from 'styled-components';

const backgroundColor = "#303134"
const FormColor = '#737272';
const BorderSize = '1px';


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

export const CaptchaInput = styled.input`
    background-color: ${backgroundColor};
    border: ${BorderSize} solid ${FormColor};
    padding: 10px 5px 10px 5px;
    color: white;
    border-radius: 3px;
`

export const CaptchaButton = styled.button`
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 3px;
    padding: 8px 16px;
    cursor: pointer;
`;

export const CaptchaMessage = styled.p`
    font-size: 16px;
    color: #6b6b6b;
`;