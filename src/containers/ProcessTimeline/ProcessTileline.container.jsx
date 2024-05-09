import React, { useEffect, useState } from 'react';
import { Container, TimeLineContainer, TimeLineItemContainer, TimeLineTitle, TimeLineContent } from './ProcessTileline.style'; 
import { TitleTextComponent } from '../../components/Text/Text.component';

const TimeLine = [
    { title: "On se connecte 🔗", content: "Dès réception de votre formulaire de contact et du formulaire de contact détaillé, c'est parti pour un échange téléphonique survolté ! On plonge dans le monde passionnant de votre entreprise et de vos aspirations. Attendez-vous à une avalanche d'idées et d'infos pour créer LE site web qui vous ressemble. 🚀" },
    { title: "En avant pour le développement ! 👨‍💻", content: "Une fois que vous aurez donné le feu vert sur le devis, c'est parti pour la création de votre site internet ! Je vous tiendrai au courant à chaque étape du processus, vous permettant ainsi de suivre l'évolution de l'interface et de l'expérience utilisateur dès le départ. Attachez vos ceintures, c'est le début d'une aventure digitale palpitante ! 🛠️💻" },
    { title: "Prêt, set, Go ! 🚀", content: "Une fois que votre site sera dans les starting-blocks et qu'il répondra à toutes vos attentes, je vous délivrerai les clés d'accès pour que vous puissiez vous lancer dans l'aventure en ligne. Accrochez-vous, le succès n'attend que vous ! 🚀🔑" },
    { title: "Derniers ajustements ! 🔍", content: "Je serai là pour vous guider dans les méandres de vitre site, vous donnant les superpouvoirs nécessaires pour dompter votre site web! Préparez-vous à devenir le maître incontesté de votre royaume en ligne ! 🌟💻" },
];

const TimeLineItem = ({ step, title, content }) => {
    return (
        <TimeLineItemContainer
            initial={{ opacity: 0, y: 50 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }} 
        >
            <TimeLineTitle><span>{step + 1}.</span> {title}</TimeLineTitle>
            <TimeLineContent>{content}</TimeLineContent>
        </TimeLineItemContainer>
    )
};

export const ProcessTimeLine = ({ id }) => {
    const [isTimeLineVisible, setTimeLineVisible] = useState(false);
    const [hasBeenVisible, setHasBeenVisible] = useState(false);

    useEffect(() => {
        const timelineElement = document.getElementById(id);

        const handleScroll = () => {
            if (timelineElement && !hasBeenVisible) {
                const { top, bottom } = timelineElement.getBoundingClientRect();
                const windowHeight = window.innerHeight || document.documentElement.clientHeight;
                if (top < windowHeight * 0.70 && bottom >= 0) {
                    setTimeLineVisible(true);
                    setHasBeenVisible(true);
                } else if (top >= windowHeight || bottom <= 0) {
                    setTimeLineVisible(false);
                }
            }
        }

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [id, hasBeenVisible]);

    return (
        <Container>
            <TitleTextComponent subtitle={"Vous êtes prêt"}>
                Prêt pour l'aventure ?
            </TitleTextComponent>
            <TimeLineContainer id={id} className={isTimeLineVisible ? 'visible' : ''}>
                {TimeLine.map((item, index) => (
                    <TimeLineItem key={index} title={item.title} step={index} content={item.content} />
                ))}
            </TimeLineContainer>
        </Container>
    )
};
