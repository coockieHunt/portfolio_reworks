import React, { useState, useEffect, useRef } from 'react';
import { Contrast, Palette, X, ZapOff, SpellCheck, ExternalLink } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';

// Styles & Config
import * as Styled from './Setting.style';
import { COLOR_SETTING } from '@/config';
import { BackDrop } from '@/styles/effect';
import { Wrapper } from '@/styles/utils.style';

// Contexts & Hooks
import { useSettingContext } from '@/context/Setting.context';
import { useThemeManager } from '@/hooks/useThemeManager';
import { useScrollbar } from '@/hooks/useScrollBar.hook';
import { SimpleButton } from '@/components/Button/SimpleButton';
import { TogglesComponent } from '@/components/Form/Form.component';

// icon
import { Share } from 'lucide-react';
import { ThemeCard } from '@/components/ThemeCard/themeCard.component';
import { CarouselComponent } from '@/components/Carousel/carousel.component';

type ThemeName = keyof typeof COLOR_SETTING;

export const SettingContainer: React.FC = () => {
    const { settings } = useSettingContext();
    const navigate = useNavigate();

    const {
        randomThemeCount,
        fetchThemeCount,
        applyTheme,
        activateRandomTheme,
        ChangeHighContrast,
        ChangeReducedMotion,
        ChangeOpenDyslexic,
    } = useThemeManager();

    const [isOpen, setIsOpen] = useState(false);
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
        'ice',
    ];

    const orderedThemes: ThemeName[] =
        settings.theme in COLOR_SETTING
            ? [
                  settings.theme as ThemeName,
                  ...defaultThemes.filter((themeKey) => themeKey !== settings.theme),
              ]
            : defaultThemes;

    const handleThemeClick = (themeKey: ThemeName) => {
        applyTheme(themeKey, COLOR_SETTING[themeKey].display_name);
        setIsOpen(false);
    };

    const handleRandomClick = async () => {
        await activateRandomTheme();
        fetchThemeCount().catch((err) => console.error(err));
    };

    const handleContrastClick = () => {
        ChangeHighContrast(!settings.highContrast);
    };

    const handleReducedMotionClick = () => {
        ChangeReducedMotion(!settings.reducedMotion);
    };

    const handleOpenDyslexicClick = () => {
        ChangeOpenDyslexic(!settings.openDyslexic);
    }; 

    const handleReadMoreClick = () => {
        navigate({ to: '/guide_mode_contrast_elevee' });
        setIsOpen(false);
    };

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
                const canScrollDown =
                    element.scrollHeight > element.clientHeight &&
                    element.scrollTop < element.scrollHeight - element.clientHeight;
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

            const canScrollDown =
                element.scrollHeight > element.clientHeight &&
                element.scrollTop < element.scrollHeight - element.clientHeight;
            const canScrollUp = element.scrollTop > 0;

            if ((deltaY > 0 && !canScrollDown) || (deltaY < 0 && !canScrollUp)) {
                return;
            }

            event.preventDefault();
            element.scrollTop += deltaY;
            touchStartY = touchCurrentY;
        };

        fetchThemeCount().catch((err) => console.error(err));

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
                onClick={() => setIsOpen((prev) => !prev)}
                aria-expanded={isOpen}
                aria-label={isOpen ? 'Fermer les paramètres' : 'Ouvrir les paramètres'}
                type="button"
            >
                <span>{isOpen ? 'Fermer' : 'Apparence'}</span>
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
                    <div className="ContainerButton">
                        <div className="section-themes">
                            <div className="titleSection">
                                <h3>Ambiance</h3>
                                <span>
                                    ( <Share size={15} /> pour partager avec l'ambiance actuelle )
                                </span>
                            </div>
                            <div className="ThemesContainer">
                                <div className="themes-desktop">
                                    <CarouselComponent
                                        itemsToScroll={4}
                                        resetKey={settings.theme}
                                    >
                                        {orderedThemes.map((themeKey) => (
                                            <ThemeCard
                                                isActive={settings.theme === themeKey}
                                                key={themeKey}
                                                name={themeKey}
                                                displayName={COLOR_SETTING[themeKey].display_name}
                                                onClick={() => handleThemeClick(themeKey)}
                                            />
                                        ))}
                                    </CarouselComponent>
                                </div>

                                <div className="themes-mobile">
                                    {orderedThemes.map((themeKey) => (
                                        <ThemeCard
                                            isActive={settings.theme === themeKey}
                                            key={`mobile-${themeKey}`}
                                            name={themeKey}
                                            displayName={COLOR_SETTING[themeKey].display_name}
                                            onClick={() => handleThemeClick(themeKey)}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="section-row2">
                            <div className="section-accessibility">
                                <div className="titleSection">
                                    <h3>Accessibilité</h3>
                                </div>
                                <Wrapper>
                                    <p>
                                        Conçue pour améliorer le confort visuel et l'accessibilité pour tous les utilisateurs.&nbsp;
                                        <span
                                            style={{
                                                color: 'var(--font-subtle)',
                                                cursor: 'pointer',
                                            }}
                                            onClick={handleReadMoreClick}
                                        >
                                            En savoir plus.
                                        </span>
                                    </p>

                                    <TogglesComponent 
                                        icon={<SpellCheck size={20} />}
                                        label="Mode police d'ecriture dyslexique" 
                                        bool={settings.openDyslexic} 
                                        onClick={handleOpenDyslexicClick}
                                    />

                                    <TogglesComponent 
                                        icon={<ZapOff size={20} />}
                                        label="Mode animation réduit" 
                                        bool={settings.reducedMotion} 
                                        onClick={handleReducedMotionClick}
                                    />

                                    <TogglesComponent 
                                        icon={<Contrast size={20} />}
                                        label="Mode contraste élevé" 
                                        bool={settings.highContrast} 
                                        onClick={handleContrastClick}
                                    />

                                    <div className="action">
                                        <SimpleButton
                                            className="share-config"
                                            onClick={() => {
                                                const params = [
                                                    settings.highContrast ? 'accessibility=true' : '',
                                                    settings.openDyslexic ? 'dysfont=1' : '',
                                                    settings.reducedMotion ? 'reduceMotion=1' : '',
                                                ].filter(Boolean).join('&');

                                                const SITE_URL = import.meta.env.VITE_FRONT_SITE_URL || 'https://jonathangleyze.fr';
                                                const urlToCopy = `${SITE_URL}${params ? `?${params}` : ''}`;
                                                navigator.clipboard.writeText(urlToCopy);
                                            }}
                                        >
                                            <ExternalLink size={15} />
                                            Partager avec la configuration actuelle
                                        </SimpleButton>
                                        <SimpleButton
                                            className="reset-config"
                                            aria-label="Réinitialiser les options d'accessibilité"
                                            onClick={() => {
                                                ChangeHighContrast(false);
                                                ChangeOpenDyslexic(false);
                                                ChangeReducedMotion(false);
                                            }}
                                        >
                                            <X size={25} />
                                        </SimpleButton>
                                    </div>
                                    
                                </Wrapper>
                            </div>
                            <div>
                                <div className="titleSection">
                                    <h3>Mode Fun</h3>
                                </div>
                                <SimpleButton
                                    className="random"
                                    onClick={handleRandomClick}
                                    type="button"
                                    aria-label="Appliquer un thème de couleur aléatoire"
                                >
                                    <div className="content-random">
                                        <p>
                                            Nous déclinons toute responsabilité en cas de <br />
                                            <strong style={{ textDecoration: 'underline' }}>
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

                    </div>
                </Styled.Content>

                <div className="footer">
                    <p>Personnalisez votre expérience</p>
                </div>
            </Styled.ContainerSetting>
        </>
    );
};