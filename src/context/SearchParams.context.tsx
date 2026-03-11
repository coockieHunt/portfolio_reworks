import React, { createContext, useEffect, useMemo } from 'react';
import { useNavigate, useSearch, useRouterState } from '@tanstack/react-router';
import { useSettingContext } from './Setting.context';
import { COLOR_SETTING } from '../config';
import { setApiDown } from '@/api/apiHealth';

type AppSearchParams = {
    theme?: string;
    accessibility?: string | boolean;
    restricted?: string | boolean;
    dysfont?: string;
    reduceMotion?: string;
    [key: string]: unknown;
};

type ParamsContextType = {
    theme?: string;
    accessibility: boolean;
    restricted: boolean;
    dysfont: boolean;
    reduceMotion: boolean;
};

const ParamsContext = createContext<ParamsContextType | null>(null);

export const ParamsProvider = ({ children }: { children: React.ReactNode }) => {
    const { changeTheme, changeHighContrast, changeOpenDyslexic, changeReducedMotion } = useSettingContext();
    const navigate = useNavigate({ from: '__root__' });
    const routerState = useRouterState();
    const search = useSearch({ from: '__root__' }) as AppSearchParams;

    useEffect(() => {
        const paramsToRemove: string[] = [];
        let hasChanges = false;

        if (search.theme && COLOR_SETTING[search.theme]) {
            changeTheme(search.theme as keyof typeof COLOR_SETTING);
            changeHighContrast(false);
            paramsToRemove.push('theme');
            hasChanges = true;
        }

        if ('accessibility' in search) {
            changeTheme('HighContrast');
            changeHighContrast(true);
            paramsToRemove.push('accessibility');
            hasChanges = true;
        }

        if ('dysfont' in search) {
            changeOpenDyslexic(String(search.dysfont) === '1');
            paramsToRemove.push('dysfont');
            hasChanges = true;
        }

        if ('reduceMotion' in search) {
            changeReducedMotion(String(search.reduceMotion) === '1');
            paramsToRemove.push('reduceMotion');
            hasChanges = true;
        }

        if ('restricted' in search) {
            setApiDown(String(search.restricted) === '1');
        }

        if (hasChanges) {
            navigate({
                to: routerState.location.pathname,
                search: (prev: any) => {
                    const next = { ...prev };
                    paramsToRemove.forEach((key) => delete next[key]);
                    return next;
                },
                replace: true,
            });
        }
    }, [search, changeTheme, changeHighContrast, changeOpenDyslexic, changeReducedMotion, navigate, routerState.location.pathname]);

    const value = useMemo<ParamsContextType>(() => ({
        theme: search.theme,
        accessibility: 'accessibility' in search,
        restricted: 'restricted' in search,
        dysfont: 'dysfont' in search,
        reduceMotion: 'reduceMotion' in search,
    }), [search]);

    return <ParamsContext.Provider value={value}>{children}</ParamsContext.Provider>;
};