import React, { useState, useEffect, useRef } from 'react';
import { Eye, EyeOff, Palette, X } from 'lucide-react';

// Styles & Config
import * as Styled from './Setting.style';
import { COLOR_SETTING } from '@/config';
import { BackDrop } from '@/styles/effect';
import { RoundColor, Wrapper } from '@/styles/utils.style';

// Contexts & Hooks
import { useSettingContext } from '@/context/Setting.context';
import { useThemeManager } from '@/hooks/useThemeManager';
import { useScrollbar } from '@/hooks/useScrollBar.hook';
import { SimpleButton } from '@/components/Button/SimpleButton';
import { useAlert } from '@/context/alert.context';


//icon
import { Share } from 'lucide-react';

type ThemeName = keyof typeof COLOR_SETTING;

export const SettingContainer: React.FC = () => {
    const { addAlert } = useAlert();
    const { settings } = useSettingContext();

    const {
        randomThemeCount,
        fetchThemeCount,
        applyTheme,
        activateRandomTheme,
        ChangeHightContrast,
    } = useThemeManager();

    const [isOpen, setIsOpen] = useState(false);
    const [isLoadingCount, setIsLoadingCount] = useState(false);

    useScrollbar(isOpen);

    const containerRef = useRef<HTMLDivElement | null>(null);
    const toggleRef = useRef<HTMLButtonElement | null>(null);
    const contentRef = useRef<HTMLDivElement | null>(null);

    const defaultThemes: ThemeName[] = [
        'default',
        'red',
        'green',
        'yellow',
        'cyan',
        'pink',
        'ice'
    ];

    const handleThemeClick = (themeKey: string) => {
        applyTheme(themeKey, COLOR_SETTING[themeKey].display_name);
        setIsOpen(false);
    };

    const handleRandomClick = async () => {
        await activateRandomTheme();
        fetchThemeCount().catch((err) => console.error(err));
    };

    const handleContrastClick = () => {
        ChangeHightContrast(!settings.highContrast);
    };

    const HandleShareWithTheme = (e: React.MouseEvent, themeKey: string) => {
        e.stopPropagation();
        const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://jonathangleyze.fr';
        navigator.clipboard.writeText(`${SITE_URL}?theme=${themeKey}`);
        const themeColor = COLOR_SETTING[themeKey].primary;
        const message = <span>Lien avec le thème <span style={{ color: themeColor, fontWeight: 'bold' }}>{COLOR_SETTING[themeKey].display_name}</span> pret a etre partagé !</span>;
        addAlert(message, 'success', 3000);
    }

    const HandleShareWithHightContrast = (e: React.MouseEvent) => {
        e.stopPropagation();
        const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://jonathangleyze.fr';
        navigator.clipboard.writeText(`${SITE_URL}?hc=true`);
        const message = <span>Lien avec le mode <span style={{ fontWeight: 'bold', color: 'yellow'}}>Contraste Élevé</span> pret a etre partagé !</span>;
        addAlert(message, 'success', 3000);
    }

    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            if (
                containerRef.current &&
                !containerRef.current.contains(target) &&
                toggleRef.current &&
                !toggleRef.current.contains(target)
            ) {
                setIsOpen(false);
            }
        };

        const handleWheel = (event: WheelEvent) => {
            if (contentRef.current) {
                const element = contentRef.current;
                const canScrollDown = element.scrollHeight > element.clientHeight && element.scrollTop < element.scrollHeight - element.clientHeight;
                const canScrollUp = element.scrollTop > 0;

                if ((event.deltaY > 0 && !canScrollDown) || (event.deltaY < 0 && !canScrollUp)) {
                    return;
                }

                event.preventDefault();
                element.scrollTop += event.deltaY;
            }
        };

        let touchStartY = 0;
        const handleTouchStart = (event: TouchEvent) => {
            touchStartY = event.touches[0].clientY;
        };

        const handleTouchMove = (event: TouchEvent) => {
            if (!contentRef.current) return;
            
            const element = contentRef.current;
            const touchCurrentY = event.touches[0].clientY;
            const deltaY = touchStartY - touchCurrentY;

            const canScrollDown = element.scrollHeight > element.clientHeight && element.scrollTop < element.scrollHeight - element.clientHeight;
            const canScrollUp = element.scrollTop > 0;

            if ((deltaY > 0 && !canScrollDown) || (deltaY < 0 && !canScrollUp)) {
                return;
            }

            event.preventDefault();
            element.scrollTop += deltaY;
            touchStartY = touchCurrentY;
        };

        setIsLoadingCount(true);
        fetchThemeCount().finally(() => setIsLoadingCount(false));

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('wheel', handleWheel, { passive: false });
        
        if (contentRef.current) {
            contentRef.current.addEventListener('touchstart', handleTouchStart, { passive: true });
            contentRef.current.addEventListener('touchmove', handleTouchMove, { passive: false });
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('wheel', handleWheel);
            if (contentRef.current) {
                contentRef.current.removeEventListener('touchstart', handleTouchStart);
                contentRef.current.removeEventListener('touchmove', handleTouchMove);
            }
        };
    }, [isOpen, fetchThemeCount]);

    return (
        <>
            <Styled.Toggle
                ref={toggleRef}
                $isOpen={isOpen}
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-label={
                    isOpen ? 'Fermer les paramètres' : 'Ouvrir les paramètres'
                }
                type="button"
            >
                <span >{isOpen ? 'Fermer' : 'Apparence'}</span>
                <Palette aria-hidden="true" focusable={false} />
            </Styled.Toggle>

            <BackDrop $isOpen={isOpen} onClick={() => setIsOpen(false)} />

            <Styled.ContainerSetting
                ref={containerRef}
                className={isOpen ? 'opened' : 'close'}
            >
                <div className="header">
                    <h3 className="font_dot">Apparence</h3>
                    <Styled.CloseButton
                        onClick={() => setIsOpen(false)}
                        aria-label="Fermer les paramètres"
                    >
                        <X aria-hidden="true" focusable={false} />
                    </Styled.CloseButton>
                </div>
                <Styled.Content ref={contentRef}>
                    <div
                        className="ContainerButton"
                        style={{ marginTop: '10px' }}
                    >
                        <div className="theme">
                            <h3>Thème de Couleur</h3>
                            <div className="ThemesContainer">
                                {defaultThemes.map((themeKey) => (
                                    <SimpleButton
                                        key={themeKey}
                                        isActive={settings.theme === themeKey}
                                        onClick={() =>
                                            handleThemeClick(themeKey)
                                        }
                                        aria-label={`Activer le thème ${COLOR_SETTING[themeKey].display_name}`}
                                    >
                                        <div className="color">
                                            <RoundColor
                                                $color={
                                                    COLOR_SETTING[themeKey].primary
                                                }
                                            />
                                            <RoundColor
                                                $color={
                                                    COLOR_SETTING[themeKey]
                                                        .secondary
                                                }
                                            />
                                            <span>
                                            {
                                                COLOR_SETTING[themeKey]
                                                    .display_name
                                            }
                                        </span>
                                        </div>
                                      
                                        <span
                                            role="button"
                                            aria-label={`Partager avec le thème ${COLOR_SETTING[themeKey].display_name}`}
                                            onClick={(e) => HandleShareWithTheme(e, themeKey)}
                                        >
                                            <Share size={16} />
                                        </span>

                                    </SimpleButton>
                                ))}
                            </div>
                        </div>

                        <div className="accesebility">
                            <h3>Accessibilité</h3>
                            <Wrapper>
                                <p>
                                    Conçue pour améliorer la visibilité des
                                    éléments et faciliter la lecture pour les
                                    personnes ayant des déficiences visuelles.
                                </p>

                                <SimpleButton
                                    className={`contrast ${settings.highContrast ? 'active' : ''}`}
                                    onClick={handleContrastClick}
                                    type="button"
                                    aria-label={settings.highContrast ? 'Désactiver le contraste élevé' : 'Activer le contraste élevé'}
                                    aria-pressed={settings.highContrast}
                                >
                                    {settings.highContrast ? (
                                        <>
                                            <EyeOff aria-hidden="true" focusable={false} />{' '}
                                            <span>Désactiver le contraste</span>
                                        </>
                                    ) : (
                                        <>
                                            <Eye aria-hidden="true" focusable={false} />{' '}
                                            <span>Activer Contraste Élevé</span>
                                        </>
                                    )}
                                </SimpleButton>
                                <SimpleButton
                                    className={`contrast ${settings.highContrast ? 'active' : ''}`}
                                    onClick={(e) => HandleShareWithHightContrast(e)}
                                    type="button"
                                    aria-label="Partager le mode contraste élevé"
                                >
                                    <>
                                        <Share aria-hidden="true" focusable={false} size={16} />{' '}
                                        <span>Partage avec le mode contrast elevée</span>
                                    </>
                                </SimpleButton>
                            </Wrapper>
                        </div>

                        <div className="fun">
                            <h3>Mode Fun</h3>
                            <SimpleButton
                                className="random"
                                onClick={handleRandomClick}
                                type="button"
                                aria-label="Appliquer un thème de couleur aléatoire"
                            >
                                <div className="content-random">
                                    <p>
                                        Nous déclinons toute responsabilité en
                                        cas de <br />
                                        <strong
                                            style={{
                                                textDecoration: 'underline',
                                            }}
                                        >
                                            crise de couleur
                                        </strong>
                                    </p>
                                    <span>🦄 Thème aléatoire 🦄</span>
                                </div>

                                <div className="counter-random">
                                    <span>Déja</span>
                                    <span className="count">
                                        {String(randomThemeCount ?? '...')}
                                    </span>
                                    <span>
                                        âmes courageuses
                                        <br /> ont osé essayer
                                    </span>
                                </div>
                            </SimpleButton>
                        </div>
                    </div>
                </Styled.Content>

                <div className="footer">
                    <p>Personnalisez votre expérience</p>
                </div>
            </Styled.ContainerSetting>
        </>
    );
};
