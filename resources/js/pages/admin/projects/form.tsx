import { Head, Link, router } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import { ChevronDown } from 'lucide-react';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { ConfirmDialog } from '@/components/admin/confirm-dialog';
import { SlugInput } from '@/components/admin/slug-input';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { dashboard } from '@/routes/admin';
import {
    index,
    store,
    edit,
    update,
    destroy,
} from '@/routes/admin/projects';
import { index as sectionsIndex } from '@/routes/admin/projects/sections';
import type { AdminProjectFormProps } from '@/types/admin';
import type { ProjectStatus } from '@/types/models';

const PROJECT_STATUSES: { value: ProjectStatus; label: string }[] = [
    { value: 'production', label: 'Production' },
    { value: 'in_development', label: 'In Development' },
    { value: 'released', label: 'Released' },
    { value: 'research', label: 'Research' },
    { value: 'archived', label: 'Archived' },
];

function FieldLabel({ children }: { children: React.ReactNode }) {
    return (
        <label className="mb-2 block font-mono-ibm text-[0.7rem] uppercase tracking-[0.15em] text-portfolio-text-secondary">
            {children}
        </label>
    );
}

function FieldError({ message }: { message?: string }) {
    if (!message) return null;
    return (
        <p className="mt-1 font-mono-ibm text-[0.75rem] text-red-400">
            {message}
        </p>
    );
}

