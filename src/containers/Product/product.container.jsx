// data
import { productList } from "../../data"; 
// components
import { TitleTextComponent } from "../../components/Text/Text.component"
import { TerminalComponent } from "../../components/Terminal/Terminal.component";

export const ProductContainer = ({id}) => {
    return (
        <div id={id}>
            <TitleTextComponent subtitle={"Faites votre choix"}>
                    Produits
            </TitleTextComponent>
            <TerminalComponent data={productList} />
        </div>
    );
};