"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";
import { FaPlay, FaPause } from "react-icons/fa6";

interface iVideoProps {
    url: string;
    height?: number;
    width?: number;
    className?: string;
    button?: boolean;
}

export const VideoCard: React.FC<iVideoProps> = ({
    url,
    height = 800,
    width = 1200,
    className,
    button = true,
}) => {
    const [playing, setPlaying] = React.useState<boolean>(false);

    const videoRef = React.useRef<HTMLVideoElement | null>(null);

    const videoHandler = (control: "play" | "pause") => {
        if (control === "play" && videoRef.current) {
            videoRef.current.play();
            setPlaying(true);
        } else if (control === "pause" && videoRef.current) {
            videoRef.current.pause();
            setPlaying(false);
        }
    };
    return (
        <div className="relative">
            <div
                className={cn("w-auto h-96 md:h-[454px] rounded-sm", className)}
            >
                <video
                    ref={videoRef}
                    className="w-full h-full object-cover overflow-hidden rounded-sm"
                    width={width}
                    height={height}
                    src={url}
                    muted
                    autoPlay
                />
            </div>
            {button && (
                <Button
                    className="absolute top-2.5 right-2.5 cursor-pointer w-8 h-8 rounded-full"
                    variant="secondary"
                    onClick={() => videoHandler(playing ? "pause" : "play")}
                >
                    {playing ? (
                        <FaPause className="size-4" />
                    ) : (
                        <FaPlay className="size-4" />
                    )}
                </Button>
            )}
        </div>
    );
};
