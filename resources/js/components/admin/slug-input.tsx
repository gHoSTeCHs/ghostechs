function slugify(text: string): string {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_]+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
}

export function SlugInput({ title }: { title: string }) {
    const slug = slugify(title);

    return (
        <div>
            <label className="mb-2 block font-mono-ibm text-[0.7rem] uppercase tracking-[0.15em] text-portfolio-text-secondary">
                Slug (auto-generated)
            </label>
            <div className="flex h-9 w-full items-center rounded-sm border border-portfolio-border bg-portfolio-bg-subtle px-3">
                <span className="font-mono-ibm text-[0.8rem] text-portfolio-text-secondary">
                    {slug || '—'}
                </span>
            </div>
        </div>
    );
}
