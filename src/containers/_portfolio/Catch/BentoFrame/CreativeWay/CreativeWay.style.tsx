import styled from 'styled-components';
import { BentoFrameComponent } from '@/components/Bento/Bento.component';
import { SCREEN_SIZE } from '@/config.js';

export const WPPatch = styled.div<{ z: number; x: number }>`
    position: absolute;
    width: 8px;
    height: 8px;
    top: ${props => `calc(${props.z}% - 4px)`};
    left: ${props => `calc(${props.x}% - 4px)`};
    border-radius: 50%;
    z-index: 2;
    --cursor-wave-color: var(--primary);
`;

export const CreativeWay = styled(BentoFrameComponent)`
    position: relative;
    min-height: 200px;

    & .frame {
        & .centered{
            position: relative;
            height: 100%;
            margin: 0 auto;
        }
    }
`;