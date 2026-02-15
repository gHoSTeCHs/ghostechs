import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { BackLink } from '@/components/portfolio/back-link';
import { ProjectNav } from '@/components/portfolio/project-nav';
import { StatusBadge } from '@/components/portfolio/status-badge';
import { useInView } from '@/hooks/use-in-view';
import PortfolioLayout from '@/layouts/portfolio-layout';
import type {
    AdjacentProject,
    ProjectDetail,
    ProjectSection,
} from '@/types/portfolio';

const MOCK_PROJECT: ProjectDetail = {
    id: 1,
    slug: 'shelfwiser',
    title: 'ShelfWiser',
    tagline:
        'Multi-tenant inventory management platform with batch/expiry tracking, multi-location inventory, and role-based access control.',
    description: '',
    status: 'production',
    external_url: 'https://shelfwiser.com',
    github_url: 'https://github.com/somadina/shelfwiser',
    technologies: [
        { id: 1, name: 'Laravel', slug: 'laravel', category: 'framework' },
        { id: 2, name: 'React', slug: 'react', category: 'framework' },
        {
            id: 3,
            name: 'TypeScript',
            slug: 'typescript',
            category: 'language',
        },
        {
            id: 4,
            name: 'PostgreSQL',
            slug: 'postgresql',
            category: 'database',
        },
        {
            id: 5,
            name: 'Tailwind CSS',
            slug: 'tailwind-css',
            category: 'framework',
        },
    ],
    sections: [
        {
            id: 1,
            type: 'overview',
            title: 'Overview',
            sort_order: 1,
            body_html:
                '<p>ShelfWiser is a comprehensive multi-tenant inventory management system built for businesses that need to track products across multiple locations with batch and expiry date awareness.</p><p>The platform handles everything from purchase orders to stock transfers, with real-time inventory levels and automated low-stock alerts.</p>',
        },
        {
            id: 2,
            type: 'architecture',
            title: 'Architecture',
            sort_order: 2,
            body_html:
                '<h2>System Design</h2><p>The application follows a service-oriented architecture within a Laravel monolith, with clear boundaries between tenant contexts.</p><ul><li>Multi-tenant data isolation using database scoping</li><li>Event-driven inventory updates via Laravel queues</li><li>Real-time dashboard powered by WebSocket broadcasts</li></ul><p>Each tenant gets isolated data while sharing the same application infrastructure, keeping operational costs low.</p>',
        },
        {
            id: 3,
            type: 'lessons',
            title: 'Lessons Learned',
            sort_order: 3,
            body_html:
                '<p>Building a multi-tenant system taught several key lessons about data isolation, performance optimization, and the importance of comprehensive testing at the boundary between tenants.</p><blockquote>The hardest bugs to catch are the ones that only manifest when tenant contexts bleed into each other.</blockquote><p>We implemented strict query scoping through model traits and middleware to prevent cross-tenant data leakage.</p>',
        },
    ],
};

const MOCK_PREV: AdjacentProject = { slug: 'verivote', title: 'VeriVote' };
const MOCK_NEXT: AdjacentProject = { slug: 'taxpadi', title: 'TaxPadi' };

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
            <div
                className="prose-portfolio"
                dangerouslySetInnerHTML={{ __html: section.body_html }}
            />
        </div>
    );
}

export default function ProjectShow() {
    const project = MOCK_PROJECT;
    const prevProject = MOCK_PREV;
    const nextProject = MOCK_NEXT;

    const [headerVisible, setHeaderVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setHeaderVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <PortfolioLayout>
            <Head title={`${project.title} — Portfolio`} />

            <div className="pt-12">
                <BackLink href="/" label="Back to projects" />
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
                    {project.technologies.map((tech) => (
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
                    .sort((a, b) => a.sort_order - b.sort_order)
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
