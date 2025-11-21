// style
import { Container, ProjectCard } from "./MyProject.style";

// components
import { TitleTextComponent } from '../../components/Text/Text.component'
import { PaginatedGrid } from '../../components/PaginatedGrid/PaginatedGrid.component';

// data config
import { projectList } from '../../data.jsx'

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
        <ProjectCard 
            key={project.id} 
            onClick={() => window.location.href = project.url}
            style={style}
            className={project.favorite ? "favorite" : ""}
        >
            <img src={project.thumbnail} alt={project.title} />
            <h2 className="title">{project.title}</h2>
            <p>{project.description}</p>
        </ProjectCard>
    )
}

export const MyProjectContainer = ({id}) => {
    return(
        <Container id={id}>
            <TitleTextComponent
                subtitle={"Une partie de mes"}
                subtitleOpacity={0.3}
            >MES PROJETS</TitleTextComponent>
            <PaginatedGrid 
                items={projectList} 
                renderItem={BuildProjectCard} 
                columns={2}
                rows={2}
            />
        </Container>
    )
}