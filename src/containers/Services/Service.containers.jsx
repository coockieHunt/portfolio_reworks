// import library
import { useState } from 'react';
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

//import component
import { ModalComponent } from '../../components/Modal/Modal.coponents';
import { useRef } from 'react';

export const ServiceContainer = ({ id }) => {
	const [modals, setModals] = useState(
		serviceModals.map(m => ({
			isOpen: false,
			title: m.title,
			content: (
				<>
					<CatchModal>{m.catch}</CatchModal>
					<ListModal>
						{m.items.map((it, idx) => (
							<li key={idx}><IconList><CiCircleCheck /></IconList> {it}</li>
						))}
					</ListModal>
				</>
			)
		}))
	);
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

	const openModal = (index) => {
		lastFocusedRef.current = document.activeElement;
		scrollToElement();
		const updatedModals = [...modals];
		updatedModals[index].isOpen = true;
		setModals(updatedModals);
	};

	const closeModal = (index) => {
		const updatedModals = [...modals];
		updatedModals[index].isOpen = false;
		setModals(updatedModals);
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
			<ModalComponent modals={modals} onClose={closeModal} />
			<FenceContainer className='scrollTo'>
				{BuildFence(<AiOutlineBuild />, 'Développement\nWeb', () => openModal(0))}
				{BuildFence(<AiOutlineUnlock />, 'Consultant\nWeb', () => openModal(1))}
				{BuildFence(<AiOutlineBgColors />, 'Conception\nGraphique', () => openModal(2))}
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