import { Head, Link } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { dashboard } from '@/routes/admin';
import { edit as postsEdit } from '@/routes/admin/posts';
import { edit as projectsEdit } from '@/routes/admin/projects';
import type { AdminDashboardProps } from '@/types/admin';

function timeAgo(dateString: string): string {
    const seconds = Math.floor(
        (Date.now() - new Date(dateString).getTime()) / 1000,
    );

    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 2592000) return `${Math.floor(seconds / 86400)}d ago`;
    return `${Math.floor(seconds / 2592000)}mo ago`;
}

const STAT_LABELS: { key: keyof AdminDashboardProps['counts']; label: string }[] = [
    { key: 'projects', label: 'Projects' },
    { key: 'posts', label: 'Posts' },
    { key: 'tags', label: 'Tags' },
    { key: 'technologies', label: 'Technologies' },
    { key: 'pages', label: 'Pages' },
];

const breadcrumbs = [{ title: 'Dashboard', href: dashboard.url() }];

export default function AdminDashboard({ counts, recentItems }: AdminDashboardProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setMounted(true), 50);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <Head title="Dashboard" />

            <div className="pt-6 px-6">
                <h1 className="font-mono-space text-xl font-bold text-portfolio-text">
                    Dashboard
                </h1>
                <p className="mt-1 font-mono-ibm text-[0.75rem] text-portfolio-text-secondary">
                    Overview of your portfolio
                </p>
            </div>

            <div className="mt-8 px-6">
                <div className="grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-portfolio-border bg-portfolio-border md:grid-cols-3 lg:grid-cols-5">
                    {STAT_LABELS.map((stat, i) => (
                        <div
                            key={stat.key}
                            className="bg-portfolio-bg p-5"
                            style={{
                                opacity: mounted ? 1 : 0,
                                transform: mounted
                                    ? 'translateY(0)'
                                    : 'translateY(10px)',
                                transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${i * 80}ms`,
                            }}
                        >
                            <span className="font-mono-ibm text-[0.65rem] uppercase tracking-[0.15em] text-portfolio-text-secondary">
                                {stat.label}
                            </span>
                            <p className="mt-2 font-mono-space text-[2rem] font-bold leading-none text-portfolio-text">
                                {counts[stat.key]}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-12 px-6 pb-8">
                <p className="mb-6 font-mono-ibm text-[0.7rem] uppercase tracking-[0.2em] text-portfolio-text-secondary">
                    Recent Activity
                </p>

                {recentItems.length === 0 ? (
                    <p className="font-mono-ibm text-[0.8rem] text-portfolio-text-secondary">
                        No recent activity
                    </p>
                ) : (
                    <div>
                        {recentItems.map((item, i) => (
                            <Link
                                key={`${item.type}-${item.id}`}
                                href={
                                    item.type === 'project'
                                        ? projectsEdit.url(item.id)
                                        : postsEdit.url(item.id)
                                }
                                className="-mx-2 flex items-center justify-between rounded-sm border-b border-portfolio-border px-2 py-4 transition-colors duration-200 hover:bg-portfolio-bg-subtle"
                                style={{
                                    opacity: mounted ? 1 : 0,
                                    transform: mounted
                                        ? 'translateY(0)'
                                        : 'translateY(8px)',
                                    transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${400 + i * 60}ms`,
                                }}
                            >
                                <div className="flex items-center">
                                    <span className="mr-3 inline-flex rounded-sm border border-portfolio-border px-2 py-0.5 font-mono-ibm text-[0.6rem] uppercase tracking-[0.15em] text-portfolio-text-secondary">
                                        {item.type}
                                    </span>
                                    <span className="font-mono-space text-sm font-bold text-portfolio-text">
                                        {item.title}
                                    </span>
                                </div>
                                <span className="font-mono-ibm text-[0.7rem] text-portfolio-text-secondary">
                                    {timeAgo(item.updated_at)}
                                </span>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

AdminDashboard.layout = (page: ReactNode) => (
    <AppSidebarLayout breadcrumbs={breadcrumbs}>{page}</AppSidebarLayout>
);
