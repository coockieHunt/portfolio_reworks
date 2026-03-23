import React from 'react';
import * as Styled from './style/highContrast.style';
import { Container } from './style/container.style';
import { useThemeManager } from '@/hooks/useThemeManager';
import { useSettingContext } from '@/context/Setting.context';
import { TitleTextComponent } from '@/components/Text/Text.component';
import { Button } from '@/components/Button/Button';
import { Swatch } from '@/components/swatch/swatch.conponents';
import { ListComponent } from '@/components/List/List.component';

export const HighContrastContainer = () => {
    const { ChangeHightContrast } = useThemeManager();
    const { settings } = useSettingContext();
    
    const handleToggleHighContrast = () => {
        ChangeHightContrast(!settings.highContrast);
    };

    return (
        <Styled.HighContrastWrapper>
            <Container>
                <TitleTextComponent subtitle={'Pour une meilleure accessibilité'} weight={1}>
                    Contraste Élevé
                </TitleTextComponent>

                <div className='header_describ'>
                    <p>
                        Le mode Contraste Élevé est conçu pour offrir une expérience visuelle optimale
                        aux utilisateurs ayant des difficultés de vision ou préférant une interface 
                        plus nette. En activant ce mode, les couleurs sont ajustées pour maximiser 
                        le contraste entre les éléments de la page, rendant le contenu plus facile à lire 
                        et à naviguer.
                    </p>
                    
                    <Button
                        color="color-mix(in srgb, var(--primary), transparent 90%)"
                        className="source_code"
                        onClick={handleToggleHighContrast}
                    >
                        {settings.highContrast ? 'Désactiver le mode' : 'Tester le mode Contraste Élevé'}
                    </Button>
                </div>

                <section>
                    <h2>Palette de Couleurs</h2>
                    <p>
                        Le mode utilise cinq couleurs principales pour garantir une visibilité maximale 
                        et réduire la fatigue visuelle.
                    </p>
                    <div className="color-grid">
                        <Swatch
                            color="#000000"
                            colorText='white'
                            title="Arrière-plan - Noir"
                        >
                            Fond de page pour un contraste maximal avec le texte blanc.
                        </Swatch>

                        <Swatch
                            color="#FFFFFF"
                            colorText="#000000"
                            title="Texte - Blanc"
                        >
                            Tous les textes, titres et paragraphes apparaissent en blanc pur.
                        </Swatch>

                        <Swatch
                            color="#2986ff"
                            colorText="#000000"
                            title="Liens - Bleu vif"
                        >
                            Les liens cliquables et les bordures principales sont en bleu vif pour les repérer facilement.
                        </Swatch>

                        <Swatch
                            color="#29ff3b"
                            colorText="#000000"
                            title="Sélection - Vert vif"
                        >
                            Indique l'élément actuellement sélectionné ou actif dans la navigation.
                        </Swatch>

                        <Swatch
                            color="#ff0202"
                            colorText="#000000"
                            title="Icônes - Rouge vif"
                        >
                            Les icônes et symboles utilisent cette couleur pour se démarquer visuellement.
                        </Swatch>
                    </div>
                </section>

                <section>
                    <h2>Lisibilité du Texte</h2>
                    <p>
                        Le mode Contraste Élevé améliore la lecture en rendant le texte plus épais et 
                        en supprimant tous les effets visuels inutiles.
                    </p>
                    <ListComponent>
                        <li><strong>Titres :</strong> Plus gros et en gras pour une meilleure hiérarchie visuelle.</li>
                        <li><strong>Texte normal :</strong> Légèrement agrandi avec une épaisseur renforcée pour faciliter la lecture.</li>
                        <li><strong>Icônes :</strong> Traits plus épais (2,5 pixels) en rouge vif pour une reconnaissance immédiate.</li>
                        <li><strong>Effets supprimés :</strong> Aucune ombre, dégradé ou transparence qui pourrait réduire le contraste.</li>
                    </ListComponent>
                </section>

                <section>
                    <h2>Navigation et Interactions</h2>
                    
                    <h3>Zones de Contenu</h3>
                    <p>
                        Toutes les sections importantes (navigation, en-tête, contenu principal) sont 
                        délimitées par des bordures blanches de 2 pixels pour une structure claire.
                    </p>

                    <h3>Champs de Formulaire</h3>
                    <p>Les zones de saisie sont faciles à identifier :</p>
                    <Styled.FormDemoSection>
                        <Styled.FormDemoInput type="text" defaultValue="Exemple de texte saisi" readOnly />
                        <Styled.FormDemoButton>Bouton</Styled.FormDemoButton>
                    </Styled.FormDemoSection>

                    <h3>Navigation au Clavier</h3>
                    <p>
                        Si vous naviguez avec la touche Tab, un contour épais apparaît autour 
                        de l'élément sélectionné pour le repérer facilement :
                    </p>
                    <Styled.FocusDemoSection>
                        <Styled.FocusDemoButton>Essayez de cliquer ici</Styled.FocusDemoButton>
                    </Styled.FocusDemoSection>
                </section>

                <section>
                    <h2>Éléments Spécifiques</h2>
                    <ListComponent>
                        <li>
                            <strong>Liens :</strong> Affichés en bleu vif pour les repérer rapidement.
                            Dans les menus, ils sont également soulignés.
                        </li>
                        <li>
                            <strong>Articles :</strong> Chaque article est entouré d'une bordure bleue
                            pour le séparer visuellement du reste de la page.
                        </li>
                        <li>
                            <strong>Projets :</strong> Les projets ont des bordures bleues, avec des
                            boutons d'action marqués par une bordure verte.
                        </li>
                        <li>
                            <strong>Table des matières :</strong>
                            <ListComponent>
                                <li>Bordure bleue autour de chaque élément</li>
                                <li>Fond vert vif pour l'élément actif (section en cours de lecture)</li>
                                <li>Bordure verte au survol de la souris</li>
                            </ListComponent>
                        </li>
                        <li>
                            <strong>Fenêtres modales :</strong> Encadrées par une bordure bleue épaisse
                            pour attirer l'attention.
                        </li>
                        <li>
                            <strong>Icônes :</strong> Toutes les icônes sont en rouge vif avec un trait
                            épaissi pour être facilement visibles.
                        </li>
                    </ListComponent>
                </section>

                <section>
                    <h2>Pourquoi ces Couleurs ?</h2>
                    <p>
                        Cette palette a été choisie pour offrir le meilleur contraste possible 
                        tout en restant agréable à l'œil :
                    </p>
                    <div style={{
                        paddingLeft: '15px',
                        margin: '10px 0',

                    }}>
                        <p><strong>Noir et Blanc :</strong> Le contraste le plus élevé possible (21:1) pour une lisibilité optimale.</p>
                        <p><strong style={{color: '#2986ff'}}>Bleu vif (#2986ff) :</strong> Facile à distinguer du fond noir, utilisé pour structurer le contenu.</p>
                        <p><strong style={{color: '#29ff3b'}}>Vert vif (#29ff3b) :</strong> Attire immédiatement l'attention sur les éléments actifs.</p>
                        <p><strong style={{color: '#ff0202'}}>Rouge vif (#ff0202) :</strong> Rend les icônes et symboles instantanément reconnaissables.</p>
                    </div>
                 
                
                    <p>
                        Ce mode garantit un ratio de contraste supérieur à 7:1, ce qui dépasse 
                        largement les recommandations internationales pour l'accessibilité web 
                        (conformité WCAG niveau AAA).
                    </p>
                </section>

                <section>
                    <h2>Avantages de ce Mode</h2>
                    <p>✓ Réduit la fatigue oculaire pour les sessions prolongées</p>
                    <p>✓ Améliore la lisibilité pour les personnes malvoyantes</p>
                    <p>✓ Facilite la navigation au clavier</p>
                    <p>✓ Élimine les distractions visuelles</p>
                    <p>✓ Compatible avec les lecteurs d'écran</p>
                    <p>✓ Respecte les normes d'accessibilité internationales</p>
                </section>
            </Container>
        </Styled.HighContrastWrapper>
    );
}