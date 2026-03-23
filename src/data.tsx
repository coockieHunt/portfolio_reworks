import {
    CodeXml,
    Eye,
    FileCheck,
    Github,
    Globe,
    Image,
    LayoutTemplate,
    Linkedin,
    LifeBuoy,
    Paintbrush,
    ShoppingCart,
    SlidersHorizontal,
    Target,
    TrendingUp,
    Server,
} from 'lucide-react';
export const CONTACT_EMAIL = 'pro.jonathan.gleyze@gmail.com';

export const URL = {
    DeviantArt: 'https://www.deviantart.com/coockiehunt',
    github: 'https://github.com/coockieHunt',
    linkedin: 'https://www.linkedin.com/in/jonathan-gleyze-173ab7239/',
    github_hook: 'https://github.com/coockieHunt/custom_hook',
    github_portfolio: 'https://github.com/coockieHunt/portfolio',
    github_portfolio_rework: 'https://github.com/coockieHunt/portfolio_reworks',
    github_portfolio_rework_api:
        'https://github.com/coockieHunt/api-mail/tree/master',
    github_game: 'https://github.com/coockieHunt/ck_rp',

    projectQuoteSend: 'https://github.com/coockieHunt/quoteViewerSkull',
    FirstPortfolio: 'https://github.com/coockieHunt/portfolio',
    onset: 'https://github.com/coockieHunt/ck_rp',
};

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
        title: 'Sites WordPress',
        icon: <LayoutTemplate />,
        subTitle: 'Gestion de contenu, Corporate & Blog',
        description:
            "L'essentiel pour être visible. Je conçois des sites modernes sous WordPress qui présentent votre activité avec élégance. L'atout majeur ? Vous êtes 100% autonome pour modifier vos textes et images grâce à une interface d'administration simplifiée.",
    },
    {
        id: 2,
        title: 'Site Vitrine Sur-mesure',
        icon: <Paintbrush />,
        subTitle: 'Design unique, Animations & Responsive',
        description:
            "Votre identité numérique mérite mieux qu'un modèle standard. Je développe des sites uniques qui respectent votre charte graphique au pixel près. La performance, la fluidité des animations et le respect des standards web sont au cœur de mon processus.",
    },
    {
        id: 3,
        title: 'E-commerce',
        icon: <ShoppingCart />,
        subTitle: 'Shopify, WooCommerce',
        description:
            'Transformez vos visiteurs en clients. Que ce soit sur Shopify ou WordPress (WooCommerce), je crée des boutiques en ligne performantes, sécurisées et optimisées pour la vente, avec une gestion de catalogue fluide.',
    },
    {
        id: 4,
        title: 'Application Métier',
        icon: <TrendingUp />,
        subTitle: 'Solutions sur-mesure, SaaS, Tableaux de bord',
        description:
            'Quand un site standard ne suffit plus. Je développe des outils web spécifiques (React/Next.js) connectés à votre activité pour automatiser vos tâches, gérer vos données internes ou offrir un service innovant à vos utilisateurs.',
    },
    {
        id: 5,
        title: 'Consulting',
        icon: <Target />,
        subTitle: 'Audit Web & Stratégie',
        description:
            "Un regard d'expert sur l'existant. Je réalise un audit approfondi de votre site web pour évaluer sa performance technique, sa sécurité et son expérience utilisateur, suivi de recommandations concrètes et applicables.",
    },
];

