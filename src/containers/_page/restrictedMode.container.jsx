import * as Styled from './style/restrcitedMode.style'
import {Container} from './style/container.style'
import { TitleTextComponent } from '@/components/Text/Text.component';

export const RestrictedMondeContainer = () => {
    return (
        <Container>
            <TitleTextComponent subtitle={'Ces quoi le mode'} weight={1}>
                Restreint ?
            </TitleTextComponent>
            
            <div className="header_describ">
                <p>Le mode restreint est un système de secours automatique qui garantit la disponibilité de mon portfolio même en cas de problème avec l'API principale.</p>
            </div>
            <h2>Fonctionnement</h2>
            
            <p>Lorsque l'API principale devient indisponible, le site détecte automatiquement cette situation et bascule en mode restreint. Un overlay s'affiche pour vous informer de l'activation de ce mode.</p>
            
            <p>En mode restreint, les données ne sont plus récupérées en temps réel depuis l'API, mais directement depuis un fichier JSON statique. Ce fichier est maintenu à jour par un worker automatique qui se régénère toutes les heures, assurant ainsi une certaine fraîcheur des informations.</p>
            
            <h2>Limitations</h2>
            
            <p>Ce mode de fonctionnement présente quelques inconvénients :</p>
            
            <ul>
                <li><strong>Performance réduite :</strong> Le chargement des pages est significativement plus lent qu'en mode normal</li>
                <li><strong>Données moins fraîches :</strong> Les informations peuvent avoir jusqu'à une heure de retard</li>
                <li><strong>Images indisponibles :</strong> Le service proxy d'images n'est pas chargé en mode restreint, ce qui rend les ressources hébergées temporairement inaccessibles</li>
            </ul>
        </Container>
    )
}