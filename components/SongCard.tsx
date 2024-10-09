"use client";

import React from "react";
import { Card, CardBody, Image, Button, Slider } from "@nextui-org/react";

import { HeartIcon } from "@/components/icons/HeartIcon";
import {
  PauseCircleIcon,
  PlayCircleIcon,
} from "@/components/icons/PauseCircleIcon";
import { NextIcon } from "@/components/icons/NextIcon";
import { PreviousIcon } from "@/components/icons/PreviousIcon";
import { RepeatOneIcon } from "@/components/icons/RepeatOneIcon";
import { ShuffleIcon } from "@/components/icons/ShuffleIcon";

export default function SongCard({
  songName,
  songArtist,
  songDuration,
  songAlbum,
  songCover,
  songPreviewUrl,
}: {
  songName: string;
  songArtist: string;
  songDuration: number;
  songAlbum: string;
  songCover: string;
  songPreviewUrl: string;
}) {
  const [liked, setLiked] = React.useState(false);
  const [playing, setPlaying] = React.useState(false);

  if (!songPreviewUrl) return;
  const audio = new Audio(songPreviewUrl);

  const playSong = async () => {
    await audio.play();
    console.log("Playing song");
    setPlaying(true);
  };

  const pauseSong = () => {
    console.log("pause");
    audio.pause();
    setPlaying(false);
  };

  return (
    <Card
      isBlurred
      className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px] m-3"
      shadow="sm"
    >
      <CardBody>
        <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
          <div className="relative col-span-6 md:col-span-4">
            <Image
              alt={songName}
              className="object-cover"
              height={200}
              shadow="md"
              src={songCover}
              width="100%"
            />
          </div>

          <div className="flex flex-col col-span-6 md:col-span-8">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-0">
                <h3 className="font-semibold text-foreground/100">
                  {songAlbum}
                </h3>
                <p className="text-small text-foreground/80">{songArtist}</p>
                <h1 className="text-large font-medium mt-2">{songName}</h1>
              </div>
              <Button
                isIconOnly
                className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
                radius="full"
                variant="light"
                onPress={() => setLiked((v) => !v)}
              >
                <HeartIcon
                  className={liked ? "[&>path]:stroke-transparent" : ""}
                  fill={liked ? "currentColor" : "none"}
                />
              </Button>
            </div>

            <div className="flex flex-col mt-3 gap-1">
              <Slider
                aria-label="Music progress"
                classNames={{
                  track: "bg-default-500/30",
                  thumb: "w-2 h-2 after:w-2 after:h-2 after:bg-foreground",
                }}
                color="foreground"
                defaultValue={33}
                size="sm"
              />
              <div className="flex justify-between">
                <p className="text-small">1:23</p>
                <p className="text-small text-foreground/50">4:32</p>
              </div>
            </div>

            <div className="flex w-full items-center justify-center">
              <Button
                isIconOnly
                className="data-[hover]:bg-foreground/10"
                radius="full"
                variant="light"
              >
                <RepeatOneIcon className="text-foreground/80" />
              </Button>
              <Button
                isIconOnly
                className="data-[hover]:bg-foreground/10"
                radius="full"
                variant="light"
              >
                <PreviousIcon />
              </Button>
              <Button
                isIconOnly
                className="w-auto h-auto data-[hover]:bg-foreground/10"
                radius="full"
                variant="light"
              >
                {playing ? (
                  <PlayCircleIcon size={54} onClick={pauseSong} />
                ) : (
                  <PauseCircleIcon size={54} onClick={playSong} />
                )}
              </Button>
              <Button
                isIconOnly
                className="data-[hover]:bg-foreground/10"
                radius="full"
                variant="light"
              >
                <NextIcon />
              </Button>
              <Button
                isIconOnly
                className="data-[hover]:bg-foreground/10"
                radius="full"
                variant="light"
              >
                <ShuffleIcon className="text-foreground/80" />
              </Button>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
