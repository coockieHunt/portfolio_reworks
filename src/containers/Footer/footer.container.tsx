import { useState, useEffect, useRef, JSX } from 'react';

// style
import * as Footer from './footer.style';

// components
import { IconButton } from '../../components/Button/Button';
import { LogoComponent } from '../../components/Logo/Logo.components'; 
import { LegalNoticeContent } from '../LegalNotice/LegalNotice.container'; 

// icon
import { AiFillGithub, AiFillLinkedin, AiFillCaretDown } from 'react-icons/ai';
import { FaDeviantart } from 'react-icons/fa';

// url
import { URL } from '../../data';

// context
import { useAlert } from '../../context/alert.context';

// utils
import { launchEasterEgg } from '../../utils/rb';


const SCROLL_DELAY = 500; 


export const FooterContainer = ({ id }): JSX.Element => {
    const [legalOpen, setLegalOpen] = useState(false);
    const { addAlert } = useAlert();
    
    const legalContentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!legalOpen) return;
        let observer: IntersectionObserver | null = null;
        const timer = setTimeout(() => {
            if (legalContentRef.current) {
                
                const rect = legalContentRef.current.getBoundingClientRect();
                const offset = 200;

                window.scrollTo({
                    top: window.scrollY + rect.top - offset,
                    behavior: 'smooth'
                });

                observer = new IntersectionObserver(
                    ([entry]) => {
                        if (!entry.isIntersecting) {
                            setLegalOpen(false);
                        }
                    },
                    { threshold: 0 }
                );

                observer.observe(legalContentRef.current);
            }
        }, SCROLL_DELAY);

        return () => {
            clearTimeout(timer);
            observer?.disconnect(); 
        };
    }, [legalOpen]);

    const handleSecretClick = () => {
        launchEasterEgg();
        addAlert("> Wake up, developer… Check your F12 console.", "green", 5000);
    };

    const handleToggleLegal = () => {
        setLegalOpen(prev => !prev);
    };

    return (
        <Footer.Container id={id}>
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
                    <p onClick={handleSecretClick} style={{ cursor: 'pointer' }}>
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
                            iconSize={'1.5rem'} 
                            to={URL.github}
                            ariaLabel={'GitHub'}
                        />
                        <IconButton 
                            icon={<AiFillLinkedin />} 
                            iconSize={'1.5rem'} 
                            to={URL.linkedin}
                            ariaLabel={'LinkedIn'}
                        />
                        <IconButton 
                            icon={<FaDeviantart />} 
                            iconSize={'1.5rem'} 
                            to={URL.DeviantArt}
                            ariaLabel={'DeviantArt'}
                        />
                    </div>

                    <div className="legal-links">
                        <Footer.BackToTop 
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className='backToTop'
                            aria-label="retour en haut de page"
                        >
                            Retour haut de page
                        </Footer.BackToTop>
                        
                        <button 
                            onClick={handleToggleLegal} 
                            aria-expanded={legalOpen} 
                            aria-controls="LegalContent" 
                            id="footer-legal"
                        >
                            Mentions Légales <AiFillCaretDown className={legalOpen ? 'opened' : ''} />
                        </button>
                    </div>
                </Footer.BottomBar>

                <Footer.LegalContent 
                    id="LegalContent" 
                    className={legalOpen ? 'open' : 'closed'} 
                    ref={legalContentRef} 
                >
                    <LegalNoticeContent />

                    <Footer.BackToTop 
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className='backToTop'
                        aria-label="retour en haut de page"
                    >
                        Retour haut de page
                    </Footer.BackToTop>
                </Footer.LegalContent>

            </div>
        </Footer.Container>
    );
};