// react
import React, { useState } from 'react';

// style
import { Container, ProjectCard } from "./MyProject.style";

// components
import { TitleTextComponent } from '../../components/Text/Text.component'
import { PaginatedGrid } from '../../components/PaginatedGrid/PaginatedGrid.component';

//builder
import { BuildPreview } from './Build/BuildPreview.jsx';
import { BuildGalery } from './Build/BuildGalery.jsx';
import { BuildTab } from './Build/BuildTab.jsx';

// data config
import { projectList } from '../../data.jsx'

const BuildProjectCardComponent = (project) => {
    const [CurrentTab, setCurrentTab] = useState("preview");

    const style = {
        gridColumnEnd: `span ${project.column || 1}`,
        gridRowEnd: `span ${project.row || 1}`,
    };

    if (project.gridPos) {
        style.gridColumnStart = project.gridPos.colStart;
        style.gridRowStart = project.gridPos.rowStart;
    }

    return (
        <ProjectCard 
            key={project.id} 
            style={style}
            className={project.favorite ? "favorite" : undefined}
        >
            <BuildTab project={project} currentTab={CurrentTab} setCurrentTab={setCurrentTab} />
            {CurrentTab === 'preview' && <BuildPreview project={project} />}
            {CurrentTab === 'galerie' && <BuildGalery project={project} />}
        </ProjectCard>
    )
}

const BuildProjectCard = React.memo(BuildProjectCardComponent);

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