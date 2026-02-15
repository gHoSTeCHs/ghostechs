import { Link } from '@inertiajs/react';
import { Cpu, FileCode, FileText, FolderKanban, LayoutGrid, Settings, Tag } from 'lucide-react';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes/admin';
import { index as postsIndex } from '@/routes/admin/posts';
import { edit as pagesEdit } from '@/routes/admin/pages';
import { index as projectsIndex } from '@/routes/admin/projects';
import { index as settingsIndex } from '@/routes/admin/settings';
import { index as tagsIndex } from '@/routes/admin/tags';
import { index as technologiesIndex } from '@/routes/admin/technologies';
import type { NavItem } from '@/types';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard.url(),
        icon: LayoutGrid,
    },
    {
        title: 'Projects',
        href: projectsIndex.url(),
        icon: FolderKanban,
    },
    {
        title: 'Posts',
        href: postsIndex.url(),
        icon: FileText,
    },
    {
        title: 'Tags',
        href: tagsIndex.url(),
        icon: Tag,
    },
    {
        title: 'Technologies',
        href: technologiesIndex.url(),
        icon: Cpu,
    },
    {
        title: 'Pages',
        href: pagesEdit.url('about'),
        icon: FileCode,
    },
    {
        title: 'Settings',
        href: settingsIndex.url(),
        icon: Settings,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard.url()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
