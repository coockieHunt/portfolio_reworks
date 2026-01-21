
import * as Styled from './Tags.style';

interface TagsProps {
    color: string;
    name: string;
    id: number;
    count?: number;
    selected?: boolean;
    onClick?: () => void;
}

/**
 * A React component that renders a tag with optional selection indicator, count, and click handler.
 * 
 * @param color - The color of the tag, used for styling.
 * @param name - The name or label of the tag.
 * @param id - A unique identifier for the tag.
 * @param count - Optional number to display alongside the name (e.g., for counts).
 * @param selected - Optional boolean indicating if the tag is selected; shows a checkmark or circle.
 * @param onClick - Optional click handler function for the tag.
 * @returns A styled tag element with the provided properties.
 */
export const TagsComponent = ({ 
    color, 
    name, 
    count,
    selected,
    onClick
}: TagsProps) => {
    const isInteractive = !!onClick;
    return (
        <Styled.Tag 
            $color={color} 
            $interactive={isInteractive} // Nouvelle prop pour le style
            className={`font_code ${selected ? 'selected' : ''}`} 
            onClick={onClick}
        >
            {/* Affichage conditionnel de l'indicateur */}
            {selected !== undefined && 
                <strong>{selected ? '✓' : '○'}</strong> 
            }
            {count !== undefined ? `${name} (${count})` : name}
        </Styled.Tag>
    );
}
  