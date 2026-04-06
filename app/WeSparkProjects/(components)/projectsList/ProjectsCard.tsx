import React from "react";
import * as motion from "motion/react-client";

import { WeSparkProjectsCard } from "@/app/WeSparkProjects/(components)/projectsList/ProjectsList";
import { ShineBorder } from "@/components/ui/shine-border";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import motionFadeIn from "@/lib/animations/motionFadeIn";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";

type ProjectsCardProps = WeSparkProjectsCard & {
  entryAnimationDelay?: number;
};

function ProjectsCard({
  name,
  description,
  logoSrc,
  href,
  hrefLabel,
  images_en,
  images_fr,
  image_size,
  images,
  shineColor = "#ff7820",
  entryAnimationDelay = 0,
}: ProjectsCardProps) {
  const { dictionary, language } = useLanguage();

  const allImages = [...images];
  if (images_en && language === "en") allImages.push(...images_en);
  if (images_fr && language === "fr") allImages.push(...images_fr);

  return (
    <motion.div {...motionFadeIn(entryAnimationDelay)}>
      <Card className="relative overflow-hidden max-md:w-[85vw] flex-col h-full flex backdrop-blur-lg shadow bg-background/25">
        <ShineBorder shineColor={shineColor} />

        <div>
          <CardHeader>
            {/* Logo */}
            {logoSrc && (
              <Image
                width={240}
                height={0}
                fetchPriority="high"
                src={logoSrc}
                className="object-cover w-[15rem]"
                alt={description}
              />
            )}

            {/* Title */}
            <CardTitle className="text-2xl">{name}</CardTitle>
            <CardDescription>
              <pre className="w-fit text-wrap font-sans">{description}</pre>
            </CardDescription>
          </CardHeader>

          {/* Buttons */}
          <CardFooter className="pt-4">
            {href && (
              <Link href={href} target="_blank" tabIndex={-1}>
                <Button
                  className="[&:hover_span]:ml-2 [&:focus-visible_span]:ml-2 hover:font-semibold focus-visible:font-semibold"
                  size="lg"
                >
                  {hrefLabel} <span className="transition-[margin]">→</span>
                </Button>
              </Link>
            )}
          </CardFooter>
        </div>

        {/* Images */}
        <CardContent>
          {allImages.length > 0 && (
            <span className="text-muted-foreground italic text-sm">
              {dictionary["Pictures gallery:"]}
            </span>
          )}
          <div className="flex flex-wrap gap-4 pt-1">
            {allImages.map((src) => (
              <Image
                width={image_size ?? 240}
                height={0}
                key={src}
                src={src}
                className="object-cover"
                alt={description}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default ProjectsCard;
