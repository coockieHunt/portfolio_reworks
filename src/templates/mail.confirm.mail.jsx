import React from 'react';

export const EmailConfirmTemplate = () => {
    const linkStyle = {
        color: 'white',
        textDecoration: 'none',
    };

    return (
        <html>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Confirmation de réception</title>
            </head>
            <body style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f4', margin: 0, padding: 0 }}>
                <table role="presentation" align="center" cellPadding={0} cellSpacing={0} style={{ paddingTop: "20px", margin: 'auto', backgroundColor: '#121212', color: '#fff', width: '600px' }}>
                    <tr>
                        <td className="header" style={{ textAlign: 'center', color: '#fff', padding: '10px 30px', borderBottom: '1px solid rgba(255, 255, 255, 0.315)' }}>
                            <img className="logo" src="https://jonathangleyze.fr/src/main_logo.png" style={{ height: '50px' }} alt="Logo" />
                            <h2 className="title" style={{ fontSize: '1.5em' }}>Confirmation de réception</h2>
                        </td>
                    </tr>
                    <tr>
                        <td className="content" style={{ padding: '25px 30px', backgroundColor: '#5843e4' }}>
                            <table className="info-list" style={{ listStyle: 'none', color: 'white', fontSize: '1.2em' }}>
                                <tr>
                                    <td><span style={{ fontWeight: 'bold' }}>Sujet:</span> Demande de contact</td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td className="message" style={{ padding: '20px 40px', backgroundColor: '#202020' }}>
                            <p className="message-text" style={{ color: '#d8d8d8', textAlign: 'center', fontSize: '1.2em' }}>
                                Votre message a été envoyé avec succès. Nous vous répondrons bientôt.
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td className="footer" style={{ backgroundColor: '#5843e4', textAlign: 'center' }}>
                            <span style={{ padding: '10px 0', color: 'white', display: "block", width: '100%' }}>06.03.42.02.03</span>
                            <span style={{ padding: '10px 0', color: 'white', display: "block", width: '100%' }}><a style={linkStyle} href="tel:0603420203">pro.jonathan.gleyze@gmail.com</a></span>
                            <span style={{ padding: '10px 0', color: 'white', display: "block", width: '100%' }}><a style={linkStyle} href="https://www.jonathangleyze.fr">www.jonathangleyze.fr</a></span>
                        </td>
                    </tr>
                </table>
            </body>
        </html>
    );
};
