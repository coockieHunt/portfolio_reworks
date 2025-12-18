// src/hooks/useThemeManager.ts
import { useState, useCallback } from 'react';
import { useSettingContext } from "../context/Setting.context";
import { useLoading } from "../context/loading.context";
import { COLOR_SETTING } from '../config';
import { getThemeRand, incrementThemeRand } from '../api/counter.api';
import { generatePapucheTheme } from '../utils/colorGenerator';

export const useThemeManager = () => {
    const { changeTheme, changeHighContrast } = useSettingContext();
    const { showLoading, hideLoading } = useLoading();
    const [randomThemeCount, setRandomThemeCount] = useState(0);

    const fetchThemeCount = useCallback(async () => {
        try {
            const data = await getThemeRand();
            if (data?.success) setRandomThemeCount(Number(data.counterValue || 0));
        } catch (err) {
            console.warn('Failed to fetch theme counter', err);
        }
    }, []);

    const applyTheme = (newTheme: string, displayName: string, durationAdded: number = 0) => {
        const TOTAL_DURATION = 2000 + durationAdded;
        
        const themeConfig = COLOR_SETTING[newTheme];

        showLoading(
            themeConfig?.background_secondary || '#000000',
            TOTAL_DURATION,
            <>
                <span>Changement de thème en cours...</span>
                <strong style={{ color: themeConfig?.primary || 'inherit' }}>
                    {displayName}
                </strong>
            </>
        );
    
        setTimeout(() => changeTheme(newTheme as keyof typeof COLOR_SETTING), 0); //fix trpescript
        
        setTimeout(() => hideLoading(), TOTAL_DURATION);
    };

    const activateRandomTheme = async () => {
        Object.keys(COLOR_SETTING).forEach(key => {
            if (key.startsWith('random_')) delete COLOR_SETTING[key];
        });

        const newKey = `random_${Date.now().toString(36)}`;
        const newTheme = generatePapucheTheme(newKey);
        
        COLOR_SETTING[newKey] = newTheme;

        applyTheme(newKey, "🦄 PAPUCHE !!!", 500);

        try {
            const data = await incrementThemeRand();
            if (data?.success) setRandomThemeCount(Number(data.newValue || data.counterValue || 0));
        } catch (err) {
            console.warn('Increment failed', err);
        }
    };

    const ChangeHightContrast = (isHighContrast: boolean) => {
        if (isHighContrast) {
            applyTheme("HighContrast", "Contraste Élevé", 500);
        } else {
            applyTheme("default", "Nuit", 500);
        }
        changeHighContrast(isHighContrast);
    };

    return {
        randomThemeCount,
        fetchThemeCount,
        applyTheme,
        activateRandomTheme,
        ChangeHightContrast
    };
};