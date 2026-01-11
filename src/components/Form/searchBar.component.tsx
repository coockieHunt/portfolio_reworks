import { useState, useEffect } from 'react';
import * as styled from './searchBar.style';

interface SearchBarProps {
    searchTerm: string; 
    bounceTime: number; 
    setSearchTerm: (term: string) => void; 
}

export const SearchBarComponent = ({ searchTerm, bounceTime, setSearchTerm }: SearchBarProps) => {
    const [localTerm, setLocalTerm] = useState(searchTerm);
    const BUFFER = 200; 
    const isWaiting = localTerm !== searchTerm;

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
        </styled.Wrapper>
    );
}