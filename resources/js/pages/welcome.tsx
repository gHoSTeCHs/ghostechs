import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { ProjectCard } from '@/components/portfolio/project-card';
import { SocialLink } from '@/components/portfolio/social-link';
import { Meta } from '@/components/seo/meta';
import PortfolioLayout from '@/layouts/portfolio-layout';
import { show as blogShow } from '@/routes/blog';
import type { HomePageProps } from '@/types/pages';

export default function Welcome({ projects, featuredPosts, settings }: HomePageProps) {
    const [heroVisible, setHeroVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setHeroVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const socialLinks: { label: string; href: string }[] = [];
    if (settings.github_url) {
        socialLinks.push({ label: 'GitHub', href: settings.github_url });
    }
    if (settings.linkedin_url) {
        socialLinks.push({ label: 'LinkedIn', href: settings.linkedin_url });
    }
    if (settings.email) {
        socialLinks.push({ label: 'Email', href: `mailto:${settings.email}` });
    }
    if (settings.twitter_url) {
        socialLinks.push({ label: 'X / Twitter', href: settings.twitter_url });
    }

    return (
        <PortfolioLayout>
            <Meta title="Full-Stack Developer" description="Building robust, scalable web applications with Laravel, React, and TypeScript." />

            <section className="pb-16 pt-24">
                <div
                    style={{
                        opacity: heroVisible ? 1 : 0,
                        transform: heroVisible
                            ? 'translateY(0)'
                            : 'translateY(30px)',
                        transition:
                            'all 1s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                >
                    <p className="mb-6 font-mono-ibm text-[0.7rem] uppercase tracking-[0.2em] text-primary">
                        Full-Stack Developer
                    </p>
                    <h1 className="mb-6 font-mono-space text-[clamp(2.5rem,6vw,4rem)] font-bold leading-[1.1] tracking-[-0.03em] text-foreground">
                        Somadina
                    </h1>
                    <p className="max-w-[500px] font-mono-ibm text-[0.85rem] leading-[1.8] text-muted-foreground">
                        {settings.hero_text ??
                            'Building robust, scalable web applications with Laravel, React, and TypeScript. Focused on solving real problems across fintech, logistics, and education.'}
                    </p>
                </div>

                <div
                    className="mt-12 flex gap-8"
                    style={{
                        opacity: heroVisible ? 1 : 0,
                        transform: heroVisible
                            ? 'translateY(0)'
                            : 'translateY(20px)',
                        transition:
                            'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
                    }}
                >
                    {socialLinks.map((link) => (
                        <SocialLink key={link.label} label={link.label} href={link.href} />
                    ))}
                </div>
            </section>

            <section id="projects" className="pb-24 pt-8">
                <p className="mb-8 font-mono-ibm text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground">
                    Selected Projects
                </p>
                {projects.map((project, i) => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                        index={i}
                    />
                ))}
            </section>

            {featuredPosts.length > 0 && (
                <section className="pb-24 pt-8">
                    <p className="mb-8 font-mono-ibm text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground">
                        Recent Writing
                    </p>
                    <div className="space-y-8">
                        {featuredPosts.map((post) => (
                            <Link
                                key={post.id}
                                href={blogShow.url(post.slug)}
                                className="group block border-b border-border pb-8"
                            >
                                <h3 className="font-mono-space text-lg font-bold tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary">
                                    {post.title}
                                </h3>
                                {post.excerpt && (
                                    <p className="mt-2 max-w-[640px] font-mono-ibm text-[0.85rem] leading-[1.7] text-muted-foreground">
                                        {post.excerpt}
                                    </p>
                                )}
                                <div className="mt-3 flex items-center gap-4">
                                    {post.published_at && (
                                        <span className="font-mono-ibm text-[0.65rem] uppercase tracking-[0.1em] text-muted-foreground">
                                            {new Date(post.published_at).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                            })}
                                        </span>
                                    )}
                                    {post.reading_time_minutes && (
                                        <span className="font-mono-ibm text-[0.65rem] uppercase tracking-[0.1em] text-muted-foreground">
                                            {post.reading_time_minutes} min read
                                        </span>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}
        </PortfolioLayout>
    );
}
