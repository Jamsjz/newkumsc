'use client';

import Image from "next/image";
import { Expand } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageModal } from "@/components/shared/ImageModal";

type EventBannerProps = {
  imageUrl: string;
  title: string;
};

export function EventBanner({ imageUrl, title }: EventBannerProps) {
  return (
    <div className="mb-12">
      <div className="relative aspect-[16/8] w-full overflow-hidden rounded-xl bg-muted">
        <ImageModal imageUrl={imageUrl} alt={`${title} banner`}>
          {(openModal) => (
            <>
              <Image
                src={imageUrl}
                alt={`${title} banner`}
                fill
                priority
                className="object-contain cursor-pointer"
                onClick={openModal}
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 bg-black/50 text-white hover:bg-black/75"
                onClick={openModal}
              >
                <Expand className="h-6 w-6" />
              </Button>
            </>
          )}
        </ImageModal>
      </div>
    </div>
  );
}
