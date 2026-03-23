import React, { useRef, useCallback } from 'react';
import { motion, easeInOut } from 'framer-motion'; 
import {
    MoveRight,
    CircleCheck,
    Palette,
    Send,
    Unlock,
    Wrench,
} from 'lucide-react';

import {
    Fence,
    FenceContainer,
    ScrollIndicator,
    CatchModal,
    ListModal,
    IconList,
} from './Service.style';
import { DotGridEffect } from '@/styles/effect';
import { serviceModals } from '@/data';
import { useScrollbar } from '@/hooks/useScrollBar.hook';
import { UseModal } from '@/hooks/useModal.hook';
import { ModalComponent } from '@/components/Modal/Modal.coponents';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15, 
        },
    },
};

const cardVariants = {
    hidden: { 
        opacity: 0, 
        y: 20, 
        scale: 0.98 
    },
    visible: { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: {
            duration: 0.5,
            ease: easeInOut
        }
    }
};


interface IServiceCardProps {
    icon: React.ReactNode;
    title: string;
    onClick: () => void;
}

const SERVICES_CONFIG = [
    { index: 0, title: 'Développement\nWeb', icon: <Wrench /> },
    { index: 1, title: 'Consultant\nWeb', icon: <Unlock /> },
    { index: 2, title: 'Conception\nGraphique', icon: <Palette /> },
];

const ServiceCard: React.FC<IServiceCardProps> = ({ icon, title, onClick }) => {
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick();
        }
    };

    return (
        <Fence
            onClick={onClick}
            tabIndex={0}
            role="button"
            aria-label={`${title.replace('\n', ' ')} - Voir plus`}
            onKeyDown={handleKeyDown}
        >
            <DotGridEffect
                $isHovered={true}
                $DotColor="#fafeff6c"
                $Spacing="18px"
                $DotSize="2px"
            />
            {icon}
            <p className="catch font_code" style={{ whiteSpace: 'pre-line' }}>
                {title}
            </p>
            <span>
                Voir plus <MoveRight className="arrow-icon" />
            </span>
        </Fence>
    );
};

export const ServiceContainer = ({ id }: { id?: string }) => {
    const { modals, openModal, closeModal } = UseModal();
    const lastFocusedRef = useRef<HTMLElement | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const isAnyModalOpen = modals.some((m) => m.isOpen);
    useScrollbar(isAnyModalOpen);

    const scrollToSection = () => {
        if (containerRef.current) {
            containerRef.current.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
        }
    };

    const handleOpenModal = useCallback(
        (index: number) => {
            lastFocusedRef.current = document.activeElement as HTMLElement;
            scrollToSection();
            const modalData = serviceModals[index];
            if (!modalData) return;

            openModal(
                modalData.title,
                <>
                    <CatchModal>{modalData.catch}</CatchModal>
                    <ListModal>
                        {modalData.items.map((item: string, idx: number) => (
                            <li key={idx}>
                                <IconList>
                                    <CircleCheck />
                                </IconList>
                                {item}
                            </li>
                        ))}
                    </ListModal>
                </>,
            );
        },
        [openModal]
    );

    const handleCloseModal = useCallback(
        (index: number) => {
            closeModal(index);
            setTimeout(() => {
                if (lastFocusedRef.current) {
                    lastFocusedRef.current.focus();
                }
            }, 0);
        },
        [closeModal]
    );

    return (
        <div className={id}>
            <ModalComponent modals={modals} onClose={handleCloseModal} />

            <FenceContainer 
                ref={containerRef}
                as={motion.div} 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }} 
            >
                {SERVICES_CONFIG.map((service) => (
                    <motion.div key={service.index} variants={cardVariants}>
                        <ServiceCard
                            icon={service.icon}
                            title={service.title}
                            onClick={() => handleOpenModal(service.index)}
                        />
                    </motion.div>
                ))}

                <motion.div variants={cardVariants} className="desktop-contact-card">
                    <a
                        href="#contact"
                        aria-label="Me contacter"
                        title="Me contacter"
                        style={{ color: 'inherit', textDecoration: 'none' }}
                    >
                        <Fence
                            tabIndex={-1}
                            className="HightLighting"
                            aria-hidden={true}
                        >
                            <Send />
                            <p className="catch font_code" style={{ whiteSpace: 'pre-line' }}>
                                Me <br />
                                Contacter
                            </p>
                            <span>
                                Contacter <MoveRight className="arrow-icon" />
                            </span>
                        </Fence>
                    </a>
                </motion.div>
            </FenceContainer>

            <ScrollIndicator />
        </div>
    );
};