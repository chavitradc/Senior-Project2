"use client"
import { useRef, useEffect } from "react";

interface LiveStreamVideoProps {
    streamUrl: string;
}

const LiveStreamVideo: React.FC<LiveStreamVideoProps> = ({ streamUrl }) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.src = streamUrl;
            videoRef.current.load();
            videoRef.current.play().catch((error) => {
                console.error("Error attempting to play video:", error);
            });
        }
    }, [streamUrl]);

    return (
        <div className=" w-[350px] h-[300px]">
            <video className="w-full h-full object-cover" ref={videoRef} controls autoPlay muted>
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default LiveStreamVideo;
