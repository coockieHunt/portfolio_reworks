import { JSX } from 'react';

export interface ITerminalLineItemProps {
    product: {
        id: number;
        title: string;
        subTitle: string;
        icon: JSX.Element;
        description: string;
    };
    openItemId: number | null;
    onItemClick: (id: number) => void;
}
