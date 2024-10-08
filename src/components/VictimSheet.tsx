import React from 'react';
import { Navigation, Info } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import LiveStreamVideo from './StreamingVideo';
import { RescueButton } from './RescueButton';

type Victim = {
    id: string;
    lat: number;
    lng: number;
    status: "pending" | "rescued";
};

interface VictimSheetProps {
    victim: Victim | null;
    isOpen: boolean;
    onClose: () => void;
    onRescueComplete: (id: string) => void;
}

export const VictimSheet: React.FC<VictimSheetProps> = ({
    victim,
    isOpen,
    onClose,
    onRescueComplete,
}) => {
    if (!victim) return null;

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent
                className="z-[1001] w-[400px] sm:w-[540px] bg-white/95 backdrop-blur-sm"
                side="right"
            >
                <SheetHeader className="space-y-4">
                    <SheetTitle className="flex items-center gap-2 text-2xl">
                        <Info />
                        {"Information"}
                    </SheetTitle>
                    <SheetDescription className="space-y-6">
                        <div className="space-y-4">
                            <LiveStreamVideo streamUrl={'https://content.jwplatform.com/manifests/yp34SRmf.m3u8'} />
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Status</h3>
                                <p className="text-gray-600 capitalize">{victim.status}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Coordinates</h3>
                                <p className="flex items-center gap-2 text-gray-600">
                                    <Navigation className="h-4 w-4" />
                                    {victim.lat.toFixed(6)}, {victim.lng.toFixed(6)}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3 pt-4">
                            <Button
                                className="flex-1"
                                onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${victim.lat},${victim.lng}`)}
                            >
                                Get Directions
                            </Button>


                            <RescueButton
                                victim={victim}
                                onRescueComplete={onRescueComplete}
                            />
                        </div>
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    );
};
