import { Link } from '@inertiajs/react';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { cn } from '@/lib/utils';
import type { NavItem } from '@/types';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const { isCurrentUrl } = useCurrentUrl();

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel className="font-mono-ibm text-[0.6rem] uppercase tracking-[0.15em] text-portfolio-text-secondary">
                Navigation
            </SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => {
                    const active = isCurrentUrl(item.href);
                    return (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                asChild
                                isActive={active}
                                tooltip={{ children: item.title }}
                                className={cn(
                                    'font-mono-ibm text-[0.8rem] transition-colors duration-200',
                                    active
                                        ? 'bg-portfolio-bg-subtle text-portfolio-accent'
                                        : 'text-portfolio-text-secondary hover:text-portfolio-text',
                                )}
                            >
                                <Link href={item.href} prefetch>
                                    {item.icon && <item.icon className="size-4" />}
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}
