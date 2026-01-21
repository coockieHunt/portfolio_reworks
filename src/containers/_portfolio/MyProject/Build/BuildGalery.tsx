import React from 'react';
import { LightBoxComponent } from '@/components/LightBox/LightBox.component';
import { UseLightBox } from '@/hooks/useLightBox.hook';
import { ImageLazyLoad } from '@/components/ImageLazyLoad/ImageLazyLoad.componenet';

const BuildGaleryBuild = ({ project }) => {
    const { isLightBoxOpen, currentImg, ChangeLightBoxImg, ToggleLightBox } =
        UseLightBox();

    const handleClickImg = (imgUrl: string) => {
        ChangeLightBoxImg(imgUrl);
        ToggleLightBox();
    };

    return (
        <div className="container_galery">
            <LightBoxComponent
                isLightBoxOpen={isLightBoxOpen}
                currentImg={currentImg}
                closeLightBox={ToggleLightBox}
            />
            {project.galery &&
                project.galery.map((imgUrl, index) => (
                    <ImageLazyLoad
                        key={index}
                        url={imgUrl.img}
                        style={{ aspectRatio: '16 / 11' }} 
                        title={
                            imgUrl.title != null
                                ? imgUrl.title
                                : `Galerie image ${index + 1}`
                        }
                        alt={
                            imgUrl.alt != null
                                ? imgUrl.alt
                                : `Galerie image ${index + 1}`
                        }
                        onClick={() => handleClickImg(imgUrl.img)}
                        className="preview_img"
                    />
                ))}
        </div>
    );
};

export const BuildGalery = React.memo(BuildGaleryBuild);
