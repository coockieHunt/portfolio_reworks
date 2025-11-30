import React, {useEffect} from 'react';

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

    useEffect(() => {
    if (legalOpen) {
        setTimeout(() => {
            const element = document.getElementById('LegalContent');
            if (element) {element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });}
        }, 500); 
    }
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
                        <button 
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className='backToTop'
                            aria-label="Back to top">
                            Retour haut de page</button>
                        <button 
                            onClick={() => handleOpenLegal()} 
                            aria-expanded={legalOpen} 
                            aria-controls="View legal mention" 
                            id="footer-legal">
                            Mentions Légales <AiFillCaretDown className={legalOpen ? 'opened' : ''} />
                        </button>
                    </div>

                </Footer.BottomBar>
                    <Footer.LegalContent id="LegalContent" className={legalOpen ? 'open' : 'closed'}>
                        <h3>Mentions Légales</h3>
                        <p>WIP........</p>
                        <h4>subtitle</h4>
                    </Footer.LegalContent>
            </div>
        </Footer.Container>
    )
}