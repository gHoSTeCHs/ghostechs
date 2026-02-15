import { usePage } from '@inertiajs/react';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export function FlashMessage() {
    const { flash } = usePage().props;
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState<'success' | 'error'>('success');

    useEffect(() => {
        if (flash?.success) {
            setMessage(flash.success);
            setType('success');
            setVisible(true);
        } else if (flash?.error) {
            setMessage(flash.error);
            setType('error');
            setVisible(true);
        }
    }, [flash]);

    useEffect(() => {
        if (!visible) return;

        const timer = setTimeout(() => setVisible(false), 5000);
        return () => clearTimeout(timer);
    }, [visible]);

    if (!message) return null;

    return (
        <div
            className={cn(
                'transition-opacity duration-300',
                visible ? 'opacity-100' : 'pointer-events-none opacity-0',
            )}
            onTransitionEnd={() => {
                if (!visible) setMessage('');
            }}
        >
            <div
                className={cn(
                    'flex items-center justify-between bg-portfolio-bg-subtle px-6 py-3',
                    type === 'success'
                        ? 'border-l-2 border-l-portfolio-accent'
                        : 'border-l-2 border-l-red-500',
                )}
            >
                <span className="font-mono-ibm text-[0.75rem] text-portfolio-text">
                    {message}
                </span>
                <button
                    type="button"
                    onClick={() => setVisible(false)}
                    className="ml-4 text-portfolio-text-secondary transition-colors duration-200 hover:text-portfolio-text"
                >
                    <X className="size-3.5" />
                </button>
            </div>
        </div>
    );
}
