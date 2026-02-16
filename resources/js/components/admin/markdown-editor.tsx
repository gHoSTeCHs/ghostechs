import { Textarea } from '@/components/ui/textarea';
import { useMemo } from 'react';
import { marked } from 'marked';

marked.setOptions({ async: false });

export function MarkdownEditor({
    value,
    onChange,
    label,
    error,
}: {
    value: string;
    onChange: (value: string) => void;
    label?: string;
    error?: string;
}) {
    const html = useMemo(() => marked.parse(value || '') as string, [value]);

    return (
        <div>
            {label && (
                <label className="mb-2 block font-mono-ibm text-[0.7rem] uppercase tracking-[0.15em] text-portfolio-text-secondary">
                    {label}
                </label>
            )}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                    <Textarea
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        rows={16}
                        className="font-mono-ibm text-[0.8rem] border-portfolio-border bg-portfolio-bg text-portfolio-text placeholder:text-portfolio-text-secondary resize-y"
                        placeholder="Write markdown..."
                    />
                </div>
                <div className="overflow-auto rounded-sm border border-portfolio-border bg-portfolio-bg-subtle p-4">
                    <p className="mb-3 font-mono-ibm text-[0.6rem] uppercase tracking-[0.15em] text-portfolio-text-secondary">
                        Preview
                    </p>
                    <div
                        className="prose prose-invert prose-sm max-w-none font-mono-ibm text-portfolio-text prose-headings:font-mono-space prose-headings:text-portfolio-text prose-a:text-portfolio-accent prose-strong:text-portfolio-text prose-code:text-portfolio-accent"
                        dangerouslySetInnerHTML={{ __html: html }}
                    />
                </div>
            </div>
            {error && (
                <p className="mt-1 font-mono-ibm text-[0.75rem] text-red-400">
                    {error}
                </p>
            )}
        </div>
    );
}
