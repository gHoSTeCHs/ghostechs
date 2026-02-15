import type {
    Post,
    Project,
    ProjectSection,
    Page,
    SiteSettings,
    Tag,
    Technology,
} from './models';

export type AdminDashboardProps = {
    counts: {
        projects: number;
        posts: number;
        tags: number;
        technologies: number;
        pages: number;
    };
    recentItems: {
        type: 'project' | 'post';
        id: number;
        title: string;
        updated_at: string;
    }[];
};

export type AdminProjectIndexProps = {
    projects: Project[];
};

export type AdminProjectFormProps = {
    project?: Project;
    technologies: Technology[];
};

export type AdminProjectSectionsProps = {
    project: Project & { sections: ProjectSection[] };
};

export type AdminProjectSectionFormProps = {
    project: Pick<Project, 'id' | 'title' | 'slug'>;
    section?: ProjectSection;
};

export type AdminPostIndexProps = {
    posts: Post[];
};

export type AdminPostFormProps = {
    post?: Post;
    tags: Tag[];
};

export type AdminTagIndexProps = {
    tags: (Tag & { posts_count: number })[];
};

export type AdminTechnologyIndexProps = {
    technologies: (Technology & { projects_count: number })[];
};

export type AdminPageEditProps = {
    page: Page;
};

export type AdminSettingsProps = {
    settings: SiteSettings;
};
