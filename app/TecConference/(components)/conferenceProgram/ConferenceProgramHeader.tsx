"use client";

import React from "react";

import { useLanguage } from "@/contexts/LanguageContext";
import {
  Clock,
  MailPlus,
  NotebookText,
  Presentation,
  Star,
} from "lucide-react";

function ConferenceProgramHeader() {
  const { dictionary } = useLanguage();

  return (
    <div className="text-center">
      {/* Title */}
      <h1 className="font-black max-sm:text-4xl sm:text-6xl text-orange-gradient sm:leading-20">
        Conference programme
      </h1>

      <p className="sm:w-[35rem] text-lg pt-4 max-sm:px-4 items-center mx-auto flex flex-row justify-center gap-2">
        The programme of the conference is as follows:
      </p>

      <ul className="text-xl flex flex-col gap-4 pt-6 text-left w-1/2 mx-auto">
        <li>
          <span className="font-semibold mr-0.5">
            <MailPlus className="inline-block" /> Closing invitation:
          </span>{" "}
          an open call to continue contributing and stay connected with the
          initiative.
        </li>
        <div className="bg-slate-500 h-px w-full" />
        <li>
          <span className="font-semibold mr-0.5">
            <Star className="inline-block" /> Moderation:
          </span>{" "}
          Youth Work Synergy
        </li>
        <div className="bg-slate-500 h-px w-full" />
        <li>
          <span className="font-semibold mr-0.5">
            <Presentation className="inline-block" /> Introduction to the
            process:
          </span>{" "}
          the project and the website Presented by Youth Work Synergy (YWS)
        </li>
        <div className="bg-slate-500 h-px w-full" />
        <li>
          <span className="font-semibold mr-0.5">
            <NotebookText className="inline-block" /> The power and language of
            25 years of the TEC cycle:{" "}
          </span>{" "}
          Research presentation by Ninfea
        </li>
      </ul>
    </div>
  );
}

export default ConferenceProgramHeader;
