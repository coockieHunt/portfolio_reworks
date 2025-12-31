// react
import { ElementType } from 'react';

// style
import * as StyleCatch from './catch.style';
import { DotGridEffect } from '@/styles/effect'; 

// components
import { AccentTextComponent } from '@/components/Text/Text.component';
import { WaveComponent } from '@/components/Wave/wave.component';

// config & data
import { skillCards, catchText } from '@/data';

// types
interface ISkillCardData {
    Icon: ElementType; 
    title: string;
    description: string;
    color?: string; 
}

interface ICatchContainerProps {
    id: string;
}

const SkillCard = ({ Icon, title, description, color }: ISkillCardData) => {
    return (
        <StyleCatch.SkillCard className="card">
            <DotGridEffect
                $isHovered={true}
                $DotColor="#fafeff14"
                $Spacing="18px"
                $DotSize="2px"
            />

            <div style={{ position: "relative", zIndex: 2 }}>
                <div className='header-card'>
                    <Icon color={color} size={30} />
                    <h2>{title}</h2>
                </div>
                <p className='font_code'>{description}</p>
            </div>
        </StyleCatch.SkillCard>
    );
};


export const CatchContainer = ({ id }: ICatchContainerProps) => {
    const cards = skillCards as ISkillCardData[];
    return (
        <StyleCatch.Section id={id}>
            <StyleCatch.Text>
                <div className="left">
                    <h3>
                        <AccentTextComponent>DÉPASSER</AccentTextComponent> les limites du technique
                    </h3>
                    <p>
                        {catchText.intro}<br/>{catchText.extra}
                    </p>
                </div>
                
                <div className="right">
                    <StyleCatch.CardList className="cardList">
                        {cards.map((card, index) => (
                            <SkillCard 
                                key={index}
                                Icon={card.Icon} 
                                title={card.title} 
                                description={card.description} 
                                color={card.color} 
                            />
                        ))}
                    </StyleCatch.CardList>
                </div>
            </StyleCatch.Text>
            
            <StyleCatch.WaveBackground>
                <WaveComponent colorPrimary="var(--primary)"/>
            </StyleCatch.WaveBackground>
        </StyleCatch.Section>
    );
};