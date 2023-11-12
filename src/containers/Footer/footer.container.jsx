import * as Footer from './footer.style'
import { SiReact } from 'react-icons/si';
import { GiOutbackHat } from 'react-icons/gi';
import { DiJavascript1 } from 'react-icons/di';
import { IconButton } from '../../components/Buttton/Button.component';
import cv from '../../assets/pdf/cv_dev_JG.pdf'

import {
    AiFillGithub,
    AiFillLinkedin,
} from 'react-icons/ai';
import {
    BiSolidUser,
} from 'react-icons/bi';

import {
    FaDeviantart
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
                        onClick={() => window.location.href = URL.github}
                        iconSize={40} 
                    />
                    <IconButton
                        icon={<AiFillLinkedin />}
                        onClick={() => window.location.href = URL.linkedin}
                        iconSize={40} 
                    />
                    <IconButton
                        icon={<FaDeviantart />}
                        onClick={() => window.location.href = URL.DeviantArt}
                        iconSize={40} 
                    />
                    <IconButton
                        icon={<BiSolidUser />}
                        onClick={() => window.open(cv, '_blank')}
                        iconSize={40} 
                    />
                </Footer.Block>
            </Footer.Header>
            <Footer.Content>
                <Footer.Block>
                    Lève-toi et code <GiOutbackHat />
                </Footer.Block>
                <Footer.Block>
                    GLEYZE Jonathan. All Rights Reserved<br />
                    Powered by Node <DiJavascript1 /><br />
                </Footer.Block>
                <Footer.Block>
                    create whith react <SiReact />
                </Footer.Block>
            </Footer.Content>
        </Footer.Container>
    )
}