import * as Footer from './footer.style'
import { SiReact } from 'react-icons/si';
import { GiOutbackHat } from 'react-icons/gi';
import { DiJavascript1 } from 'react-icons/di';
import { IconButton } from '../../components/Button/Button';
import cv from '../../assets/pdf/cv_dev_JG.pdf'
import { ScrollToTop } from '../../components/Button/Button';
import { URL } from '../../data.jsx'

import {
    AiFillGithub,
    AiFillLinkedin,
} from 'react-icons/ai';
import {
    BiSolidUser,
} from 'react-icons/bi';

import {
    FaDeviantart, FaOtter
} from 'react-icons/fa';


export const FooterContainer = () => {
    return (
        <Footer.Container>
            <Footer.Header>
                <Footer.Block>
                    <span><strong>HandCrafted</strong></span>
                </Footer.Block>
                <Footer.Block style={{display: 'flex'}}>
                    <IconButton
                        icon={<AiFillGithub />}
                        to={URL.github}
                        iconSize={40} 
                    />
                    <IconButton
                        icon={<AiFillLinkedin />}
                        to={URL.linkedin}
                        iconSize={40} 
                    />
                    <IconButton
                        icon={<FaDeviantart />}
                        to={URL.DeviantArt}
                        iconSize={40} 
                    />
                    <IconButton
                        icon={<BiSolidUser />}
                        to={cv}
                        iconSize={40} 
                    />
                </Footer.Block>
            </Footer.Header>
            <Footer.Content>
                <div className="text">
                    <div>
                        Lève-toi et code <GiOutbackHat />
                    </div>
                    <div>
                        GLEYZE Jonathan. All Rights Reserved<br />
                        Powered by Node <DiJavascript1 /><br />
                    </div>
                    <div>
                        create with react <SiReact />
                    </div>
                </div>
                <div className="action">
                    <ScrollToTop auto_hide={false}/>
                </div>
            </Footer.Content>
        </Footer.Container>
    )
}