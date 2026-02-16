import { Head, Link, router } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import { ChevronDown } from 'lucide-react';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { ConfirmDialog } from '@/components/admin/confirm-dialog';
import { MarkdownEditor } from '@/components/admin/markdown-editor';
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
} from '@/routes/admin/posts';
import type { AdminPostFormProps } from '@/types/admin';
import type { PostStatus } from '@/types/models';

const POST_STATUSES: { value: PostStatus; label: string }[] = [
    { value: 'draft', label: 'Draft' },
    { value: 'published', label: 'Published' },
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

export default function AdminPostForm({ post, tags }: AdminPostFormProps) {
    const isEdit = !!post;
    const [seoOpen, setSeoOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const { data, setData, processing, errors } = useForm({
        title: post?.title ?? '',
        body: post?.body ?? '',
        excerpt: post?.excerpt ?? '',
        status: post?.status ?? ('draft' as PostStatus),
        is_featured: post?.is_featured ?? false,
        published_at: post?.published_at?.slice(0, 10) ?? '',
        tag_ids: post?.tags?.map((t) => t.id) ?? [],
        meta_title: post?.meta_title ?? '',
        meta_description: post?.meta_description ?? '',
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (isEdit) {
            router.put(update.url(post.id), data);
        } else {
            router.post(store.url(), data);
        }
    }

    function handleTagToggle(tagId: number) {
        const current = data.tag_ids;
        setData(
            'tag_ids',
            current.includes(tagId)
                ? current.filter((id) => id !== tagId)
                : [...current, tagId],
        );
    }

    return (
        <>
            <Head title={isEdit ? `Edit ${post.title}` : 'New Post'} />

            <div className="px-6 pt-6">
                <h1 className="font-mono-space text-xl font-bold text-portfolio-text">
                    {isEdit ? 'Edit Post' : 'New Post'}
                </h1>
                <p className="mt-1 font-mono-ibm text-[0.75rem] text-portfolio-text-secondary">
                    {isEdit ? 'Update post content' : 'Write a new blog post'}
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

                <div className="max-w-2xl">
                    <FieldLabel>Excerpt</FieldLabel>
                    <Textarea
                        value={data.excerpt}
                        onChange={(e) => setData('excerpt', e.target.value)}
                        rows={3}
                        placeholder="Brief summary of the post..."
                        className="border-portfolio-border bg-portfolio-bg font-mono-ibm text-[0.85rem] text-portfolio-text resize-y"
                    />
                    <FieldError message={errors.excerpt} />
                </div>

                <MarkdownEditor
                    value={data.body}
                    onChange={(val) => setData('body', val)}
                    label="Body"
                    error={errors.body}
                />

                <div className="grid max-w-2xl grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                        <FieldLabel>Status</FieldLabel>
                        <Select
                            value={data.status}
                            onValueChange={(val) => setData('status', val as PostStatus)}
                        >
                            <SelectTrigger className="border-portfolio-border bg-portfolio-bg font-mono-ibm text-[0.85rem] text-portfolio-text">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="border-portfolio-border bg-portfolio-bg">
                                {POST_STATUSES.map((s) => (
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

                    <div>
                        <FieldLabel>Published At</FieldLabel>
                        <Input
                            type="date"
                            value={data.published_at}
                            onChange={(e) => setData('published_at', e.target.value)}
                            className="border-portfolio-border bg-portfolio-bg font-mono-ibm text-[0.85rem] text-portfolio-text"
                        />
                        <FieldError message={errors.published_at} />
                    </div>
                </div>

                <div className="flex max-w-2xl items-center gap-3">
                    <Switch
                        checked={data.is_featured}
                        onCheckedChange={(val) => setData('is_featured', val)}
                    />
                    <span className="font-mono-ibm text-[0.8rem] text-portfolio-text">
                        Featured
                    </span>
                </div>

                {tags.length > 0 && (
                    <div className="max-w-2xl">
                        <FieldLabel>Tags</FieldLabel>
                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                            {tags.map((tag) => (
                                <label
                                    key={tag.id}
                                    className="flex cursor-pointer items-center gap-2 rounded-sm border border-portfolio-border px-3 py-2 transition-colors hover:bg-portfolio-bg-subtle"
                                >
                                    <input
                                        type="checkbox"
                                        checked={data.tag_ids.includes(tag.id)}
                                        onChange={() => handleTagToggle(tag.id)}
                                        className="accent-portfolio-accent"
                                    />
                                    <span className="font-mono-ibm text-[0.8rem] text-portfolio-text">
                                        {tag.name}
                                    </span>
                                </label>
                            ))}
                        </div>
                        <FieldError message={errors.tag_ids} />
                    </div>
                )}

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
                        {processing
                            ? 'Saving...'
                            : isEdit
                              ? 'Update Post'
                              : 'Create Post'}
                    </button>
                    <Link
                        href={index.url()}
                        className="font-mono-ibm text-[0.8rem] text-portfolio-text-secondary hover:text-portfolio-text transition-colors"
                    >
                        Cancel
                    </Link>
                </div>

                {isEdit && (
                    <div className="max-w-2xl border-t border-portfolio-border pt-6">
                        <div className="rounded-sm border border-red-500/20 p-4">
                            <p className="mb-3 font-mono-ibm text-[0.7rem] uppercase tracking-[0.15em] text-red-400">
                                Danger Zone
                            </p>
                            <button
                                type="button"
                                onClick={() => setDeleteOpen(true)}
                                className="rounded-sm bg-red-500/10 px-4 py-2 font-mono-ibm text-[0.8rem] text-red-400 transition-colors hover:bg-red-500/20"
                            >
                                Delete Post
                            </button>
                        </div>
                    </div>
                )}
            </form>

            {isEdit && (
                <ConfirmDialog
                    open={deleteOpen}
                    onOpenChange={setDeleteOpen}
                    onConfirm={() => router.delete(destroy.url(post.id))}
                    title="Delete Post"
                    description={`Are you sure you want to delete "${post.title}"? This action cannot be undone.`}
                    destructive
                />
            )}
        </>
    );
}

AdminPostForm.layout = (page: ReactNode) => {
    const { post } = page.props as unknown as AdminPostFormProps;
    const breadcrumbs = [
        { title: 'Dashboard', href: dashboard.url() },
        { title: 'Posts', href: index.url() },
        {
            title: post ? post.title : 'New Post',
            href: post ? edit.url(post.id) : '',
        },
    ];
    return <AppSidebarLayout breadcrumbs={breadcrumbs}>{page}</AppSidebarLayout>;
};
