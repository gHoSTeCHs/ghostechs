import { Head, Link, router } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { MarkdownEditor } from '@/components/admin/markdown-editor';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { dashboard } from '@/routes/admin';
import { index as projectsIndex, edit as projectsEdit } from '@/routes/admin/projects';
import { index as sectionsIndex, store as sectionsStore } from '@/routes/admin/projects/sections';
import { update as sectionUpdate } from '@/routes/admin/sections';
import type { AdminProjectSectionFormProps } from '@/types/admin';
import type { SectionType } from '@/types/models';

const SECTION_TYPES: { value: SectionType; label: string }[] = [
    { value: 'overview', label: 'Overview' },
    { value: 'mission', label: 'Mission' },
    { value: 'problem', label: 'Problem' },
    { value: 'solution', label: 'Solution' },
    { value: 'architecture', label: 'Architecture' },
    { value: 'lessons', label: 'Lessons' },
    { value: 'roadmap', label: 'Roadmap' },
    { value: 'custom', label: 'Custom' },
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

export default function AdminProjectSectionForm({ project, section }: AdminProjectSectionFormProps) {
    const isEdit = !!section;

    const { data, setData, processing, errors } = useForm({
        type: section?.type ?? ('overview' as SectionType),
        title: section?.title ?? '',
        body: section?.body ?? '',
        is_visible: section?.is_visible ?? true,
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (isEdit) {
            router.put(sectionUpdate.url(section.id), data);
        } else {
            router.post(sectionsStore.url(project.id), data);
        }
    }

    return (
        <>
            <Head title={isEdit ? `Edit Section` : 'New Section'} />

            <div className="px-6 pt-6">
                <h1 className="font-mono-space text-xl font-bold text-portfolio-text">
                    {isEdit ? 'Edit Section' : 'New Section'}
                </h1>
                <p className="mt-1 font-mono-ibm text-[0.75rem] text-portfolio-text-secondary">
                    {project.title}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6 px-6 pb-8">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                        <FieldLabel>Type</FieldLabel>
                        <Select
                            value={data.type}
                            onValueChange={(val) => setData('type', val as SectionType)}
                        >
                            <SelectTrigger className="border-portfolio-border bg-portfolio-bg font-mono-ibm text-[0.85rem] text-portfolio-text">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="border-portfolio-border bg-portfolio-bg">
                                {SECTION_TYPES.map((t) => (
                                    <SelectItem
                                        key={t.value}
                                        value={t.value}
                                        className="font-mono-ibm text-[0.85rem] text-portfolio-text focus:bg-portfolio-bg-subtle"
                                    >
                                        {t.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FieldError message={errors.type} />
                    </div>

                    <div>
                        <FieldLabel>Title</FieldLabel>
                        <Input
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            className="border-portfolio-border bg-portfolio-bg font-mono-ibm text-[0.85rem] text-portfolio-text"
                        />
                        <FieldError message={errors.title} />
                    </div>
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

                <MarkdownEditor
                    value={data.body}
                    onChange={(val) => setData('body', val)}
                    label="Body"
                    error={errors.body}
                />

                <div className="flex items-center gap-4 border-t border-portfolio-border pt-6">
                    <button
                        type="submit"
                        disabled={processing}
                        className="rounded-sm bg-portfolio-accent/10 px-6 py-2 font-mono-ibm text-[0.8rem] font-medium text-portfolio-accent transition-colors hover:bg-portfolio-accent/20 disabled:opacity-50"
                    >
                        {processing
                            ? 'Saving...'
                            : isEdit
                              ? 'Update Section'
                              : 'Create Section'}
                    </button>
                    <Link
                        href={sectionsIndex.url(project.id)}
                        className="font-mono-ibm text-[0.8rem] text-portfolio-text-secondary hover:text-portfolio-text transition-colors"
                    >
                        Cancel
                    </Link>
                </div>
            </form>
        </>
    );
}

AdminProjectSectionForm.layout = (page: ReactNode) => {
    const { project, section } = page.props as unknown as AdminProjectSectionFormProps;
    const breadcrumbs = [
        { title: 'Dashboard', href: dashboard.url() },
        { title: 'Projects', href: projectsIndex.url() },
        { title: project.title, href: projectsEdit.url(project.id) },
        { title: 'Sections', href: sectionsIndex.url(project.id) },
        { title: section ? 'Edit' : 'Create', href: '' },
    ];
    return <AppSidebarLayout breadcrumbs={breadcrumbs}>{page}</AppSidebarLayout>;
};
