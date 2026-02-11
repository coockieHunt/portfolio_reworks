import { SimpleButton } from '@/components/Button/SimpleButton';
import * as Styled from './highContrast.style'
import { useThemeManager } from '@/hooks/useThemeManager';
import { useSettingContext } from '@/context/Setting.context';

export const HighContrastContainer = () => {
        const { ChangeHightContrast } = useThemeManager();
        const { settings } = useSettingContext();
        
        const handleToggleHighContrast = () => {
            ChangeHightContrast(!settings.highContrast);
        };

    return (
        <Styled.HighContrastWrapper>
            <div className="container">
                <Styled.HeaderSection>
                    <Styled.HeaderTitle>Guide de Style : Mode Contraste Élevé</Styled.HeaderTitle>
                    <Styled.ButtonSection>
                        <SimpleButton 
                            isActive={settings.highContrast}
                            onClick={handleToggleHighContrast} 
                            title={`${settings.highContrast ? 'Désactiver' : 'Activer'} le mode contraste élevé`}
                        >
                            {settings.highContrast ? 'Désactiver' : 'Activer'}
                        </SimpleButton>
                    </Styled.ButtonSection>
                </Styled.HeaderSection>
                <p>Ce document détaille les règles visuelles appliquées lorsque la classNamee le theme Contrast elevée et activée</p>

                <section>
                    <h2>1. Palette de Couleurs</h2>
                    <p>Les couleurs sont limitées pour assurer un contraste maximal (ratio AAA).</p>
                    <div className="color-grid">
                    <div className="swatch">
                        <Styled.SwatchColorDemo $bgColor="#000000" $textColor="#fff">Noir</Styled.SwatchColorDemo>
                        <div className="swatch-info">
                            <strong>Arrière-plan</strong>
                            <span className="swatch-hex">#000000</span>
                            <small>Utilisé pour le body, inputs, boutons et conteneurs.</small>
                        </div>
                    </div>

                    <div className="swatch">
                        <Styled.SwatchColorDemo $bgColor="#FFFFFF" $textColor="#000">Blanc</Styled.SwatchColorDemo>
                        <div className="swatch-info">
                            <strong>Texte & Bordures</strong>
                            <span className="swatch-hex">#FFFFFF</span>
                            <small>Titres, paragraphes, bordures de section (2px).</small>
                        </div>
                    </div>

                    <div className="swatch">
                        <Styled.SwatchColorDemo $bgColor="#07c5ff" $textColor="#000">Cyan</Styled.SwatchColorDemo>
                        <div className="swatch-info">
                            <strong>Liens Hypertextes</strong>
                            <span className="swatch-hex">#07c5ff</span>
                            <small>Couleur des balises &lt;a&gt; (sans soulignement).</small>
                        </div>
                    </div>

                    <div className="swatch">
                        <Styled.SwatchColorDemo $bgColor="#000" $textColor="#85fa00">Vert Fluo</Styled.SwatchColorDemo>
                        <div className="swatch-info">
                            <strong>Mise en valeur</strong>
                            <span className="swatch-hex">#85fa00</span>
                            <small>Pour les &lt;span&gt; dans les &lt;div&gt;.</small>
                        </div>
                    </div>

                    <div className="swatch">
                        <Styled.SwatchColorDemo $bgColor="#000" $textColor="#ff0000">Rouge</Styled.SwatchColorDemo>
                        <div className="swatch-info">
                            <strong>Focus (Navigation)</strong>
                            <span className="swatch-hex">#ff0000</span>
                            <small>Contour visible lors de la navigation clavier.</small>
                        </div>
                    </div>
                </div>
                </section>

                <section>
                    <h2>2. Typographie et Lisibilité</h2>
                    <p>Toutes les décorations superflues (ombres portées, gradients) sont supprimées.</p>
                <ul>
                    <li><strong>Titres (H1, H2, H3) :</strong> Blanc pur, gras (Font-weight 700/600), hauteur de ligne 1.3.</li>
                    <li><strong>Corps de texte :</strong> Blanc, épaisseur renforcée (Semi-Bold 600), taille augmentée (1.01em).</li>
                    <li><strong>Icônes SVG :</strong> Trait épaissi à 2.5px pour une meilleure visibilité.</li>
                </ul>
                </section>

                <section>
                    <h2>3. Composants d'Interface (UI)</h2>
                    <h3>Conteneurs (Nav, Header, Main, Section)</h3>
                    <p>Les blocs structurels sont strictement délimités :</p>
                    <div className="sample-box">
                        Exemple de conteneur : Fond noir avec une <strong>bordure blanche solide de 2px</strong>.
                    </div>

                    <h3>Formulaires (Input, Textarea, Button)</h3>
                        <p>Les champs de saisie suivent la règle du contraste inversé strict :</p>
                        <Styled.FormDemoSection>
                            <Styled.FormDemoInput type="text" value="Saisie utilisateur" readOnly />
                            <Styled.FormDemoButton>Bouton d'action</Styled.FormDemoButton>
                        </Styled.FormDemoSection>

                    <h3>Navigation Clavier (Focus)</h3>
                    <p>Tout élément interactif recevant le focus clavier (Tab) affiche un contour épais :</p>
                    <Styled.FocusDemoSection>
                        <Styled.FocusDemoButton>Élément avec Focus</Styled.FocusDemoButton>
                    </Styled.FocusDemoSection>
                </section>

                <section>
                    <h2>4. Règles Spécifiques</h2>
                        <ul>
                            <li><strong>Liens :</strong> Couleur cyan <code>#07c5ff</code>. Cependant, dans les zones de navigation/header/footer, ils peuvent apparaître soulignés.</li>
                            <li><strong>Table des matières (#toc) :</strong> Utilise la couleur <code>var(--primary)</code> pour les bordures et l'état actif, avec des icônes rouges.</li>
                            <li><strong>Reset Global :</strong> Suppression forcée des <code>background-image</code> (gradients), <code>box-shadow</code>, et <code>text-shadow</code> (sauf exceptions spécifiques).</li>
                        </ul>
                </section>
            </div>

        </Styled.HighContrastWrapper>

        
    );
}