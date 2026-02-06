import React from 'react';
import * as styled from '../Contact.style';
import * as FormComponent from '@/components/Form/Form.component';
import { Button } from '@/components/Button/Button';
import { Send } from 'lucide-react';
import { IMailForm, ICaptchaRef } from '@/hooks/useContactForm';

interface IContactFormUIProps {
    output: IMailForm;
    handleChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => void;
    handleSubmit: () => void;
    handleReset: () => void;
    captchaComponentRef: React.RefObject<ICaptchaRef | null>;
    isCaptchaValid: boolean;
    setIsCaptchaValid: (val: boolean) => void;
    honeypot: string;
    setHoneypot: (val: string) => void;
    IsCoolDown: boolean;
    CoolDownTime: number;
}

export const ContactFormUI: React.FC<IContactFormUIProps> = ({
    output,
    handleChange,
    handleSubmit,
    handleReset,
    captchaComponentRef,
    isCaptchaValid,
    setIsCaptchaValid,
    honeypot,
    setHoneypot,
    IsCoolDown,
    CoolDownTime,
}) => {
    return (
        <styled.ContactForm>
            <h2>Envoyer un message</h2>
            <styled.FormInstruction>
                <span>(*)</span> Champs obligatoires
            </styled.FormInstruction>
            <FormComponent.Groupe>
                <FormComponent.Inline>
                    <FormComponent.InputText
                        name="firstName"
                        value={output.firstName}
                        onChange={handleChange}
                        label="Prénom"
                        placeHolder="John"
                        required={true}
                    />
                    <FormComponent.InputText
                        name="lastName"
                        value={output.lastName}
                        onChange={handleChange}
                        label="Nom"
                        placeHolder="Doe"
                        required={false}
                    />
                </FormComponent.Inline>
                <FormComponent.InputEmail
                    name="email"
                    value={output.email}
                    onChange={handleChange}
                    label="Email"
                    placeHolder="secteur@domaine.fr"
                    required={true}
                />

                <input
                    type="text"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    style={{
                        opacity: 0,
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        height: 0,
                        width: 0,
                        zIndex: -1,
                    }}
                    autoComplete="off"
                    tabIndex={-1}
                    aria-hidden="true"
                />

                <FormComponent.InputTextArea
                    name="message"
                    value={output.message}
                    onChange={handleChange}
                    label="Message"
                    placeHolder="Ex. Salut, je veux créer un site web pour mes pingouins que chante du heavy metal. 🐧🤟 comment vous pouvez m'aider !"
                    required={true}
                />
            </FormComponent.Groupe>

            <FormComponent.CaptchaComponent
                ref={captchaComponentRef}
                isCaptchaValid={isCaptchaValid}
                setIsCaptchaValid={setIsCaptchaValid}
            />

            <styled.ActionForm>
                <span 
                    className="resetForm" 
                    onClick={handleReset}
                    role="button"
                    tabIndex={0}
                    aria-label="Réinitialiser le formulaire"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleReset();
                        }
                    }}
                >
                    Réinitialiser
                </span>
                <Button
                    onClick={handleSubmit}
                    icon={<Send />}
                    disabled={IsCoolDown}
                >
                    {IsCoolDown ? `attendre ${CoolDownTime}s` : 'Envoyer'}
                </Button>
            </styled.ActionForm>
        </styled.ContactForm>
    );
};
