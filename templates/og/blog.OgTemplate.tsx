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
                background: 'linear-gradient(135deg, #0a0514 0%, #1a0f2e 50%, #0a0514 100%)',
                fontFamily: '"Source Sans Pro", sans-serif',
                color: 'white',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundImage: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 1.5px, transparent 1.5px)',
                    backgroundSize: '40px 40px',
                }}
            />

            <div
                style={{
                    display: 'flex',
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundImage: `
                        radial-gradient(circle at 20% 30%, rgba(139, 92, 246, 0.08) 0%, transparent 50%),
                        radial-gradient(circle at 80% 70%, rgba(139, 92, 246, 0.08) 0%, transparent 50%)
                    `,
                }}
            />

            <div
                style={{
                    display: 'flex',
                    position: 'absolute',
                    top: '60px',
                    left: '60px',
                }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="78" viewBox="0 0 181 280">
                    <g fill="#8b5cf6">
                        <circle cx="52" cy="194" r="14" />
                        <circle cx="51" cy="230" r="14" />
                        <circle cx="52" cy="266" r="14" />
                        <circle cx="88" cy="230" r="14" />
                        <circle cx="91" cy="194" r="14" />
                        <circle cx="129" cy="122" r="14" />
                        <circle cx="127" cy="86" r="14" />
                        <circle cx="129" cy="158" r="14" />
                        <circle cx="129" cy="194" r="14" />
                        <circle cx="167" cy="144" r="14" />
                        <circle cx="89" cy="86" r="14" />
                        <circle cx="91" cy="122" r="14" />
                        <circle cx="89" cy="158" r="14" />
                        <circle cx="52" cy="50" r="14" />
                        <circle cx="91" cy="50" r="14" />
                        <circle cx="52" cy="14" r="14" />
                        <circle cx="14" cy="230" r="14" />
                        <circle cx="15" cy="266" r="14" />
                        <circle cx="15" cy="50" r="14" />
                        <circle cx="15" cy="14" r="14" />
                        <circle cx="51" cy="86" r="14" />
                    </g>
                </svg>
            </div>

            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',     
                    position: 'relative',
                    padding: '0 80px',
                }}
            >
                {/* Lueur derrière le titre */}
                <div
                    style={{
                        display: 'flex',
                        position: 'absolute',
                        width: '800px',
                        height: '400px',
                        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}
                />

                <h1
                    style={{
                        fontSize: '64px',
                        fontWeight: 700,
                        color: '#ffffff',
                        lineHeight: 1.2,
                        textAlign: 'center',
                        margin: 0,
                        textShadow: '0 0 40px rgba(139, 92, 246, 0.3)',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}
                >
                    {title}
                </h1>
            </div>

            <div
                style={{
                    display: 'flex',
                    position: 'absolute',
                    bottom: '50px', 
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '24px',
                    color: '#c4b5fd',
                    fontFamily: 'monospace',
                }}
            >
                <span>{formattedDate}</span>
                <span style={{ margin: '0 20px', color: '#8b5cf6' }}>•</span>
                <span style={{ textTransform: 'capitalize' }}>
                    {author ? `${author}` : ''}
                </span>
            </div>
        </div>
    );
};