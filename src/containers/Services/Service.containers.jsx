// import library
import { useRef } from 'react';
import { scroller, Link } from "react-scroll";

// import icon
import { AiOutlineBuild, AiOutlineArrowRight, AiOutlineBgColors , AiOutlineUnlock, AiOutlineSend  } from "react-icons/ai";
import {CiCircleCheck } from 'react-icons/ci'

// import style
import { Fence, FenceContainer, CatchModal, ListModal, IconList} from "./Service.style"

// import effect
import { DotGridEffect } from '../../styles/effect.jsx';

// import data
import { serviceModals } from '../../data.jsx'

//import hook
import { useScrollbar } from '../../hooks/useScrollBar.hook.jsx';
import { UseModal } from '../../hooks/useModal.hook.jsx';

//import component
import { ModalComponent } from '../../components/Modal/Modal.coponents';

export const ServiceContainer = ({ id }) => {
	const { modals, openModal, closeModal } = UseModal();
	useScrollbar(modals.some(modal => modal.isOpen));

	const scrollToElement = () => {
		scroller.scrollTo("scrollTo", {
			duration: 200,
			delay: 0,
			smooth: true,
			offset: -window.innerHeight / 5
		});
	};

	const lastFocusedRef = useRef(null);

	const handleOpenModal = (index) => {
		lastFocusedRef.current = document.activeElement;
		scrollToElement();
		const modalData = serviceModals[index];
		openModal(
			modalData.title,
			<>
				<CatchModal>{modalData.catch}</CatchModal>
				<ListModal>
					{modalData.items.map((it, idx) => (
						<li key={idx}><IconList><CiCircleCheck /></IconList> {it}</li>
					))}
				</ListModal>
			</>
		);
	};

	const handleCloseModal = (index) => {
		closeModal(index);
		setTimeout(() => {
			try { lastFocusedRef.current && lastFocusedRef.current.focus(); } catch (e) {/* noop */}
		}, 0);
	};

	const BuildFence = (icon, catchText, onClick) => {
		return (
			<Fence
				onClick={onClick}
				tabIndex={0}
				role="button"
				aria-label={`${catchText} - Voir plus`}
				onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } }}
			>
				<DotGridEffect
					$isHovered={true}
					$DotColor="#fafeff6c"
					$Spacing="18px"
					$DotSize="2px"/>

				{icon}
				<p className='catch' style={{ whiteSpace: 'pre-line' }}>
					{catchText}
				</p>
				<span>Voir plus <AiOutlineArrowRight /></span>
			</Fence>
		)

	}


	return (
		<div className={id}>
			<ModalComponent modals={modals} onClose={handleCloseModal} />
			<FenceContainer className='scrollTo'>
				{BuildFence(<AiOutlineBuild />, 'Développement\nWeb', () => handleOpenModal(0))}
				{BuildFence(<AiOutlineUnlock />, 'Consultant\nWeb', () => handleOpenModal(1))}
				{BuildFence(<AiOutlineBgColors />, 'Conception\nGraphique', () => handleOpenModal(2))}
				<Link 
					to={'contact'} 
					spy={true} 
					smooth={true} 
					offset={-70} 
					duration={500} 
					href={`${window.location.origin}/#contact`}
					aria-label="Me contacter"
					title="Me contacter"
					style={{color: "inherit", textDecoration: "none"}}
				>
					<Fence tabIndex={-1} className='HightLighting' style={{"opacity": "white"}} aria-hidden={true}>
						<AiOutlineSend />
						<p className='catch' style={{ whiteSpace: 'pre-line' }}>Me <br/>Contacter</p>
						<span> Contacter<AiOutlineArrowRight /></span>
					</Fence>
                </Link>
				
			</FenceContainer>
		</div>
	);
}