import { useEffect, useRef, useState } from 'react';

type UseInViewOptions = {
    threshold?: number;
    once?: boolean;
};

export function useInView<T extends HTMLElement = HTMLDivElement>(
    options: UseInViewOptions = {},
): { ref: React.RefObject<T | null>; isInView: boolean } {
    const { threshold = 0.15, once = true } = options;
    const ref = useRef<T | null>(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    if (once) observer.unobserve(element);
                } else if (!once) {
                    setIsInView(false);
                }
            },
            { threshold },
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, [threshold, once]);

    return { ref, isInView };
}
