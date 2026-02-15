export type ProjectStatus =
    | 'production'
    | 'in_development'
    | 'released'
    | 'research'
    | 'archived';

export type SectionType =
    | 'overview'
    | 'mission'
    | 'problem'
    | 'solution'
    | 'architecture'
    | 'lessons'
    | 'roadmap'
    | 'custom';

export type PostStatus = 'draft' | 'published' | 'archived';

export type MediaItem = {
    id: number;
    url: string;
    name: string;
    file_name: string;
    mime_type: string | null;
    size: number;
    order_column: number | null;
};

export type Technology = {
    id: number;
    name: string;
    slug: string;
    category: string | null;
    created_at: string;
    updated_at: string;
    projects_count?: number;
};

export type ProjectSection = {
    id: number;
    project_id: number;
    type: SectionType;
    title: string;
    body: string;
    body_html?: string;
    sort_order: number;
    is_visible: boolean;
    created_at: string;
    updated_at: string;
};

export type Project = {
    id: number;
    slug: string;
    title: string;
    tagline: string;
    description: string;
    status: ProjectStatus;
    is_featured: boolean;
    is_visible: boolean;
    sort_order: number;
    external_url: string | null;
    github_url: string | null;
    meta_title: string | null;
    meta_description: string | null;
    published_at: string | null;
    created_at: string;
    updated_at: string;
    sections?: ProjectSection[];
    technologies?: Technology[];
    thumbnail_url?: string | null;
    screenshots?: MediaItem[];
};

export type Post = {
    id: number;
    slug: string;
    title: string;
    excerpt: string | null;
    body: string;
    body_html?: string;
    status: PostStatus;
    is_featured: boolean;
    reading_time_minutes: number | null;
    meta_title: string | null;
    meta_description: string | null;
    published_at: string | null;
    created_at: string;
    updated_at: string;
    tags?: Tag[];
};

export type Tag = {
    id: number;
    name: string;
    slug: string;
    created_at: string;
    updated_at: string;
    posts_count?: number;
};

export type Page = {
    id: number;
    slug: string;
    title: string;
    body: string;
    body_html?: string;
    meta_title: string | null;
    meta_description: string | null;
    created_at: string;
    updated_at: string;
};

export type SiteSettings = {
    site_name?: string | null;
    tagline?: string | null;
    bio?: string | null;
    hero_text?: string | null;
    github_url?: string | null;
    linkedin_url?: string | null;
    twitter_url?: string | null;
    email?: string | null;
    resume_url?: string | null;
    [key: string]: string | null | undefined;
};
