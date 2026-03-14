"use client";

import React from "react";

import ProjectsCard from "@/app/WeSparkProjects/(components)/projectsList/ProjectsCard";
import { useLanguage } from "@/contexts/LanguageContext";

export type WeSparkProjectsCard = {
  name: string;
  description: string;
  logoSrc?: string;
  href?: string;
  hrefLabel: string;
  images: string[];
  shineColor?: string;
};

function ProjectsList() {
  const { dictionary } = useLanguage();

  const PROJECTS_LIST = [
    {
      name: dictionary.projectGetYourHomeTitleWeSparkProjects,
      description: dictionary.projectGetYourHomeDescriptionWeSparkProjects,
      logoSrc: "/images/projects/get_your_home_logo.png",
      shineColor: "#ff7820",
      images: [
        "/images/projects/get-your-home/1.JPG",
        "/images/projects/get-your-home/2.JPG",
        "/images/projects/get-your-home/3.JPG",
        "/images/projects/get-your-home/4.JPG",
        "/images/projects/get-your-home/5.JPG",
        "/images/projects/get-your-home/6.JPG",
      ],
      href: "https://docs.google.com/forms/d/e/1FAIpQLSdNnphOFE95EwvyIlIrZLubIiV-VRsMfgFElhcldRqpWb6zXQ/viewform",
      hrefLabel: dictionary["Register now"],
    },
    {
      name: dictionary.projectLockedOutTitleWeSparkProjects,
      description: dictionary.projectLockedOutDescriptionWeSparkProjects,
      logoSrc: "/images/projects/locked_out_logo.png",
      href: "https://drive.google.com/file/d/1ywjehKL5FkDrsATRWOlFnFHiNXir-mNr/view?usp=sharing",
      shineColor: "#2757F5",
      images: [
        "/images/projects/locked-out/1.JPG",
        "/images/projects/locked-out/2.JPG",
        "/images/projects/locked-out/3.JPG",
        "/images/projects/locked-out/4.JPG",
      ],
      hrefLabel: dictionary["Learn more"],
    },
    {
      name: dictionary.projectGirlsSectiveTitleWeSparkProjects,
      description: dictionary.projectGirlsSectiveDescriptionWeSparkProjects,
      shineColor: "#8D30FF",
      images: [],
      hrefLabel: dictionary["Learn more"],
    },
    {
      name: dictionary.projectMobileLearningTitleWeSparkProjects,
      description: dictionary.projectMobileLearningDescriptionWeSparkProjects,
      shineColor: "#F5276F",
      images: [],
      hrefLabel: dictionary["Learn more"],
    },
    {
      name: dictionary.projectSportTitleWeSparkProjects,
      description: dictionary.projectSportDescriptionWeSparkProjects,
      shineColor: "#54F527",
      images: [],
      hrefLabel: dictionary["Learn more"],
    },
    {
      name: dictionary.projectSelfChronicleTitleWeSparkProjects,
      description: dictionary.projectSelfChronicleDescriptionWeSparkProjects,
      shineColor: "#F2F527",
      images: [],
      hrefLabel: dictionary["Learn more"],
    },
  ];

  return (
    <div className="grid pt-4 [grid-template-columns:repeat(auto-fill,minmax(45rem,1fr))] gap-8">
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
