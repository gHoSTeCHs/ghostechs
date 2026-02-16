import { Head, router } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { dashboard } from '@/routes/admin';
import { index, update } from '@/routes/admin/settings';
import type { AdminSettingsProps } from '@/types/admin';

const breadcrumbs = [
    { title: 'Dashboard', href: dashboard.url() },
    { title: 'Settings', href: index.url() },
];

const SETTING_FIELDS: {
    key: string;
    label: string;
    type: 'input' | 'textarea';
    placeholder?: string;
}[] = [
    { key: 'site_name', label: 'Site Name', type: 'input', placeholder: 'My Portfolio' },
    { key: 'tagline', label: 'Tagline', type: 'input', placeholder: 'A short tagline...' },
    { key: 'bio', label: 'Bio', type: 'textarea', placeholder: 'A brief bio about yourself...' },
    { key: 'hero_text', label: 'Hero Text', type: 'textarea', placeholder: 'Text for the homepage hero...' },
    { key: 'email', label: 'Email', type: 'input', placeholder: 'you@example.com' },
    { key: 'github_url', label: 'GitHub URL', type: 'input', placeholder: 'https://github.com/...' },
    { key: 'linkedin_url', label: 'LinkedIn URL', type: 'input', placeholder: 'https://linkedin.com/in/...' },
    { key: 'twitter_url', label: 'Twitter URL', type: 'input', placeholder: 'https://twitter.com/...' },
    { key: 'resume_url', label: 'Resume URL', type: 'input', placeholder: 'https://...' },
];

export default function AdminSettingsIndex({ settings }: AdminSettingsProps) {
    const { data, setData, processing } = useForm<Record<string, string>>(
        Object.fromEntries(
            SETTING_FIELDS.map((field) => [field.key, settings[field.key] ?? '']),
        ),
    );

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        router.put(update.url(), { settings: data });
    }

    return (
        <>
            <Head title="Settings" />

            <div className="px-6 pt-6">
                <h1 className="font-mono-space text-xl font-bold text-portfolio-text">
                    Settings
                </h1>
                <p className="mt-1 font-mono-ibm text-[0.75rem] text-portfolio-text-secondary">
                    Configure your portfolio site
                </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 max-w-2xl space-y-6 px-6 pb-8">
                {SETTING_FIELDS.map((field) => (
                    <div key={field.key}>
                        <label className="mb-2 block font-mono-ibm text-[0.7rem] uppercase tracking-[0.15em] text-portfolio-text-secondary">
                            {field.label}
                        </label>
                        {field.type === 'textarea' ? (
                            <Textarea
                                value={data[field.key] ?? ''}
                                onChange={(e) => setData(field.key, e.target.value)}
                                rows={3}
                                placeholder={field.placeholder}
                                className="border-portfolio-border bg-portfolio-bg font-mono-ibm text-[0.85rem] text-portfolio-text resize-y"
                            />
                        ) : (
                            <Input
                                value={data[field.key] ?? ''}
                                onChange={(e) => setData(field.key, e.target.value)}
                                placeholder={field.placeholder}
                                className="border-portfolio-border bg-portfolio-bg font-mono-ibm text-[0.85rem] text-portfolio-text"
                            />
                        )}
                    </div>
                ))}

                <div className="border-t border-portfolio-border pt-6">
                    <button
                        type="submit"
                        disabled={processing}
                        className="rounded-sm bg-portfolio-accent/10 px-6 py-2 font-mono-ibm text-[0.8rem] font-medium text-portfolio-accent transition-colors hover:bg-portfolio-accent/20 disabled:opacity-50"
                    >
                        {processing ? 'Saving...' : 'Save Settings'}
                    </button>
                </div>
            </form>
        </>
    );
}

AdminSettingsIndex.layout = (page: ReactNode) => (
    <AppSidebarLayout breadcrumbs={breadcrumbs}>{page}</AppSidebarLayout>
);
