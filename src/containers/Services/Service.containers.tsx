import React, { useRef, useCallback } from 'react';
import { scroller, Link } from "react-scroll";
import { AiOutlineBuild, AiOutlineArrowRight, AiOutlineBgColors, AiOutlineUnlock, AiOutlineSend } from "react-icons/ai";
import { CiCircleCheck } from 'react-icons/ci';

// Styles & Hooks
import { Fence, FenceContainer, ScrollIndicator, CatchModal, ListModal, IconList } from "./Service.style";
import { DotGridEffect } from '../../styles/effect';
import { serviceModals } from '../../data';
import { useScrollbar } from '../../hooks/useScrollBar.hook';
import { UseModal } from '../../hooks/useModal.hook';
import { ModalComponent } from '../../components/Modal/Modal.coponents';

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
        icon: <AiOutlineBuild />,
    },
    {
        index: 1,
        title: 'Consultant\nWeb',
        icon: <AiOutlineUnlock />,
    },
    {
        index: 2,
        title: 'Conception\nGraphique',
        icon: <AiOutlineBgColors />,
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
            <p className='catch' style={{ whiteSpace: 'pre-line' }}>
                {title}
            </p>
            <span>Voir plus <AiOutlineArrowRight /></span>
        </Fence>
    );
};

export const ServiceContainer = ({ id }) => {
    const { modals, openModal, closeModal } = UseModal();
    const lastFocusedRef = useRef<HTMLElement | null>(null);

    const isAnyModalOpen = modals.some((m) => m.isOpen);
    useScrollbar(isAnyModalOpen);

    const scrollToSection = () => {
        scroller.scrollTo("scrollTo", {
            duration: 200,
            delay: 0,
            smooth: true,
            offset: -window.innerHeight / 5
        });
    };

    const handleOpenModal = useCallback((index: number) => {
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
                            <IconList><CiCircleCheck /></IconList> {item}
                        </li>
                    ))}
                </ListModal>
            </>
        );
    }, [openModal]);

    const handleCloseModal = useCallback((index: number) => {
        closeModal(index);
        setTimeout(() => {
            if (lastFocusedRef.current) {
                lastFocusedRef.current.focus();
            }
        }, 0);
    }, [closeModal]);

    return (
        <div className={id}>
            <ModalComponent modals={modals} onClose={handleCloseModal} />
            
            <FenceContainer className='scrollTo'>
                {SERVICES_CONFIG.map((service) => (
                    <ServiceCard
                        key={service.index}
                        icon={service.icon}
                        title={service.title}
                        onClick={() => handleOpenModal(service.index)}
                    />
                ))}

                <Link
                    to={'contact'}
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                    href={`${window.location.origin}/#contact`}
                    aria-label="Me contacter"
                    title="Me contacter"
                    style={{ color: "inherit", textDecoration: "none" }}
                    className="desktop-contact-card"
                >
                    <Fence 
                        tabIndex={-1} 
                        className='HightLighting' 
                        style={{ opacity: 1 }} 
                        aria-hidden={true}
                    >
                        <AiOutlineSend />
                        <p className='catch' style={{ whiteSpace: 'pre-line' }}>
                            Me <br />Contacter
                        </p>
                        <span> Contacter<AiOutlineArrowRight /></span>
                    </Fence>
                </Link>
            </FenceContainer>

            <ScrollIndicator />
            
            <Link
                to={'contact'}
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                href={`${window.location.origin}/#contact`}
                aria-label="Me contacter"
                style={{ color: "inherit", textDecoration: "none", display: "block", textAlign: "center", marginTop: "30px" }}
                className="mobile-contact-cta"
            >
            </Link>
        </div>
    );
};