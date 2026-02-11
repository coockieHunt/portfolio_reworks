import React, { useEffect, useState } from 'react';
import * as styled from './MyProject.style';
import { TitleTextComponent } from '@/components/Text/Text.component';
import { PaginatedGrid } from '@/components/PaginatedGrid/PaginatedGrid.component';
import { PaginationContainer } from '@/components/PaginatedGrid/PaginatedGrid.style';
import { Button } from '@/components/Button/Button';
import { BuildPreview } from './Build/BuildPreview';
import { BuildGalery } from './Build/BuildGalery';
import { BuildTab } from './Build/BuildTab';
import { getProjectsOffset } from '@/api/projects.api';
import { getProxyUrl } from '@/utils/image';

import { IProject } from '../MyProject/interface/MyProject.interface';

const BuildProjectCardComponent: React.FC<IProject> = (project) => {
    const [CurrentTab, setCurrentTab] = useState<string>('preview');

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
            className={`project-card${project.favorite ? ' favorite' : ''}`}
        >
            <BuildTab
                project={project}
                currentTab={CurrentTab}
                setCurrentTab={setCurrentTab}
            />
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
                    style={{
                        display: CurrentTab !== 'galerie' ? 'none' : 'flex',
                    }}
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

export const MyProjectContainer: React.FC<MyProjectContainerProps> = ({
    id,
}) => {
    const PAGE_SIZE = 3;
    const [projects, setProjects] = useState<IProject[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const mapApiProject = (project: any, index: number): IProject => {
        const gallery = Array.isArray(project.gallery) ? project.gallery : [];
        const resolvedGallery = gallery.map((imgId: string, imgIndex: number) => {
            return {
                img: getProxyUrl(String(imgId), { folder: 'portfolio' }),
                title: `Galerie image ${imgIndex + 1}`,
                alt: `Galerie image ${imgIndex + 1}`,
            };
        });

        const techStack = Array.isArray(project.stack)
            ? project.stack
            : typeof project.stack === 'string'
            ? project.stack.split(',').map((item: string) => item.trim()).filter(Boolean)
            : [];

        const title = project.title || `Projet ${index + 1}`;
        const tabName = project.tabName || 'project';

        return {
            id: project.id ?? `project-${index + 1}`,
            title,
            description: project.description,
            content: project.content,
            techStack,
            favorite: false,
            gitUrl: project.UrlGithub || null,
            webUrl: project.UrlProject || null,
            galery: resolvedGallery,
            fileName: `${tabName}.tsx`,
            column: 1,
            row: 1,
        } as IProject;
    };

    useEffect(() => {
        const fetchProjects = async () => {
            setIsLoading(true);
            setHasError(false);

            try {
                const min = (currentPage - 1) * PAGE_SIZE + 1;
                const max = currentPage * PAGE_SIZE;
                const res = await getProjectsOffset(min, max);
                const payload = Array.isArray(res?.data?.projects)
                    ? res.data.projects
                    : Array.isArray(res?.data?.data?.projects)
                    ? res.data.data.projects
                    : null;
                const meta = res?.data?.meta ?? res?.data?.data?.meta ?? null;

                if (!res || res?.error || !Array.isArray(payload)) {
                    setHasError(true);
                    setProjects([]);
                    setTotalPages(1);
                    return;
                }

                const totalCount =
                    typeof meta?.total_count === 'number'
                        ? meta.total_count
                        : payload.length;
                const computedTotalPages =
                    typeof meta?.total_pages === 'number'
                        ? meta.total_pages
                        : Math.ceil(totalCount / PAGE_SIZE) || 1;

                const mapped = payload.map(mapApiProject);
                setProjects(mapped);
                setTotalPages(Math.max(1, computedTotalPages));
            } catch (err) {
                setHasError(true);
                setProjects([]);
                setTotalPages(1);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProjects();
    }, [currentPage]);

    const handlePageChange = (pageIndex: number) => {
        if (pageIndex < 1 || pageIndex > totalPages) return;
        setCurrentPage(pageIndex);
    };

    return (
        <styled.Container id={id}>
                <TitleTextComponent 
                    subtitle={'Un parti de'} 
                    subtitleOpacity={0.3}
                >
                    Mes projets
                </TitleTextComponent>
            <styled.ContentWrapper>
                <styled.CardsContainer>
                    {hasError ? (
                        <div className="flex items-center justify-center py-10 text-center text-muted-foreground w-full">
                            Impossible de charger les projets pour le moment.
                        </div>
                    ) : !isLoading && projects.length === 0 ? (
                        <div className="flex items-center justify-center py-10 text-center text-muted-foreground w-full">
                            Aucun projet pour le moment.
                        </div>
                    ) : (
                        <PaginatedGrid
                            items={projects}
                            renderItem={BuildProjectCard}
                            gap_desktop={10}
                            itemsPerPageDesktop = {3}
                            itemsPerPageMobile = {2}
                            gap_mobile={25}
                            hidePagination
                        />
                    )}
                    {isLoading && !hasError && (
                        <div className="text-xs opacity-70">Chargement...</div>
                    )}
                </styled.CardsContainer>
                {!hasError && totalPages > 1 && (
                    <PaginationContainer>
                        <Button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            color="color-mix(in srgb, var(--secondary), transparent 20%)"
                        >
                            {'<'}
                        </Button>
                        {Array.from({ length: totalPages }, (_, i) => {
                            const pageNumber = i + 1;
                            return (
                                <span
                                    key={`page-${pageNumber}`}
                                    className={
                                        currentPage === pageNumber
                                            ? 'active-page'
                                            : ''
                                    }
                                    onClick={() => handlePageChange(pageNumber)}
                                >
                                    {pageNumber}
                                </span>
                            );
                        })}
                        <Button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            color="color-mix(in srgb, var(--secondary), transparent 20%)"
                        >
                            {'>'}
                        </Button>
                    </PaginationContainer>
                )}
            </styled.ContentWrapper>
        </styled.Container>
    );
};
