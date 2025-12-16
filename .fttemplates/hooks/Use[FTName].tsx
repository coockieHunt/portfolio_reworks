import { useState, useCallback } from "react";

//! remove above comment if using interface file
//? import { IUseTest } from './interface/useTest.interface';
//? OR file

// Interface
export interface IUse[FTName] {
    is[FTName]Active: boolean;
    toggle[FTName]: () => void;
}

export const Use[FTName] = (): IUse[FTName] => {
    
    const [is[FTName]Active, setIs[FTName]Active] = useState(false);

    const toggle[FTName] = useCallback(() => {
        setIs[FTName]Active(prev => !prev);
    }, []);

    return {
        is[FTName]Active,
        toggle[FTName]
    };
}

