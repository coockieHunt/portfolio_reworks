export const LegalNoticeContent = () => {
    return (
        <>
            <h3>Mentions Légales</h3>

            <section aria-labelledby="legal-intro-heading">
                <h4 id="legal-intro-heading">Informations rapides</h4>
                <p><strong>Hébergeur :</strong> Hostinger</p>
                <p><strong>E-mail :</strong> <a href="mailto:contact@jonathangleyze.fr">contact@jonathangleyze.fr</a></p>
            </section>

            <hr />

            <section aria-labelledby="mentions-legales-heading">
                <h4 id="mentions-legales-heading">📄 Mentions Légales</h4>

                <h5>Éditeur du site</h5>
                <p>
                    Ce site est édité par :<br />
                    <strong>Jonathan Gleyze</strong><br />
                    Site personnel / portfolio — France.
                </p>

                <h5>Contact</h5>
                <p>E-mail : <a href="mailto:contact@jonathangleyze.fr">contact@jonathangleyze.fr</a></p>

                <h5>Responsable de la publication</h5>
                <p>Jonathan Gleyze</p>

                <h5>Hébergement</h5>
                <p>Le site est hébergé par :</p>
                <ul>
                    <li>Hostinger International Ltd.</li>
                    <li>Adresse : 61 Lordou Vironos Street, 6023 Larnaca, Chypre</li>
                    <li>Site : <a href="https://hostinger.com" target="_blank" rel="noopener noreferrer">hostinger.com</a></li>
                </ul>

                <h5>Technologies et Éthique</h5>
                <p>Ce site privilégie des technologies open-source et respectueuses de la vie privée :</p>
                <ul>
                    <li><strong>Front-end :</strong> React, React Icons, Web Vitals.</li>
                    <li><strong>Analytique :</strong> Umami (solution open-source sans cookies).</li>
                    <li><strong>Polices :</strong> Hébergées en local (pas de Google Fonts externes).</li>
                </ul>

                <p>Une API interne gère :</p>
                <ul>
                    <li>l’enregistrement des messages du livre d’or</li>
                    <li>la gestion des compteurs de clics</li>
                </ul>

                <h5>Propriété intellectuelle</h5>
                <p>
                    Le contenu du site (textes, design, animations, code front-end, illustrations) est la propriété exclusive de
                    Jonathan Gleyze, sauf mentions contraires.
                </p>
                <p>
                    Le logo Node.js appartient à la Node.js Foundation et est utilisé conformément à la licence de marque.
                </p>

                <h5>Code source et licence Open Source</h5>
                <p>
                    Le code source de ce projet est disponible publiquement sur GitHub et est distribué sous une licence open-source permissive.
                </p>
                <p>
                    <strong>Vous êtes libre de :</strong>
                </p>
                <ul>
                    <li>Télécharger et utiliser le code</li>
                    <li>Modifier et adapter le projet à vos besoins</li>
                    <li>Déployer votre propre version en production</li>
                    <li>Utiliser le code à des fins commerciales ou personnelles</li>
                </ul>
                <p>
                    <strong>Conditions d'utilisation :</strong>
                </p>
                <ul>
                    <li>Vous devez conserver une mention claire de l'auteur original (Jonathan Gleyze)</li>
                    <li>Un lien vers le projet source doit être visible sur votre déploiement</li>
                    <li>Les crédits et attributions doivent rester intacts</li>
                </ul>
                <p>
                    Dépôt GitHub : <a href="https://github.com/coockieHunt/portfolio_reworks" target="_blank" rel="noopener noreferrer">github.com/coockieHunt/portfolio_reworks</a>
                </p>
            </section>

            <hr />

            <section aria-labelledby="privacy-heading">
                <h4 id="privacy-heading">🔒 Politique de Confidentialité</h4>
                <p>Je m'engage à minimiser la collecte de données et à utiliser des outils transparents.</p>

                <h5>1. Mesure d'audience (Umami)</h5>
                <p>
                    Pour comprendre l'utilisation du site, j'utilise <strong>Umami</strong>, une alternative éthique et open-source aux outils conventionnels.
                </p>
                <ul>
                    <li><strong>Anonymisation :</strong> Aucune adresse IP complète n'est stockée.</li>
                    <li><strong>Pas de profilage :</strong> Aucune donnée personnelle n'est collectée pour vous suivre d'un site à l'autre.</li>
                    <li><strong>Propriété des données :</strong> Les données analytiques restent strictement confidentielles et ne sont jamais revendues à des tiers.</li>
                </ul>

                <h5>2. Absence de traqueurs intrusifs</h5>
                <p>
                    Dans un souci de respect absolu de votre vie privée :
                </p>
                <ul>
                    <li>Ce site n'utilise <strong>pas Google Analytics</strong>.</li>
                    <li>Ce site n'utilise <strong>pas de Google reCAPTCHA</strong> (protections alternatives non intrusives).</li>
                </ul>

                <h5>3. Données fournies volontairement</h5>
                <p>Les formulaires (contact ou livre d’or) collectent uniquement :</p>
                <ul>
                    <li>adresse e-mail (pour vous répondre)</li>
                    <li>nom ou pseudonyme</li>
                    <li>contenu du message</li>
                </ul>
                <p>Ces données servent uniquement à la fonctionnalité demandée (échange ou publication sur le livre d'or).</p>

                <h5>4. Durée de conservation</h5>
                <ul>
                    <li>Les e-mails sont conservés le temps du traitement de la demande.</li>
                    <li>Les messages du livre d’or restent publiés jusqu'à demande de suppression.</li>
                    <li>Les statistiques Umami sont conservées sous forme agrégée et anonyme.</li>
                </ul>

                <h5>5. Vos droits</h5>
                <p>Vous pouvez demander l’accès, la correction ou la suppression de vos données envoyées via formulaire.</p>
                <p>Contact : <a href="mailto:contact@jonathangleyze.fr">contact@jonathangleyze.fr</a></p>

                <h5>6. Cookies</h5>
                <p>
                    Grâce à l'utilisation d'Umami, <strong>ce site ne dépose aucun cookie de traçage publicitaire</strong>.
                    Seuls des mécanismes de stockage local (localStorage) strictement nécessaires au fonctionnement technique peuvent être utilisés.
                </p>
            </section>

            <hr />

            <section aria-labelledby="credits-heading">
                <h4 id="credits-heading">🧾 Crédits</h4>
                <ul>
                    <li>React &amp; React Icons : MIT License</li>
                    <li>Umami : MIT License</li>
                    <li>Polices locales : selon leurs licences propres</li>
                    <li>Logo Node.js : marque de la Node.js Foundation</li>
                </ul>
            </section>
        </>
    );
};