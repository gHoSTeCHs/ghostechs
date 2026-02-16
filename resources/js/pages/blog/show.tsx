import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { BackLink } from '@/components/portfolio/back-link';
import { Meta } from '@/components/seo/meta';
import { useInView } from '@/hooks/use-in-view';
import PortfolioLayout from '@/layouts/portfolio-layout';
import { index, show } from '@/routes/blog';
import type { BlogPostPageProps } from '@/types/pages';
import type { Post } from '@/types/models';

function RelatedPost({ post, index: i }: { post: Post; index: number }) {
    const { ref, isInView } = useInView();

    return (
        <Link
            ref={ref}
            href={show.url(post.slug)}
            className="group block border-b border-border py-8"
            style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.08}s`,
            }}
        >
            <h3 className="font-mono-space text-base font-bold tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary">
                {post.title}
            </h3>
            {post.excerpt && (
                <p className="mt-2 max-w-[640px] font-mono-ibm text-[0.8rem] leading-[1.7] text-muted-foreground">
                    {post.excerpt}
                </p>
            )}
            {post.published_at && (
                <span className="mt-3 inline-block font-mono-ibm text-[0.65rem] uppercase tracking-[0.1em] text-muted-foreground">
                    {new Date(post.published_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                    })}
                </span>
            )}
        </Link>
    );
}

export default function BlogShow({ post, relatedPosts }: BlogPostPageProps) {
    const [headerVisible, setHeaderVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setHeaderVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <PortfolioLayout>
            <Meta title={post.title} description={post.excerpt ?? undefined} ogType="article" />

            <div className="pt-12">
                <BackLink href={index.url()} label="Back to blog" />
            </div>

            <article
                className="pb-16 pt-16"
                style={{
                    opacity: headerVisible ? 1 : 0,
                    transform: headerVisible ? 'translateY(0)' : 'translateY(30px)',
                    transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
            >
                <header className="pb-12">
                    <h1 className="font-mono-space text-[clamp(2rem,5vw,3rem)] font-bold leading-[1.15] tracking-tight text-foreground">
                        {post.title}
                    </h1>

                    <div className="mt-6 flex flex-wrap items-center gap-4">
                        {post.published_at && (
                            <span className="font-mono-ibm text-[0.7rem] uppercase tracking-[0.1em] text-muted-foreground">
                                {new Date(post.published_at).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </span>
                        )}
                        {post.reading_time_minutes && (
                            <span className="font-mono-ibm text-[0.7rem] uppercase tracking-[0.1em] text-muted-foreground">
                                {post.reading_time_minutes} min read
                            </span>
                        )}
                    </div>

                    {post.tags && post.tags.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                            {post.tags.map((tag) => (
                                <span
                                    key={tag.id}
                                    className="rounded-sm border border-border px-[0.6rem] py-0.5 font-mono-ibm text-[0.6rem] uppercase tracking-[0.05em] text-muted-foreground"
                                >
                                    {tag.name}
                                </span>
                            ))}
                        </div>
                    )}
                </header>

                {post.body_html && (
                    <div
                        className="prose-portfolio"
                        dangerouslySetInnerHTML={{ __html: post.body_html }}
                    />
                )}
            </article>

            {relatedPosts.length > 0 && (
                <section className="pb-24">
                    <p className="mb-6 font-mono-ibm text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground">
                        Related Posts
                    </p>
                    {relatedPosts.map((related, i) => (
                        <RelatedPost key={related.id} post={related} index={i} />
                    ))}
                </section>
            )}
        </PortfolioLayout>
    );
}
