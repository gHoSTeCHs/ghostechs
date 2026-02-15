import { useMousePosition } from '@/hooks/use-mouse-position';

export function CursorGlow() {
    const { x, y } = useMousePosition();

    return (
        <div
            className="pointer-events-none fixed z-10 h-[300px] w-[300px] rounded-full"
            style={{
                background:
                    'radial-gradient(circle, rgba(74,222,128,0.04) 0%, transparent 70%)',
                transform: `translate(${x - 150}px, ${y - 150}px)`,
            }}
        />
    );
}
