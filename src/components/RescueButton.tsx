import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

type Victim = {
    id: string;
    status: "pending" | "rescued";
};

interface RescueButtonProps {
    victim: Victim;
    onRescueComplete: (id: string) => void;
}

export const RescueButton: React.FC<RescueButtonProps> = ({ victim, onRescueComplete }) => {
    return (
        <div>
            {victim.status === "pending" && (
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="outline" className="flex-1">
                            Mark as Rescued
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="z-[1002]"> {/* Set z-index for the dialog content */}
                        <AlertDialogHeader>
                            <AlertDialogTitle>Mark Victim as Rescued?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Are you sure you want to mark this victim as rescued? This action cannot be undone.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => onRescueComplete(victim.id)}>
                                Confirm
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}
        </div>
    );
};
