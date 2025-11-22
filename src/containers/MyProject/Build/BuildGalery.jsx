import React from 'react';

const BuildGaleryBuild = ({ project }) => {
    return (
        <div className="container_galery">
            {project.galery && project.galery.map((imgUrl, index) => (
                <div key={index}>
                    <img src={imgUrl} alt={`Galerie image ${index + 1}`} />
                </div>
            ))}
        </div>
    );
};

export const BuildGalery = React.memo(BuildGaleryBuild);
