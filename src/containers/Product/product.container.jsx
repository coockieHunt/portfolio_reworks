// data
import { productList } from "../../data.tsx"; 
// components
import { TitleTextComponent } from "../../components/Text/Text.component"
import { TerminalComponent } from "../../components/Terminal/Terminal.component";

export const ProductContainer = ({id}) => {
    return (
        <div id={id}>
            <TitleTextComponent subtitle={"Je vous propose"} >
                    Solutions
            </TitleTextComponent>
            <TerminalComponent data={productList} />
        </div>
    );
};