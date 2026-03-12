import React from "react";

import { generateTranslatedMetadata } from "@/lib/utils";
import HeroSection from "@/app/TecConference/(components)/hero/HeroSection";
import GlobeSection from "@/app/TecConference/(components)/globe/GlobeSection";
import WhyItMattersSection from "@/app/TecConference/(components)/whyItMatters/WhyItMattersSection";
import WhatWePresentSection from "@/app/TecConference/(components)/whatWePresent/WhatWePresentSection";
import WhoIsItForSection from "@/app/TecConference/(components)/whoIsItFor/WhoIsItForSection";
import QuestionsAndAnswersSection from "@/app/TecConference/(components)/questionsAndAnswers/QuestionsAndAnswersSection";
import JoinUsSection from "@/app/TecConference/(components)/joinUs/JoinUsSection";
import ConfereProgramSection from "@/app/TecConference/(components)/conferenceProgram/ConferenceProgramSection";

/**
 * Metadata
 */
export function generateMetadata() {
  return generateTranslatedMetadata("tecConferenceMetadata");
}

/**
 * Page
 */
function TecConferencePage() {
  return (
    <>
      <HeroSection />
      <GlobeSection />
      <WhyItMattersSection />
      <ConfereProgramSection />
      <QuestionsAndAnswersSection />
      <WhatWePresentSection />
      <WhoIsItForSection />
      <JoinUsSection />
    </>
  );
}

export default TecConferencePage;
