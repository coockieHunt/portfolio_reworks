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
                        <img src="https://www.ma-boutique-en-lean.fr/3735-large_default/carre-couleur-simple-face-magnetique.jpg" alt="" />
                        <h2 className="title">Component react</h2>
                    </div>
                    <div>
                        <img src="https://www.ma-boutique-en-lean.fr/3735-large_default/carre-couleur-simple-face-magnetique.jpg" alt="" />
                        <h2 className="title">Portfolio 1.0</h2>
                    </div>
                    <div>
                        <img src="https://www.ma-boutique-en-lean.fr/3735-large_default/carre-couleur-simple-face-magnetique.jpg" alt="" />
                        <h2 className="title">Portfolio 2.0</h2>
                    </div>
                    <div>
                        <img src="https://www.ma-boutique-en-lean.fr/3735-large_default/carre-couleur-simple-face-magnetique.jpg" alt="" />
                        <h2 className="title">Web Cataloge</h2>
                    </div>
                    <div>
                        <img src="https://www.ma-boutique-en-lean.fr/3735-large_default/carre-couleur-simple-face-magnetique.jpg" alt="" />
                        <h2 className="title">Game Framework</h2>
                    </div>
                </List>
            </div>

        
        </Container>
    )
}