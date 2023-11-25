import { useState, React } from 'react';

import { Fence, FenceContainer, CatchModal, ListModal, IconList} from "./Service.style"

import { AiOutlineBuild, AiOutlineArrowRight, AiOutlineBgColors , AiOutlineUnlock, AiOutlineSend  } from "react-icons/ai";
import { TitleTextComponent } from '../../components/Text/Text.component'
import { ModalComponent } from '../../components/Modal/Modal.coponents';
import {CiCircleCheck } from 'react-icons/ci'
import { useScrollbar } from '../../hooks/scroolBar.hook';
import { Link } from "react-scroll";


export const ServiceContainer = ({ children, id }) => {
	const [modals, setModals] = useState([
		{ isOpend: false, title: "Développement Web", content: 
			<>
				<CatchModal>Avec une riche expérience et une expertise pointue dans les nouvelles technologies, je relève les défis émergents et propose des solutions innovantes.</CatchModal> 
				<ListModal>
					<li><IconList><CiCircleCheck /></IconList> Site vitrine, corporate, évènementiel, e-commerce, intrane</li>
					<li><IconList><CiCircleCheck /></IconList> Intégrations HTML / CSS respectueuses des standards du Web.</li>
					<li><IconList><CiCircleCheck /></IconList> Outils adaptés à votre coeur de métier, applications & solutions personnalisées.</li>
				</ListModal>
			</>
		},
		{ isOpend: false, title: "Consultant Web", content: 
			<>
				<CatchModal>En tant que consultant web, je donne vie à vos idées en créant des solutions en ligne innovante.</CatchModal> 
				<ListModal>
						<li><IconList><CiCircleCheck /></IconList> Architecture web.</li>
						<li><IconList><CiCircleCheck /></IconList> Stratégie digitale.</li>
						<li><IconList><CiCircleCheck /></IconList> Sécurité web.</li>
						<li><IconList><CiCircleCheck /></IconList> Accessibilité web.</li>
				</ListModal>
			</>
		},
		{ isOpend: false, title: "Conception Graphique & WebDesign", content: 
			<>
				<CatchModal>Fort d'une expérience en assistant de communication.</CatchModal> 
				<ListModal>
					<li><IconList><CiCircleCheck /></IconList> Logos, templates Web, plaquettes publicitaires, cartes de visite, newsletters...</li>
					<li><IconList><CiCircleCheck /></IconList> Animations de contenu non intrusives pour embellir votre projet.</li>
					<li><IconList><CiCircleCheck /></IconList> Compatible tous supports, tablette & application mobile.</li>
				</ListModal>
			</>
		}
	]);


	useScrollbar(modals.some(modal => modal.isOpend));
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
				<span>View More <AiOutlineArrowRight /></span>
			</Fence>
		)

	}

	return (
		<div className={id}>
			<TitleTextComponent
				subtitle={"A VOTRE"}
				subtitleOpacity={0.3}
			>Services</TitleTextComponent>

			<ModalComponent modals={modals} onClose={closeModal} />

			<FenceContainer>
				{BuildFence(<AiOutlineBuild />, 'Développement\nWeb', () => openModal(0))}
				{BuildFence(<AiOutlineUnlock />, 'Consultant\nWeb', () => openModal(1))}
				{BuildFence(<AiOutlineBgColors />, 'Conception\nGraphique', () => openModal(2))}
				<Link to={'contact'}>
					<Fence onClick={() => {}} color="#221f30">
						<AiOutlineSend />
						<p className='catch' style={{ whiteSpace: 'pre-line' }}>Me <br/>Contacter</p>
						<span> Contacter<AiOutlineArrowRight /></span>
					</Fence>
                </Link>
				
			</FenceContainer>
		</div>
	);
}