import { AiFillLayout, AiOutlineRise, AiOutlineAim } from "react-icons/ai";
import { FaBoxesStacked , FaEarthEurope, FaFileCircleCheck, FaDiceD6, FaEye, FaMixer, FaPaintbrush, FaArrowsTurnToDots , FaLaptopCode, FaDiceD20, FaBarsProgress, FaGithub, FaLinkedinIn, FaDeviantart, FaRegUser } from "react-icons/fa6";
import cv from './assets/pdf/cv_dev_JG.pdf'

export const CONTACT_EMAIL = 'pro.jonathan.gleyze@gmail.com'

export const URL = {
    DeviantArt: 'https://www.deviantart.com/coockiehunt',
    github: 'https://github.com/coockieHunt',
    linkedin: 'https://www.linkedin.com/in/jonathan-gleyze-173ab7239/',
    github_hook: 'https://github.com/coockieHunt/custom_hook',
    github_portfolio: 'https://github.com/coockieHunt/portfolio',
    github_portfolio_rework: 'https://github.com/coockieHunt/portfolio_reworks',
    github_portfolio_rework_api: 'https://github.com/coockieHunt/api-mail/tree/master',
    github_game: 'https://github.com/coockieHunt/ck_rp',


    projectQuoteSend: 'https://github.com/coockieHunt/quoteViewerSkull',
    FirstPortfolio: 'https://github.com/coockieHunt/portfolio',
    onset: 'https://github.com/coockieHunt/onsetrp'
}

export const productList = [
    { 
        id: 1, 
        title: "Gestion de contenu", 
        icon: <AiFillLayout/>, 
        subTitle: 'WordPress, e-commerce, Vitrine',
        description: "La flexibilité est le mot d'ordre. Que vous soyez un entrepreneur en herbe ou une grande entreprise, un CMS s'adapte à vos besoins. Mettez à jour votre site en temps réel sans attendre un développeur. Collaborez facilement avec votre équipe grâce à une interface intuitive. La sécurité est notre priorité, assurant la protection de votre contenu contre les menaces potentielles.",
    },
    { 
        id: 2, 
        title: "Application web", 
        icon: <AiOutlineRise/>,
        subTitle: 'Application métier',
        description: "Que vous soyez un particulier cherchant à marquer sa présence en ligne ou une entreprise en quête d'innovation, je m'adapte à vos besoins spécifiques. La mise en place d'une interface intuitive permet une gestion fluide du contenu, et les mises à jour se font sans difficulté.",
    },
    { 
        id: 3, 
        title: "Consulting", 
        icon: <AiOutlineAim/>,
        subTitle: 'Audit Web',
        description: "Un audit approfondi de votre site web, évaluant chaque aspect de sa performance. De l'expérience utilisateur à la structure technique, identifions les opportunités d'optimisation pour renforcer votre impact en ligne.",
    },
];

import QuoteImage from './assets/projetImg/Quote-send_1.webp';
import QuoteImage1 from './assets/projetImg/Quote-send_2.webp';
import OnsetImage from './assets/projetImg/onset_1.webp';


// -- Projet List ---
// column end row range from 1 to 2 
export const projectList = [
    {
        id: 1,
        title: 'Quote Send',
        fileName: 'quote_send.jsx',
        description: "Un projet d'affichage de citations avec interface d'administration",
        content: "Quote Send est un projet personnel qui affiche des citations de manière élégante. Il dispose d\'un menu d\'administration sécurisé avec Firebase pour gérer les citations. Ce projet reflète mon aspiration pour les textes inspirants, en offrant une plateforme simple mais efficace pour les partager.",
        webUrl: 'https://quote.jonathangleyze.fr',
        gitUrl: URL.projectQuoteSend,
        galery: [
            {img: QuoteImage, title:"Quote send affichage quote simple", alt:"quote send image démo short"}, 
            {img: QuoteImage1, title:"Quote send affichage quote longue", alt:"quote send image démo long"}, 
        ],
        techStack: ['react', 'supabase'],
        column: 1,
        row: 2,
        favorite: true,
        date: '2024-12-04',
        complete: true
    },
    {
        id: 2,
        title: 'Premier Portfolio',
        fileName: 'portfolio_v1.jsx',
        description: "Premier portfolio en ligne, beaucoup plus simple à l'époque la toute première itération de la version actuelle",
        content: "Mon premier portfolio en ligne, conçu pour présenter mes compétences et projets précédents. Il a été créé avec HTML, CSS et JavaScript. Bien que ce soit une version antérieure, il représente le début de mon voyage dans le développement web.",
        webUrl: null,
        gitUrl: URL.FirstPortfolio,
        galery: [],
        techStack: ['html', 'css', 'javascript', "react"],
        column: 1,
        row: 2,
        favorite: false,
        date: '2023-11-01',
        complete: false
    },
    {
        id: 5,
        title: 'Framework mods de jeux',
        fileName: 'Framework.jsx',
        description: "Un projet passionnant axé sur le développement de mods de jeux",
        content: "Un projet passionnant axé sur le développement de mods de jeux, créé à l'aide de technologies telles que Unity, Lua, HTML et JS. Ce framework a pour but de poser les bases, permettant des expériences de jeu amusantes et interactives.",
        gitUrl: URL.onset,
        webUrl: null,
        galery: [
            {img: OnsetImage, title:"Image of onset", alt:"onset image"}, 
        ],
        techStack: ['unity', 'lua', 'html', 'js'],
        column: 1,
        row: 2,
        favorite: false,
        date: '2023-11-01',
        complete: true
    },
];

