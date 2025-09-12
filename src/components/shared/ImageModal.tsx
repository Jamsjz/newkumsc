"use client";

import React from "react";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";

type ImageModalProps = {
  imageUrl: string;
  alt: string;
  children: (openModal: () => void) => React.ReactNode;
};

export function ImageModal({ imageUrl, alt, children }: ImageModalProps) {
  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setPosition({ x, y });
  };

  return (
    <Dialog open={open} onOpenChange={(open) => { setOpen(open); if (!open) setZoom(false) }}>
      {children(() => setOpen(true))}
      <DialogContent
        className="p-4 bg-background/90 backdrop-blur-sm border-0 shadow-lg max-w-screen-xl w-auto h-auto"
      >
        <div className="relative mt-8 overflow-hidden" onClick={(e) => e.stopPropagation()}>
          <Image
            src={imageUrl}
            alt={alt}
            width={0}
            height={0}
            sizes="100vw"
            className={`w-full h-auto object-contain transition-transform duration-300 ease-in-out ${
              zoom ? "cursor-zoom-out" : "cursor-zoom-in"
            }`}
            style={{
              transform: zoom ? "scale(2)" : "scale(1)",
              transformOrigin: `${position.x}% ${position.y}%`,
            }}
            onClick={() => setZoom(!zoom)}
            onMouseMove={handleMouseMove}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}