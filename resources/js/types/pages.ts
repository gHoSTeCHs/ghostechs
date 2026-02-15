import type { Post, Project, Page, SiteSettings, Tag } from './models';

export type HomePageProps = {
    projects: Project[];
    featuredPosts: Post[];
    settings: SiteSettings;
};

export type ProjectDetailPageProps = {
    project: Project;
    nextProject: Pick<Project, 'slug' | 'title'> | null;
    prevProject: Pick<Project, 'slug' | 'title'> | null;
    settings: SiteSettings;
};

export type BlogIndexPageProps = {
    posts: Post[];
    tags: Tag[];
    activeTag: string | null;
    settings: SiteSettings;
};

export type BlogPostPageProps = {
    post: Post;
    relatedPosts: Post[];
    settings: SiteSettings;
};

export type AboutPageProps = {
    page: Page;
    settings: SiteSettings;
};

export type ContactPageProps = {
    settings: SiteSettings;
};

export type ResumePageProps = {
    settings: SiteSettings;
    resumeUrl: string | null;
};
