import React from "react";

import { WeSparkProjectsCard } from "@/app/WeSparkProjects/(components)/projectsList/ProjectsList";
import { ShineBorder } from "@/components/ui/shine-border";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function ProjectsCard({
  name,
  description,
  imageSrc,
  shineColor = "#ff7820",
}: WeSparkProjectsCard) {
  return (
    <Card className="relative overflow-hidden  backdrop-blur-lg shadow bg-background/25">
      <ShineBorder shineColor={shineColor} />

      <CardHeader>
        <img
          fetchPriority="high"
          src={imageSrc}
          className="object-cover w-full"
          alt={description}
        />
        <CardTitle className="text-2xl">{name}</CardTitle>
        <CardDescription>
          <pre className="w-fit text-wrap font-sans">{description}</pre>
        </CardDescription>
      </CardHeader>
    </Card>
  );
}

export default ProjectsCard;
