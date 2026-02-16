import { useState } from 'react';
import { Link } from '@inertiajs/react';
import { useInView } from '@/hooks/use-in-view';
import { show } from '@/routes/projects';
import type { Project } from '@/types/models';

type ProjectCardProps = {
    project: Project;
    index: number;
};

const STATUS_LABELS: Record<string, string> = {
    production: 'Production',
    in_development: 'In Development',
    released: 'Released',
    research: 'Research',
    archived: 'Archived',
};

export function ProjectCard({ project, index }: ProjectCardProps) {
    const { ref, isInView } = useInView();
    const [hovered, setHovered] = useState(false);

    return (
        <Link
            href={show.url(project.slug)}
            ref={ref}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="block border-b border-border py-10"
            style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? 'translateY(0)' : 'translateY(40px)',
                transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s`,
            }}
        >
            <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="flex flex-wrap items-baseline gap-4">
                    <h3
                        className="font-mono-space text-2xl font-bold tracking-tight text-foreground"
                        style={{
                            transform: hovered
                                ? 'translateX(8px)'
                                : 'translateX(0)',
                            transition:
                                'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                        }}
                    >
                        {project.title}
                    </h3>
                    <span className="font-mono-ibm text-[0.7rem] uppercase tracking-[0.1em] text-primary">
                        {STATUS_LABELS[project.status] ?? project.status}
                    </span>
                </div>
                <div
                    className="mt-[0.7rem] h-2 w-2 shrink-0 rounded-full bg-primary transition-opacity duration-300"
                    style={{ opacity: hovered ? 1 : 0.3 }}
                />
            </div>

            <p className="mt-3 max-w-[640px] font-mono-ibm text-[0.85rem] leading-[1.7] text-muted-foreground">
                {project.tagline}
            </p>

            <div
                className="mt-4 flex flex-wrap gap-2 overflow-hidden"
                style={{
                    maxHeight: hovered ? '60px' : '0',
                    opacity: hovered ? 1 : 0,
                    transition:
                        'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
            >
                {project.technologies?.map((tech) => (
                    <span
                        key={tech.id}
                        className="rounded-sm border border-border px-[0.6rem] py-1 font-mono-ibm text-[0.65rem] tracking-[0.05em] text-muted-foreground"
                    >
                        {tech.name}
                    </span>
                ))}
            </div>
        </Link>
    );
}
