import {
    CodeXml,
    Boxes,
    Eye,
    FileCheck,
    Gem,
    Github,
    Globe,
    Handshake,
    Image,
    LayoutTemplate,
    Lightbulb,
    Linkedin,
    LifeBuoy,
    MessagesSquare,
    Paintbrush,
    ShoppingCart,
    SlidersHorizontal,
    Target,
    TrendingUp,
    Server,
    User
} from 'lucide-react';
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
    onset: 'https://github.com/coockieHunt/ck_rp',
}



import QuoteImage from './assets/projetImg/Quote-send_1.webp';
import QuoteImage1 from './assets/projetImg/Quote-send_2.webp';
import OnsetImage from './assets/projetImg/onset_1.webp';
import OnsetImage1 from './assets/projetImg/onset_2.webp';
import ArduinoImage1 from './assets/projetImg/arduino_1.webp';


// -- Projet List ---
// column end row range from 1 to 2 
export const projectList = [
    {
        id: 1,
        title: 'Quote Send',
        fileName: 'quote_send.jsx',
        description: "Un projet d'affichage de citations avec interface d'administration",
        content: "Quote Send est un projet personnel qui affiche des citations de manière élégante. Il dispose d\'un menu d\'administration sécurisé avec supabase pour gérer les citations. Ce projet reflète mon aspiration pour les textes inspirants, en offrant une plateforme simple mais efficace pour les partager.",
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
        description: "Premier portfolio en ligne, beaucoup plus simple à l'époque la première itération de la version actuelle",
        content: "Mon premier portfolio en ligne, développé avec HTML, CSS et JavaScript, marque le début de mon parcours en développement web. Il met en avant mes compétences et projets passés, reflétant mes premières réalisations dans ce domaine.",
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
        id: 3,
        title: 'Framework mods de jeux',
        fileName: 'Framework.jsx',
        description: "Un projet passionnant axé sur le développement de mods de jeux",
        content: "Un projet passionnant axé sur le développement de mods de jeux, créé à l'aide de technologies telles que Unity, Lua, HTML et JS. Ce framework a pour but de poser les bases, permettant des expériences de jeu amusantes et interactives.",
        gitUrl: URL.onset,
        webUrl: null,
        galery: [
            {img: OnsetImage1, title:"Logo projet onset rp", alt:"onset image"}, 
            {img: OnsetImage, title:"Image of onset", alt:"onset image"},
        ],
        techStack: ['unity', 'lua', 'html', 'js' , "mysql"],
        column: 1,
        row: 2,
        favorite: false,
        date: '2023-11-01',
        complete: true
    },
{
        id: 4,
        title: 'Lecteur BMP Arduino ST7789',
        fileName: 'ArduinoReader.jsx',
        description: "Affichage d'images BMP depuis une carte SD sur un écran ST7789",
        content: "Un projet embarqué conçu pour lire des fichiers images au format BMP stockés sur une carte SD et les afficher sur un écran TFT ST7789. Ce code gère l'interface SPI et le traitement des données binaires d'image sur microcontrôleur.",
        gitUrl: 'https://github.com/coockieHunt/arduino_st7789_readSdBmp',
        webUrl: null,
        galery: [
            {img: ArduinoImage1, title:"Montage Arduino", alt:"arduino wiring"}, 
        ],
        techStack: ['arduino', 'c++', 'embedded', 'spi'],
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

export const productList = [
    { 
        id: 1, 
        title: "Sites WordPress", 
        icon: <LayoutTemplate/>, 
        subTitle: 'Gestion de contenu, Corporate & Blog',
        description: "L'essentiel pour être visible. Je conçois des sites modernes sous WordPress qui présentent votre activité avec élégance. L'atout majeur ? Vous êtes 100% autonome pour modifier vos textes et images grâce à une interface d'administration simplifiée.",
    },
    { 
        id: 2, 
        title: "Site Vitrine Sur-mesure", 
        icon: <Paintbrush/>, 
        subTitle: 'Design unique, Animations & Responsive',
        description: "Votre identité numérique mérite mieux qu'un modèle standard. Je développe des sites uniques qui respectent votre charte graphique au pixel près. La performance, la fluidité des animations et le respect des standards web sont au cœur de mon processus.",
    },
    { 
        id: 3, 
        title: "E-commerce", 
        icon: <ShoppingCart/>,
        subTitle: 'Shopify, WooCommerce',
        description: "Transformez vos visiteurs en clients. Que ce soit sur Shopify ou WordPress (WooCommerce), je crée des boutiques en ligne performantes, sécurisées et optimisées pour la vente, avec une gestion de catalogue fluide.",
    },
    { 
        id: 4, 
        title: "Application Métier", 
        icon: <TrendingUp/>,
        subTitle: 'Solutions sur-mesure, SaaS, Tableaux de bord',
        description: "Quand un site standard ne suffit plus. Je développe des outils web spécifiques (React/Next.js) connectés à votre activité pour automatiser vos tâches, gérer vos données internes ou offrir un service innovant à vos utilisateurs.",
    },
    { 
        id: 5, 
        title: "Consulting", 
        icon: <Target/>,
        subTitle: 'Audit Web & Stratégie',
        description: "Un regard d'expert sur l'existant. Je réalise un audit approfondi de votre site web pour évaluer sa performance technique, sa sécurité et son expérience utilisateur, suivi de recommandations concrètes et applicables.",
    },
];

export const serviceModals = [
    {
        title: 'Développement Web',
        catch: "Plus qu'un exécutant, je suis un partenaire technique investi dans la réussite de votre projet sur le long terme.",
        items: [
            'Curiosité & Veille : Toujours à l\'affût des dernières technologies pour vous proposer les solutions les plus pérennes.',
            'Résolution de problèmes : Je transforme les complexités techniques en solutions simples et fluides.',
            'Code Clean & Documenté : Je travaille avec rigueur pour que votre projet soit maintenable et évolutif.',
        ],
    },
    {
        title: 'Accompagnement',
        catch: "La technique ne doit pas être une boîte noire. Je privilégie la pédagogie et la transparence dans nos échanges.",
        items: [
            'Écoute active : Je prends le temps de comprendre vos enjeux business avant de proposer une ligne de code.',
            'Vulgarisation : J\'explique les choix techniques avec des mots simples pour que vous restiez maître de votre projet.',
            'Force de proposition : Je ne me contente pas de dire "oui", je vous conseille pour optimiser vos coûts et vos résultats.',
        ],
    },
    {
        title: 'Sensibilité Créative',
        catch: "Ma double casquette technique et créative me permet de faire le pont entre le design et le développement.",
        items: [
            'Empathie Utilisateur (UX) : Je conçois les interfaces en me mettant systématiquement à la place de vos clients.',
            'Sens du détail : Des animations fluides aux alignements parfaits, je soigne les finitions qui font la différence.',
            'Adaptabilité : Je sais m\'intégrer à une équipe existante ou respecter scrupuleusement une maquette fournie.',
        ],
    },
];
export const benefitItems = [
    {
        icon: <Globe/>,
        title: "GESTION DE PROJETS WEB",
        description: "Sites vitrines, corporate, événementiels, e-commerce."
    },
    {
        icon: <CodeXml />,
        title: "INTÉGRATION WEB",
        description: "Intégrations HTML/CSS respectueuses des standards du Web."
    },
    {
        icon: <FileCheck />,
        title: "DÉVELOPPEMENTS SPÉCIFIQUES",
        description: "Outils adaptés à votre cœur de métier, applications et solutions personnalisées."
    },
    {
        icon: <Eye />,
        title: "DYNAMISME DES PAGES",
        description: "Animations de contenu non intrusives pour embellir votre projet."
    },
    {
        icon: <SlidersHorizontal />,
        title: "RESPONSIVE DESIGN",
        description: "Compatible tous supports : tablettes et applications mobiles."
    },
    {
        icon: <Paintbrush />,
        title: "CONCEPTION GRAPHIQUE & WEBDESIGN",
        description: "Plaquettes publicitaires, cartes de visite, newsletters..."
    },
    {
        icon: <Server />,
        title: "INSTALLATION DU SERVEUR WEB",
        description: "Installation et configuration de votre serveur web pour une performance optimale."
    },
    {
        icon: <LifeBuoy  />,
        title: "SUPPORT TECHNIQUE",
        description: "Support technique continu pour assurer le bon fonctionnement du site."
    }
];

export const TimeLine = [
    { 
        title: "Premier échange 🔗", 
        content: "Après réception de votre formulaire, planifions un appel pour explorer ensemble votre projet. C'est le moment de partager votre vision et vos objectifs pour créer un site qui vous correspond vraiment." 
    },
    { 
        title: "Conception & Design 🎨", 
        content: "Avant de coder, place à la créativité. Je réalise les maquettes graphiques de votre site pour valider l'identité visuelle et l'expérience utilisateur. Vous visualisez le résultat final avant même le début du développement." 
    },
    { 
        title: "Développement 👨‍💻", 
        content: "Les maquettes sont validées ? C'est parti ! Je développe votre site en transformant le design en code performant. Vous suivez l'évolution en temps réel et nous ajustons les derniers détails ensemble." 
    },
    { 
        title: "Mise en ligne 🚀", 
        content: "Votre site est prêt et testé ? Je configure l'hébergement, le nom de domaine et je vous livre les accès. Nous procédons au lancement officiel pour que votre présence digitale puisse enfin décoller !" 
    },
    { 
        title: "Formation & Autonomie 🎓", 
        content: "Je ne vous laisse pas sans boussole. Je vous forme à la gestion de votre site (textes, images, articles) pour que vous ayez toutes les clés en main et soyez totalement autonome sur votre plateforme." 
    }
];

export const catchText = {
    intro: "Ce n'est pas simplement du code, j'apporte une méthodologie et un état d'esprit qui transforment les contraintes en opportunités.",
    extra: "Mes 4 piliers d'engagement :"
};

export const skillCards = [
    {
        Icon: Handshake,
        title: "Partenaire Impliqué",
        description: "Plus qu'un simple exécutant, je m'immerge dans votre vision. Je considère votre projet comme le mien, avec un engagement total vers votre réussite.",
        color: "#3B82F6" 
    },
    {
        Icon: MessagesSquare,
        title: "Pédagogie & Clarté",
        description: "La technique ne doit pas être une boîte noire. Je traduis la complexité en langage clair pour que vous restiez toujours maître des décisions stratégiques.",
        color: "#10B981"
    },
    {
        Icon: Lightbulb,
        title: "Résolution Créative",
        description: "Là où d'autres voient des problèmes, je vois des solutions. Ma curiosité me pousse à contourner les obstacles techniques par l'innovation.",
        color: "#8B5CF6" 
    },
    {
        Icon: Gem,
        title: "Souci du Détail",
        description: "L'excellence se niche dans les finitions. Du code propre à l'alignement au pixel près, je cultive une exigence d'artisan pour un rendu final impeccable.",
        color: "#EA7600"
    }
];

export const socialLinks = [
    {
        icon: <Github />,
        color: "#6e5494",
        url: URL.github,
        text: "Github"
    },
    {
        icon: <Linkedin />,
        color: "#0e76a8",
        url: URL.linkedin,
        text: "Linkedin"
    },
    {
        icon: <Image />,
        color: "#05cc46",
        url: URL.DeviantArt,
        text: "Deviantart"
    }
];