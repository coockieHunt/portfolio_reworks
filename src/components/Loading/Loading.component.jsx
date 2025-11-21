import {Container } from './style/Loading.style';
import React, { useEffect, useState, useRef } from 'react';

export const Loading = ({ $loading, $color }) => {
    const [playAnimation, setPlayAnimation] = useState(!!$loading);
    const timeoutRef = useRef();

    useEffect(() => {
        if ($loading) {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
            setPlayAnimation(true);
            return;
        }

        timeoutRef.current = setTimeout(() => {
            setPlayAnimation(false);
            timeoutRef.current = null;
        }, 4000);

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
        };
    }, [$loading]);

    return (
        <Container loading={playAnimation ? 1 : 0} $color={$color}>
            <div className="frame" />
        </Container>
    );
};
