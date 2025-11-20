import {useState} from 'react'

// style
import * as StyleCatch from './catch.style'
import {DotGridEffect} from '../../styles/effect.jsx'

//components
import { AccentTextComponent } from '../../components/Text/Text.component'
import {WaveComponent} from '../../components/Wave/wave.component.jsx'

//config
import { getColorSettings} from '../../config.jsx'
import { skillCards } from '../../data.jsx'

export const CathContainer = ({ id }) => {
    const SkillCard = ({ Icon, title, description, color }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <StyleCatch.SkillCard
        className="card"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>
            <DotGridEffect
                $isHovered={true}
                $DotColor="#fafeff14"
                $Spacing="18px"
                $DotSize="2px"/>

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
    return (
        <StyleCatch.Section id={id}>
            <StyleCatch.Text>
                <div className="left">
                    <h3><AccentTextComponent>DÉPASSER</AccentTextComponent> les limites du technique</h3>
                    <p className=''>Je construis des mondes numériques où chaque ligne de code cherche le sens derrière la forme.<br/> Voici mes quatre piliers d'expertise :</p>
                </div>
                <div className="right">
                    <StyleCatch.CardList className="cardList">
                        {skillCards.map((card, index) => (
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
                <WaveComponent colorPrimary={getColorSettings().primary} colorAccent={getColorSettings().accent} />
            </StyleCatch.WaveBackground>
            
        </StyleCatch.Section>
    )
}