import * as Styled from './swatch.style';

export const Swatch = ({ color, colorText= "white", title, children }) => {
    return (
        <Styled.SwatchWrapper>
            <div className="headerColor" 
                style={{
                    backgroundColor: color,
                    color: colorText
                }}
                >{title}
            </div>
            <div className="swatch-info">
                <strong>Arrière-plan</strong>
                <span className="swatch-hex">{color.toString()}</span>
                <small>{children}</small>
            </div>

        </Styled.SwatchWrapper>
    );
}; 