import styled from 'styled-components';

import {
    Twitter,
    Linkedin,
    Facebook, 
    Share,
} from 'lucide-react';

// Type
interface IShareComponentProps {
    socialType: 'twitter' | 'linkedin' | 'facebook' | 'native';
    urlPost: string;
    title: string;
}

const ShareContainer = styled.div`
    transition: all 0.3s ease;
    cursor: pointer;
    
    & svg:hover {
        opacity: 0.7;
        color: var(--primary);
        transform: scale(1.1);
        transition: all 0.3s ease;
    }
`;

export const ShareComponent = ({ socialType, urlPost, title }: IShareComponentProps) => {
    const SharePopup = (url: string) => {
        const width = 600;
        const height = 600;
        const left = window.innerWidth / 2 - width / 2;
        const top = window.innerHeight / 2 - height / 2;
        
        window.open(
            url, 
            'share', 
            `width=${width},height=${height},top=${top},left=${left},toolbar=0,status=0`
        );
    };

    const handleShare = () => {
        switch (socialType) {
            case 'twitter':
                SharePopup(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(urlPost)}`);
                break;
                
            case 'linkedin':
                SharePopup(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(urlPost)}`);
                break;
                
            case 'facebook':
                SharePopup(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(urlPost)}`);
                break;
                
            case 'native':
                if (navigator.share) {
                    navigator.share({
                        title: title,
                        url: urlPost,
                    }).catch((err) => console.log("Partage annulé", err));
                } else {
                    alert("Le partage n'est pas supporté sur ce navigateur.");
                }
                break;
        }
    };

    const renderIcon = () => {
        switch (socialType) {
            case 'twitter': return <Twitter aria-hidden="true" focusable={false} />;
            case 'linkedin': return <Linkedin aria-hidden="true" focusable={false} />;
            case 'facebook': return <Facebook aria-hidden="true" focusable={false} />; 
            case 'native': return <Share aria-hidden="true" focusable={false} />;
            default: return null;
        }
    };

    const getAriaLabel = () => {
        switch (socialType) {
            case 'twitter': return 'Partager sur Twitter';
            case 'linkedin': return 'Partager sur LinkedIn';
            case 'facebook': return 'Partager sur Facebook'; 
            case 'native': return 'Partager via le partage natif du navigateur';
            default: return 'Partager';
        }
    };

    const Icon = renderIcon();

    if (!Icon) return null;

    return (
        <ShareContainer 
            onClick={handleShare}
            role="button"
            tabIndex={0}
            aria-label={getAriaLabel()}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleShare();
                }
            }}
        >
            {Icon}
        </ShareContainer>
    );
};