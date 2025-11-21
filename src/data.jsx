import { AiFillLayout, AiOutlineRise, AiOutlineAim } from "react-icons/ai";
import { FaBoxesStacked , FaEarthEurope, FaFileCircleCheck, FaDiceD6, FaEye, FaMixer, FaPaintbrush, FaArrowsTurnToDots , FaLaptopCode, FaDiceD20, FaBarsProgress, FaGithub, FaLinkedinIn, FaDeviantart, FaRegUser } from "react-icons/fa6";
import cv from './assets/pdf/cv_dev_JG.pdf'

export const CONTACT_EMAIL = 'pro.jonathan.gleyze@gmail.com'

export const URL = {
    DeviantArt: 'https://www.deviantart.com/coockiehunt',
    github: 'https://github.com/coockieHunt',
    linkedin: 'https://www.linkedin.com/in/jonathan-gleyze-173ab7239/',
    github_hook: 'https://github.com/coockieHunt/custom_hook',
    ghithudb_portfolio: 'https://github.com/coockieHunt/portfolio',
    ghithudb_portfolio_rework: 'https://github.com/coockieHunt/portfolio_reworks',
    ghithudb_portfolio_rework_api: 'https://github.com/coockieHunt/api-mail/tree/master',
    ghithudb_game: 'https://github.com/coockieHunt/ck_rp',
}

export const productList = [
    { 
        id: 1, 
        title: "Gestion de contenu", 
        icon: <AiFillLayout/>, 
        subTitle: 'Wordpress, e-comerce, Vitrine',
        description: "Flexibilité est le mot d'ordre. Que vous soyez un entrepreneur en herbe ou une grande entreprise, un CMS s'adapte à vos besoins. Mettez à jour votre site en temps réel sans attendre un développeur. Collaborez facilement avec votre équipe grâce à une interface intuitive. La sécurité est notre priorité, assurant la protection de votre contenu contre les menaces potentielles.",
        price: 0,
        time: 0
    },
    { 
        id: 2, 
        title: "Application web", 
        icon: <AiOutlineRise/>,
        subTitle: 'Aplication metier',
        description: "Que vous soyez un particulier cherchant à marquer sa présence en ligne ou une entreprise en quête d'innovation, je m'adapte à vos besoins spécifiques. La mise en place d'une interface intuitive permet une gestion fluide du contenu, et les mises à jour se font sans difficulté.",
        price: 0,
        time: 0
    },
    { 
        id: 3, 
        title: "Consulting", 
        icon: <AiOutlineAim/>,
        subTitle: 'Audite Web',
        description: "Un audit approfondi de votre site web, évaluant chaque aspect de sa performance. De l'expérience utilisateur à la structure technique, Identifions les opportunités d'optimisation pour renforcer votre impact en ligne.",
        price: 0,
        time: 0
    },
];

