import { X } from 'lucide-react';
import * as styled from './searchBar.style';

interface SearchBarProps {
    localTerm: string; 
    bounceTime: number; 
    found?: number; 
    searching?: boolean;
    isWaiting?: boolean;
    hasActiveFilters?: boolean;
    onLocalTermChange: (term: string) => void;
    onClearSearch: () => void;
    onResetAll: () => void;
    children?: React.ReactNode;
}

export const SearchBarComponent = ({ 
    localTerm, 
    bounceTime, 
    onLocalTermChange,
    onClearSearch,
    onResetAll,
    found = 0, 
    searching = false,
    isWaiting = false,
    hasActiveFilters = false,
    children
}: SearchBarProps) => {
    const BUFFER = 200;

    return (
        <styled.Wrapper>
            <div style={{ position: 'relative', width: '100%' }}>
                <styled.Input 
                    type="text" 
                    placeholder="Rechercher..." 
                    value={localTerm}
                    onChange={(e) => onLocalTermChange(e.target.value)}
                />

                {isWaiting && (
                    <styled.LoadingBar 
                        key={localTerm} 
                        $duration={bounceTime - BUFFER} 
                    />
                )}

                {localTerm && (
                    <styled.ClearButton onClick={onClearSearch} title="Effacer">
                        <X size={25} />
                    </styled.ClearButton>
                )}
            </div>
            
            {children}

            <styled.InfoBar>
                <styled.StatusText className='font_code'>
                    {searching || isWaiting ? (
                        <span style={{ opacity: 0.7 }}>Analyse en cours...</span>
                    ) : (
                        <><strong>&gt; {found}</strong> RÉSULTAT{found > 1 ? 'S' : ''} TROUVÉ{found > 1 ? 'S' : ''}</>
                    )}
                </styled.StatusText>
                <styled.ResetButton 
                    onClick={onResetAll} 
                    title="Effacer la recherche et les filtres"
                    style={{
                        visibility: hasActiveFilters ? 'visible' : 'hidden',
                        pointerEvents: hasActiveFilters ? 'auto' : 'none',
                    }}
                >
                    &gt; RETIRER LES FILTRES()
                </styled.ResetButton>
            </styled.InfoBar>
        </styled.Wrapper>
    );
}