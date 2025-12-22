//styles
import * as styled from './ProjectIdeaInput.style';

//react 
import { useState, ChangeEvent, KeyboardEvent, useEffect } from 'react';

//icons
import { Send } from 'lucide-react';

//types
interface ProjectIdeaInputProps {
    ScroolTo: string;
    DataWord: string[];
}

export const ProjectIdeaInput = ({ ScroolTo, DataWord }: ProjectIdeaInputProps) => {
    const [inputValue, setInputValue] = useState('');
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [showCursor, setShowCursor] = useState(true);

    const [currentWord, setCurrentWord] = useState(() => {
        const randomIndex = Math.floor(Math.random() * DataWord.length);
        return formatWord(DataWord[randomIndex]);
    });

    function formatWord(word: string): string {
        return String(word).charAt(0).toUpperCase() + String(word).slice(1);
    }

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') { handleSubmit(); }
    };

    const handleSubmit = () => {
        if (inputValue.trim().length < 1) return;

        const contactSection = document.getElementById('contact');
        if (contactSection) {
            const messageText = `Bonjour, je souhaite discuter de mon projet : ${inputValue}`;
            
            contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

            setTimeout(() => {
                const messageField = document.querySelector(ScroolTo) as HTMLTextAreaElement | null;
                
                if (messageField) {
                    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value')?.set;
                    
                    if (nativeInputValueSetter) {
                        nativeInputValueSetter.call(messageField, messageText);
                    }

                    const event = new Event('input', { bubbles: true });
                    messageField.dispatchEvent(event);
                    messageField.focus();
                }
            }, 800);

            setTimeout(() => { setInputValue(''); }, 1000);
        }
    };

    useEffect(() => {
        if (isInputFocused) {
            setShowCursor(false);
            return;
        }

        const wordTimer = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * DataWord.length);
            setCurrentWord(formatWord(DataWord[randomIndex]));
        }, 2000);

        const blinkTimer = setInterval(() => {
            setShowCursor((prev) => !prev);
        }, 500);

        return () => {
            clearInterval(wordTimer);
            clearInterval(blinkTimer);
        };
    }, [isInputFocused]);

    return (
        <styled.InputWrapper>
            <styled.LabelWorld
                type="text"
                name="project-idea" 
                autoComplete="off"
                placeholder={`${currentWord}${showCursor ? '|' : ''}`}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
                value={inputValue}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                size={10}
                aria-label="Décrivez votre projet"
            />
            {inputValue.length >= 1 && (
                <styled.SendIcon
                    onClick={handleSubmit}
                    role="button"
                    tabIndex={0}
                    aria-label="Aller au formulaire de contact avec ce texte"
                >
                    <Send />
                </styled.SendIcon>
            )}
        </styled.InputWrapper>
    );
};