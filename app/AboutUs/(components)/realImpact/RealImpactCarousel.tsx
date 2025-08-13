"use client";

import React from "react";
import Image from "next/image";

import RealImpactMap from "@/app/AboutUs/(components)/realImpact/RealImpactMap";
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
    <Carousel opts={{ loop: true }} className="">
      <CarouselContent className="h-[30rem]">
        {/* Map */}
        <CarouselItem className="w-min">
          <RealImpactMap />
        </CarouselItem>

        {/* Houses pictures */}
        {housesPicturesURLs?.map((pictureURL, i) => (
          <CarouselItem key={pictureURL} className="w-min">
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
