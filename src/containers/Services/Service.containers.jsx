import { useState, React } from 'react';

import { Fence, FenceContainer, catchModal } from "./Service.style"

import { AiOutlineBuild, AiOutlineArrowRight, AiOutlineBgColors, AiOutlineThunderbolt, AiOutlineUnlock } from "react-icons/ai";
import { TitleTextComponent } from '../../components/Text/Text.component'
import { ModalComponent } from '../../components/Modal/Modal.coponents';

export const ServiceContainer = ({ children }) => {
	const [modals, setModals] = useState([
		{ isOpend: false, title: "Développement Web", content: 
			<catchModal>
				Avec une riche expérience et une expertise pointue dans les nouvelles technologies, je relève les défis émergents et propose des solutions innovantes.
			</catchModal> },
		{ isOpend: false, title: "Consultant Web", content: 
			<catchModal>
				En tant que consultant web, je donne vie à vos idées en créant des solutions en ligne innovante.
			</catchModal> },
		{ isOpend: false, title: "Conception Graphique", content: 
			<catchModal>
				Fort d'une experien en asistant de commication
			</catchModal>}
	]);

	const openModal = (index) => {
		const updatedModals = [...modals];
		updatedModals[index].isOpend = true;
		setModals(updatedModals);
	};

	const closeModal = (index) => {
		const updatedModals = [...modals];
		updatedModals[index].isOpend = false;
		setModals(updatedModals);
	};

	const BuildFence = (icon, catchText, onClick) => {
		return (
			<Fence onClick={onClick}>
				{icon}
				<p className='catch' style={{ whiteSpace: 'pre-line' }}>
					{catchText}
				</p>
				{/* <span>View More <AiOutlineArrowRight /></span> */}
			</Fence>
		)

	}

	return (
		<>
			<TitleTextComponent
				subtitle={"A VOTRE"}
				subtitleOpacity={0.3}
			>Services</TitleTextComponent>

			<ModalComponent modals={modals} onClose={closeModal} />

			<FenceContainer>
				{/* {BuildFence(<AiOutlineBuild />, 'Développement\nWeb', () => openModal(0))}
				{BuildFence(<AiOutlineUnlock />, 'Consultant\nWeb', () => openModal(1))}
				{BuildFence(<AiOutlineBgColors />, 'Conception\nGraphique', () => openModal(2))} */}
				{BuildFence(<AiOutlineBuild />, 'Développement\nWeb', () => {})}
				{BuildFence(<AiOutlineUnlock />, 'Consultant\nWeb', () => {})}
				{BuildFence(<AiOutlineBgColors />, 'Conception\nGraphique', () => {})}
			</FenceContainer>
		</>


	);
}