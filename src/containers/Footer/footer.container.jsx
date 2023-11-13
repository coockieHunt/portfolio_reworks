import * as Footer from './footer.style'
import { SiReact } from 'react-icons/si';
import { GiOutbackHat } from 'react-icons/gi';
import { DiJavascript1 } from 'react-icons/di';
import { IconButton } from '../../components/Buttton/Button.component';
import cv from '../../assets/pdf/cv_dev_JG.pdf'
import { ScroolToTop } from '../../components/Buttton/Button.component';

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
                <div className="text">
                    <div>
                        Lève-toi et code <GiOutbackHat />
                    </div>
                    <div>
                        GLEYZE Jonathan. All Rights Reserved<br />
                        Powered by Node <DiJavascript1 /><br />
                    </div>
                    <div>
                        create whith react <SiReact />
                    </div>
                </div>
                <div className="action">
                    <ScroolToTop auto_hide={false}/>
                </div>
            </Footer.Content>
        </Footer.Container>
    )
}