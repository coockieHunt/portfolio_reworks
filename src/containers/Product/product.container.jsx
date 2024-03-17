import React, { useEffect, useState } from "react";
import * as styled from "./product.style";
import { AccentTextComponent } from "../../components/Text/Text.component";
import { IoIosPricetag } from "react-icons/io";
import { FaBusinessTime } from "react-icons/fa";
import {
    AiOutlineArrowRight,
    AiFillCaretLeft,
    AiFillCaretRight,
    AiFillInfoCircle 
} from "react-icons/ai";

import { TitleTextComponent } from "../../components/Text/Text.component";
import { productList } from "../../config";

import { useWindowSize } from "../../hooks/screenResize.hook";

export const ProductContainer = ({id}) => {
    const [selectedProduct, setSelectedProduct] = useState(productList[0]);
    const [reduceNav, SetReduceNav] = useState(false);
    const isMobile = useWindowSize(1000);

    useEffect(() => {
        SetReduceNav(isMobile);
    }, [isMobile]);

    const handleChangeProduct = (product) => {
        setSelectedProduct(product);
        if (!reduceNav && isMobile) {
            SetReduceNav(true);
        }
    };

    const GenerateItemProduct = () => {
        return (
            <styled.ProductContainer>
                <styled.Tab
                    className={reduceNav ? "reduce" : "expand"}
                    $mobile={isMobile}
                >
                    {productList.map((product) => (
                        <li
                            key={product.id}
                            onClick={() => {
                                handleChangeProduct(product);
                            }}
                            className={
                                product.id === selectedProduct.id
                                    ? "current_item"
                                    : "not_current_item"
                            }
                        >
                            {product.icon}
                            <span>{product.title}</span>
                        </li>
                    ))}
                </styled.Tab>

                <button onClick={() => SetReduceNav(!reduceNav)}>
                    {reduceNav ? <AiFillCaretRight /> : <AiFillCaretLeft />}
                </button>

                <styled.ItemProduct title={selectedProduct.title}>
                    <div className="productFrame">
                        {!(isMobile && !reduceNav) && (
                            <>
                                <div className="description">
                                    <AccentTextComponent className="subtitle">
                                        {selectedProduct.icon}
                                        {selectedProduct.subTitle}
                                    </AccentTextComponent>
                                    <p>{selectedProduct.content}</p>
                                </div>
                                <div className="bottom">
                                    <>
                                        <div className="ProductInfo">
                                            <span className="title">
                                                *&nbsp;Information 
                                            </span>
                                            <span>
                                                <IoIosPricetag />
                                                &nbsp;&nbsp;{
                                                    selectedProduct.price
                                                }{" "}
                                                €
                                            </span>
                                            <span>
                                                <FaBusinessTime />
                                                &nbsp;&nbsp;{
                                                    selectedProduct.time
                                                }{" "}
                                                jour
                                            </span>
                                        </div>
                                        <span className="viewMore">
                                            Voir plus &nbsp;
                                            <AiOutlineArrowRight />
                                        </span>
                                    </>
                                </div>
                            </>
                        )}
                    </div>
                    {!(isMobile && !reduceNav) && 
                        <strong className="warning">
                            <span className="accent">*</span> &nbsp;Information seulement a titre indicatif.
                        </strong>
                    }
                    
                </styled.ItemProduct>
            </styled.ProductContainer>
        );
    };

    return (
        <styled.Container id={id}>
            <TitleTextComponent subtitle={"Faites votre choix"}>
                Produits
            </TitleTextComponent>
            <GenerateItemProduct />
        </styled.Container>
    );
};
