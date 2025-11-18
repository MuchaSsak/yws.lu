import React from "react";

import ProjectsCard from "@/app/WeSparkProjects/(components)/projectsList/ProjectsCard";

export type WeSparkProjectsCard = {
  name: string;
  description: string;
  imageSrc: string;
  shineColor?: string;
};

const PROJECTS_LIST = [
  {
    name: "Get Your Home — Youth Housing Workshop",
    description: `
Supported by Erasmus+
Finding housing in Luxembourg has become one of the biggest challenges for young people. Many don’t know where to search, how to plan a budget, or how to convince a landlord to trust them.
Get Your Home is a project created and led by Mariia MEKHED, one of our residents, to help young people aged 18–34 navigate the housing market with confidence.

During the session, participants learn:

• Where and under what conditions they can rent housing in Luxembourg
• How to plan their budget and understand rental deposits
• What their rights are as tenants
• How to present themselves effectively to landlords

The project combines information, experience-sharing, and peer support - empowering young people to take their first independent housing steps.    
`,
    imageSrc: "/images/projects/get_your_home.png",
    shineColor: "#ff7820",
  },
  {
    name: "Locked Out — Youth Lens on Housing",
    description: `
“Locked Out” is a creative documentary project that brings together young people living in Luxembourg to explore the housing crisis through their own lens.
Participants learn the fundamentals of documentary filmmaking - from storytelling to camera work - and create short personal films that reflect their experiences, opinions, and hopes about finding a place to call home.
The project aims to give young voices a platform to express how the housing situation shapes their lives and future.
Supported by Fondation Sommer.    
`,
    imageSrc: "/images/projects/locked_out.png",
    shineColor: "#8D30FF",
  },
];

function ProjectsList() {
  return (
    <div className="grid pt-4 [grid-template-columns:repeat(auto-fill,minmax(27rem,1fr))] gap-8">
      {PROJECTS_LIST.map((project) => (
        <ProjectsCard key={project.name} {...project} />
      ))}
    </div>
  );
}

export default ProjectsList;
