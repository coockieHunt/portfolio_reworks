import React, { useRef, useCallback } from 'react';
import {
    ArrowRight,
    CircleCheck,
    Palette,
    Send,
    Unlock,
    Wrench,
} from 'lucide-react';

// Styles & Hooks
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

// --- Types & Interfaces ---

interface IServiceCardProps {
    icon: React.ReactNode;
    title: string;
    onClick: () => void;
}

const SERVICES_CONFIG = [
    {
        index: 0,
        title: 'Développement\nWeb',
        icon: <Wrench />,
    },
    {
        index: 1,
        title: 'Consultant\nWeb',
        icon: <Unlock />,
    },
    {
        index: 2,
        title: 'Conception\nGraphique',
        icon: <Palette />,
    },
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
            <p className="catch" style={{ whiteSpace: 'pre-line' }}>
                {title}
            </p>
            <span>
                Voir plus <ArrowRight />
            </span>
        </Fence>
    );
};

export const ServiceContainer = ({ id }) => {
    const { modals, openModal, closeModal } = UseModal();
    const lastFocusedRef = useRef<HTMLElement | null>(null);

    const isAnyModalOpen = modals.some((m) => m.isOpen);
    useScrollbar(isAnyModalOpen);

    const scrollToSection = () => {
        const scrollToElement = document.querySelector('.scrollTo');
        if (scrollToElement) {
            scrollToElement.scrollIntoView({ behavior: 'smooth' });
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
                                </IconList>{' '}
                                {item}
                            </li>
                        ))}
                    </ListModal>
                </>,
            );
        },
        [openModal],
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
        [closeModal],
    );

    return (
        <div className={id}>
            <ModalComponent modals={modals} onClose={handleCloseModal} />

            <FenceContainer className="scrollTo">
                {SERVICES_CONFIG.map((service) => (
                    <ServiceCard
                        key={service.index}
                        icon={service.icon}
                        title={service.title}
                        onClick={() => handleOpenModal(service.index)}
                    />
                ))}

                <a
                    href="#contact"
                    aria-label="Me contacter"
                    title="Me contacter"
                    style={{ color: 'inherit', textDecoration: 'none' }}
                    className="desktop-contact-card"
                >
                    <Fence
                        tabIndex={-1}
                        className="HightLighting"
                        style={{ opacity: 1 }}
                        aria-hidden={true}
                    >
                        <Send />
                        <p className="catch" style={{ whiteSpace: 'pre-line' }}>
                            Me <br />
                            Contacter
                        </p>
                        <span>
                            {' '}
                            Contacter
                            <ArrowRight />
                        </span>
                    </Fence>
                </a>
            </FenceContainer>

            <ScrollIndicator />
        </div>
    );
};
