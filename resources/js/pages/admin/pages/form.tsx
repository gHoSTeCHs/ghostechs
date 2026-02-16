import { Head, router } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import { ChevronDown } from 'lucide-react';
import type { ReactElement } from 'react';
import { useState } from 'react';
import { MarkdownEditor } from '@/components/admin/markdown-editor';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { dashboard } from '@/routes/admin';
import { edit, update } from '@/routes/admin/pages';
import type { AdminPageEditProps } from '@/types/admin';

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

export default function AdminPageForm({ page }: AdminPageEditProps) {
    const [seoOpen, setSeoOpen] = useState(false);

    const { data, setData, processing, errors } = useForm({
        title: page.title,
        body: page.body,
        meta_title: page.meta_title ?? '',
        meta_description: page.meta_description ?? '',
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        router.put(update.url(page.id), data);
    }

    return (
        <>
            <Head title={`Edit ${page.title}`} />

            <div className="px-6 pt-6">
                <h1 className="font-mono-space text-xl font-bold text-portfolio-text">
                    Edit Page
                </h1>
                <p className="mt-1 font-mono-ibm text-[0.75rem] text-portfolio-text-secondary">
                    {page.title} — /{page.slug}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6 px-6 pb-8">
                <div className="max-w-2xl">
                    <FieldLabel>Title</FieldLabel>
                    <Input
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        className="border-portfolio-border bg-portfolio-bg font-mono-ibm text-[0.85rem] text-portfolio-text"
                    />
                    <FieldError message={errors.title} />
                </div>

                <MarkdownEditor
                    value={data.body}
                    onChange={(val) => setData('body', val)}
                    label="Body"
                    error={errors.body}
                />

                <div className="max-w-2xl border-t border-portfolio-border pt-4">
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

                <div className="flex max-w-2xl items-center gap-4 border-t border-portfolio-border pt-6">
                    <button
                        type="submit"
                        disabled={processing}
                        className="rounded-sm bg-portfolio-accent/10 px-6 py-2 font-mono-ibm text-[0.8rem] font-medium text-portfolio-accent transition-colors hover:bg-portfolio-accent/20 disabled:opacity-50"
                    >
                        {processing ? 'Saving...' : 'Update Page'}
                    </button>
                </div>
            </form>
        </>
    );
}

AdminPageForm.layout = (page: ReactElement<{ page: AdminPageEditProps['page'] }>) => {
    const { page: pageData } = page.props;
    const breadcrumbs = [
        { title: 'Dashboard', href: dashboard.url() },
        { title: pageData.title, href: edit.url(pageData.slug) },
    ];
    return <AppSidebarLayout breadcrumbs={breadcrumbs}>{page}</AppSidebarLayout>;
};
