"use client";

import React from "react";

import ProjectsCard from "@/app/WeSparkProjects/(components)/projectsList/ProjectsCard";
import { useLanguage } from "@/contexts/LanguageContext";

export type WeSparkProjectsCard = {
  name: string;
  description: string;
  imageSrc: string;
  shineColor?: string;
};

function ProjectsList() {
  const { dictionary } = useLanguage();

  const PROJECTS_LIST = [
    {
      name: dictionary.projectGetYourHomeTitleWeSparkProjects,
      description: dictionary.projectGetYourHomeDescriptionWeSparkProjects,
      imageSrc: "/images/projects/get_your_home.png",
      shineColor: "#ff7820",
    },
    {
      name: dictionary.projectLockedOutTitleWeSparkProjects,
      description: dictionary.projectLockedOutDescriptionWeSparkProjects,
      imageSrc: "/images/projects/locked_out.png",
      shineColor: "#8D30FF",
    },
  ];

  return (
    <div className="grid pt-4 [grid-template-columns:repeat(auto-fill,minmax(27rem,1fr))] gap-8">
      {PROJECTS_LIST.map((project, i) => (
        <ProjectsCard
          key={project.name}
          entryAnimationDelay={0.15 + i * 0.1}
          {...project}
        />
      ))}
    </div>
  );
}

export default ProjectsList;
