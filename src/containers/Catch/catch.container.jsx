import {useState} from 'react'

// style
import * as StyleCatch from './catch.style'
import {DotGridEffect} from '../../styles/effect.jsx'

//components
import { AccentTextComponent } from '../../components/Text/Text.component'
import {WaveComponent} from '../../components/Wave/wave.component.jsx'

//config
import { getColorSettings} from '../../config.jsx'

//icons
import { FaLaptopCode, FaDiceD20, FaBarsProgress, FaPaintbrush } from "react-icons/fa6";

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
                dotColor="#fafeff14"
                spacing="18px"
                dotSize="2px"/>

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
                        <SkillCard 
                            Icon={FaLaptopCode} 
                            title="Développement" 
                            description="L'art de transformer des concepts abstraits en solutions logicielles performantes, évolutives et innovantes." 
                            color="#0065a9" 
                        />

                        <SkillCard
                            Icon={FaDiceD20}
                            title="Création 3D"
                            description="Intégration d'expériences immersives et de modèles 3D interactifs en temps réel directement sur le Web."
                            color="#EA7600"
                        />

                        <SkillCard
                            Icon={FaBarsProgress}
                            title="Systèmes Électroniques"
                            description="L'intelligence connectée : de l'IoT à l'intégration hardware-software pour des interactions physiques."
                            color="#2ac703"
                        />

                        <SkillCard
                            Icon={FaPaintbrush}
                            title="Design & UX/UI"
                            description="Conception d'interfaces intuitives et créatives qui captivent l'utilisateur et optimisent l'expérience."
                            color="#E749A0"
                        />
                    </StyleCatch.CardList>
                </div>
            </StyleCatch.Text>
            
            <StyleCatch.WaveBackground>
                <WaveComponent colorPrimary={getColorSettings().primary} colorAccent={getColorSettings().accent} />
            </StyleCatch.WaveBackground>
            
        </StyleCatch.Section>
    )
}