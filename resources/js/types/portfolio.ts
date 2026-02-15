export type Project = {
    name: string;
    tag: string;
    description: string;
    stack: string[];
    href?: string;
};

export type SocialLink = {
    label: string;
    href: string;
    icon: 'github' | 'linkedin' | 'email';
};

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

export type Technology = {
    id: number;
    name: string;
    slug: string;
    category: string | null;
};

export type ProjectSection = {
    id: number;
    type: SectionType;
    title: string;
    body_html: string;
    sort_order: number;
};

export type ProjectDetail = {
    id: number;
    slug: string;
    title: string;
    tagline: string;
    description: string;
    status: ProjectStatus;
    external_url: string | null;
    github_url: string | null;
    sections: ProjectSection[];
    technologies: Technology[];
};

export type AdjacentProject = {
    slug: string;
    title: string;
};
