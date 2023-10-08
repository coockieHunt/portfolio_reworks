import { Container, Title, List, Text} from "./MyProject.style";
import {AccentTextComponent} from '../../components/Text/Text.component'



export const MyPorjectContainer = ({id}) => {
    return(
        <Container id={id}>
            <Title><AccentTextComponent>MES PROJETS</AccentTextComponent></Title>
            <Text>Une partie de mes project public</Text>
            <div className="listContainer">
                <List>
                    <div>
                        <h2 className="title">React Hooks</h2>
                        <p>Ce projet met en œuvre des composants fonctionnels pour gérer l'état et les effets de manière élégante, rendant le développement d'applications web plus fluide et efficace. </p>
                    </div>
                    <div>
                        <h2 className="title">Portfolio 1.0</h2>
                        <p>Mon premier portfolio en ligne, conçu pour présenter mes compétences et projets précédents. Il a été créé avec HTML, CSS et JavaScript. Bien que ce soit une version antérieure, il représente le début de mon voyage dans le développement web.</p>

                    </div>
                    <div>
                        <h2 className="title">Portfolio 2.0</h2>
                        <p>La deuxième itération de mon portfolio, qui montre ma progression dans le développement web. Ce portfolio est plus avancé, utilisant des technologies modernes telles que React et Styled Components. Il offre une expérience utilisateur améliorée et une meilleure présentation de mes projets.</p>

                    </div>
                    <div>
                        <h2 className="title">Game Framework</h2>
                        <p>Un projet passionnant axé sur le développement de mode jeux. crée à l'aide de technologies telles que Unity et lua html js. Ce framework a pour butte de possée le basse, permettant des expériences de jeu amusantes et interactives.</p>

                    </div>
                </List>
            </div>

        
        </Container>
    )
}