import type { ReactNode } from 'react';
import { CursorGlow } from '@/components/portfolio/cursor-glow';
import { Footer } from '@/components/portfolio/footer';
import { NavBar } from '@/components/portfolio/nav-bar';

type PortfolioLayoutProps = {
    children: ReactNode;
};

export default function PortfolioLayout({ children }: PortfolioLayoutProps) {
    return (
        <div className="dark relative min-h-screen overflow-hidden bg-background font-mono-ibm">
            <CursorGlow />
            <div className="relative z-[2] mx-auto max-w-[900px] px-8">
                <NavBar />
                <main>{children}</main>
                <Footer />
            </div>
        </div>
    );
}
