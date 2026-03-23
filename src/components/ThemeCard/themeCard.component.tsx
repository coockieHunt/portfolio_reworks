import React from 'react';
import * as Styled from './themeCard.style';
import { COLOR_SETTING } from '@/config';
import { GridEffect } from '@/styles/effect';
import { Share } from 'lucide-react';
import { useAlert } from '@/context/alert.context';

type ThemeCardProps = {
    name: keyof typeof COLOR_SETTING;
    displayName: string;
    isActive?: boolean;
    onClick?: () => void;
};

export const ThemeCard: React.FC<ThemeCardProps> = ({ isActive, name, displayName, onClick }) => {
    const { addAlert } = useAlert();
    const theme = COLOR_SETTING[name];

    const shareThemeLink = () => {
        const siteUrl = import.meta.env.VITE_FRONT_SITE_URL || 'https://jonathangleyze.fr';
        navigator.clipboard.writeText(`${siteUrl}?theme=${name}`);

        const themeColor = COLOR_SETTING[name].primary;
        const message = (
            <span>
                Abience  <strong style={{ color: themeColor, fontWeight: 'bold' }}>{COLOR_SETTING[name].display_name}</strong> copié{' '}
                prêt à être partagé !
            </span>
        );

        addAlert(message, 'success', 3000);
    };

    const handleShareWithTheme = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        shareThemeLink();
    };

    const handleFooterKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            event.stopPropagation();
            shareThemeLink();
        }
    };

    return (
        <Styled.Container $isActive={isActive} onClick={onClick} $pulseColor={theme.primary}>
            <Styled.Wrapper>
                <GridEffect
                    style={{ width: '100%', height: '100%' }}
                    $bigColor={theme.primary + '10'}
                    $smallColor={theme.secondary + '1a'}
                >
                    <Styled.Frame className="frame" $bg={theme.background_color} $shadow={theme.primary}>
                        <Styled.Item
                            $pos={{ x: 20, y: 20 }}
                            $size={{ width: 80, height: 12 }}
                            $stroke={theme.primary}
                            $fill={theme.primary}
                        />

                        <Styled.Item
                            $pos={{ x: 20, y: 45 }}
                            $size={{ width: 150, height: 8 }}
                            $stroke={theme.secondary}
                            $fill={theme.secondary}
                            style={{ opacity: 0.6 }}
                        />

                        <Styled.Item
                            $pos={{ x: 20, y: 75 }}
                            $size={{ width: 85, height: 85 }}
                            $stroke={theme.secondary}
                            $fill={theme.background_color}
                        />

                        <Styled.Item
                            $pos={{ x: 120, y: 75 }}
                            $size={{ width: 120, height: 85 }}
                            $stroke={theme.primary}
                            $fill={theme.primary}
                        />

                        <Styled.Item
                            $pos={{ x: 20, y: 180 }}
                            $size={{ width: 220, height: 85 }}
                            $stroke={theme.primary}
                            $fill={theme.primary}
                        />
                    </Styled.Frame>
                </GridEffect>
            </Styled.Wrapper>

            <Styled.Footer
                style={{ borderColor: theme.border_dark }}
                onClick={handleShareWithTheme}
                onKeyDown={handleFooterKeyDown}
                role="button"
                tabIndex={0}
                aria-label={`Partager le thème ${displayName}`}
            >
                <span className="font_code" style={{ color: theme.primary }}>
                    {displayName}
                </span>
                <Share size={26} />
            </Styled.Footer>
        </Styled.Container>
    );
};