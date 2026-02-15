import type { AdjacentProject } from '@/types/portfolio';

type ProjectNavProps = {
    prev: AdjacentProject | null;
    next: AdjacentProject | null;
};

export function ProjectNav({ prev, next }: ProjectNavProps) {
    return (
        <nav className="mt-16 flex items-start justify-between border-t border-border pt-12">
            <div>
                {prev && (
                    <a href={`/projects/${prev.slug}`} className="group block">
                        <span className="font-mono-ibm text-[0.65rem] uppercase tracking-[0.15em] text-muted-foreground">
                            &larr; Previous
                        </span>
                        <p className="mt-2 font-mono-space text-sm font-bold text-foreground transition-colors duration-300 group-hover:text-primary">
                            {prev.title}
                        </p>
                    </a>
                )}
            </div>
            <div className="text-right">
                {next && (
                    <a href={`/projects/${next.slug}`} className="group block">
                        <span className="font-mono-ibm text-[0.65rem] uppercase tracking-[0.15em] text-muted-foreground">
                            Next &rarr;
                        </span>
                        <p className="mt-2 font-mono-space text-sm font-bold text-foreground transition-colors duration-300 group-hover:text-primary">
                            {next.title}
                        </p>
                    </a>
                )}
            </div>
        </nav>
    );
}
