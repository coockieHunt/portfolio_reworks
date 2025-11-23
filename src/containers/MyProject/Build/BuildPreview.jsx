import React from 'react';
import { FaGithub, FaLink } from 'react-icons/fa6';
import { VscAdd, VscCheck } from 'react-icons/vsc';

const BuildPreviewBuild = ({ project }) => {
    const ifFavorite = project.favorite ? 'favorite' : '';

    return (
        <>
            <div className={`container_preview ${ifFavorite}`}>
                <div className="content">
                    <h2 className="title">{project.title}</h2>

                    <span className="font_code">{project.description}</span>
                    <p>{project.content}</p>

                    <ul>
                        {project.techStack.map((tech, index) => (
                            <li key={index}>{tech}</li>
                        ))}
                    </ul>
                </div>

                <div className="footer">
                    <div className="cta">
                        {project.gitUrl !== null && (
                            <a 
                                className="source_code" 
                                href={project.gitUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaGithub /> Code source
                            </a>
                        )}
                        {project.webUrl !== null && (
                            <a 
                                className="project_code" 
                                href={project.webUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaLink /> Voir le projet
                            </a>
                        )}
                    </div>
                    <div className="fenceFotter">
                        {project.favorite ? (
                            <span className="font_code"> <VscAdd /> Favori</span>
                        ) : (
                            <span className="font_code"> <VscCheck /> UTF 8</span>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export const BuildPreview = React.memo(BuildPreviewBuild);