export const projectList = [
    {
        id: 1,
        title: 'React Hooks',
        description: "Ce projet met en œuvre des composants fonctionnels pour gérer l'état et les effets de manière élégante, rendant le développement d'applications web plus fluide et efficace.",
        url: URL.github_hook,
    },
    {
        id: 2,
        title: 'Portfolio 1.0',
        description: "Mon premier portfolio en ligne, conçu pour présenter mes compétences et projets précédents. Il a été créé avec HTML, CSS et JavaScript. Bien que ce soit une version antérieure, il représente le début de mon voyage dans le développement web.",
        url: URL.ghithudb_portfolio,
    },
    {
        id: 3,
        title: 'Portfolio 2.0',
        description: "La deuxième itération de mon portfolio, qui montre ma progression dans le développement web. Ce portfolio est plus avancé, utilisant des technologies modernes telles que React et Styled Components. Il offre une expérience utilisateur améliorée et une meilleure présentation de mes projets.",
        url: URL.ghithudb_portfolio_rework,
    },
    {
        id: 4,
        title: 'Game Framework',
        description: "Un projet passionnant axé sur le développement de mode jeux. crée à l'aide de technologies telles que Unity et lua html js. Ce framework a pour butte de possée le basse, permettant des expériences de jeu amusantes et interactives.",
        url: URL.ghithudb_game,
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
    'équilibre',
    'quête',
    'silence',
    'monde',
];

export const benefitItems = [
    {
        icon: <FaEarthEurope/>,
        title: "GESTION DE PROJETS WEB",
        description: "Site vitrine, corporate, évènementiel, e-commerce."
    },
    {
        icon: <FaDiceD6 />,
        title: "INTÉGRATION WEB",
        description: "Intégrations HTML / CSS respectueuses des standards du Web."
    },
    {
        icon: <FaFileCircleCheck />,
        title: "DÉVELOPPEMENTS SPÉCIFIQUES",
        description: "Des outils adaptés à votre coeur de métier,applications & solutions personnalisées."
    },
    {
        icon: <FaEye />,
        title: "DYNAMISME DES PAGES",
        description: "Des animations de contenu non intrusives pour embellir votre projet."
    },
    {
        icon: <FaMixer />,
        title: "RESPONSIVE DESIGN",
        description: "Compatible tous supports, tablette & application mobile."
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
        description: "Support technique continu, assure le bon fonctionnement du site."
    }
];

export const serviceModals = [
    {
        title: 'Développement Web',
        catch: "Avec une riche expérience et une expertise pointue dans les nouvelles technologies, je relève les défis émergents et propose des solutions innovantes.",
        items: [
            'Site vitrine, corporate, évènementiel, e-commerce.',
            'Intégrations HTML / CSS respectueuses des standards du Web.',
            "Outils adaptés à votre coeur de métier, applications & solutions personnalisées.",
        ],
    },
    {
        title: 'Consultant Web',
        catch: "En tant que consultant web, je donne vie à vos idées en créant des solutions en ligne innovante.",
        items: [
            'Architecture web.',
            'Stratégie digitale.',
            'Sécurité web.',
            'Accessibilité web.',
        ],
    },
    {
        title: 'Conception Graphique & WebDesign',
        catch: "Fort d'une expérience en assistant de communication.",
        items: [
            'Logos, templates Web, plaquettes publicitaires, cartes de visite, newsletters...',
            'Animations de contenu non intrusives pour embellir votre projet.',
            'Compatible tous supports, tablette & application mobile.',
        ],
    },
];


export const TimeLine = [
    { title: "On se connecte 🔗", content: "Dès réception de votre formulaire de contact et du formulaire de contact détaillé, c'est parti pour un échange téléphonique survolté ! On plonge dans le monde passionnant de votre entreprise et de vos aspirations. Attendez-vous à une avalanche d'idées et d'infos pour créer LE site web qui vous ressemble. 🚀" },
    { title: "En avant pour le développement ! 👨‍💻", content: "Une fois que vous aurez donné le feu vert sur le devis, c'est parti pour la création de votre site internet ! Je vous tiendrai au courant à chaque étape du processus, vous permettant ainsi de suivre l'évolution de l'interface et de l'expérience utilisateur dès le départ. Attachez vos ceintures, c'est le début d'une aventure digitale palpitante ! 🛠️💻" },
    { title: "Prêt, set, Go ! 🚀", content: "Une fois que votre site sera dans les starting-blocks et qu'il répondra à toutes vos attentes, je vous délivrerai les clés d'accès pour que vous puissiez vous lancer dans l'aventure en ligne. Accrochez-vous, le succès n'attend que vous ! 🚀🔑" },
    { title: "Derniers ajustements ! 🔍", content: "Je serai là pour vous guider dans les méandres de vitre site, vous donnant les superpouvoirs nécessaires pour dompter votre site web! Préparez-vous à devenir le maître incontesté de votre royaume en ligne ! 🌟💻" },
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
    {
        icon: <FaRegUser />,
        color: "#00ffc8",
        url: cv,
        text: "Curriculum vitae",
        textX: "-90%",
        isFile: true
    }
];
