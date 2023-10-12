import React from 'react';

export const EmailTemplateContact = ({ content, title, email, FullName }) => {
    const linkStyle = {
        color: 'white',
        textDecoration: 'none',
    };

    return (
        <html>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>{title}</title>
            </head>
            <body style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f4', margin: 0, padding: 0 }}>
                <table role="presentation" align="center" cellpadding="0" cellspacing="0" style={{paddingTop: "20px", margin: 'auto', backgroundColor: '#121212', color: '#fff', width: '600px' }}>
                    <tr>
                        <td className="header" style={{textAlign: 'center', color: '#fff', padding: '10px 30px', borderBottom: '1px solid rgba(255, 255, 255, 0.315)' }}>
                            <img className="logo" src="https://jonathangleyze.fr/main_logo.png" style={{ height: '50px' }} alt="Logo" />
                            <h1 className="title" style={{ fontSize: '1.5em' }}>{title}</h1>
                        </td>
                    </tr>
                    <tr>
                        <td className="content" style={{ padding: '25px 30px', backgroundColor: '#5843e4' }}>
                            <table className="info-list" style={{ listStyle: 'none', color: 'white' , fontSize: '1.2em' }}>
                                <tr>
                                    <td><span style={{ fontWeight: 'bold' }}>Nom prénom: </span>{FullName}</td>
                                </tr>
                                <tr>
                                    <td ><span style={{ fontWeight: 'bold' }}>Mail: </span ><a style={linkStyle}>{email}</a></td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td className="message" style={{ padding: '20px 40px', backgroundColor: '#202020' }}>
                            <p className="message-text" style={{ color: '#d8d8d8', textAlign: 'center', fontSize: '1.2em'}}>
                                {content}
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td className="footer" style={{ backgroundColor: '#5843e4', textAlign: 'center' }}>
                            <span style={{padding: '10px 0', color: 'white', display: "block", width: '100%' }}>06.03.42.02.03</span>
                            <span style={{padding: '10px 0', color: 'white', display: "block", width: '100%' }}><a style={linkStyle}>pro.jonathan.gleyze@gmail.com</a></span>
                            <span style={{padding: '10px 0', color: 'white', display: "block", width: '100%' }}><a style={linkStyle}>www.jonathangleyze.fr</a></span>
                        </td>
                    </tr>
                </table>
            </body>
        </html>
    );
};
