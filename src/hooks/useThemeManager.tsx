import { useState, useCallback, useEffect } from 'react';
import { useSettingContext } from '../context/Setting.context';
import { useLoading } from '../context/loading.context';
import { COLOR_SETTING } from '../config';
import { getCounter, incrementCounter } from '../api/service/counter.api';
import { generatePapucheTheme } from '../utils/colorGenerator';

export const useThemeManager = () => {
    const { 
        settings,
        changeTheme, 
        changeHighContrast,
        changeReducedMotion,
        changeOpenDyslexic,
    } = useSettingContext();
    const { showLoading, hideLoading } = useLoading();
    const [randomThemeCount, setRandomThemeCount] = useState(0);

    const applyTheme = async (
        newTheme: string,
        displayName: string,
        durationAdded: number = 0,
    ) => {
        const TOTAL_DURATION = 2000 + durationAdded;

        const themeConfig = COLOR_SETTING[newTheme];

        if (!newTheme.startsWith('random_')) {
            await incrementCounter({ counterName: 'theme:counter:' + newTheme.toUpperCase() });
        }

        showLoading(
            themeConfig?.background_color || '#000000',
            TOTAL_DURATION,
            <>
                <span>Changement de thème en cours...</span>
                <strong style={{ color: themeConfig?.primary || 'inherit' }}>
                    {displayName}
                </strong>
            </>,
        );

        setTimeout(
            () => changeTheme(newTheme as keyof typeof COLOR_SETTING),
            0,
        );

        setTimeout(() => hideLoading(), TOTAL_DURATION);
    };

    const fetchThemeCount = useCallback(async () => {
        const response = await getCounter({ counterName: 'theme:counter:RANDOM' });

        if (response?.success && response.data) {
            setRandomThemeCount(Number(response.data.counterValue || 0));
        }
    }, []);

    const activateRandomTheme = async () => {
        Object.keys(COLOR_SETTING).forEach((key) => {
            if (key.startsWith('random_')) delete COLOR_SETTING[key];
        });

        const newKey = `random_${Date.now().toString(36)}`;
        const newTheme = generatePapucheTheme(newKey);
        COLOR_SETTING[newKey] = newTheme;

        applyTheme(newKey, '🦄 PAPUCHE !!!', 500);

        const response = await incrementCounter({ counterName: 'theme:counter:RANDOM' });

        if (!response) {
            console.warn('API injoignable ou erreur inconnue');
            return;
        }

        if (response.error) {
            console.warn('Increment failed:', response.message);
            return;
        }

        if (response.success && response.data) {
            setRandomThemeCount(Number(response.data.counterValue));
        }
    };

    const ChangeHighContrast = (isHighContrast: boolean) => {
        applyTheme(
            isHighContrast ? 'HighContrast' : 'default',
            isHighContrast ? 'Contraste Élevé' : 'Nuit',
            500,
        );
        changeHighContrast(isHighContrast);
    };

    const ChangeReducedMotion = (isReducedMotion: boolean) => {
        const TOTAL_DURATION = 1300;
        const themeConfig = COLOR_SETTING[settings.theme] || COLOR_SETTING.default;

        showLoading(
            themeConfig?.background_color || '#000000',
            TOTAL_DURATION,
            <>
                <span>Changement du mode animation...</span>
                <strong style={{ color: themeConfig?.primary || 'inherit' }}>
                    {isReducedMotion ? 'Mode réduit activé' : 'Mode réduit désactivé'}
                </strong>
            </>,
        );

        setTimeout(() => changeReducedMotion(isReducedMotion), 0);
        setTimeout(() => hideLoading(), TOTAL_DURATION);
    };

    const ChangeOpenDyslexic = (isOpenDyslexic: boolean) => {
        const TOTAL_DURATION = 1300;
        const themeConfig = COLOR_SETTING[settings.theme] || COLOR_SETTING.default;

        showLoading(
            themeConfig?.background_color || '#000000',
            TOTAL_DURATION,
            <>
                <span>Changement de police...</span>
                <strong style={{ color: themeConfig?.primary || 'inherit' }}>
                    {isOpenDyslexic ? 'Police OpenDyslexic activée' : 'Police OpenDyslexic désactivée'}
                </strong>
            </>,
        );

        setTimeout(() => changeOpenDyslexic(isOpenDyslexic), 0);
        setTimeout(() => hideLoading(), TOTAL_DURATION);
    };

    return {
        randomThemeCount,
        fetchThemeCount,
        applyTheme,
        activateRandomTheme,
        ChangeHighContrast,
        ChangeReducedMotion,
        ChangeOpenDyslexic,
    };
};