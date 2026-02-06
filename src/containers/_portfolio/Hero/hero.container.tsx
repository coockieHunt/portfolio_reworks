import { useState, useEffect, ChangeEvent, KeyboardEvent, JSX } from 'react';

// style
import * as styled from './hero.style';
import { GridEffect } from '@/styles/effect';

// components
import { GradientTextContainer } from '@/components/Text/Text.component';
import { HelloHandComponent } from '@/components/HelloHand/HelloHand.component';
import { MouseComponent } from '@/components/Mouse/Mouse.component';
import { WireframeScene } from '@/components/FrameCube/FrameCube.components';
import { ProjectIdeaInput } from '@/components/ProjectIdeaInput/ProjectIdeaInput.component';

// data & context
import { COLOR_SETTING } from '@/config';
import { useSettingContext } from '@/context/Setting.context';
import { word_hero } from '@/data';

// types
interface HeroContainerProps {
    id?: string;
}

interface CtaLinkProps {
    to: string;
    title: string;
    description: string;
    isHighlight?: boolean;
}

const CtaLink = ({
    to,
    title,
    description,
    isHighlight = false,
}: CtaLinkProps) => {
    const ariaLabel = `${title} – ${description}`;

    const handleClick = () => {
        window.location.hash = to;
    };

    return (
        <a
            href={`#${to}`}
            onClick={handleClick}
            style={{ textDecoration: 'none', color: 'inherit' }}
            aria-label={ariaLabel}
            role="link"
        >
            <styled.Action className={isHighlight ? 'highlight' : ''}>
                <h2>{title}</h2>
            </styled.Action>
        </a>
    );
};

export const HeroContainer = ({ id }: HeroContainerProps): JSX.Element => {
    const { settings } = useSettingContext();

    const themeKey = settings?.theme || 'default';
    const themeColors = COLOR_SETTING[themeKey] || COLOR_SETTING['default'];

    return (
        <GridEffect>
            <styled.Container id={id}>
                <div className="split">
                    <div className="text">

                        <h1>
                            <span>Votre but ?</span>
                            <span>
                                transformer votre
                                <ProjectIdeaInput
                                ScroolTo='textarea[name="message"]'
                                DataWord={word_hero}
                                />
                            </span>
                            <span>en <strong >site web</strong></span>
                        </h1>


                        <p>
                            Moi, c'est Jonathan. 
                            Je conçois des sites web rapides, 
                            taillés pour votre croissance. 
                            <HelloHandComponent />
                        </p>

                        <div className="cta">
                            <CtaLink
                                to="service"
                                title="Découvrez mes services"
                                description="Exploration des services proposés"
                            />
                            <CtaLink
                                to="contact"
                                title="Contactez-moi"
                                description="Accéder au formulaire de contact"
                                isHighlight={true}
                            />
                        </div>
                    </div>

                    <div className="cube">
                        <div className="scene">
                            <WireframeScene
                                color={themeColors.primary}
                                hoverColor={themeColors.secondary}
                            />
                        </div>
                    </div>
                </div>

                <div className="mouse">
                    <MouseComponent />
                </div>
            </styled.Container>
        </GridEffect>
    );
};
