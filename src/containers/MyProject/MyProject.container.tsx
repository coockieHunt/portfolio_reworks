import React, { useState } from 'react';
import * as styled from "./MyProject.style";
import { TitleTextComponent } from '../../components/Text/Text.component';
import { PaginatedGrid } from '../../components/PaginatedGrid/PaginatedGrid.component';
import { BuildPreview } from './Build/BuildPreview';
import { BuildGalery } from './Build/BuildGalery';
import { BuildTab } from './Build/BuildTab';
import { projectList } from '../../data';

import { IProject } from '../MyProject/interface/MyProject.interface';


const BuildProjectCardComponent: React.FC<IProject> = (project) => {
    const [CurrentTab, setCurrentTab] = useState<string>("preview");

    const style: React.CSSProperties = {
        gridColumnEnd: `span ${project.column || 1}`,
        gridRowEnd: `span ${project.row || 1}`,
    };

    if (project.gridPos) {
        style.gridColumnStart = project.gridPos.colStart;
        style.gridRowStart = project.gridPos.rowStart;
    }

    return (
        <styled.ProjectCard 
            key={project.id} 
            style={style}
            className={project.favorite ? "favorite" : undefined}
        >
            <BuildTab project={project} currentTab={CurrentTab} setCurrentTab={setCurrentTab} />
            <div
                id={`panel-preview-${project.id}`}
                role="tabpanel"
                aria-labelledby={`tab-preview-${project.id}`}
                style={{ display: CurrentTab !== 'preview' ? 'none' : 'flex' }}
            >
                <BuildPreview project={project} />
            </div>
            {project.galery && project.galery.length > 0 && (
                <div
                    id={`panel-galerie-${project.id}`}
                    role="tabpanel"
                    aria-labelledby={`tab-galerie-${project.id}`}
                    style={{ display: CurrentTab !== 'galerie' ? 'none' : 'flex' }}
                >
                    <BuildGalery project={project} />
                </div>
            )}
        </styled.ProjectCard>
    );
};

const BuildProjectCard = React.memo(BuildProjectCardComponent);

interface MyProjectContainerProps {
    id?: string;
}

export const MyProjectContainer: React.FC<MyProjectContainerProps> = ({ id }) => {
    return (
        <>
            <styled.Container id={id}>
                <TitleTextComponent
                    subtitle={"Une partie de mes"}
                    subtitleOpacity={0.3}
                >MES PROJETS</TitleTextComponent>
                <PaginatedGrid 
                    items={projectList} 
                    renderItem={BuildProjectCard} 
                    columns={3}
                    rows={2}
                    gap_desktop={10}
                    gap_mobile={25}
                />
            </styled.Container>
        </>
    );
};