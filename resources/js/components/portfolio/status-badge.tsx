import type { ProjectStatus } from '@/types/models';

const STATUS_LABELS: Record<ProjectStatus, string> = {
    production: 'Production',
    in_development: 'In Development',
    released: 'Released',
    research: 'Research',
    archived: 'Archived',
};

type StatusBadgeProps = {
    status: ProjectStatus;
};

export function StatusBadge({ status }: StatusBadgeProps) {
    return (
        <span className="inline-flex rounded-sm border border-primary/30 px-3 py-1 font-mono-ibm text-[0.65rem] uppercase tracking-[0.1em] text-primary">
            {STATUS_LABELS[status]}
        </span>
    );
}
