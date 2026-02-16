import { useEffect, useState } from 'react';
import { Meta } from '@/components/seo/meta';
import PortfolioLayout from '@/layouts/portfolio-layout';
import type { ResumePageProps } from '@/types/pages';

export default function Resume({ resumeUrl }: ResumePageProps) {
    const [headerVisible, setHeaderVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setHeaderVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <PortfolioLayout>
            <Meta title="Resume" />

            <section
                className="pb-24 pt-24"
                style={{
                    opacity: headerVisible ? 1 : 0,
                    transform: headerVisible ? 'translateY(0)' : 'translateY(30px)',
                    transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
            >
                <p className="mb-6 font-mono-ibm text-[0.7rem] uppercase tracking-[0.2em] text-primary">
                    Resume
                </p>
                <h1 className="mb-12 font-mono-space text-[clamp(2rem,5vw,3rem)] font-bold tracking-tight text-foreground">
                    Resume
                </h1>

                {resumeUrl ? (
                    <div>
                        <div className="mb-8">
                            <a
                                href={resumeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-sm border border-primary/30 px-4 py-2 font-mono-ibm text-[0.7rem] uppercase tracking-[0.1em] text-primary transition-all duration-300 hover:border-primary hover:bg-primary/5"
                            >
                                Download PDF &darr;
                            </a>
                        </div>
                        <div className="overflow-hidden rounded-sm border border-border">
                            <iframe
                                src={resumeUrl}
                                title="Resume"
                                className="h-[80vh] w-full bg-card"
                            />
                        </div>
                    </div>
                ) : (
                    <div className="py-16">
                        <p className="font-mono-ibm text-[0.85rem] text-muted-foreground">
                            Resume not yet available.
                        </p>
                    </div>
                )}
            </section>
        </PortfolioLayout>
    );
}
