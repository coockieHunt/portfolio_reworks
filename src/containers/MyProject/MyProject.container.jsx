// react
import { useState } from 'react';

// style
import { Container, ProjectCard } from "./MyProject.style";

// components
import { TitleTextComponent } from '../../components/Text/Text.component'
import { PaginatedGrid } from '../../components/PaginatedGrid/PaginatedGrid.component';

// data config
import { projectList } from '../../data.jsx'

// icon
import { FaGithub, FaLink, FaXmark } from "react-icons/fa6";
import { VscCheck, VscAdd, VscBookmark, VscRootFolderOpened   } from "react-icons/vsc";

const BuildProjectCard = (project) => {
    const [CurrentTab, setCurrentTab] = useState("preview");

    const style = {
        gridColumnEnd: `span ${project.column || 1}`,
        gridRowEnd: `span ${project.row || 1}`,
    };

    if (project.gridPos) {
        style.gridColumnStart = project.gridPos.colStart;
        style.gridRowStart = project.gridPos.rowStart;
    }

    const BuildTab = (project) => {
        const [HoverCurrent, setHoverCurrent] = useState("");
        let Tab = [{name: "preview", label: project.fileName, icon: <VscBookmark /> }];

        if(project.galery && project.galery.length > 0){
            Tab.push({name: "galerie", label: "Galerie.jsx", icon: <VscRootFolderOpened /> });
        }

        return (
            <div className="tab-content">
                <ul>
                    {Tab.map((item, index) => (
                        <li 
                            key={index} 
                            onClick={() => setCurrentTab(item.name)}
                            className={CurrentTab === item.name ? 'selected' : undefined}
                            role="tab"
                            aria-selected={CurrentTab === item.name}
                        >
                            {item.icon} {item.label}
                            {(CurrentTab === item.name) && (
                                <span className="icon icon-active"><FaXmark /></span>
                            )}

                        </li>
                    ))}
                </ul>
            </div>
        );
    }
    const BuildPreview = (project) => {
        const ifFavorite = project.favorite ? "favorite" : "";

        return ( 
            <>
                <div className={`container_preview ${ifFavorite}`}>
                    <div className="content">
                        <h2 className="title">{project.title}</h2>

                        <span className='font_code'>{project.description}</span>
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
                                <button className='source_code' onClick={() => window.location.href = project.gitUrl}>
                                    <FaGithub /> Code source
                                </button>
                            )}
                            {project.webUrl !== null && (
                                <button className='project_code' onClick={() => window.location.href = project.webUrl}>
                                    <FaLink /> Voir le projet
                                </button>
                            )}
                        </div>
                        <div className="fenceFotter">
                                {project.favorite ? 
                                    <span className='font_code'> <VscAdd  /> Favori</span> :
                                    <span className='font_code'> <VscCheck /> UTF 8</span>
                                }
                        </div>
                    </div>
                </div>
            </>
        );
    }

    const BuildGalery = (project) => {
        return (
            <div className="container_galery">
                {project.galery.map((imgUrl, index) => (
                    <div key={index}>
                        <img src={imgUrl} alt={`Galerie image ${index + 1}`}/>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <ProjectCard 
            key={project.id} 
            style={style}
            className={project.favorite ? "favorite" : undefined}
        >
            {BuildTab(project)}
            {(() => { 
                    switch (CurrentTab) {
                        case "preview":
                            return BuildPreview(project);
                        case "galerie":
                            return BuildGalery(project);
                        default:
                            console.error("Unknown tab:", CurrentTab);
                            return BuildPreview(project);
                    }
                })()}
        </ProjectCard>
    )
}

export const MyProjectContainer = ({id}) => {
    return(
        <>
            <Container id={id}>
                <TitleTextComponent
                    subtitle={"Une partie de mes"}
                    subtitleOpacity={0.3}
                >MES PROJETS</TitleTextComponent>
                <PaginatedGrid 
                    items={projectList} 
                    renderItem={BuildProjectCard} 
                    columns={3}
                    rows={2}
                />
            </Container>
        </>
    )
}