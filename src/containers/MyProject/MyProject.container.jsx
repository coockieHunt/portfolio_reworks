import { Container, List} from "./MyProject.style";
import { TitleTextComponent } from '../../components/Text/Text.component'
import { URL, projectList } from '../../data.jsx'
import { DotGridEffect } from '../../styles/effect.jsx';

import demoProjet from '../../assets/projetImg/test.png'

export const MyProjectContainer = ({id}) => {
    return(
        <Container id={id}>
            <TitleTextComponent
                subtitle={"Une partie de mes"}
                subtitleOpacity={0.3}
            >MES PROJETS</TitleTextComponent>
            <div className="listContainer">
                <List>
                    {projectList.map(project => (
                        <div key={project.id} onClick={() => window.location.href = project.url}>
                            <img src={demoProjet} alt="" />
                            <h2 className="title">{project.title}</h2>
                            <p>{project.description}</p>
                        </div>
                    ))}
                </List>
            </div>

        
        </Container>
    )
}