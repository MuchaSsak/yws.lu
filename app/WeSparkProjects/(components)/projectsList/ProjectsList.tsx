"use client";

import React from "react";

import ProjectsCard from "@/app/WeSparkProjects/(components)/projectsList/ProjectsCard";
import { useLanguage } from "@/contexts/LanguageContext";

export type WeSparkProjectsCard = {
  name: string;
  description: string;
  logoSrc: string;
  href: string;
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
      href: "https://drive.google.com/file/d/1z0IkpH7yZADfVEk9vvXN6S5iAnTdvVjn/view?usp=share_link",
      shineColor: "#ff7820",
      images: [
        "/images/projects/awd.JPG",
        "/images/projects/awd.JPG",
        "/images/projects/awd.JPG",
      ],
      // images: [
      //   "/images/projects/get_your_home_picture_1.jpg",
      //   "/images/projects/get_your_home_picture_2.jpg",
      //   "/images/projects/get_your_home_picture_3.jpg",
      // ],
    },
    {
      name: dictionary.projectLockedOutTitleWeSparkProjects,
      description: dictionary.projectLockedOutDescriptionWeSparkProjects,
      logoSrc: "/images/projects/locked_out_logo.png",
      href: "https://drive.google.com/file/d/1ywjehKL5FkDrsATRWOlFnFHiNXir-mNr/view?usp=sharing ",
      shineColor: "#8D30FF",
      images: [
        "/images/projects/awd.JPG",
        "/images/projects/awd.JPG",
        "/images/projects/awd.JPG",
      ],
      // images: [
      //   "/images/projects/locked_out_picture_1.jpg",
      //   "/images/projects/locked_out_picture_2.jpg",
      //   "/images/projects/locked_out_picture_3.jpg",
      // ],
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
