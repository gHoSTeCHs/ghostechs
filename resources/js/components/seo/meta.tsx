import { Head, usePage } from '@inertiajs/react';
import type { SiteSettings } from '@/types/models';

type MetaProps = {
    title: string;
    description?: string;
    ogType?: string;
};

export function Meta({ title, description, ogType = 'website' }: MetaProps) {
    const { settings } = usePage().props as { settings?: SiteSettings };
    const siteName = settings?.site_name ?? 'Portfolio';
    const fullTitle = `${title} — ${siteName}`;
    const metaDescription = description ?? settings?.tagline ?? '';

    return (
        <Head title={title}>
            <meta name="description" content={metaDescription} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:type" content={ogType} />
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={metaDescription} />
        </Head>
    );
}
