import { Link } from '@inertiajs/react';
import { show } from '@/routes/projects';
import type { Project } from '@/types/models';

type ProjectNavProps = {
    prev: Pick<Project, 'slug' | 'title'> | null;
    next: Pick<Project, 'slug' | 'title'> | null;
};

export function ProjectNav({ prev, next }: ProjectNavProps) {
    return (
        <nav className="mt-16 flex items-start justify-between border-t border-border pt-12">
            <div>
                {prev && (
                    <Link href={show.url(prev.slug)} className="group block">
                        <span className="font-mono-ibm text-[0.65rem] uppercase tracking-[0.15em] text-muted-foreground">
                            &larr; Previous
                        </span>
                        <p className="mt-2 font-mono-space text-sm font-bold text-foreground transition-colors duration-300 group-hover:text-primary">
                            {prev.title}
                        </p>
                    </Link>
                )}
            </div>
            <div className="text-right">
                {next && (
                    <Link href={show.url(next.slug)} className="group block">
                        <span className="font-mono-ibm text-[0.65rem] uppercase tracking-[0.15em] text-muted-foreground">
                            Next &rarr;
                        </span>
                        <p className="mt-2 font-mono-space text-sm font-bold text-foreground transition-colors duration-300 group-hover:text-primary">
                            {next.title}
                        </p>
                    </Link>
                )}
            </div>
        </nav>
    );
}
