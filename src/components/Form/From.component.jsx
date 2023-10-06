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
    const IfLabel = (label) => {
        if (label !== undefined) {
            if (required !== undefined) {
                label = label + " *";
            }
            return <FormLabel htmlFor={name}>{label}</FormLabel>;
        }

        return <FormLabel>&#x200B;</FormLabel>;
    };

    let LabelElement = IfLabel(label);

    let placeHolderElement = placeHolder;
    if (required !== undefined && label === undefined) {
        placeHolderElement = placeHolder + " *";
    }

    return (
        <FormElement>
            {LabelElement}
            <FormInput name={name} type="text" placeholder={placeHolderElement} value={value} onChange={onChange} />
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
    const IfLabel = (label) => {
        if (label !== undefined) {
            if (required !== undefined) {
                label = label + " *";
            }
            return <FormLabel htmlFor={name}>{label}</FormLabel>;
        }

        return <FormLabel>&#x200B;</FormLabel>;
    };

    let LabelElement = IfLabel(label);

    let placeHolderElement = placeHolder;
    if (required !== undefined && label === undefined) {
        placeHolderElement = placeHolder + " *";
    }

    return (
        <FormElement>
            {LabelElement}
            <FormInput name={name} type="email" placeholder={placeHolderElement} value={value} onChange={onChange} />
        </FormElement>
    );
}

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
    const IfLabel = (label) => {
        if (label !== undefined) {
            if (required !== undefined) {
                label = label + " *";
            }
            return <FormLabel htmlFor={name}>{label}</FormLabel>;
        }

        return <FormLabel>&#x200B;</FormLabel>;
    };

    let LabelElement = IfLabel(label);

    let placeHolderElement = placeHolder;
    if (required !== undefined && label === undefined) {
        placeHolderElement = placeHolder + " *";
    }

    return (
        <FormElement>
            {LabelElement}
            <FormTextArea name={name} placeholder={placeHolderElement} value={value} onChange={onChange} />
        </FormElement>
    );
}