import type { SocialLink as SocialLinkType } from '@/types/portfolio';

type SocialLinkProps = {
    link: SocialLinkType;
};

export function SocialLink({ link }: SocialLinkProps) {
    return (
        <a
            href={link.href}
            target={link.icon === 'email' ? undefined : '_blank'}
            rel={link.icon === 'email' ? undefined : 'noopener noreferrer'}
            className="border-b border-transparent pb-0.5 font-mono-ibm text-[0.7rem] uppercase tracking-[0.1em] text-muted-foreground transition-all duration-300 hover:border-primary hover:text-primary"
        >
            {link.label}
        </a>
    );
}
