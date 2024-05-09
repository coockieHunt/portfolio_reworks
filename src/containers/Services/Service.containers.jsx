import { useState, React } from 'react';

import { Fence, FenceContainer, CatchModal, ListModal, IconList} from "./Service.style"

import { AiOutlineBuild, AiOutlineArrowRight, AiOutlineBgColors , AiOutlineUnlock, AiOutlineSend  } from "react-icons/ai";
import { TitleTextComponent } from '../../components/Text/Text.component'
import { ModalComponent } from '../../components/Modal/Modal.coponents';
import {CiCircleCheck } from 'react-icons/ci'
import { useScrollbar } from '../../hooks/scrollBar.hook';
import { Link } from "react-scroll";
import { scroller } from "react-scroll";
import { useSettingContext } from '../../context/Setting.context';
import { HexToRgbaConverter } from '../../utils/HexToRgbaConverter';
import { getColorSettings} from '../../config';




export const ServiceContainer = ({ children, id }) => {
	const [modals, setModals] = useState([
		{ isOpen: false, title: "Développement Web", content: 
			<>
				<CatchModal>Avec une riche expérience et une expertise pointue dans les nouvelles technologies, je relève les défis émergents et propose des solutions innovantes.</CatchModal> 
				<ListModal>
					<li><IconList><CiCircleCheck /></IconList> Site vitrine, corporate, évènementiel, e-commerce.</li>
					<li><IconList><CiCircleCheck /></IconList> Intégrations HTML / CSS respectueuses des standards du Web.</li>
					<li><IconList><CiCircleCheck /></IconList> Outils adaptés à votre coeur de métier, applications & solutions personnalisées.</li>
				</ListModal>
			</>
		},
		{ isOpen: false, title: "Consultant Web", content: 
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
		{ isOpen: false, title: "Conception Graphique & WebDesign", content: 
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
	useScrollbar(modals.some(modal => modal.isOpen));

	const scrollToElement = () => {
		scroller.scrollTo("scrollTo", {
			duration: 200,
			delay: 0,
			smooth: true,
			offset: -window.innerHeight / 5
		});
	};

	const openModal = (index) => {
		scrollToElement();
		const updatedModals = [...modals];
		updatedModals[index].isOpen = true;
		setModals(updatedModals);
	};

	const closeModal = (index) => {
		const updatedModals = [...modals];
		updatedModals[index].isOpen = false;
		setModals(updatedModals);
	};

	const BuildFence = (icon, catchText, onClick) => {
		return (
			<Fence onClick={onClick}>
				{icon}
				<p className='catch' style={{ whiteSpace: 'pre-line' }}>
					{catchText}
				</p>
				<span>Voir plus <AiOutlineArrowRight /></span>
			</Fence>
		)

	}

	const ContactBackground = () => {
		const {settings} = useSettingContext();
		const bg_color = HexToRgbaConverter(
			getColorSettings(settings.theme).background_secondary,
			.8
		)
		return bg_color
	}

	return (
		<div className={id}>
			<ModalComponent modals={modals} onClose={closeModal} />
			<FenceContainer className='scrollTo'>
				{BuildFence(<AiOutlineBuild />, 'Développement\nWeb', () => openModal(0))}
				{BuildFence(<AiOutlineUnlock />, 'Consultant\nWeb', () => openModal(1))}
				{BuildFence(<AiOutlineBgColors />, 'Conception\nGraphique', () => openModal(2))}
				<Link to={'contact'}>
					<Fence onClick={() => {}} color={ContactBackground()} style={{"color": "white"}}>
						<AiOutlineSend />
						<p className='catch' style={{ whiteSpace: 'pre-line' }}>Me <br/>Contacter</p>
						<span> Contacter<AiOutlineArrowRight /></span>
					</Fence>
                </Link>
				
			</FenceContainer>
		</div>
	);
}