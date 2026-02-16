import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { useInView } from '@/hooks/use-in-view';
import PortfolioLayout from '@/layouts/portfolio-layout';
import type { ContactPageProps } from '@/types/pages';

type ContactLinkItem = {
    label: string;
    href: string;
    value: string;
};

function ContactLink({ link, index: i }: { link: ContactLinkItem; index: number }) {
    const { ref, isInView } = useInView();

    return (
        <a
            ref={ref}
            href={link.href}
            target={link.href.startsWith('mailto:') ? undefined : '_blank'}
            rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
            className="group block border-b border-border py-8 transition-colors duration-300"
            style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.1}s`,
            }}
        >
            <span className="font-mono-ibm text-[0.65rem] uppercase tracking-[0.15em] text-muted-foreground">
                {link.label}
            </span>
            <p className="mt-2 font-mono-space text-lg font-bold text-foreground transition-colors duration-300 group-hover:text-primary">
                {link.value}
                <span className="ml-2 inline-block opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    &rarr;
                </span>
            </p>
        </a>
    );
}

export default function Contact({ settings }: ContactPageProps) {
    const [heroVisible, setHeroVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setHeroVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const links: ContactLinkItem[] = [];
    if (settings.email) {
        links.push({ label: 'Email', href: `mailto:${settings.email}`, value: settings.email });
    }
    if (settings.github_url) {
        links.push({ label: 'GitHub', href: settings.github_url, value: 'github.com' });
    }
    if (settings.linkedin_url) {
        links.push({ label: 'LinkedIn', href: settings.linkedin_url, value: 'linkedin.com' });
    }
    if (settings.twitter_url) {
        links.push({ label: 'X / Twitter', href: settings.twitter_url, value: 'x.com' });
    }
    if (settings.resume_url) {
        links.push({ label: 'Resume', href: settings.resume_url, value: 'Download PDF' });
    }

    return (
        <PortfolioLayout>
            <Head title="Contact — Portfolio" />

            <section className="pb-12 pt-24">
                <div
                    style={{
                        opacity: heroVisible ? 1 : 0,
                        transform: heroVisible ? 'translateY(0)' : 'translateY(30px)',
                        transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                >
                    <p className="mb-6 font-mono-ibm text-[0.7rem] uppercase tracking-[0.2em] text-primary">
                        Get in Touch
                    </p>
                    <h1 className="font-mono-space text-[clamp(2rem,5vw,3rem)] font-bold tracking-tight text-foreground">
                        Let&apos;s Connect
                    </h1>
                </div>
            </section>

            <section className="pb-24">
                {links.length > 0 ? (
                    links.map((link, i) => (
                        <ContactLink key={link.label} link={link} index={i} />
                    ))
                ) : (
                    <div className="py-16 text-center">
                        <p className="font-mono-ibm text-[0.85rem] text-muted-foreground">
                            No contact links configured yet.
                        </p>
                    </div>
                )}
            </section>
        </PortfolioLayout>
    );
}
