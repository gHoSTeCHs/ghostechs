type BackLinkProps = {
    href: string;
    label: string;
};

export function BackLink({ href, label }: BackLinkProps) {
    return (
        <a
            href={href}
            className="font-mono-ibm text-[0.75rem] uppercase tracking-[0.1em] text-muted-foreground transition-colors duration-300 hover:text-primary"
        >
            &larr; {label}
        </a>
    );
}
