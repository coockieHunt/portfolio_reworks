import React, {useEffect, useRef} from 'react';

// style
import * as Footer from './footer.style';

// components
import { IconButton } from '../../components/Button/Button';
import { LogoComponent } from '../../components/Logo/Logo.components.jsx';

// icon
import { AiFillGithub, AiFillLinkedin, AiFillCaretDown  } from 'react-icons/ai';
import { FaDeviantart } from 'react-icons/fa';

// url
import { URL } from '../../data.jsx';

// context
import { useAlert } from '../../context/alert.context';

// utils
import { launchEasterEgg } from '../../utils/rb.jsx';

export const FooterContainer = () => {
    const [legalOpen, setLegalOpen] = React.useState(false);
    const { addAlert } = useAlert();
    const legalRef = useRef(null);


    const scroolTimer = 500;
    useEffect(() => {
    if (legalOpen) {
        setTimeout(() => {
            const element = document.getElementById('LegalContent');
                const rect = element.getBoundingClientRect();
                const offset = 200; 

                window.scrollTo({
                    top: window.pageYOffset + rect.top - offset,
                    behavior: 'smooth'
                });
        }, scroolTimer); 
    }
    }, [legalOpen]); 

    useEffect(() => {
        let observer = null;
        let timer = null;

        if (legalOpen) {
            timer = setTimeout(() => {
                observer = new IntersectionObserver(
                    ([entry]) => {
                        if (!entry.isIntersecting) { setLegalOpen(false);}
                    },{ threshold: 0} 
                );

                if (legalRef.current) {
                    observer.observe(legalRef.current);
                }
            }, scroolTimer); 
        }

        return () => {
            if (observer) observer.disconnect();
            if (timer) clearTimeout(timer);
        };
    }, [legalOpen]); 

    const handleSecretClick = () => {
        launchEasterEgg();
        
        addAlert(
            "> Wake up, developer… Check your F12 console.",
            "green",
            5000
        );
    };

    const handleOpenLegal = () => {
        setLegalOpen(!legalOpen);
    }

    return (
        <Footer.Container>
            <Footer.Aurora />
            <div className="content-wrapper">
                <div className="header-text">
                    <h3 className='catch'>
                        <div className="left">
                            <span className='creative'>Creative</span> <br /> 
                            <span className='font_code indus'>industry</span>
                        </div>
                        
                        <div className="right">
                            <LogoComponent version='animated' style={{ maxWidth: '60px', height: 'auto' }} />
                        </div>
                    </h3>
                </div>

                <div className="josbnfgbhibc">
                    <p onClick={handleSecretClick}>
                        [ Le footer contient la réponse. Ou peut-être pas. Un seul moyen de savoir... ]
                    </p>
                </div>

                <Footer.BottomBar>
                    
                    <div className="copyright">
                        <p>© {new Date().getFullYear()} Jonathan. All Rights Reserved.</p>
                    </div>

                    <div className="social-links">
                        <IconButton 
                            icon={<AiFillGithub />} 
                            size={'1.5rem'} 
                            href={URL.github} 
                            target={'_blank'} 
                            ariaLabel={'GitHub'}
                        />
                        <IconButton 
                            icon={<AiFillLinkedin />} 
                            size={'1.5rem'} 
                            href={URL.linkedin} 
                            target={'_blank'} 
                            ariaLabel={'LinkedIn'}
                        />
                        <IconButton 
                            icon={<FaDeviantart />} 
                            size={'1.5rem'} 
                            href={URL.deviantart}   
                            target={'_blank'} 
                            ariaLabel={'DeviantArt'}
                        />
                    </div>

                    <div className="legal-links">
                        <Footer.BackToTop 
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className='backToTop'
                            aria-label="Back to top">
                            Retour haut de page</Footer.BackToTop>
                        <button 
                            onClick={() => handleOpenLegal()} 
                            aria-expanded={legalOpen} 
                            aria-controls="LegalContent" 
                            id="footer-legal">
                            Mentions Légales <AiFillCaretDown className={legalOpen ? 'opened' : ''} />
                        </button>
                    </div>

                </Footer.BottomBar>
                    <Footer.LegalContent id="LegalContent" className={legalOpen ? 'open' : 'closed'} ref={legalRef}>
                        <h3>Mentions Légales</h3>

                        <section aria-labelledby="legal-intro-heading">
                            <h4 id="legal-intro-heading">Informations rapides</h4>
                            <p><strong>Hébergeur :</strong> Hostinger</p>
                            <p><strong>E-mail :</strong> <a href="mailto:contact@jonathangleyze.fr">contact@jonathangleyze.fr</a></p>
                        </section>

                        <hr />

                        <section aria-labelledby="mentions-legales-heading">
                            <h4 id="mentions-legales-heading">📄 Mentions Légales</h4>

                            <h5>Éditeur du site</h5>
                            <p>
                                Ce site est édité par :<br />
                                <strong>Jonathan Gleyze</strong><br />
                                Site personnel / portfolio — France.
                            </p>

                            <h5>Contact</h5>
                            <p>E-mail : <a href="mailto:contact@jonathangleyze.fr">contact@jonathangleyze.fr</a></p>

                            <h5>Responsable de la publication</h5>
                            <p>Jonathan Gleyze</p>

                            <h5>Hébergement</h5>
                            <p>Le site est hébergé par :</p>
                            <ul>
                                <li>Hostinger International Ltd.</li>
                                <li>Adresse : 61 Lordou Vironos Street, 6023 Larnaca, Chypre</li>
                                <li>Site : <a href="https://hostinger.com" target="_blank" rel="noopener noreferrer">hostinger.com</a></li>
                            </ul>

                            <h5>Technologies utilisées</h5>
                            <ul>
                                <li>React</li>
                                <li>React Icons</li>
                                <li>Web Vitals (mesures de performance)</li>
                                <li>Polices hébergées en local</li>
                            </ul>

                            <p>Une API interne destinée à :</p>
                            <ul>
                                <li>l’enregistrement des messages du livre d’or</li>
                                <li>la gestion et l’affichage des compteurs de clics</li>
                            </ul>

                            <h5>Propriété intellectuelle</h5>
                            <p>
                                Le contenu du site (textes, design, animations, code front-end, illustrations) est la propriété exclusive de
                                Jonathan Gleyze, sauf mentions contraires.
                            </p>
                            <p>
                                Le logo Node.js appartient à la Node.js Foundation et est utilisé conformément à la licence de marque.
                            </p>

                            <h5>Code source et licence Open Source</h5>
                            <p>
                                Le code source de ce projet est disponible publiquement sur GitHub et est distribué sous une licence open-source permissive.
                            </p>
                            <p>
                                <strong>Vous êtes libre de :</strong>
                            </p>
                            <ul>
                                <li>Télécharger et utiliser le code</li>
                                <li>Modifier et adapter le projet à vos besoins</li>
                                <li>Déployer votre propre version en production</li>
                                <li>Utiliser le code à des fins commerciales ou personnelles</li>
                            </ul>
                            <p>
                                <strong>Conditions d'utilisation :</strong>
                            </p>
                            <ul>
                                <li>Vous devez conserver une mention claire de l'auteur original (Jonathan Gleyze)</li>
                                <li>Un lien vers le projet source doit être visible sur votre déploiement</li>
                                <li>Les crédits et attributions doivent rester intacts</li>
                            </ul>
                            <p>
                                Dépôt GitHub : <a href="https://github.com/coockieHunt/portfolio_reworks" target="_blank" rel="noopener noreferrer">github.com/coockieHunt/portfolio_reworks</a>
                            </p>
                        </section>

                        <hr />

                        <section aria-labelledby="privacy-heading">
                            <h4 id="privacy-heading">🔒 Politique de Confidentialité</h4>
                            <p>Cette politique décrit les types de données collectées et leur utilisation.</p>

                            <h5>1. Données collectées automatiquement</h5>
                            <p>Lors de votre navigation, des informations techniques peuvent être collectées :</p>
                            <ul>
                                <li>métriques de performance (via Web Vitals)</li>
                                <li>données techniques anonymisées</li>
                                <li>incrémentation de compteurs de clics internes</li>
                            </ul>
                            <p>Aucune donnée permettant d'identifier directement un utilisateur n’est collectée de manière automatique.</p>

                            <h5>2. Données fournies volontairement</h5>
                            <p>Les formulaires du site (contact ou livre d’or) permettent de collecter :</p>
                            <ul>
                                <li>adresse e-mail</li>
                                <li>nom ou pseudonyme (si renseigné)</li>
                                <li>contenu du message</li>
                            </ul>
                            <p>Ces données sont utilisées uniquement dans le cadre du contact ou pour l’affichage dans le livre d’or.</p>

                            <h5>3. API interne</h5>
                            <ul>
                                <li>enregistrer et afficher les messages du livre d’or</li>
                                <li>incrémenter les compteurs de clics</li>
                                <li>traiter les formulaires</li>
                            </ul>
                            <p>Les données ne sont jamais revendues, louées ou transmises à des tiers.</p>

                            <h5>4. Durée de conservation</h5>
                            <ul>
                                <li>Les adresses e-mail sont conservées uniquement pour le temps nécessaire au traitement de la demande.</li>
                                <li>Les messages du livre d’or restent publiés tant qu’ils ne sont pas supprimés.</li>
                                <li>Les données de compteurs de clics sont conservées durablement sous une forme non personnelle.</li>
                            </ul>

                            <h5>5. Sécurité</h5>
                            <p>Des mesures techniques sont mises en place pour protéger les données stockées. Toutefois, aucune technologie n’offre une sécurité absolue.</p>

                            <h5>6. Vos droits</h5>
                            <p>Vous pouvez demander :</p>
                            <ul>
                                <li>l’accès à vos données</li>
                                <li>leur correction</li>
                                <li>leur suppression</li>
                            </ul>
                            <p>Pour tout exercice de droits ou toute question : <a href="mailto:contact@jonathangleyze.fr">contact@jonathangleyze.fr</a></p>

                            <h5>7. Cookies</h5>
                            <p>
                                Le site peut utiliser des cookies strictement nécessaires ou destinés à la mesure technique des performances.
                                Aucun cookie publicitaire n’est utilisé.
                            </p>
                        </section>

                        <hr />

                        <section aria-labelledby="credits-heading">
                            <h4 id="credits-heading">🧾 Crédits</h4>
                            <ul>
                                <li>React &amp; React Icons : MIT License</li>
                                <li>Polices locales : selon leurs licences propres</li>
                                <li>Web Vitals : Apache 2.0 License</li>
                                <li>Logo Node.js : marque de la Node.js Foundation</li>
                            </ul>
                        </section>
                        <Footer.BackToTop 
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className='backToTop '
                            aria-label="Back to top">
                        Retour haut de page</Footer.BackToTop>
                    </Footer.LegalContent>

                    

            </div>
        </Footer.Container>
    )
}