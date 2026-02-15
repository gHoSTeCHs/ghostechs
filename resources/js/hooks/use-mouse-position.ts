import { useCallback, useEffect, useState } from 'react';

type MousePosition = { x: number; y: number };

export function useMousePosition(): MousePosition {
    const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });

    const handleMouseMove = useCallback((event: MouseEvent) => {
        setPosition({ x: event.clientX, y: event.clientY });
    }, []);

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [handleMouseMove]);

    return position;
}