export default function AdminProjectForm({ project, technologies }: AdminProjectFormProps) {
    const isEdit = !!project;
    const [seoOpen, setSeoOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const { data, setData, processing, errors } = useForm({
        title: project?.title ?? '',
        tagline: project?.tagline ?? '',
        description: project?.description ?? '',
        status: project?.status ?? ('in_development' as ProjectStatus),
        is_featured: project?.is_featured ?? false,
        is_visible: project?.is_visible ?? true,
        external_url: project?.external_url ?? '',
        github_url: project?.github_url ?? '',
        technology_ids: project?.technologies?.map((t) => t.id) ?? [],
        meta_title: project?.meta_title ?? '',
        meta_description: project?.meta_description ?? '',
    });

    const breadcrumbs = [
        { title: 'Dashboard', href: dashboard.url() },
        { title: 'Projects', href: index.url() },
        {
            title: isEdit ? project.title : 'New Project',
            href: isEdit ? edit.url(project.id) : '',
        },
    ];

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (isEdit) {
            router.put(update.url(project.id), data);
        } else {
            router.post(store.url(), data);
        }
    }

    function handleTechToggle(techId: number) {
        const current = data.technology_ids;
        setData(
            'technology_ids',
            current.includes(techId)
                ? current.filter((id) => id !== techId)
                : [...current, techId],
        );
    }

    return (
        <>
            <Head title={isEdit ? `Edit ${project.title}` : 'New Project'} />

            <div className="px-6 pt-6">
                <h1 className="font-mono-space text-xl font-bold text-portfolio-text">
                    {isEdit ? 'Edit Project' : 'New Project'}
                </h1>
                <p className="mt-1 font-mono-ibm text-[0.75rem] text-portfolio-text-secondary">
                    {isEdit
                        ? 'Update project details'
                        : 'Add a new portfolio project'}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 max-w-2xl space-y-6 px-6 pb-8">
                <div>
                    <FieldLabel>Title</FieldLabel>
                    <Input
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        className="border-portfolio-border bg-portfolio-bg font-mono-ibm text-[0.85rem] text-portfolio-text"
                    />
                    <FieldError message={errors.title} />
                </div>

                <SlugInput title={data.title} />

                <div>
                    <FieldLabel>Tagline</FieldLabel>
                    <Input
                        value={data.tagline}
                        onChange={(e) => setData('tagline', e.target.value)}
                        className="border-portfolio-border bg-portfolio-bg font-mono-ibm text-[0.85rem] text-portfolio-text"
                    />
                    <FieldError message={errors.tagline} />
                </div>

                <div>
                    <FieldLabel>Description</FieldLabel>
                    <Textarea
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        rows={4}
                        className="border-portfolio-border bg-portfolio-bg font-mono-ibm text-[0.85rem] text-portfolio-text resize-y"
                    />
                    <FieldError message={errors.description} />
                </div>

                <div>
                    <FieldLabel>Status</FieldLabel>
                    <Select
                        value={data.status}
                        onValueChange={(val) => setData('status', val as ProjectStatus)}
                    >
                        <SelectTrigger className="border-portfolio-border bg-portfolio-bg font-mono-ibm text-[0.85rem] text-portfolio-text">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="border-portfolio-border bg-portfolio-bg">
                            {PROJECT_STATUSES.map((s) => (
                                <SelectItem
                                    key={s.value}
                                    value={s.value}
                                    className="font-mono-ibm text-[0.85rem] text-portfolio-text focus:bg-portfolio-bg-subtle"
                                >
                                    {s.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FieldError message={errors.status} />
                </div>

                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-3">
                        <Switch
                            checked={data.is_featured}
                            onCheckedChange={(val) => setData('is_featured', val)}
                        />
                        <span className="font-mono-ibm text-[0.8rem] text-portfolio-text">
                            Featured
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Switch
                            checked={data.is_visible}
                            onCheckedChange={(val) => setData('is_visible', val)}
                        />
                        <span className="font-mono-ibm text-[0.8rem] text-portfolio-text">
                            Visible
                        </span>
                    </div>
                </div>

                <div>
                    <FieldLabel>External URL</FieldLabel>
                    <Input
                        value={data.external_url}
                        onChange={(e) => setData('external_url', e.target.value)}
                        placeholder="https://"
                        className="border-portfolio-border bg-portfolio-bg font-mono-ibm text-[0.85rem] text-portfolio-text"
                    />
                    <FieldError message={errors.external_url} />
                </div>

                <div>
                    <FieldLabel>GitHub URL</FieldLabel>
                    <Input
                        value={data.github_url}
                        onChange={(e) => setData('github_url', e.target.value)}
                        placeholder="https://github.com/..."
                        className="border-portfolio-border bg-portfolio-bg font-mono-ibm text-[0.85rem] text-portfolio-text"
                    />
                    <FieldError message={errors.github_url} />
                </div>

                {technologies.length > 0 && (
                    <div>
                        <FieldLabel>Technologies</FieldLabel>
                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                            {technologies.map((tech) => (
                                <label
                                    key={tech.id}
                                    className="flex cursor-pointer items-center gap-2 rounded-sm border border-portfolio-border px-3 py-2 transition-colors hover:bg-portfolio-bg-subtle"
                                >
                                    <input
                                        type="checkbox"
                                        checked={data.technology_ids.includes(tech.id)}
                                        onChange={() => handleTechToggle(tech.id)}
                                        className="accent-portfolio-accent"
                                    />
                                    <span className="font-mono-ibm text-[0.8rem] text-portfolio-text">
                                        {tech.name}
                                    </span>
                                </label>
                            ))}
                        </div>
                        <FieldError message={errors.technology_ids} />
                    </div>
                )}

                <div className="border-t border-portfolio-border pt-4">
                    <button
                        type="button"
                        onClick={() => setSeoOpen(!seoOpen)}
                        className="flex items-center gap-2 font-mono-ibm text-[0.75rem] uppercase tracking-[0.15em] text-portfolio-text-secondary hover:text-portfolio-text transition-colors"
                    >
                        <ChevronDown
                            className={`size-4 transition-transform ${seoOpen ? 'rotate-180' : ''}`}
                        />
                        SEO Settings
                    </button>
                    {seoOpen && (
                        <div className="mt-4 space-y-4">
                            <div>
                                <FieldLabel>Meta Title</FieldLabel>
                                <Input
                                    value={data.meta_title}
                                    onChange={(e) => setData('meta_title', e.target.value)}
                                    className="border-portfolio-border bg-portfolio-bg font-mono-ibm text-[0.85rem] text-portfolio-text"
                                />
                                <FieldError message={errors.meta_title} />
                            </div>
                            <div>
                                <FieldLabel>Meta Description</FieldLabel>
                                <Textarea
                                    value={data.meta_description}
                                    onChange={(e) => setData('meta_description', e.target.value)}
                                    rows={3}
                                    className="border-portfolio-border bg-portfolio-bg font-mono-ibm text-[0.85rem] text-portfolio-text resize-y"
                                />
                                <FieldError message={errors.meta_description} />
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-4 border-t border-portfolio-border pt-6">
                    <button
                        type="submit"
                        disabled={processing}
                        className="rounded-sm bg-portfolio-accent/10 px-6 py-2 font-mono-ibm text-[0.8rem] font-medium text-portfolio-accent transition-colors hover:bg-portfolio-accent/20 disabled:opacity-50"
                    >
                        {processing
                            ? 'Saving...'
                            : isEdit
                              ? 'Update Project'
                              : 'Create Project'}
                    </button>
                    <Link
                        href={index.url()}
                        className="font-mono-ibm text-[0.8rem] text-portfolio-text-secondary hover:text-portfolio-text transition-colors"
                    >
                        Cancel
                    </Link>
                </div>

                {isEdit && (
                    <div className="space-y-4 border-t border-portfolio-border pt-6">
                        <Link
                            href={sectionsIndex.url(project.id)}
                            className="inline-block font-mono-ibm text-[0.8rem] text-portfolio-accent hover:text-portfolio-accent-hover transition-colors"
                        >
                            Manage Sections &rarr;
                        </Link>

                        <div className="rounded-sm border border-red-500/20 p-4">
                            <p className="mb-3 font-mono-ibm text-[0.7rem] uppercase tracking-[0.15em] text-red-400">
                                Danger Zone
                            </p>
                            <button
                                type="button"
                                onClick={() => setDeleteOpen(true)}
                                className="rounded-sm bg-red-500/10 px-4 py-2 font-mono-ibm text-[0.8rem] text-red-400 transition-colors hover:bg-red-500/20"
                            >
                                Delete Project
                            </button>
                        </div>
                    </div>
                )}
            </form>

            {isEdit && (
                <ConfirmDialog
                    open={deleteOpen}
                    onOpenChange={setDeleteOpen}
                    onConfirm={() =>
                        router.delete(destroy.url(project.id))
                    }
                    title="Delete Project"
                    description={`Are you sure you want to delete "${project.title}"? This will also delete all sections. This action cannot be undone.`}
                    destructive
                />
            )}
        </>
    );
}

AdminProjectForm.layout = (page: ReactNode) => {
    const { project } = page.props as unknown as AdminProjectFormProps;
    const breadcrumbs = [
        { title: 'Dashboard', href: dashboard.url() },
        { title: 'Projects', href: index.url() },
        {
            title: project ? project.title : 'New Project',
            href: project ? edit.url(project.id) : '',
        },
    ];
    return <AppSidebarLayout breadcrumbs={breadcrumbs}>{page}</AppSidebarLayout>;
};
