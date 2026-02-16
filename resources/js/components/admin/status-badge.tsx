import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { PostStatus, ProjectStatus } from '@/types/models';

const STATUS_STYLES: Record<string, string> = {
    production: 'border-green-500/50 text-green-400',
    in_development: 'border-yellow-500/50 text-yellow-400',
    released: 'border-blue-500/50 text-blue-400',
    research: 'border-purple-500/50 text-purple-400',
    archived: 'border-zinc-500/50 text-zinc-400',
    draft: 'border-zinc-500/50 text-zinc-400',
    published: 'border-green-500/50 text-green-400',
};

const STATUS_LABELS: Record<string, string> = {
    in_development: 'In Dev',
};

export function StatusBadge({
    status,
    className,
}: {
    status: ProjectStatus | PostStatus;
    className?: string;
}) {
    return (
        <Badge
            variant="outline"
            className={cn(
                'font-mono-ibm text-[0.6rem] uppercase tracking-[0.15em]',
                STATUS_STYLES[status],
                className,
            )}
        >
            {STATUS_LABELS[status] ?? status.replace('_', ' ')}
        </Badge>
    );
}
