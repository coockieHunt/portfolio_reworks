// **
// Og template for blog posts
// **


import React from 'react';

export const BlogOgTemplate = ({
    title,
    author,
    date,
}: {
    title: string;
    author?: string;
    date?: string;
}) => {
    const formattedDate = date
        ? new Date(date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
        : 'Date inconnue';

    return (
        <div
            style={{
                display: 'flex',
                height: '100%',
                width: '100%',
                flexDirection: 'column',
                backgroundImage: 'linear-gradient(to bottom right, #121212, #2b2b3d)',
                fontFamily: 'sans-serif',
                padding: '60px',
                color: 'white',
            }}
        >
            <div style={{ display: 'flex' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="62" viewBox="0 0 181 280">
                    <g fill="#5943e4">
                        <circle cx="52" cy="194" r="14" /><circle cx="51" cy="230" r="14" /><circle cx="52" cy="266" r="14" /><circle cx="88" cy="230" r="14" /><circle cx="91" cy="194" r="14" /><circle cx="129" cy="122" r="14" /><circle cx="127" cy="86" r="14" /><circle cx="129" cy="158" r="14" /><circle cx="129" cy="194" r="14" /><circle cx="167" cy="144" r="14" /><circle cx="89" cy="86" r="14" /><circle cx="91" cy="122" r="14" /><circle cx="89" cy="158" r="14" /><circle cx="52" cy="50" r="14" /><circle cx="91" cy="50" r="14" /><circle cx="52" cy="14" r="14" /><circle cx="14" cy="230" r="14" /><circle cx="15" cy="266" r="14" /><circle cx="15" cy="50" r="14" /><circle cx="15" cy="14" r="14" /><circle cx="51" cy="86" r="14" />
                    </g>
                </svg>
            </div>

            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    justifyContent: 'space-between',
                    marginTop: '40px',
                }}
            >
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <h1
                        style={{
                            fontSize: '64px',
                            fontWeight: 800,
                            color: '#ffffff',
                            lineHeight: 1.25,
                            margin: 0,
                            paddingBottom: '15px',
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            wordBreak: 'break-word',
                        }}
                    >
                        {title}
                    </h1>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>

                    <div
                        style={{
                            width: '100%',
                            height: '4px',
                            background: '#d1cbf7',
                            marginBottom: '30px',
                            borderRadius: '2px',
                        }}
                    />

                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            fontSize: '24px',
                            color: '#9ca3af',
                            fontFamily: 'monospace',
                        }}
                    >
                        <span>{formattedDate}</span>

                        <span style={{ textTransform: 'capitalize' }}>
                            {author ? `Par ${author}` : ''}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};