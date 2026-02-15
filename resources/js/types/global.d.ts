import type { Auth } from '@/types/auth';
import type { SiteSettings } from '@/types/models';

declare module '@inertiajs/core' {
    export interface InertiaConfig {
        sharedPageProps: {
            name: string;
            auth: Auth;
            sidebarOpen: boolean;
            flash?: { success?: string; error?: string };
            settings?: SiteSettings;
            [key: string]: unknown;
        };
    }
}
