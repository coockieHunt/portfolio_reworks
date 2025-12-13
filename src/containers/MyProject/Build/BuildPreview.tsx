import React from 'react';
import { FaGithub, FaLink } from 'react-icons/fa6';
import { VscAdd, VscCheck } from 'react-icons/vsc';

import { trackEvent } from '../../../components/umami/umami.components';

import { Button } from '../../../components/Button/Button';

import { getColorSettings } from '../../../config';
import { useSettingContext } from '../../../context/Setting.context';
import { HexToRgbaConverter } from '../../../utils/HexToRgbaConverter';

const BuildPreviewBuild = ({ project }) => {
    const ifFavorite = project.favorite ? 'favorite' : '';
    const { settings } = useSettingContext();
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
                        {project.gitUrl !== null && project.gitUrl !== undefined && (
                            <Button 
                                icon={<FaGithub />}
                                color={
                                    HexToRgbaConverter(getColorSettings(settings.theme).primary, 0.1) || getColorSettings(settings.theme).primary
                                }
                                className="source_code" 
                                href={project.gitUrl}
                                target="_blank"
                                onClick={() => trackEvent('project github opened', { project: project.title })}
                            >
                                Code source
                            </Button>
                        )}
                        {project.webUrl !== null && project.webUrl !== undefined && (
                            <Button 
                                icon={<FaLink />}
                                color={
                                    HexToRgbaConverter(getColorSettings(settings.theme).primary, 0.6) || getColorSettings(settings.theme).primary
                                }
                                className="project_code" 
                                href={project.webUrl}
                                target="_blank"
                                onClick={() => trackEvent('project view opened', { project: project.title })}
                            >
                                Voir le projet
                            </Button>
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