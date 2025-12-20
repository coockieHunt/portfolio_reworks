import { useState, useEffect, ChangeEvent, KeyboardEvent, JSX } from "react";

// library
import { Link } from "react-scroll";

// style
import * as styled from "./hero.style";
import { GridEffect } from '../../styles/effect';

// components
import { GradientTextContainer } from "../../components/Text/Text.component";
import { HelloHandComponent } from '../../components/HelloHand/HelloHand.component';
import { MouseComponent } from '../../components/Mouse/Mouse.component';
import { WireframeScene } from "../../components/FrameCube/FrameCube.components";
import { ProjectIdeaInput } from "../../components/ProjectIdeaInput/ProjectIdeaInput.component";

// data & context
import { COLOR_SETTING } from '../../config';
import { useSettingContext } from '../../context/Setting.context';
import { word_hero } from '../../data';

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

const CtaLink = ({ to, title, description, isHighlight = false }: CtaLinkProps) => {
    const ariaLabel = `${title} – ${description}`;

    return (
        <Link
            href={`${window.location.origin}/#${to}`} 
            to={to} 
            spy={true} 
            smooth={true} 
            offset={-70} 
            duration={500}
            style={{ textDecoration: "none", color: "inherit" }}
            aria-label={ariaLabel}
            role="link"
        >
            <styled.Action 
                className={isHighlight ? 'highlight' : ''}
            >
                <h2>{title}</h2>
            </styled.Action>
        </Link>
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
                            Vous voulez transformer votre <ProjectIdeaInput 
                                ScroolTo='textarea[name="message"]' 
                                DataWord={word_hero} /> en{" "}
                            <span style={{ whiteSpace: "nowrap" }}>
                                <GradientTextContainer>Site Web</GradientTextContainer>.
                            </span>
                        </h1>
                        
                        <p className="font_code">
                            Bonjour, je suis Jonathan, développeur Web. Je développe vos plateformes numériques, rapides, pour atteindre vos objectifs.
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