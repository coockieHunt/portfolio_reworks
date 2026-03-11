// style
import * as StyleCatch from './catch.style';

// components
import { BentoComponent } from '@/components/Bento/Bento.component';

// hooks & config
import { useWindowSize } from '@/hooks/useScreenResize.hook';
import { SCREEN_SIZE } from '@/config';


//bento
import { PartnerBentoComponent } from './BentoFrame/partner/partner.bento';
import { OnePixelBentoComponent } from './BentoFrame/OnePixel/OnePixel.bento';
import { CreativeWayBentoComponent } from './BentoFrame/CreativeWay/CreativeWay.bento';
import { BlackBoxBentoComponent } from './BentoFrame/BlackBox/BlackBox.bento';

interface ICatchContainerProps {
    id: string;
}

export const CatchContainer = ({ id }: ICatchContainerProps) => {
    const isMobile = !!useWindowSize(parseInt(SCREEN_SIZE.mobile));

    return (
        <StyleCatch.Section id={id}>
            <div className="head">
                <h1 className='font_dot'>// DÉPASSER les limites du technique</h1>
            </div>
            <BentoComponent >
                <OnePixelBentoComponent SizeCard="tall" isMobile={isMobile} />
                <PartnerBentoComponent SizeCard="tall" isMobile={isMobile} />
                <CreativeWayBentoComponent SizeCard="wide" isMobile={isMobile} />
                <BlackBoxBentoComponent SizeCard="wide" isMobile={isMobile} />
            </BentoComponent>
        </StyleCatch.Section>
    );
};
