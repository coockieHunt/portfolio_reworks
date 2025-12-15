export interface ButtonProps {
    onClick?: () => void;
    color?: string;
    children: React.ReactNode;
    icon?: React.ReactNode;
    icon_right?: boolean;
    disabled?: boolean;
    onclick?: () => void;
    className?: string;
    target?: string;
    href?: string;    
}

export interface OutlineButtonProps {
    onClick?: () => void;
    color?: string;
    children: React.ReactNode;
    icon?: React.ReactNode;
    icon_right?: boolean;
    disabled?: boolean;
}

export interface ScrollToTopProps {
    hide_top?: number;
    hide_bottom?: number;
    auto_hide?: boolean;
}

export interface IconButtonProps {
    color?: string;
    icon: React.ReactElement;
    to?: string;
    onClick?: () => void;
    text?: string;
    textX?: string;
    textY?: string;
    iconSize?: string;
    ariaLabel?: string;
}

export interface LinkProps {
    children: React.ReactNode;
    onClick?: () => void;
    href?: string;
    className?: string;
    ariaLabel?: string;
}
