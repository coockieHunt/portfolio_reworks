import { useState, useCallback, useEffect } from 'react';
import { useSettingContext } from '../context/Setting.context';
import { useLoading } from '../context/loading.context';
import { COLOR_SETTING } from '../config';
import { getCounter, incrementCounter } from '../api/counter.api';
import { generatePapucheTheme } from '../utils/colorGenerator';

export const useThemeManager = () => {
    const { changeTheme, changeHighContrast } = useSettingContext();
    const { showLoading, hideLoading } = useLoading();
    const [randomThemeCount, setRandomThemeCount] = useState(0);

    // Apply settings from URL parameters on initial load and cleanup
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const themeParam = params.get('theme');
        const hcParam = params.get('hc');

        let hasChanged = false;

        if (hcParam === '1' || hcParam === 'true') {
            changeHighContrast(true);
            changeTheme('HighContrast' as keyof typeof COLOR_SETTING);
            hasChanged = true;
        } else if (
            themeParam &&
            COLOR_SETTING[themeParam as keyof typeof COLOR_SETTING]
        ) {
            changeTheme(themeParam as keyof typeof COLOR_SETTING);
            hasChanged = true;
        }

        if (hasChanged) {
            const newRelativePathQuery = window.location.pathname;
            window.history.replaceState({}, '', newRelativePathQuery);
        }
    }, [changeTheme, changeHighContrast]);

    const applyTheme = (
        newTheme: string,
        displayName: string,
        durationAdded: number = 0,
    ) => {
        const TOTAL_DURATION = 2000 + durationAdded;

        const themeConfig = COLOR_SETTING[newTheme];

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
        const response = await getCounter({ counterName: 'THEME_RAND' });

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

        const response = await incrementCounter({ counterName: 'THEME_RAND' });

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

    const ChangeHightContrast = (isHighContrast: boolean) => {
        if (isHighContrast) {
            applyTheme('HighContrast', 'Contraste Élevé', 500);
        } else {
            applyTheme('default', 'Nuit', 500);
        }
        changeHighContrast(isHighContrast);
    };

    return {
        randomThemeCount,
        fetchThemeCount,
        applyTheme,
        activateRandomTheme,
        ChangeHightContrast,
    };
};
