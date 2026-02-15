export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center">
                <span className="font-mono-space text-lg font-bold leading-none text-portfolio-text">
                    S<span className="text-portfolio-accent">.</span>
                </span>
            </div>
            <div className="ml-1 grid flex-1 text-left">
                <span className="truncate font-mono-space text-sm font-bold leading-tight text-portfolio-text">
                    S<span className="text-portfolio-accent">.</span>
                </span>
                <span className="font-mono-ibm text-[0.6rem] uppercase tracking-[0.15em] text-portfolio-text-secondary">
                    admin
                </span>
            </div>
        </>
    );
}
