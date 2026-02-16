import { useEffect, useState } from 'react';
import { BackLink } from '@/components/portfolio/back-link';
import { ProjectNav } from '@/components/portfolio/project-nav';
import { StatusBadge } from '@/components/portfolio/status-badge';
import { Meta } from '@/components/seo/meta';
import { useInView } from '@/hooks/use-in-view';
import PortfolioLayout from '@/layouts/portfolio-layout';
import { home } from '@/routes';
import type { ProjectDetailPageProps } from '@/types/pages';
import type { ProjectSection } from '@/types/models';

function Section({
    section,
    index,
}: {
    section: ProjectSection;
    index: number;
}) {
    const { ref, isInView } = useInView();

    return (
        <div
            ref={ref}
            className="pb-12"
            style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? 'translateY(0)' : 'translateY(40px)',
                transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s`,
            }}
        >
            <h2 className="mb-6 border-b border-border pb-4 font-mono-space text-lg font-bold tracking-tight text-foreground">
                {section.title}
            </h2>
            {section.body_html && (
                <div
                    className="prose-portfolio"
                    dangerouslySetInnerHTML={{ __html: section.body_html }}
                />
            )}
        </div>
    );
}

export default function ProjectShow({ project, prevProject, nextProject }: ProjectDetailPageProps) {
    const [headerVisible, setHeaderVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setHeaderVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <PortfolioLayout>
            <Meta title={project.title} description={project.tagline} />

            <div className="pt-12">
                <BackLink href={home.url()} label="Back to projects" />
            </div>

            <section
                className="pb-12 pt-16"
                style={{
                    opacity: headerVisible ? 1 : 0,
                    transform: headerVisible
                        ? 'translateY(0)'
                        : 'translateY(30px)',
                    transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
            >
                <StatusBadge status={project.status} />

                <h1 className="mt-4 font-mono-space text-[clamp(2rem,5vw,3rem)] font-bold tracking-tight text-foreground">
                    {project.title}
                </h1>

                <p className="mt-4 max-w-[640px] font-mono-ibm text-[0.85rem] leading-relaxed text-muted-foreground">
                    {project.tagline}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                    {project.technologies?.map((tech) => (
                        <span
                            key={tech.id}
                            className="rounded-sm border border-border px-[0.6rem] py-1 font-mono-ibm text-[0.65rem] tracking-[0.05em] text-muted-foreground"
                        >
                            {tech.name}
                        </span>
                    ))}
                </div>

                {(project.external_url || project.github_url) && (
                    <div className="mt-6 flex gap-6">
                        {project.external_url && (
                            <a
                                href={project.external_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-mono-ibm text-[0.7rem] uppercase tracking-[0.1em] text-primary transition-colors duration-300 hover:text-primary-hover"
                            >
                                Live Site &rarr;
                            </a>
                        )}
                        {project.github_url && (
                            <a
                                href={project.github_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-mono-ibm text-[0.7rem] uppercase tracking-[0.1em] text-primary transition-colors duration-300 hover:text-primary-hover"
                            >
                                Source Code &rarr;
                            </a>
                        )}
                    </div>
                )}
            </section>

            <section className="pb-16">
                {project.sections
                    ?.sort((a, b) => a.sort_order - b.sort_order)
                    .filter((s) => s.is_visible)
                    .map((section, i) => (
                        <Section
                            key={section.id}
                            section={section}
                            index={i}
                        />
                    ))}
            </section>

            <ProjectNav prev={prevProject} next={nextProject} />

            <div className="pb-16" />
        </PortfolioLayout>
    );
}
