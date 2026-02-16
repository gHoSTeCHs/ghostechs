type SocialLinkProps = {
    label: string;
    href: string;
};

export function SocialLink({ label, href }: SocialLinkProps) {
    const isEmail = href.startsWith('mailto:');

    return (
        <a
            href={href}
            target={isEmail ? undefined : '_blank'}
            rel={isEmail ? undefined : 'noopener noreferrer'}
            className="border-b border-transparent pb-0.5 font-mono-ibm text-[0.7rem] uppercase tracking-[0.1em] text-muted-foreground transition-all duration-300 hover:border-primary hover:text-primary"
        >
            {label}
        </a>
    );
}
