"use client";

import React from "react";
import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import useGetHousesPicturesURLs from "@/hooks/tanstack/useGetHousesPicturesURLs";

function RealImpactCarousel() {
  const { data: housesPicturesURLs } = useGetHousesPicturesURLs();

  return (
    <Carousel opts={{ loop: true }}>
      <CarouselContent className="h-[30rem] md:w-[40rem] max-md:w-screen">
        {/* Houses pictures */}
        {housesPicturesURLs?.map((pictureURL, i) => (
          <CarouselItem key={pictureURL} className="w-min max-md:pr-4">
            <Image
              src={pictureURL}
              alt={`Youth Work Synergy (YWS) Shared House Picture #${i}`}
              className="mx-auto object-contain h-full w-full"
              width={500}
              height={500}
            />
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="max-md:left-[40%] max-md:-bottom-16 max-md:top-[unset] max-md:-translate-x-1/2" />
      <CarouselNext className="max-md:left-[60%] max-md:-bottom-16 max-md:top-[unset] max-md:-translate-x-1/2" />
    </Carousel>
  );
}

export default RealImpactCarousel;
