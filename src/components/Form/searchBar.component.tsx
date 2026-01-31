import { useState, useEffect } from 'react';
import * as styled from './searchBar.style';
import { RotateCcw } from 'lucide-react'; 

interface SearchBarProps {
    searchTerm: string; 
    bounceTime: number; 
    found?: number; 
    searching?: boolean;
    setSearchTerm: (term: string) => void; 
}

export const SearchBarComponent = ({ searchTerm, bounceTime, setSearchTerm, found = 0, searching = false }: SearchBarProps) => {
    const [localTerm, setLocalTerm] = useState(searchTerm);
    const BUFFER = 200; 
    const isWaiting = localTerm !== searchTerm;

    const handleReset = () => {
        setLocalTerm('');   
        setSearchTerm('');  
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (localTerm !== searchTerm) {
                setSearchTerm(localTerm);
            }
        }, bounceTime); 

        return () => clearTimeout(timeoutId);
    }, [localTerm, bounceTime, setSearchTerm, searchTerm]);

    useEffect(() => {
        setLocalTerm(searchTerm);
    }, [searchTerm]);

    return (
        <styled.Wrapper>
            <div style={{ position: 'relative', width: '100%' }}>
                <styled.Input 
                    type="text" 
                    placeholder="Rechercher..." 
                    value={localTerm}
                    onChange={(e) => setLocalTerm(e.target.value)}
                />

                {isWaiting && (
                    <styled.LoadingBar 
                        key={localTerm} 
                        $duration={bounceTime - BUFFER} 
                    />
                )}
            </div>

            <styled.InfoBar>
                
                <styled.StatusText className='font_code'>
                    {searching || isWaiting ? (
                        <span style={{ opacity: 0.7 }}>Analyse en cours...</span>
                    ) : (
                        localTerm && (
                            <><strong>{found}</strong> résultats trouvés</>
                        )
                    )}
                </styled.StatusText>

                {localTerm && (
                    <styled.ResetButton onClick={handleReset} title="Effacer la recherche">
                        Reset <RotateCcw size={18}/>
                    </styled.ResetButton>
                )}
                
            </styled.InfoBar>
        </styled.Wrapper>
    );
}