import { ToastActionElement } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { CircleAlert, CircleCheck, Info, TriangleAlert } from "lucide-react";

type Variant = "default" | "destructive" | "error" | "success" | "warning" | "info";

interface ToastifyOptions {
    variant?: Variant;
    title: string;
    action?: ToastActionElement;
}

/**
 * custom hook to show toast messages with different variants
 * @returns toast of shadcn with different variants
 */
export function useToastify() {
    const { toast } = useToast();

    const showToast = ({ variant = "default", title, action }: ToastifyOptions) => {
        const variantClassMap = {
            default: { icon: null },
            destructive: {
                icon: <CircleAlert fill="red" className="w-5 h-5 text-accent" />,
            },
            error: {
                icon: <CircleAlert fill="red" className="w-5 h-5 text-accent" />,
            },
            success: {
                icon: <CircleCheck fill="green" className="w-5 h-5 text-accent" />,
            },
            warning: {
                icon: <TriangleAlert fill="orange" className="w-5 h-5 text-accent" />,
            },
            info: {
                icon: <Info fill="blue" className="w-5 h-5 text-accent" />,
            },
        };

        const classes = variantClassMap[variant] || variantClassMap.default;

        toast({
            description: (
                <div className="flex items-center space-x-2">
                    {classes.icon && <span>{classes.icon}</span>}
                    <span className="font-semibold">{title}</span>
                </div>
            ),
            action,
            className:
                "fixed top-0 left-[50%] z-[100] flex max-h-screen w-fit translate-x-[-50%] flex-col-reverse p-4 sm:right-0 sm:flex-col md:max-w-[420px]",
        });
    };

    return { toast: showToast };
}
