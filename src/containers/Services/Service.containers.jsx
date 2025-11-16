import { useState, React } from 'react';

import { Fence, FenceContainer, CatchModal, ListModal, IconList} from "./Service.style"

import { AiOutlineBuild, AiOutlineArrowRight, AiOutlineBgColors , AiOutlineUnlock, AiOutlineSend  } from "react-icons/ai";
import { TitleTextComponent } from '../../components/Text/Text.component'
import { serviceModals } from '../../data.jsx'
import { ModalComponent } from '../../components/Modal/Modal.coponents';
import {CiCircleCheck } from 'react-icons/ci'
import { useScrollbar } from '../../hooks/scrollBar.hook';
import { Link } from "react-scroll";
import { scroller } from "react-scroll";
import { useSettingContext } from '../../context/Setting.context';
import { HexToRgbaConverter } from '../../utils/HexToRgbaConverter';
import { getColorSettings} from '../../config.jsx';


export const ServiceContainer = ({ children, id }) => {
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