import { Link, usePage } from '@inertiajs/react';
import { home } from '@/routes';
import { index } from '@/routes/blog';
import { about, contact } from '@/routes';

const NAV_LINKS = [
    { label: 'Projects', href: home.url() + '#projects' },
    { label: 'Blog', href: index.url() },
    { label: 'About', href: about.url() },
    { label: 'Contact', href: contact.url() },
];

export function NavBar() {
    const { url } = usePage();

    return (
        <nav className="flex items-center justify-between border-b border-border py-8">
            <Link
                href={home.url()}
                className="font-mono-space text-xs uppercase tracking-[0.15em] text-muted-foreground transition-colors duration-300 hover:text-primary"
            >
                Portfolio / 2026
            </Link>
            <div className="flex items-center gap-6">
                {NAV_LINKS.map((link) => {
                    const isActive =
                        link.href === '/' + '#projects'
                            ? url === '/'
                            : url.startsWith(link.href.split('#')[0]);

                    return (
                        <Link
                            key={link.label}
                            href={link.href}
                            className={`font-mono-ibm text-[0.65rem] uppercase tracking-[0.1em] transition-colors duration-300 hover:text-primary ${
                                isActive
                                    ? 'text-primary'
                                    : 'text-muted-foreground'
                            }`}
                        >
                            {link.label}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
