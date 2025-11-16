import { AiFillLayout, AiOutlineRise, AiOutlineAim } from "react-icons/ai";

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