export const word_hero = [
    'idée',
    'projet',
    'concept',
    'vision',
    'rêve',
    'univers',
    'œuvre',
    'entreprise',
    'marque',
    'inspiration',
    'pensée',
    'passion',
    'monde',
];

export const benefitItems = [
    {
        icon: <FaEarthEurope/>,
        title: "GESTION DE PROJETS WEB",
        description: "Sites vitrines, corporate, événementiels, e-commerce."
    },
    {
        icon: <FaDiceD6 />,
        title: "INTÉGRATION WEB",
        description: "Intégrations HTML/CSS respectueuses des standards du Web."
    },
    {
        icon: <FaFileCircleCheck />,
        title: "DÉVELOPPEMENTS SPÉCIFIQUES",
        description: "Outils adaptés à votre cœur de métier, applications et solutions personnalisées."
    },
    {
        icon: <FaEye />,
        title: "DYNAMISME DES PAGES",
        description: "Animations de contenu non intrusives pour embellir votre projet."
    },
    {
        icon: <FaMixer />,
        title: "RESPONSIVE DESIGN",
        description: "Compatible tous supports : tablettes et applications mobiles."
    },
    {
        icon: <FaPaintbrush />,
        title: "CONCEPTION GRAPHIQUE & WEBDESIGN",
        description: "Plaquettes publicitaires, cartes de visite, newsletters..."
    },
    {
        icon: <FaBoxesStacked />,
        title: "INSTALLATION DU SERVEUR WEB",
        description: "Installation et configuration de votre serveur web pour une performance optimale."
    },
    {
        icon: <FaArrowsTurnToDots  />,
        title: "SUPPORT TECHNIQUE",
        description: "Support technique continu pour assurer le bon fonctionnement du site."
    }
];

export const serviceModals = [
    {
        title: 'Développement Web',
        catch: "Avec une riche expérience et une expertise pointue dans les nouvelles technologies, je relève les défis émergents et propose des solutions innovantes.",
        items: [
            'Sites vitrines, corporate, événementiels, e-commerce.',
            'Intégrations HTML/CSS respectueuses des standards du Web.',
            "Outils adaptés à votre cœur de métier, applications et solutions personnalisées.",
        ],
    },
    {
        title: 'Consultant Web',
        catch: "En tant que consultant web, je donne vie à vos idées en créant des solutions en ligne innovantes.",
        items: [
            'Architecture web.',
            'Stratégie digitale.',
            'Sécurité web.',
            'Accessibilité web.',
        ],
    },
    {
        title: 'Conception Graphique & WebDesign',
        catch: "Fort d'une expérience en tant qu'assistant de communication.",
        items: [
            'Logos, templates web, plaquettes publicitaires, cartes de visite, newsletters...',
            'Animations de contenu non intrusives pour embellir votre projet.',
            'Compatible tous supports : tablettes et applications mobiles.',
        ],
    },
];


export const TimeLine = [
    { 
        title: "Premier échange 🔗", 
        content: "Après réception de votre formulaire, planifions un appel pour explorer ensemble votre projet. C'est le moment de partager votre vision et vos objectifs pour créer un site qui vous correspond vraiment." 
    },
    { 
        title: "Développement 👨‍💻", 
        content: "Devis validé ? C'est parti ! Je développe votre site en vous tenant informé à chaque étape clé. Vous suivez l'évolution en temps réel et pouvez donner votre feedback tout au long du processus." 
    },
    { 
        title: "Mise en ligne 🚀", 
        content: "Votre site est prêt et validé ? Je vous livre les accès et vous accompagne pour un lancement réussi. Votre présence digitale peut enfin décoller !" 
    },
    { 
        title: "Formation & suivi 🔍", 
        content: "Je vous forme à la gestion de votre site pour que vous soyez totalement autonome. Vous aurez toutes les clés en main pour exploiter pleinement votre plateforme." 
    },
];

export const skillCards = [
    {
        Icon: FaLaptopCode,
        title: "Développement",
        description: "L'art de transformer des concepts abstraits en solutions logicielles performantes, évolutives et innovantes.",
        color: "#0065a9"
    },
    {
        Icon: FaDiceD20,
        title: "Création 3D",
        description: "Intégration d'expériences immersives et de modèles 3D interactifs en temps réel directement sur le Web.",
        color: "#EA7600"
    },
    {
        Icon: FaBarsProgress,
        title: "Systèmes Électroniques",
        description: "L'intelligence connectée : de l'IoT à l'intégration hardware-software pour des interactions physiques.",
        color: "#2ac703"
    },
    {
        Icon: FaPaintbrush,
        title: "Design & UX/UI",
        description: "Conception d'interfaces intuitives et créatives qui captivent l'utilisateur et optimisent l'expérience.",
        color: "#E749A0"
    }
];

export const socialLinks = [
    {
        icon: <FaGithub />,
        color: "#6e5494",
        url: URL.github,
        text: "Github"
    },
    {
        icon: <FaLinkedinIn />,
        color: "#0e76a8",
        url: URL.linkedin,
        text: "Linkedin"
    },
    {
        icon: <FaDeviantart />,
        color: "#05cc46",
        url: URL.DeviantArt,
        text: "Deviantart"
    },
    // {
    //     icon: <FaRegUser />,
    //     color: "#00ffc8",
    //     url: cv,
    //     text: "Curriculum vitae",
    //     textX: "-90%",
    //     isFile: true
    // }
];