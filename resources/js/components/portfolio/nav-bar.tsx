const NAV_LINKS = ['Projects', 'Blog', 'About'];

export function NavBar() {
    return (
        <nav className="flex items-center justify-between border-b border-border py-8">
            <span className="font-mono-space text-xs uppercase tracking-[0.15em] text-muted-foreground">
                Portfolio / 2026
            </span>
            <div className="flex items-center gap-6">
                {NAV_LINKS.map((link) => (
                    <a
                        key={link}
                        href={`#${link.toLowerCase()}`}
                        className="font-mono-ibm text-[0.65rem] uppercase tracking-[0.1em] text-muted-foreground transition-colors duration-300 hover:text-primary"
                    >
                        {link}
                    </a>
                ))}
            </div>
        </nav>
    );
}
