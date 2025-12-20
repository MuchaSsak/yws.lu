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
  images,
  shineColor = "#ff7820",
  entryAnimationDelay = 0,
}: ProjectsCardProps) {
  const { dictionary } = useLanguage();

  return (
    <motion.div {...motionFadeIn(entryAnimationDelay)}>
      <Card className="relative overflow-hidden max-md:w-[85vw] lex-col flex backdrop-blur-lg shadow bg-background/25">
        <ShineBorder shineColor={shineColor} />

        <div>
          <CardHeader>
            {/* Logo */}
            <Image
              width={240}
              height={0}
              fetchPriority="high"
              src={logoSrc}
              className="object-cover w-[15rem]"
              alt={description}
            />

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
          <span className="text-muted-foreground italic text-sm">
            {dictionary["Pictures gallery:"]}
          </span>
          <div className="flex flex-wrap gap-4 pt-1">
            {images.map((src) => (
              <Image
                width={240}
                height={0}
                key={src}
                src={src}
                className="object-cover w-[15rem]"
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