export const serviceModals = [
    {
        title: 'Développement Web',
        catch: "Plus qu'un exécutant, je suis un partenaire technique investi dans la réussite de votre projet sur le long terme.",
        items: [
            "Curiosité & Veille : Toujours à l'affût des dernières technologies pour vous proposer les solutions les plus pérennes.",
            'Résolution de problèmes : Je transforme les complexités techniques en solutions simples et fluides.',
            'Code Clean & Documenté : Je travaille avec rigueur pour que votre projet soit maintenable et évolutif.',
        ],
    },
    {
        title: 'Accompagnement',
        catch: 'La technique ne doit pas être une boîte noire. Je privilégie la pédagogie et la transparence dans nos échanges.',
        items: [
            'Écoute active : Je prends le temps de comprendre vos enjeux business avant de proposer une ligne de code.',
            "Vulgarisation : J'explique les choix techniques avec des mots simples pour que vous restiez maître de votre projet.",
            'Force de proposition : Je ne me contente pas de dire "oui", je vous conseille pour optimiser vos coûts et vos résultats.',
        ],
    },
    {
        title: 'Sensibilité Créative',
        catch: 'Ma double casquette technique et créative me permet de faire le pont entre le design et le développement.',
        items: [
            'Empathie Utilisateur (UX) : Je conçois les interfaces en me mettant systématiquement à la place de vos clients.',
            'Sens du détail : Des animations fluides aux alignements parfaits, je soigne les finitions qui font la différence.',
            "Adaptabilité : Je sais m'intégrer à une équipe existante ou respecter scrupuleusement une maquette fournie.",
        ],
    },
];
export const benefitItems = [
    {
        icon: <Globe />,
        title: 'GESTION DE PROJETS WEB',
        description: 'Sites vitrines, corporate, événementiels, e-commerce.',
    },
    {
        icon: <CodeXml />,
        title: 'INTÉGRATION WEB',
        description:
            'Intégrations HTML/CSS respectueuses des standards du Web.',
    },
    {
        icon: <FileCheck />,
        title: 'DÉVELOPPEMENTS SPÉCIFIQUES',
        description:
            'Outils adaptés à votre cœur de métier, applications et solutions personnalisées.',
    },
    {
        icon: <Eye />,
        title: 'DYNAMISME DES PAGES',
        description:
            'Animations de contenu non intrusives pour embellir votre projet.',
    },
    {
        icon: <SlidersHorizontal />,
        title: 'RESPONSIVE DESIGN',
        description:
            'Compatible tous supports : tablettes et applications mobiles.',
    },
    {
        icon: <Paintbrush />,
        title: 'CONCEPTION GRAPHIQUE & WEBDESIGN',
        description:
            'Plaquettes publicitaires, cartes de visite, newsletters...',
    },
    {
        icon: <Server />,
        title: 'INSTALLATION DU SERVEUR WEB',
        description:
            'Installation et configuration de votre serveur web pour une performance optimale.',
    },
    {
        icon: <LifeBuoy />,
        title: 'SUPPORT TECHNIQUE',
        description:
            'Support technique continu pour assurer le bon fonctionnement du site.',
    },
];

export const TimeLine = [
    {
        command: 'git init discovery',
        title: 'Premier échange 🔗',
        content: {
            git_output: 'Initialized empty Git repository in *green**~/discovery/.git/**  ·  *blue**1 commit** on *green**main**',
            description: "Après réception de votre formulaire, planifions un appel pour explorer ensemble votre projet. C'est le moment de partager votre vision et vos objectifs pour créer un site qui vous correspond vraiment.",
        }
    },
    {
        command: "git commit -m 'feat: blueprints'",
        title: 'Conception & Design 🎨',
        content: {
            git_output: "[*green**main**] *blue**a3f9c12** feat: blueprints  ·  *amber**4 files changed,** *green**218 insertions(+)**",
            description: "Avant de coder, place à la créativité. Je réalise les maquettes graphiques de votre site pour valider l'identité visuelle et l'expérience utilisateur. Vous visualisez le résultat final avant même le début du développement.",
        },
    },
    {
        command: 'git checkout -b develop',
        title: 'Développement 👨‍💻',
        content: {
            git_output: "Switched to a new branch *green**'develop'**  ·  tracking *blue**origin/develop**",
            description: "Les maquettes sont validées ? C'est parti ! Je développe votre site en transformant le design en code performant. Vous suivez l'évolution en temps réel et nous ajustons les derniers détails ensemble.",
        }
    },
    {
        command: 'git merge main --deploy',
        title: 'Mise en ligne 🚀',
        content: {
            git_output: "*green**Fast-forward** merge complete  ·  Deploying to *blue**production**... *green**✓ live**",
            description: "Votre site est prêt et testé ? Je configure l'hébergement, le nom de domaine et je vous livre les accès. Nous procédons au lancement officiel pour que votre présence digitale puisse enfin décoller !",
        }
    },
    {
        command: 'git tag -a v1.0.0',
        title: 'Formation & Autonomie 🎓',
        content: {
            git_output: "Tagged *blue**v1.0.0**  ·  *green**GPG signed**  ·  pushed to *red**origin**",
            description: 'Je ne vous laisse pas sans boussole. Je vous forme à la gestion de votre site (textes, images, articles) pour que vous ayez toutes les clés en main et soyez totalement autonome sur votre plateforme.',
        }
    },
];

export const socialLinks = [
    {
        icon: <Github />,
        color: '#6e5494',
        url: URL.github,
        text: 'Github',
    },
    {
        icon: <Linkedin />,
        color: '#0e76a8',
        url: URL.linkedin,
        text: 'Linkedin',
    },
    {
        icon: <Image />,
        color: '#05cc46',
        url: URL.DeviantArt,
        text: 'Deviantart',
    },
];
