import styled from "styled-components";
import { STYLE } from "../config/main";


// ? CONFIG STYLE FORM
const LabelPadding = '10px';
const backgroundColor = STYLE.Background_color;
const FormColor = STYLE.Border_color;
const BorderSize = STYLE.Border_size;
const FormFocusColor = STYLE.Form_focus;


export const FormLabel = styled.label`
    padding: ${LabelPadding} 0 ${LabelPadding} 0;

    &:first-letter{
        text-transform: uppercase;
    }

   & span{
    color: ${STYLE.Star_Color}
   }
`;

export const FormInput = styled.input `
    padding: 10px 5px 10px 5px;
    outline: none;
    border: ${BorderSize} solid ${FormColor};
    width: 100%;
    background-color: ${backgroundColor};
    color: white;

    border-radius: 3px;
    &:focus{
        border: ${BorderSize} solid ${FormFocusColor};
    }

    &:-webkit-autofill,
    &:-webkit-autofill:hover, 
    &:-webkit-autofill:focus, 
    &:-webkit-autofill:active{
        -webkit-text-fill-color: #ffffff;
        transition: background-color 5000s ease-in-out 0s;
        box-shadow: inset 0 0 20px 20px ${backgroundColor};
    }
`;

export const FormTextArea = styled.textarea `
    padding: 10px 5px 10px 5px;
    resize: none;
    height: 400px;
    outline: none;
    border: ${BorderSize} solid ${FormColor};
    border-radius: 3px;
    background-color: ${backgroundColor};
    color: white;

    &:focus{
        border: ${BorderSize} solid ${FormFocusColor};
    }
`;


export const FormSubmit = styled.input`
    padding : 15px;
    margin-top: 15px;
    background-color: ${backgroundColor};
    border: none;
    color: white;
    text-transform: uppercase;
    border-radius: 3px;
    cursor: pointer;

    &:hover{
        background-color: red;
    }
`;

export const FormElement = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const FormGroupe = styled.form `
    display: flex;
    flex-direction: column;
    height: 100%;


`;

export const FormInline = styled.div`
    display: flex;
    flex-direction: row;
    justify-content:space-between;
    gap: 10px;
    
    input{
        width: 100%;
    }

    @media (max-width: 850px) {
        flex-direction: column;
    }
`

//CAPTHA
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
        color: ${STYLE.Star_Color}
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



