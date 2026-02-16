import { Head, Link, router } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { ConfirmDialog } from '@/components/admin/confirm-dialog';
import { StatusBadge } from '@/components/admin/status-badge';
import { Switch } from '@/components/ui/switch';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { dashboard } from '@/routes/admin';
import {
    index,
    create,
    edit,
    update,
    destroy,
} from '@/routes/admin/posts';
import type { AdminPostIndexProps } from '@/types/admin';
import type { Post } from '@/types/models';

const breadcrumbs = [
    { title: 'Dashboard', href: dashboard.url() },
    { title: 'Posts', href: index.url() },
];

function formatDate(dateString: string | null): string {
    if (!dateString) return '—';
    return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
}

export default function AdminPostsIndex({ posts }: AdminPostIndexProps) {
    const [deleteTarget, setDeleteTarget] = useState<Post | null>(null);

    function handleToggleFeatured(post: Post) {
        router.put(
            update.url(post.id),
            { is_featured: !post.is_featured },
            { preserveScroll: true },
        );
    }

    function handleDelete() {
        if (!deleteTarget) return;
        router.delete(destroy.url(deleteTarget.id), {
            preserveScroll: true,
        });
    }

    return (
        <>
            <Head title="Posts" />

            <div className="flex items-center justify-between px-6 pt-6">
                <div>
                    <h1 className="font-mono-space text-xl font-bold text-portfolio-text">
                        Posts
                    </h1>
                    <p className="mt-1 font-mono-ibm text-[0.75rem] text-portfolio-text-secondary">
                        Manage your blog posts
                    </p>
                </div>
                <Link
                    href={create.url()}
                    className="inline-flex items-center gap-2 rounded-sm border border-portfolio-accent/30 bg-portfolio-accent/10 px-4 py-2 font-mono-ibm text-[0.8rem] text-portfolio-accent transition-colors hover:bg-portfolio-accent/20"
                >
                    <Plus className="size-4" />
                    New Post
                </Link>
            </div>

            <div className="mt-8 px-6 pb-8">
                {posts.length === 0 ? (
                    <div className="rounded-sm border border-portfolio-border p-12 text-center">
                        <p className="font-mono-ibm text-[0.85rem] text-portfolio-text-secondary">
                            No posts yet
                        </p>
                        <Link
                            href={create.url()}
                            className="mt-3 inline-block font-mono-ibm text-[0.8rem] text-portfolio-accent hover:text-portfolio-accent-hover transition-colors"
                        >
                            Write your first post
                        </Link>
                    </div>
                ) : (
                    <div className="overflow-hidden rounded-sm border border-portfolio-border">
                        <Table>
                            <TableHeader>
                                <TableRow className="border-portfolio-border hover:bg-transparent">
                                    <TableHead className="font-mono-ibm text-[0.65rem] uppercase tracking-[0.15em] text-portfolio-text-secondary">
                                        Title
                                    </TableHead>
                                    <TableHead className="font-mono-ibm text-[0.65rem] uppercase tracking-[0.15em] text-portfolio-text-secondary">
                                        Status
                                    </TableHead>
                                    <TableHead className="font-mono-ibm text-[0.65rem] uppercase tracking-[0.15em] text-portfolio-text-secondary">
                                        Featured
                                    </TableHead>
                                    <TableHead className="font-mono-ibm text-[0.65rem] uppercase tracking-[0.15em] text-portfolio-text-secondary">
                                        Published
                                    </TableHead>
                                    <TableHead className="font-mono-ibm text-[0.65rem] uppercase tracking-[0.15em] text-portfolio-text-secondary">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {posts.map((post) => (
                                    <TableRow
                                        key={post.id}
                                        className="border-portfolio-border hover:bg-portfolio-bg-subtle"
                                    >
                                        <TableCell>
                                            <Link
                                                href={edit.url(post.id)}
                                                className="font-mono-space text-sm font-bold text-portfolio-text hover:text-portfolio-accent transition-colors"
                                            >
                                                {post.title}
                                            </Link>
                                        </TableCell>
                                        <TableCell>
                                            <StatusBadge status={post.status} />
                                        </TableCell>
                                        <TableCell>
                                            <Switch
                                                size="sm"
                                                checked={post.is_featured}
                                                onCheckedChange={() => handleToggleFeatured(post)}
                                            />
                                        </TableCell>
                                        <TableCell className="font-mono-ibm text-[0.75rem] text-portfolio-text-secondary">
                                            {formatDate(post.published_at)}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Link
                                                    href={edit.url(post.id)}
                                                    className="font-mono-ibm text-[0.75rem] text-portfolio-text-secondary hover:text-portfolio-accent transition-colors"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    type="button"
                                                    onClick={() => setDeleteTarget(post)}
                                                    className="font-mono-ibm text-[0.75rem] text-portfolio-text-secondary hover:text-red-400 transition-colors"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </div>

            <ConfirmDialog
                open={deleteTarget !== null}
                onOpenChange={(open) => !open && setDeleteTarget(null)}
                onConfirm={handleDelete}
                title="Delete Post"
                description={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
                destructive
            />
        </>
    );
}

AdminPostsIndex.layout = (page: ReactNode) => (
    <AppSidebarLayout breadcrumbs={breadcrumbs}>{page}</AppSidebarLayout>
);
