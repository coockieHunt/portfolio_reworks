import React, {useState} from 'react';
import { DetailsComponent } from '@/components/Details/Details.component';
import * as Styled from './faq.style';
import { TitleTextComponent } from '@/components/Text/Text.component';

interface FaqContainerProps {
    id: string;
}

export const FaqContainer = ({ id }: FaqContainerProps) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const faqs = [
        { 
            title: "Pourquoi ce site est-il fait en React ?", 
            content: "Ce site est ma carte de visite technique. Développé en React/TypeScript et entièrement auto-hébergé, il illustre concrètement ma capacité à gérer un projet de bout en bout, de l'écriture du code jusqu'à la configuration du serveur." 
        },
        { 
            title: "Freelance ou futur membre de votre équipe ?", 
            content: "Je suis un hybride. En Freelance, je suis votre partenaire technique pour lancer votre projet. Pour les recruteurs, je suis un développeur Fullstack prêt à intégrer une squad, habitué au travail collaboratif (Git, Code Review) et aux bonnes pratiques." 
        },
        { 
            title: "Quelle est votre stack de prédilection ?", 
            content: "Je suis spécialisé dans l'écosystème JavaScript moderne. React et Next.js pour le front, Node.js pour le back, le tout verrouillé par TypeScript. Côté base de données, je m'adapte (PostgreSQL, MongoDB). Mon but ? Du code propre, performant et scalable." 
        },
        { 
            title: "Comment on travaille ensemble ?", 
            content: "Que ce soit pour un client ou un manager, je donne de la visibilité : méthodes Agiles, démos régulières et communication fluide (Slack, Discord, Teams). Vous savez toujours où en est le code et je suis proactif sur les solutions." 
        },
        { 
            title: "Délais et budget : à quoi s'attendre ?", 
            content: "La qualité demande du temps, mais je sais sprinter. Un projet complet peut prendre de 2 semaines à plusieurs mois selon la complexité. Je fournis toujours un devis détaillé ou une estimation cohérente avec mon expertise." 
        },
        { 
            title: "Et si ça casse après le lancement ?", 
            content: "Pas de panique. Je propose de la maintenance applicative pour gérer les mises à jour et la sécurité. Si je suis en mission dans votre entreprise, je m'assure de documenter tout mon travail pour qu'il soit pérenne pour l'équipe." 
        },
    ];

    const handleToggle = (index: number) => {setActiveIndex(activeIndex === index ? null : index);};

    return (
        <>
            <TitleTextComponent subtitle="Vous avez des questions ?">
                QUESTIONS / RÉPONSES
            </TitleTextComponent>

            <Styled.Container id={id}>
                {faqs.map((faq, index) => (
                    <DetailsComponent 
                        key={index}
                        Head={faq.title}
                        isOpen={activeIndex === index}
                        onToggle={() => handleToggle(index)}
                    >
                        {faq.content}
                    </DetailsComponent>
                ))}
            </Styled.Container>
        </>
    );
}