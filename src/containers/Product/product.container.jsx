import React from 'react';

import * as styled from './product.style';

import {AccentTextComponent, TitleTextComponent} from '../../components/Text/Text.component'

import { IoIosPricetag } from "react-icons/io";
import { FaBusinessTime, FaInfoCircle  } from "react-icons/fa";
import { AiOutlineArrowRight} from "react-icons/ai";

const GenerateProduct = ({children, title, subTitle, price, time}) => {
    return(
        <styled.ItemProduct>
            <div className="top">
                <h3 id="title"><AccentTextComponent>{title}</AccentTextComponent></h3>
                <span id="subtitle">{subTitle}</span>
                <p>{children}</p>
                </div>

                <div className="bottom">
                <span className='info'>
                    <IoIosPricetag/> &nbsp; {price}€ &nbsp;| &nbsp;<FaBusinessTime/> &nbsp;{time} jour
                </span>
                <span className='ViewMore'>View More <AiOutlineArrowRight /></span>
            </div>
        </styled.ItemProduct>
    )
}


export const ProductContainer = ({}) => {
    return(
        <styled.Container>
            <TitleTextComponent subtitle={"Faite votre choix"}>Produits</TitleTextComponent>

            <styled.ProductContainer>
              
                <GenerateProduct 
                    title="Gestion de contenu" 
                    subTitle="Wordpress, e-comerce, Vitrine"
                    price="600" 
                    time="2"
                >
                    Flexibilité est le mot d'ordre. Que vous soyez un entrepreneur en herbe ou une grande entreprise, un CMS s'adapte à vos besoins. Mettez à jour votre site en temps réel sans attendre un développeur. Collaborez facilement avec votre équipe grâce à une interface intuitive. La sécurité est notre priorité, assurant la protection de votre contenu contre les menaces potentielles.
                </GenerateProduct>
                <GenerateProduct 
                    title="Application web" 
                    subTitle="Aplication metier"
                    price="400" 
                    time="10"
                >
                    Que vous soyez un particulier cherchant à marquer sa présence en ligne ou une entreprise en quête d'innovation, je m'adapte à vos besoins spécifiques. La mise en place d'une interface intuitive permet une gestion fluide du contenu, et les mises à jour se font sans difficulté.
                </GenerateProduct>
                <GenerateProduct 
                    title="Consulting" 
                    subTitle="Audite Web"
                    price="400" 
                    time="10"
                >
                    Un audit approfondi de votre site web, évaluant chaque aspect de sa performance. De l'expérience utilisateur à la structure technique, Identifions les opportunités d'optimisation pour renforcer votre impact en ligne.
                </GenerateProduct>
            </styled.ProductContainer>
            <styled.PriceInfo>
                <span><FaInfoCircle/> Prix seulement a titre indicatif.</span>
            </styled.PriceInfo>
        </styled.Container>
    )
}