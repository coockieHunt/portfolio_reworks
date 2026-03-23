import * as Styled from "./bento.style"
import { ElementType } from 'react';
import { HTMLMotionProps } from 'framer-motion';
import { Check, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export interface BentoFrameProps {
    children: React.ReactNode;
    SizeCard?: "large" | "wide" | "tall" | "small";
    type?: "center" | "flex";
    className?: string;
    as?: ElementType;
}

export interface BentoCardProps {
    SizeCard?: BentoFrameProps['SizeCard'];
    BorderColor?: string;
    isMobile?: boolean;
}

interface BentoProps {
    children: React.ReactNode;
    Collumns?: number;
    className?: string;
}

export const BENTO_SPRING = {
    soft:  { type: 'spring' as const, stiffness: 220, damping: 26 },
    mid:   { type: 'spring' as const, stiffness: 340, damping: 22 },
    snap:  { type: 'spring' as const, stiffness: 540, damping: 32 },
    smooth:{ type: 'spring' as const, stiffness: 250, damping: 22, mass: 0.8 },
} as const;

const springTransition = BENTO_SPRING.soft;

const DotVariant = {
    idle: {
        backgroundColor: '#383737',
        color: '#1f1716',
        opacity: 0.8,
        scale: 0.8,
        filter: 'blur(0px)',
        padding: '5px',
    },
    completed: {
        backgroundColor: 'var(--success)',
        color: 'var(--background-color)',
        opacity: 1,
        scale: 0.8,
        filter: 'blur(0px)',
        padding: '5px',
    },
    mobile:{
        backgroundColor: 'var(--primary)',
        color: 'var(--background-color)',
        opacity: 1,
        scale: 0.8,
        filter: 'blur(0px)',
        padding: '5px',
    }
};

const ActionVariant = {
    rules: {
        opacity: 0.8,
        filter: 'blur(0px)',
    },
    reset: {
        opacity: 1,
        filter: 'blur(0px)',
    },
};

export const BentoFrameComponent = ({
    children,
    SizeCard = "small",
    type = "center",
    className = "",
    as,
    BorderColor,
    ...motionProps
}: BentoFrameProps & Omit<HTMLMotionProps<'div'>, 'children' | 'className'> & { BorderColor?: string }) => {
    return (
        <Styled.Frame
            as={as}
            className={`card-${SizeCard} ${type} ${className}`}
            {...motionProps}
            style={{ ...motionProps.style }}
            BorderColor={BorderColor}
        >
            {children}
        </Styled.Frame>
    );
};

export const BentoComponent = ({
    children,
    Collumns,
    className = '',
    style = {},
}: BentoProps & { style?: React.CSSProperties }) => {
    const wrapperStyle = {
        ...(Collumns ? { gridTemplateColumns: `repeat(${Collumns}, 1fr)` } : {}),
        ...style,
    };

    return (
        <Styled.Wrapper className={className} style={wrapperStyle}>
            {children}
        </Styled.Wrapper>
    );
};

export const BentoLabelComponent = ({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return <Styled.BentoLabel className={className}>{children}</Styled.BentoLabel>;
};

export const BentoActionComponent = ({
    status = "rules",
    icon,
    rulesText,
    onClick,
    ...motionProps
}: {
    status?: 'rules' | 'reset';
    icon?: React.ReactNode;
    rulesText?: string;
    onClick?: React.MouseEventHandler;
} & Omit<HTMLMotionProps<'div'>, 'children'>) => {
    return (
        <Styled.BentoAction
            variants={ActionVariant}
            initial="rules"
            animate={status}
            onClick={onClick}
            style={onClick ? { cursor: "pointer" } : { cursor: "default" }}
            transition={springTransition}
            {...motionProps}
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key={status}
                    initial={{ opacity: 0, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, filter: 'blur(4px)' }}
                    transition={{ duration: 0.2 }}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                    <span>{status === "reset" ? "Recommencer" : rulesText}</span>
                    {icon}
                </motion.div>
            </AnimatePresence>
        </Styled.BentoAction>
    );
};

export const BentoStateDotComponent = ({
    className = "",
    status = "idle",
    ...motionProps
}: {
    className?: string;
    status?: 'idle' | 'completed' | 'mobile';
} & Omit<HTMLMotionProps<'div'>, 'children'>) => {
    return (
        <Styled.StateDot
            className={className}
            variants={DotVariant}
            initial="idle"
            animate={status}
            exit="idle"
            transition={springTransition}
            {...motionProps}
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key={status}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    {status === "completed" ? (
                        <Check size={10} stroke="white" strokeWidth={3} />
                    ) : status === "idle" ? (
                        <X size={10} stroke="white" strokeWidth={3} />
                    ) : (
                        <Check size={10} stroke="white" strokeWidth={3} />
                    )}
                </motion.div>
            </AnimatePresence>
        </Styled.StateDot>
    );
};

export const BentoWaveLayerComponent = ({
    className = '',
}: {
    className?: string;
}) => {
    return (
        <div className={`bento-wave-layer ${className}`.trim()}>
            <span className="bento-wave" />
            <span className="bento-wave" />
            <span className="bento-wave" />
        </div>
    );
};