import { useState, useMemo, useCallback, memo } from 'react';
import * as Styled from './OnePiexl.style';
import { BentoActionComponent, BentoLabelComponent, BentoStateDotComponent, BentoCardProps, BENTO_SPRING } from '@/components/Bento/Bento.component';
import { MousePointer2, RefreshCcw } from 'lucide-react';
import { useSettingContext } from '@/context/Setting.context';

const PIXEL_GRID_LENGTH = 25;
const PIXEL_ON_ONE = [2, 6, 7, 12, 17, 21, 22, 23] as const;
const PIXEL_ON_P = [0, 1, 2, 5, 8, 10, 11, 12, 15, 20] as const;
const PIXEL_ON_X = [0, 4, 6, 8, 12, 16, 18, 20, 24] as const;

const PIXEL_ON_ONE_SET = new Set(PIXEL_ON_ONE);
const PIXEL_ON_P_SET = new Set(PIXEL_ON_P);
const PIXEL_ON_X_SET = new Set(PIXEL_ON_X);

const GLITCH_CONFIG: Record<number, string[]> = {
    0:  ["15%",  "-10%"],
    6:  ["12%",  "12%"],
    24: ["-12%", "-12%"],
};

interface PixelMotionProps {
    gridId: string;
    index: number;
    isOn: boolean;
    isRepaired: boolean;
    isReducedMotion: boolean;
    onFix: (id: string) => void;
}

const PixelMotion = memo(({ gridId, index, isOn, isRepaired, isReducedMotion, onFix }: PixelMotionProps) => {
    const pixelId = `${gridId}-${index}`;
    const glitchOffset = GLITCH_CONFIG[index];
    const isGlitchable = isOn && glitchOffset !== undefined;
    
    const isCurrentlyGlitched = isGlitchable && !isRepaired;

    return (
        <Styled.Pixel 
            className={`${isCurrentlyGlitched ? 'glitched' : isOn ? 'stable' : ''}`}
            onClick={isCurrentlyGlitched ? () => onFix(pixelId) : undefined}
            animate={{ 
                x: isCurrentlyGlitched && !isReducedMotion ? glitchOffset[0] : '0%',
                y: isCurrentlyGlitched && !isReducedMotion ? glitchOffset[1] : '0%',
                scale: isCurrentlyGlitched && !isReducedMotion ? [1, 1.05, 1] : 1,
            }}
            transition={{
                x: BENTO_SPRING.snap,
                y: BENTO_SPRING.snap,
                opacity: isCurrentlyGlitched && !isReducedMotion ? { repeat: Infinity, duration: 0.5 } : { duration: 0.3 },
                scale: isCurrentlyGlitched && !isReducedMotion ? { repeat: Infinity, duration: 0.2 } : { duration: 0.2 }
            }}
        />
    );
});

export const OnePixelBentoComponent = ({ BorderColor, SizeCard, isMobile }: BentoCardProps) => {
    const { settings } = useSettingContext();
    const isReducedMotion = settings.reducedMotion;
    const [repairedPixels, setRepairedPixels] = useState<Set<string>>(new Set());

    const totalGlitchedToFix = useMemo(() => {
        const glitchedInGrids = [PIXEL_ON_ONE, PIXEL_ON_P, PIXEL_ON_X].map(grid => 
            grid.filter(idx => GLITCH_CONFIG[idx] !== undefined).length
        );
        return glitchedInGrids.reduce((a, b) => a + b, 0);
    }, []);

    const isCompleted = repairedPixels.size === totalGlitchedToFix;
    const displayCompleted = isMobile || isCompleted;

    const handleFix = useCallback((id: string) => {
        setRepairedPixels(prev => new Set(prev).add(id));
    }, []);

    const handleReset = useCallback(() => {
        setRepairedPixels(new Set());
    }, []);

    const renderGrid = (gridId: string, pixelOnSet: Set<number>) => (
        Array.from({ length: PIXEL_GRID_LENGTH }, (_, i) => (
            <PixelMotion
                key={`${gridId}-${i}`}
                gridId={gridId}
                index={i}
                isOn={pixelOnSet.has(i)}
                isRepaired={repairedPixels.has(`${gridId}-${i}`) || !!isMobile}
                isReducedMotion={isReducedMotion}
                onFix={handleFix}
            />
        ))
    );

    return (
        <Styled.OnePixel className="reduce-motion-component" SizeCard={SizeCard} type='center' BorderColor={BorderColor}>
            {!isMobile && (
                <div className="head">
                     <BentoActionComponent
                        status={displayCompleted ? "reset" : "rules"}
                        icon={displayCompleted ? <RefreshCcw size={14} /> : <MousePointer2 size={14} />}
                        rulesText={`${totalGlitchedToFix - repairedPixels.size} pixels à corriger`}
                        onClick={displayCompleted ? handleReset : undefined}
                    />
                </div>
            )}

            <div className='font_code frame'>
                <span>Alignement exiger</span>
                <div className="gridsWrapper">
                    <div className="pixelGrid">{renderGrid("g1", PIXEL_ON_ONE_SET)}</div>
                    <div className="pixelGrid">{renderGrid("g2", PIXEL_ON_P_SET)}</div>
                    <div className="pixelGrid">{renderGrid("g3", PIXEL_ON_X_SET)}</div>
                </div>
            </div>

            <div className="footer">
                <BentoStateDotComponent status={isMobile ? "mobile" : displayCompleted ? "completed" : "idle"} />
                <BentoLabelComponent>Précision chirurgicale</BentoLabelComponent>
            </div>
        </Styled.OnePixel>
    );
};