import { Link, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { Meta } from '@/components/seo/meta';
import { useInView } from '@/hooks/use-in-view';
import PortfolioLayout from '@/layouts/portfolio-layout';
import { index, show } from '@/routes/blog';
import type { BlogIndexPageProps } from '@/types/pages';
import type { Post } from '@/types/models';

function PostCard({ post, index: i }: { post: Post; index: number }) {
    const { ref, isInView } = useInView();
    const [hovered, setHovered] = useState(false);

    return (
        <Link
            ref={ref}
            href={show.url(post.slug)}
            className="group block border-b border-border py-10"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? 'translateY(0)' : 'translateY(40px)',
                transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.08}s`,
            }}
        >
            <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                    <h2
                        className="font-mono-space text-xl font-bold tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary"
                        style={{
                            transform: hovered ? 'translateX(8px)' : 'translateX(0)',
                            transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                        }}
                    >
                        {post.title}
                    </h2>

                    {post.excerpt && (
                        <p className="mt-3 max-w-[640px] font-mono-ibm text-[0.85rem] leading-[1.7] text-muted-foreground">
                            {post.excerpt}
                        </p>
                    )}

                    <div className="mt-4 flex flex-wrap items-center gap-4">
                        {post.published_at && (
                            <span className="font-mono-ibm text-[0.65rem] uppercase tracking-[0.1em] text-muted-foreground">
                                {new Date(post.published_at).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                })}
                            </span>
                        )}
                        {post.reading_time_minutes && (
                            <span className="font-mono-ibm text-[0.65rem] uppercase tracking-[0.1em] text-muted-foreground">
                                {post.reading_time_minutes} min read
                            </span>
                        )}
                        {post.tags && post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
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
                    </div>
                </div>

                <div
                    className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary transition-opacity duration-300"
                    style={{ opacity: hovered ? 1 : 0.3 }}
                />
            </div>
        </Link>
    );
}

export default function BlogIndex({ posts, tags, activeTag }: BlogIndexPageProps) {
    const [heroVisible, setHeroVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setHeroVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <PortfolioLayout>
            <Meta title="Blog" description="Thoughts on web development, architecture, and building products." />

            <section className="pb-12 pt-24">
                <div
                    style={{
                        opacity: heroVisible ? 1 : 0,
                        transform: heroVisible ? 'translateY(0)' : 'translateY(30px)',
                        transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                >
                    <p className="mb-6 font-mono-ibm text-[0.7rem] uppercase tracking-[0.2em] text-primary">
                        Writing
                    </p>
                    <h1 className="font-mono-space text-[clamp(2rem,5vw,3rem)] font-bold tracking-tight text-foreground">
                        Blog
                    </h1>
                </div>

                {tags.length > 0 && (
                    <div
                        className="mt-10 flex flex-wrap gap-3"
                        style={{
                            opacity: heroVisible ? 1 : 0,
                            transform: heroVisible ? 'translateY(0)' : 'translateY(20px)',
                            transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
                        }}
                    >
                        <button
                            onClick={() => router.visit(index.url())}
                            className={`rounded-sm border px-3 py-1.5 font-mono-ibm text-[0.65rem] uppercase tracking-[0.1em] transition-all duration-300 ${
                                activeTag === null
                                    ? 'border-primary/30 text-primary'
                                    : 'border-border text-muted-foreground hover:border-primary/30 hover:text-primary'
                            }`}
                        >
                            All
                        </button>
                        {tags.map((tag) => (
                            <button
                                key={tag.id}
                                onClick={() =>
                                    router.visit(
                                        index.url({ query: { tag: tag.slug } }),
                                    )
                                }
                                className={`rounded-sm border px-3 py-1.5 font-mono-ibm text-[0.65rem] uppercase tracking-[0.1em] transition-all duration-300 ${
                                    activeTag === tag.slug
                                        ? 'border-primary/30 text-primary'
                                        : 'border-border text-muted-foreground hover:border-primary/30 hover:text-primary'
                                }`}
                            >
                                {tag.name}
                            </button>
                        ))}
                    </div>
                )}
            </section>

            <section className="pb-24">
                {posts.length === 0 ? (
                    <div className="py-16 text-center">
                        <p className="font-mono-ibm text-[0.85rem] text-muted-foreground">
                            No posts yet.
                        </p>
                    </div>
                ) : (
                    posts.map((post, i) => (
                        <PostCard key={post.id} post={post} index={i} />
                    ))
                )}
            </section>
        </PortfolioLayout>
    );
}
