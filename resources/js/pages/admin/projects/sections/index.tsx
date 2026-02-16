import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, GripVertical, Plus } from 'lucide-react';
import type { ReactElement } from 'react';
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
import { index as projectsIndex, edit as projectsEdit } from '@/routes/admin/projects';
import { create as sectionsCreate, reorder as sectionsReorder } from '@/routes/admin/projects/sections';
import { edit as sectionEdit, update as sectionUpdate, destroy as sectionDestroy } from '@/routes/admin/sections';
import type { AdminProjectSectionsProps } from '@/types/admin';
import type { ProjectSection } from '@/types/models';

const SECTION_TYPE_STYLES: Record<string, string> = {
    overview: 'border-blue-500/50 text-blue-400',
    mission: 'border-green-500/50 text-green-400',
    problem: 'border-red-500/50 text-red-400',
    solution: 'border-emerald-500/50 text-emerald-400',
    architecture: 'border-purple-500/50 text-purple-400',
    lessons: 'border-yellow-500/50 text-yellow-400',
    roadmap: 'border-cyan-500/50 text-cyan-400',
    custom: 'border-zinc-500/50 text-zinc-400',
};

function SortableSectionRow({
    section,
    onDelete,
}: {
    section: ProjectSection;
    onDelete: (section: ProjectSection) => void;
}) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: section.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    function handleToggleVisible() {
        router.put(
            sectionUpdate.url(section.id),
            { is_visible: !section.is_visible, type: section.type, title: section.title, body: section.body },
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
                <span
                    className={`inline-flex rounded-sm border px-2 py-0.5 font-mono-ibm text-[0.6rem] uppercase tracking-[0.15em] ${SECTION_TYPE_STYLES[section.type] ?? SECTION_TYPE_STYLES.custom}`}
                >
                    {section.type}
                </span>
            </TableCell>
            <TableCell>
                <Link
                    href={sectionEdit.url(section.id)}
                    className="font-mono-space text-sm font-bold text-portfolio-text hover:text-portfolio-accent transition-colors"
                >
                    {section.title}
                </Link>
            </TableCell>
            <TableCell>
                <Switch
                    size="sm"
                    checked={section.is_visible}
                    onCheckedChange={handleToggleVisible}
                />
            </TableCell>
            <TableCell>
                <div className="flex items-center gap-3">
                    <Link
                        href={sectionEdit.url(section.id)}
                        className="font-mono-ibm text-[0.75rem] text-portfolio-text-secondary hover:text-portfolio-accent transition-colors"
                    >
                        Edit
                    </Link>
                    <button
                        type="button"
                        onClick={() => onDelete(section)}
                        className="font-mono-ibm text-[0.75rem] text-portfolio-text-secondary hover:text-red-400 transition-colors"
                    >
                        Delete
                    </button>
                </div>
            </TableCell>
        </TableRow>
    );
}

export default function AdminProjectSectionsIndex({ project }: AdminProjectSectionsProps) {
    const [sections, setSections] = useState(project.sections);
    const [deleteTarget, setDeleteTarget] = useState<ProjectSection | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const oldIndex = sections.findIndex((s) => s.id === active.id);
        const newIndex = sections.findIndex((s) => s.id === over.id);
        const reordered = arrayMove(sections, oldIndex, newIndex);

        setSections(reordered);
        router.post(
            sectionsReorder.url(project.id),
            { ordered_ids: reordered.map((s) => s.id) },
            {
                preserveScroll: true,
                onError: () => setSections(project.sections),
            },
        );
    }

    function handleDelete() {
        if (!deleteTarget) return;
        router.delete(sectionDestroy.url(deleteTarget.id), {
            preserveScroll: true,
        });
    }

    const breadcrumbs = [
        { title: 'Dashboard', href: dashboard.url() },
        { title: 'Projects', href: projectsIndex.url() },
        { title: project.title, href: projectsEdit.url(project.id) },
        { title: 'Sections', href: '' },
    ];

    return (
        <>
            <Head title={`Sections — ${project.title}`} />

            <div className="px-6 pt-6">
                <Link
                    href={projectsEdit.url(project.id)}
                    className="mb-4 inline-flex items-center gap-1 font-mono-ibm text-[0.75rem] text-portfolio-text-secondary hover:text-portfolio-accent transition-colors"
                >
                    <ArrowLeft className="size-3" />
                    Back to project
                </Link>

                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="font-mono-space text-xl font-bold text-portfolio-text">
                            Sections
                        </h1>
                        <p className="mt-1 font-mono-ibm text-[0.75rem] text-portfolio-text-secondary">
                            {project.title}
                        </p>
                    </div>
                    <Link
                        href={sectionsCreate.url(project.id)}
                        className="inline-flex items-center gap-2 rounded-sm border border-portfolio-accent/30 bg-portfolio-accent/10 px-4 py-2 font-mono-ibm text-[0.8rem] text-portfolio-accent transition-colors hover:bg-portfolio-accent/20"
                    >
                        <Plus className="size-4" />
                        Add Section
                    </Link>
                </div>
            </div>

            <div className="mt-8 px-6 pb-8">
                {sections.length === 0 ? (
                    <div className="rounded-sm border border-portfolio-border p-12 text-center">
                        <p className="font-mono-ibm text-[0.85rem] text-portfolio-text-secondary">
                            No sections yet
                        </p>
                        <Link
                            href={sectionsCreate.url(project.id)}
                            className="mt-3 inline-block font-mono-ibm text-[0.8rem] text-portfolio-accent hover:text-portfolio-accent-hover transition-colors"
                        >
                            Add the first section
                        </Link>
                    </div>
                ) : (
                    <div className="overflow-hidden rounded-sm border border-portfolio-border">
                        <Table>
                            <TableHeader>
                                <TableRow className="border-portfolio-border hover:bg-transparent">
                                    <TableHead className="w-10" />
                                    <TableHead className="font-mono-ibm text-[0.65rem] uppercase tracking-[0.15em] text-portfolio-text-secondary">
                                        Type
                                    </TableHead>
                                    <TableHead className="font-mono-ibm text-[0.65rem] uppercase tracking-[0.15em] text-portfolio-text-secondary">
                                        Title
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
                                    items={sections.map((s) => s.id)}
                                    strategy={verticalListSortingStrategy}
                                >
                                    <TableBody>
                                        {sections.map((section) => (
                                            <SortableSectionRow
                                                key={section.id}
                                                section={section}
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
                title="Delete Section"
                description={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
                destructive
            />
        </>
    );
}

AdminProjectSectionsIndex.layout = (page: ReactElement<AdminProjectSectionsProps>) => {
    const { project } = page.props;
    const breadcrumbs = [
        { title: 'Dashboard', href: dashboard.url() },
        { title: 'Projects', href: projectsIndex.url() },
        { title: project.title, href: projectsEdit.url(project.id) },
        { title: 'Sections', href: '' },
    ];
    return <AppSidebarLayout breadcrumbs={breadcrumbs}>{page}</AppSidebarLayout>;
};
