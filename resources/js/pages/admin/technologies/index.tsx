import { Head, router } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import { Check, Pencil, Plus, X } from 'lucide-react';
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
import { index, store, update, destroy } from '@/routes/admin/technologies';
import type { AdminTechnologyIndexProps } from '@/types/admin';
import type { Technology } from '@/types/models';

const breadcrumbs = [
    { title: 'Dashboard', href: dashboard.url() },
    { title: 'Technologies', href: index.url() },
];

export default function AdminTechnologiesIndex({ technologies }: AdminTechnologyIndexProps) {
    const [deleteTarget, setDeleteTarget] = useState<(Technology & { projects_count: number }) | null>(null);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editName, setEditName] = useState('');
    const [editCategory, setEditCategory] = useState('');

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        category: '',
    });

    function handleCreate(e: React.FormEvent) {
        e.preventDefault();
        post(store.url(), {
            onSuccess: () => reset(),
        });
    }

    function handleStartEdit(tech: Technology & { projects_count: number }) {
        setEditingId(tech.id);
        setEditName(tech.name);
        setEditCategory(tech.category ?? '');
    }

    function handleCancelEdit() {
        setEditingId(null);
        setEditName('');
        setEditCategory('');
    }

    function handleSaveEdit() {
        if (!editingId) return;
        router.put(
            update.url(editingId),
            { name: editName, category: editCategory || null },
            {
                preserveScroll: true,
                onSuccess: () => handleCancelEdit(),
            },
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
            <Head title="Technologies" />

            <div className="px-6 pt-6">
                <h1 className="font-mono-space text-xl font-bold text-portfolio-text">
                    Technologies
                </h1>
                <p className="mt-1 font-mono-ibm text-[0.75rem] text-portfolio-text-secondary">
                    Manage technologies used across projects
                </p>
            </div>

            <div className="mt-8 max-w-2xl px-6">
                <form onSubmit={handleCreate} className="flex items-end gap-3">
                    <div className="flex-1">
                        <label className="mb-2 block font-mono-ibm text-[0.7rem] uppercase tracking-[0.15em] text-portfolio-text-secondary">
                            Name
                        </label>
                        <Input
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="Technology name..."
                            className="border-portfolio-border bg-portfolio-bg font-mono-ibm text-[0.85rem] text-portfolio-text"
                        />
                        {errors.name && (
                            <p className="mt-1 font-mono-ibm text-[0.75rem] text-red-400">
                                {errors.name}
                            </p>
                        )}
                    </div>
                    <div className="flex-1">
                        <label className="mb-2 block font-mono-ibm text-[0.7rem] uppercase tracking-[0.15em] text-portfolio-text-secondary">
                            Category
                        </label>
                        <Input
                            value={data.category}
                            onChange={(e) => setData('category', e.target.value)}
                            placeholder="Optional..."
                            className="border-portfolio-border bg-portfolio-bg font-mono-ibm text-[0.85rem] text-portfolio-text"
                        />
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
                {technologies.length === 0 ? (
                    <div className="rounded-sm border border-portfolio-border p-12 text-center">
                        <p className="font-mono-ibm text-[0.85rem] text-portfolio-text-secondary">
                            No technologies yet — create one above
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
                                        Category
                                    </TableHead>
                                    <TableHead className="font-mono-ibm text-[0.65rem] uppercase tracking-[0.15em] text-portfolio-text-secondary">
                                        Projects
                                    </TableHead>
                                    <TableHead className="font-mono-ibm text-[0.65rem] uppercase tracking-[0.15em] text-portfolio-text-secondary">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {technologies.map((tech) => (
                                    <TableRow
                                        key={tech.id}
                                        className="border-portfolio-border hover:bg-portfolio-bg-subtle"
                                    >
                                        <TableCell>
                                            {editingId === tech.id ? (
                                                <Input
                                                    value={editName}
                                                    onChange={(e) => setEditName(e.target.value)}
                                                    className="h-7 border-portfolio-border bg-portfolio-bg font-mono-ibm text-[0.85rem] text-portfolio-text"
                                                />
                                            ) : (
                                                <span className="font-mono-space text-sm font-bold text-portfolio-text">
                                                    {tech.name}
                                                </span>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {editingId === tech.id ? (
                                                <Input
                                                    value={editCategory}
                                                    onChange={(e) => setEditCategory(e.target.value)}
                                                    placeholder="Optional..."
                                                    className="h-7 border-portfolio-border bg-portfolio-bg font-mono-ibm text-[0.85rem] text-portfolio-text"
                                                />
                                            ) : (
                                                <span className="font-mono-ibm text-[0.8rem] text-portfolio-text-secondary">
                                                    {tech.category ?? '—'}
                                                </span>
                                            )}
                                        </TableCell>
                                        <TableCell className="font-mono-ibm text-[0.8rem] text-portfolio-text-secondary">
                                            {tech.projects_count}
                                        </TableCell>
                                        <TableCell>
                                            {editingId === tech.id ? (
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={handleSaveEdit}
                                                        className="text-portfolio-accent hover:text-portfolio-accent-hover transition-colors"
                                                    >
                                                        <Check className="size-4" />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={handleCancelEdit}
                                                        className="text-portfolio-text-secondary hover:text-portfolio-text transition-colors"
                                                    >
                                                        <X className="size-4" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-3">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleStartEdit(tech)}
                                                        className="font-mono-ibm text-[0.75rem] text-portfolio-text-secondary hover:text-portfolio-accent transition-colors"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => setDeleteTarget(tech)}
                                                        className="font-mono-ibm text-[0.75rem] text-portfolio-text-secondary hover:text-red-400 transition-colors"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            )}
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
                title="Delete Technology"
                description={`Are you sure you want to delete "${deleteTarget?.name}"? It will be removed from all projects.`}
                destructive
            />
        </>
    );
}

AdminTechnologiesIndex.layout = (page: ReactNode) => (
    <AppSidebarLayout breadcrumbs={breadcrumbs}>{page}</AppSidebarLayout>
);
