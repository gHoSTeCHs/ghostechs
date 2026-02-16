import { Head, router } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { ConfirmDialog } from '@/components/admin/confirm-dialog';
import { Input } from '@/components/ui/input';
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
import { index, store, destroy } from '@/routes/admin/tags';
import type { AdminTagIndexProps } from '@/types/admin';
import type { Tag } from '@/types/models';

const breadcrumbs = [
    { title: 'Dashboard', href: dashboard.url() },
    { title: 'Tags', href: index.url() },
];

export default function AdminTagsIndex({ tags }: AdminTagIndexProps) {
    const [deleteTarget, setDeleteTarget] = useState<(Tag & { posts_count: number }) | null>(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
    });

    function handleCreate(e: React.FormEvent) {
        e.preventDefault();
        post(store.url(), {
            onSuccess: () => reset(),
        });
    }

    function handleDelete() {
        if (!deleteTarget) return;
        router.delete(destroy.url(deleteTarget.id), {
            preserveScroll: true,
        });
    }

    return (
        <>
            <Head title="Tags" />

            <div className="px-6 pt-6">
                <h1 className="font-mono-space text-xl font-bold text-portfolio-text">
                    Tags
                </h1>
                <p className="mt-1 font-mono-ibm text-[0.75rem] text-portfolio-text-secondary">
                    Organize your blog posts with tags
                </p>
            </div>

            <div className="mt-8 max-w-2xl px-6">
                <form onSubmit={handleCreate} className="flex items-end gap-3">
                    <div className="flex-1">
                        <label className="mb-2 block font-mono-ibm text-[0.7rem] uppercase tracking-[0.15em] text-portfolio-text-secondary">
                            New Tag
                        </label>
                        <Input
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="Tag name..."
                            className="border-portfolio-border bg-portfolio-bg font-mono-ibm text-[0.85rem] text-portfolio-text"
                        />
                        {errors.name && (
                            <p className="mt-1 font-mono-ibm text-[0.75rem] text-red-400">
                                {errors.name}
                            </p>
                        )}
                    </div>
                    <button
                        type="submit"
                        disabled={processing || !data.name.trim()}
                        className="inline-flex h-9 items-center gap-2 rounded-sm border border-portfolio-accent/30 bg-portfolio-accent/10 px-4 font-mono-ibm text-[0.8rem] text-portfolio-accent transition-colors hover:bg-portfolio-accent/20 disabled:opacity-50"
                    >
                        <Plus className="size-4" />
                        Add
                    </button>
                </form>
            </div>

            <div className="mt-8 px-6 pb-8">
                {tags.length === 0 ? (
                    <div className="rounded-sm border border-portfolio-border p-12 text-center">
                        <p className="font-mono-ibm text-[0.85rem] text-portfolio-text-secondary">
                            No tags yet — create one above
                        </p>
                    </div>
                ) : (
                    <div className="overflow-hidden rounded-sm border border-portfolio-border">
                        <Table>
                            <TableHeader>
                                <TableRow className="border-portfolio-border hover:bg-transparent">
                                    <TableHead className="font-mono-ibm text-[0.65rem] uppercase tracking-[0.15em] text-portfolio-text-secondary">
                                        Name
                                    </TableHead>
                                    <TableHead className="font-mono-ibm text-[0.65rem] uppercase tracking-[0.15em] text-portfolio-text-secondary">
                                        Posts
                                    </TableHead>
                                    <TableHead className="font-mono-ibm text-[0.65rem] uppercase tracking-[0.15em] text-portfolio-text-secondary">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {tags.map((tag) => (
                                    <TableRow
                                        key={tag.id}
                                        className="border-portfolio-border hover:bg-portfolio-bg-subtle"
                                    >
                                        <TableCell className="font-mono-space text-sm font-bold text-portfolio-text">
                                            {tag.name}
                                        </TableCell>
                                        <TableCell className="font-mono-ibm text-[0.8rem] text-portfolio-text-secondary">
                                            {tag.posts_count}
                                        </TableCell>
                                        <TableCell>
                                            <button
                                                type="button"
                                                onClick={() => setDeleteTarget(tag)}
                                                className="font-mono-ibm text-[0.75rem] text-portfolio-text-secondary hover:text-red-400 transition-colors"
                                            >
                                                Delete
                                            </button>
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
                title="Delete Tag"
                description={`Are you sure you want to delete "${deleteTarget?.name}"? It will be removed from all posts.`}
                destructive
            />
        </>
    );
}

AdminTagsIndex.layout = (page: ReactNode) => (
    <AppSidebarLayout breadcrumbs={breadcrumbs}>{page}</AppSidebarLayout>
);
