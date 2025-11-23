import { useState, useEffect } from 'react';

/**
 * Custom hook to track mouse position.
 * @returns {{x: number, y: number}} mousePosition - The current mouse coordinates.
 */
export const useMousePosition = () => {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

	useEffect(() => {
		const updateMousePosition = (ev) => {setMousePosition({ x: ev.clientX, y: ev.clientY });};
		window.addEventListener('mousemove', updateMousePosition);
		return () => {window.removeEventListener('mousemove', updateMousePosition);};
	}, []);

	return mousePosition;
};