// react
import { useState, useMemo } from "react";

// style
import { Container, List} from "./MyProject.style";

// components
import { TitleTextComponent } from '../../components/Text/Text.component'

// data config
import { projectList } from '../../data.jsx'
import { SCREEN_SIZE } from '../../config.jsx';

// hooks
import { useWindowSize } from '../../hooks/screenResize.hook.jsx';

const BuildProjectCard = (project) => {
    const style = {
        gridColumnEnd: `span ${project.column || 1}`,
        gridRowEnd: `span ${project.row || 1}`,
    };

    if (project.gridPos) {
        style.gridColumnStart = project.gridPos.colStart;
        style.gridRowStart = project.gridPos.rowStart;
    }

    return (
        <div 
            key={project.id} 
            onClick={() => window.location.href = project.url}
            style={style}
            className={project.favorite ? "favorite" : "" + "project-card"}
        >
            <img src={project.thumbnail} alt={project.title} />
            <h2 className="title">{project.title}</h2>
            <p>{project.description}</p>
        </div>
    )
}

const calculatePages = (projects, isMobile) => {
    const COLS = isMobile ? 1 : 4;
    const ROWS = isMobile ? 4 : 2;
    const pages = [];
    
    let currentPage = [];

    // grid occupation
    let grid = Array(ROWS).fill().map(() => Array(COLS).fill(false));

    //if grid spot is free
    const isSpotFree = (r, c, rSpan, cSpan) => {
        if (r + rSpan > ROWS || c + cSpan > COLS) return false;
        for (let i = 0; i < rSpan; i++) {
            for (let j = 0; j < cSpan; j++) {if (grid[r + i][c + j]) return false;}
        }
        return true;
    };

    //mark grid spot as occupied
    const markSpot = (r, c, rSpan, cSpan) => {
        for (let i = 0; i < rSpan; i++) {
            for (let j = 0; j < cSpan; j++) {
                grid[r + i][c + j] = true;
            }
        }
    };

    // process projects
    let queue = [...projects];

    // fill pages thanks gemini 💥
    while (queue.length > 0) {
        let placed = false;
        let firstFreeSpot = null;

        for (let c = 0; c < COLS; c++) {
            for (let r = 0; r < ROWS; r++) {
                if (!grid[r][c]) {
                    firstFreeSpot = { r, c };
                    break;
                }
            }
            if (firstFreeSpot) break;
        }

        if (firstFreeSpot) {
            let itemIndex = -1;
            
            for (let i = 0; i < queue.length; i++) {
                const project = queue[i];
                const cSpan = isMobile ? 1 : (project.column || 1);
                const rSpan = project.row || 1;
                
                if (isSpotFree(firstFreeSpot.r, firstFreeSpot.c, rSpan, cSpan)) {
                    itemIndex = i;
                    break;
                }
            }

            if (itemIndex !== -1) {
                const project = queue[itemIndex];
                const cSpan = isMobile ? 1 : (project.column || 1);
                const rSpan = project.row || 1;
                
                markSpot(firstFreeSpot.r, firstFreeSpot.c, rSpan, cSpan);
                currentPage.push({
                    ...project,
                    column: cSpan,
                    gridPos: {
                        rowStart: firstFreeSpot.r + 1,
                        colStart: firstFreeSpot.c + 1
                    }
                });
                queue.splice(itemIndex, 1);
                placed = true;
            } else {
                
                 for (let i = 0; i < queue.length; i++) {
                    const project = queue[i];
                    const cSpan = isMobile ? 1 : (project.column || 1);
                    const rSpan = project.row || 1;

                    let spotFound = null;
                    for (let c = 0; c < COLS; c++) {
                        for (let r = 0; r < ROWS; r++) {
                            if (isSpotFree(r, c, rSpan, cSpan)) {
                                spotFound = { r, c };
                                break;
                            }
                        }
                        if (spotFound) break;
                    }

                    if (spotFound) {
                        markSpot(spotFound.r, spotFound.c, rSpan, cSpan);
                        currentPage.push({
                            ...project,
                            column: cSpan,
                            gridPos: {
                                rowStart: spotFound.r + 1,
                                colStart: spotFound.c + 1
                            }
                        });
                        queue.splice(i, 1);
                        i--;
                        placed = true;
                    }
                }
            }
        } 

        
        if (!placed) {
             if (currentPage.length > 0) {
                pages.push(currentPage);
                currentPage = [];
                grid = Array(ROWS).fill().map(() => Array(COLS).fill(false));
            } else {
                 if (queue.length > 0) {
                     console.error("Item too big for grid:", queue[0]);
                     queue.shift();
                 }
            }
        }
    }

    return pages;
};

export const MyProjectContainer = ({id}) => {
    const isMobile = useWindowSize(parseInt(SCREEN_SIZE.mobile));
    const pages = useMemo(() => calculatePages(projectList, isMobile), [isMobile]);
    const pagesNumber = pages.length;
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (pageIndex) => {
        if (pageIndex < 1 || pageIndex > pagesNumber) return;
        setCurrentPage(pageIndex);
    }
    
    const currentProjects = pages[currentPage - 1] || [];

    return(
        <Container id={id}>
            <TitleTextComponent
                subtitle={"Une partie de mes"}
                subtitleOpacity={0.3}
            >MES PROJETS</TitleTextComponent>
            <div className="listContainer">
                <List>
                    {currentProjects.map(project => BuildProjectCard(project))}
                </List>
                <div className="page">
                    <button 
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >Précédent</button>
                    
                    {Array.from({ length: pagesNumber }, (_, index) => {
                        const pageIndex = index + 1; 
                        return (
                            <span 
                                key={pageIndex} 
                                className={pageIndex === currentPage ? 'active-page' : ''}
                                onClick={() => handlePageChange(pageIndex)} 
                            >
                                {pageIndex}
                            </span>
                        );
                    })}

                    <button 
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === pagesNumber}
                    >Suivant</button>
                </div>
            </div>
        </Container>
    )
}