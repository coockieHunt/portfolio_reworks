import React from 'react';
import { LightBoxComponent } from '@/components/LightBox/LightBox.component';
import { UseLightBox } from '@/hooks/useLightBox.hook';
import { ImageLazyLoad } from '@/components/ImageLazyLoad/ImageLazyLoad.componenet';

const BuildGaleryBuild = ({ project }) => {
    const { isLightBoxOpen, currentImg, currentAlt, ChangeLightBoxImg, ToggleLightBox } =
        UseLightBox();

    const handleClickImg = (imgUrl: string, altText: string = '') => {
        ChangeLightBoxImg(imgUrl, altText);
        ToggleLightBox();
    };

    return (
        <div className="container_galery">
            <LightBoxComponent
                isLightBoxOpen={isLightBoxOpen}
                currentImg={currentImg}
                altText={currentAlt}
                closeLightBox={ToggleLightBox}
            />
            {project.galery &&
                project.galery.map((imgUrl, index) => {
                    const altText = imgUrl.alt != null ? imgUrl.alt : `Galerie image ${index + 1}`;
                    return (
                        <ImageLazyLoad
                            key={index}
                            url={imgUrl.img}
                            style={{ aspectRatio: '16 / 11' }} 
                            title={
                                imgUrl.title != null
                                    ? imgUrl.title
                                    : `Galerie image ${index + 1}`
                            }
                            alt={altText}
                            onClick={() => handleClickImg(imgUrl.img, altText)}
                            className="preview_img"
                        />
                    );
                })}
        </div>
    );
};

export const BuildGalery = React.memo(BuildGaleryBuild);
