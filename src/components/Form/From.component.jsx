import React from 'react';

import {
    FormInput,
    FormTextArea,
    FormElement,
    FormLabel,
    FormGroupe,
    FormInline
} from './style/Form.style';

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
 */
export const InputText = ({ name, value, onChange, label, placeHolder, required }) => {
    const renderLabel = () => {
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

    const labelElement = renderLabel();

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
 */
export const InputEmail = ({ name, value, onChange, label, placeHolder, required }) => {
    const renderLabel = () => {
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

    const labelElement = renderLabel();

    let placeholderElement = placeHolder;
    if (required && label === undefined) {
        placeholderElement = `${placeHolder} *`;
    }

    return (
        <FormElement>
            {labelElement}
            <FormInput name={name} id={name} type="email" placeholder={placeholderElement} value={value} onChange={onChange} />
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
 */
export const InputTextArea = ({ name, value, onChange, label, placeHolder, required }) => {
    const renderLabel = () => {
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

    const labelElement = renderLabel();

    let placeholderElement = placeHolder;
    if (required && label === undefined) {
        placeholderElement = `${placeHolder} *`;
    }

    return (
        <FormElement>
            {labelElement}
            <FormTextArea name={name} id={name} placeholder={placeholderElement} value={value} onChange={onChange} />
        </FormElement>
    );
}