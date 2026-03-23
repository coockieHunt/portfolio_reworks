// styles
import * as styled from './ProjectIdeaInput.style';

// react
import {
    useState,
    ChangeEvent,
    KeyboardEvent,
    useEffect,
    useCallback,
    useRef,
} from 'react';

// icons
import { Send } from 'lucide-react';

// types
interface ProjectIdeaInputProps {
    ScroolTo: string;
    DataWord: string[];
}

export const ProjectIdeaInput = ({
    ScroolTo,
    DataWord,
}: ProjectIdeaInputProps) => {
    const [inputValue, setInputValue] = useState('');

    const [currentWord, setCurrentWord] = useState(() => {
        if (!DataWord || DataWord.length === 0) return 'Projet...';
        const randomIndex = Math.floor(Math.random() * DataWord.length);
        return formatWord(DataWord[randomIndex]);
    });

    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    function formatWord(word: string): string {
        return String(word).charAt(0).toUpperCase() + String(word).slice(1);
    }

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    const handleSubmit = useCallback(() => {
        if (inputValue.trim().length < 1) return;

        const contactSection = document.getElementById('contact');
        if (contactSection) {
            const messageText = `Bonjour, je souhaite discuter de mon projet : ${inputValue}`;

            requestAnimationFrame(() => {
                contactSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            });

            setTimeout(() => {
                const messageField = document.querySelector(
                    ScroolTo,
                ) as HTMLTextAreaElement | null;

                if (messageField) {
                    const nativeInputValueSetter =
                        Object.getOwnPropertyDescriptor(
                            window.HTMLTextAreaElement.prototype,
                            'value',
                        )?.set;

                    if (nativeInputValueSetter) {
                        nativeInputValueSetter.call(messageField, messageText);
                    }

                    const event = new Event('input', { bubbles: true });
                    messageField.dispatchEvent(event);
                    messageField.focus();
                }
            }, 800);

            setTimeout(() => {
                setInputValue('');
            }, 1000);
        }
    }, [inputValue, ScroolTo]);

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * DataWord.length);
            setCurrentWord(formatWord(DataWord[randomIndex]));
        }, 2000);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [DataWord]);

    return (
        <styled.InputWrapper>
            <styled.LabelWorld
                type="text"
                name="project-idea"
                autoComplete="off"
                placeholder={`${currentWord}...`}
                value={inputValue}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setInputValue(e.target.value)
                }
                onKeyDown={handleKeyPress}
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
