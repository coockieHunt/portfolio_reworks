import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { useNavigate, useSearch, useRouterState } from '@tanstack/react-router'; // 1. On réimporte useRouterState
import { useSettingContext } from './Setting.context';
import { COLOR_SETTING } from '../config';
import { setApiDown } from '@/api/apiHealth';

type AppSearchParams = {
    theme?: string;
    accessibility?: string | boolean;
    restricted?: string | boolean;
    [key: string]: unknown;
};

type ParamsContextType = {
    theme?: string;
    accessibility: boolean;
    restricted: boolean;
};

const ParamsContext = createContext<ParamsContextType | null>(null);

export const ParamsProvider = ({ children }: { children: React.ReactNode }) => {
    const { changeTheme, changeHighContrast } = useSettingContext();
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

        if('restricted' in search) {
            const value = String(search.restricted).toLowerCase();
            if (value === '1') {
                setApiDown(true);
            } else if (value === '0') {
                setApiDown(false);
            }
        }
    }, [search, changeTheme, changeHighContrast, navigate, routerState.location.pathname]);



    const value = useMemo<ParamsContextType>(() => ({
        theme: search.theme,
        accessibility: 'accessibility' in search,
        restricted: 'restricted' in search,
    }), [search]);

    return <ParamsContext.Provider value={value}>{children}</ParamsContext.Provider>;
};

