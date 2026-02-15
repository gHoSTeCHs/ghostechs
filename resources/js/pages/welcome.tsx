import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { ProjectCard } from '@/components/portfolio/project-card';
import { SocialLink } from '@/components/portfolio/social-link';
import PortfolioLayout from '@/layouts/portfolio-layout';
import type { Project, SocialLink as SocialLinkType } from '@/types/portfolio';

const PROJECTS: Project[] = [
    {
        name: 'ShelfWiser',
        tag: 'SaaS · Production',
        description:
            'Multi-tenant inventory management platform with batch/expiry tracking, multi-location inventory, and role-based access control.',
        stack: ['Laravel', 'React', 'TypeScript', 'PostgreSQL', 'Tailwind CSS'],
    },
    {
        name: 'TaxPadi',
        tag: 'Fintech · In Development',
        description:
            'Nigerian tax compliance platform with receipt parsing, mini-POS integration, and automatic tax calculations.',
        stack: ['Laravel', 'React', 'TypeScript', 'Tailwind CSS'],
    },
    {
        name: 'BatchDeliver',
        tag: 'Logistics · In Development',
        description:
            'Delivery-as-a-service platform with zone-aware batch optimization designed for Nigerian markets.',
        stack: ['Laravel', 'React', 'TypeScript', 'PostgreSQL'],
    },
    {
        name: 'ConceptFlow',
        tag: 'EdTech · In Development',
        description:
            'Interactive educational platform for programming concepts with visual learning and content authoring systems.',
        stack: ['React', 'TypeScript', 'Tailwind CSS'],
    },
    {
        name: 'MockPrep',
        tag: 'Open Source',
        description:
            'Interview preparation platform combining DSA practice with AI-powered mock interviews.',
        stack: ['Laravel', 'React', 'TypeScript'],
    },
    {
        name: 'VeriVote',
        tag: 'Security · Research',
        description:
            'Election security system exploring Android security development and cross-platform verification mechanisms.',
        stack: ['Android', 'Kotlin', 'Security'],
    },
];

const SOCIAL_LINKS: SocialLinkType[] = [
    { label: 'GitHub', href: 'https://github.com', icon: 'github' },
    { label: 'LinkedIn', href: 'https://linkedin.com', icon: 'linkedin' },
    { label: 'Email', href: 'mailto:hello@example.com', icon: 'email' },
];

export default function Welcome() {
    const [heroVisible, setHeroVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setHeroVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <PortfolioLayout>
            <Head title="Somadina — Full-Stack Developer" />

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
                        Building robust, scalable web applications with Laravel,
                        React, and TypeScript. Focused on solving real problems
                        across fintech, logistics, and education.
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
                    {SOCIAL_LINKS.map((link) => (
                        <SocialLink key={link.label} link={link} />
                    ))}
                </div>
            </section>

            <section id="projects" className="pb-24 pt-8">
                <p className="mb-8 font-mono-ibm text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground">
                    Selected Projects
                </p>
                {PROJECTS.map((project, i) => (
                    <ProjectCard
                        key={project.name}
                        project={project}
                        index={i}
                    />
                ))}
            </section>
        </PortfolioLayout>
    );
}
