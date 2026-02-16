import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

export function ConfirmDialog({
    open,
    onOpenChange,
    onConfirm,
    title,
    description,
    destructive = false,
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
    title: string;
    description: string;
    destructive?: boolean;
}) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="border-portfolio-border bg-portfolio-bg sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="font-mono-space text-portfolio-text">
                        {title}
                    </DialogTitle>
                    <DialogDescription className="font-mono-ibm text-[0.8rem] text-portfolio-text-secondary">
                        {description}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="gap-2 sm:gap-0">
                    <button
                        type="button"
                        onClick={() => onOpenChange(false)}
                        className="rounded-sm border border-portfolio-border px-4 py-2 font-mono-ibm text-[0.8rem] text-portfolio-text-secondary transition-colors hover:bg-portfolio-bg-subtle"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            onConfirm();
                            onOpenChange(false);
                        }}
                        className={`rounded-sm px-4 py-2 font-mono-ibm text-[0.8rem] font-medium transition-colors ${
                            destructive
                                ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20'
                                : 'bg-portfolio-accent/10 text-portfolio-accent hover:bg-portfolio-accent/20'
                        }`}
                    >
                        Confirm
                    </button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
