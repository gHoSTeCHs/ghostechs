import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import PortfolioLayout from '@/layouts/portfolio-layout';
import type { AboutPageProps } from '@/types/pages';

export default function About({ page }: AboutPageProps) {
    const [headerVisible, setHeaderVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setHeaderVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <PortfolioLayout>
            <Head title={`${page.title} — Portfolio`} />

            <section
                className="pb-24 pt-24"
                style={{
                    opacity: headerVisible ? 1 : 0,
                    transform: headerVisible ? 'translateY(0)' : 'translateY(30px)',
                    transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
            >
                <p className="mb-6 font-mono-ibm text-[0.7rem] uppercase tracking-[0.2em] text-primary">
                    About
                </p>
                <h1 className="mb-12 font-mono-space text-[clamp(2rem,5vw,3rem)] font-bold tracking-tight text-foreground">
                    {page.title}
                </h1>

                {page.body_html && (
                    <div
                        className="prose-portfolio"
                        dangerouslySetInnerHTML={{ __html: page.body_html }}
                    />
                )}
            </section>
        </PortfolioLayout>
    );
}
