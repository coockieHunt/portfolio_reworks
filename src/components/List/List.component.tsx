import React from "react";
import * as Styled from './list.style';

interface IlistComponent {
    type?: 'bullet' | 'numbered';
    children: React.ReactNode;
}

export const ListComponent = ({ type = 'bullet', children }: IlistComponent) => {
    const Wrapper = type === "bullet" ? Styled.ListLiWrapper : Styled.ListOlWrapper;
    
    return (
        <Wrapper>
            {children}
        </Wrapper>
    );  
}