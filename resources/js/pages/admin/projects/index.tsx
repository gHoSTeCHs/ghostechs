import { Head, Link, router } from '@inertiajs/react';
import { GripVertical, Plus } from 'lucide-react';
import type { ReactNode } from 'react';
import { useState } from 'react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    type DragEndEvent,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ConfirmDialog } from '@/components/admin/confirm-dialog';
import { StatusBadge } from '@/components/admin/status-badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { dashboard } from '@/routes/admin';
import {
    index,
    create,
    edit,
    update,
    destroy,
    reorder,
} from '@/routes/admin/projects';
import type { AdminProjectIndexProps } from '@/types/admin';
import type { Project } from '@/types/models';

const breadcrumbs = [
    { title: 'Dashboard', href: dashboard.url() },
    { title: 'Projects', href: index.url() },
];

function SortableRow({
    project,
    onDelete,
}: {
    project: Project;
    onDelete: (project: Project) => void;
}) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: project.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    function handleToggle(field: 'is_featured' | 'is_visible') {
        router.put(
            update.url(project.id),
            { [field]: !project[field] },
            { preserveScroll: true },
        );
    }

    return (
        <TableRow
            ref={setNodeRef}
            style={style}
            className="border-portfolio-border hover:bg-portfolio-bg-subtle"
        >
            <TableCell className="w-10">
                <button
                    type="button"
                    className="cursor-grab text-portfolio-text-secondary hover:text-portfolio-text"
                    {...attributes}
                    {...listeners}
                >
                    <GripVertical className="size-4" />
                </button>
            </TableCell>
            <TableCell>
                <Link
                    href={edit.url(project.id)}
                    className="font-mono-space text-sm font-bold text-portfolio-text hover:text-portfolio-accent transition-colors"
                >
                    {project.title}
                </Link>
            </TableCell>
            <TableCell>
                <StatusBadge status={project.status} />
            </TableCell>
            <TableCell>
                <Switch
                    size="sm"
                    checked={project.is_featured}
                    onCheckedChange={() => handleToggle('is_featured')}
                />
            </TableCell>
            <TableCell>
                <Switch
                    size="sm"
                    checked={project.is_visible}
                    onCheckedChange={() => handleToggle('is_visible')}
                />
            </TableCell>
            <TableCell>
                <div className="flex items-center gap-3">
                    <Link
                        href={edit.url(project.id)}
                        className="font-mono-ibm text-[0.75rem] text-portfolio-text-secondary hover:text-portfolio-accent transition-colors"
                    >
                        Edit
                    </Link>
                    <button
                        type="button"
                        onClick={() => onDelete(project)}
                        className="font-mono-ibm text-[0.75rem] text-portfolio-text-secondary hover:text-red-400 transition-colors"
                    >
                        Delete
                    </button>
                </div>
            </TableCell>
        </TableRow>
    );
}

export default function AdminProjectsIndex({ projects: initialProjects }: AdminProjectIndexProps) {
    const [projects, setProjects] = useState(initialProjects);
    const [deleteTarget, setDeleteTarget] = useState<Project | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const oldIndex = projects.findIndex((p) => p.id === active.id);
        const newIndex = projects.findIndex((p) => p.id === over.id);
        const reordered = arrayMove(projects, oldIndex, newIndex);

        setProjects(reordered);
        router.post(
            reorder.url(),
            { ordered_ids: reordered.map((p) => p.id) },
            {
                preserveScroll: true,
                onError: () => setProjects(initialProjects),
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
            <Head title="Projects" />

            <div className="flex items-center justify-between px-6 pt-6">
                <div>
                    <h1 className="font-mono-space text-xl font-bold text-portfolio-text">
                        Projects
                    </h1>
                    <p className="mt-1 font-mono-ibm text-[0.75rem] text-portfolio-text-secondary">
                        Manage your portfolio projects
                    </p>
                </div>
                <Link
                    href={create.url()}
                    className="inline-flex items-center gap-2 rounded-sm border border-portfolio-accent/30 bg-portfolio-accent/10 px-4 py-2 font-mono-ibm text-[0.8rem] text-portfolio-accent transition-colors hover:bg-portfolio-accent/20"
                >
                    <Plus className="size-4" />
                    New Project
                </Link>
            </div>

            <div className="mt-8 px-6 pb-8">
                {projects.length === 0 ? (
                    <div className="rounded-sm border border-portfolio-border p-12 text-center">
                        <p className="font-mono-ibm text-[0.85rem] text-portfolio-text-secondary">
                            No projects yet
                        </p>
                        <Link
                            href={create.url()}
                            className="mt-3 inline-block font-mono-ibm text-[0.8rem] text-portfolio-accent hover:text-portfolio-accent-hover transition-colors"
                        >
                            Create your first project
                        </Link>
                    </div>
                ) : (
                    <div className="overflow-hidden rounded-sm border border-portfolio-border">
                        <Table>
                            <TableHeader>
                                <TableRow className="border-portfolio-border hover:bg-transparent">
                                    <TableHead className="w-10" />
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
                                        Visible
                                    </TableHead>
                                    <TableHead className="font-mono-ibm text-[0.65rem] uppercase tracking-[0.15em] text-portfolio-text-secondary">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <DndContext
                                sensors={sensors}
                                collisionDetection={closestCenter}
                                onDragEnd={handleDragEnd}
                            >
                                <SortableContext
                                    items={projects.map((p) => p.id)}
                                    strategy={verticalListSortingStrategy}
                                >
                                    <TableBody>
                                        {projects.map((project) => (
                                            <SortableRow
                                                key={project.id}
                                                project={project}
                                                onDelete={setDeleteTarget}
                                            />
                                        ))}
                                    </TableBody>
                                </SortableContext>
                            </DndContext>
                        </Table>
                    </div>
                )}
            </div>

            <ConfirmDialog
                open={deleteTarget !== null}
                onOpenChange={(open) => !open && setDeleteTarget(null)}
                onConfirm={handleDelete}
                title="Delete Project"
                description={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
                destructive
            />
        </>
    );
}

AdminProjectsIndex.layout = (page: ReactNode) => (
    <AppSidebarLayout breadcrumbs={breadcrumbs}>{page}</AppSidebarLayout>
);
