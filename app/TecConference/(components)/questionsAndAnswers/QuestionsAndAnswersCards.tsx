"use client";

import React from "react";
import * as motion from "motion/react-client";

import {
  BrushCleaning,
  Calendar1,
  DollarSign,
  HandCoins,
  Headset,
  HeartHandshake,
  LandPlot,
  ListChecks,
  MailQuestionMark,
  NotebookPen,
} from "@/lib/icons";
import { useLanguage } from "@/contexts/LanguageContext";
import { GlareCard } from "@/components/ui/glare-card";

function QuestionsAndAnswersCards() {
  const { dictionary } = useLanguage();

  const QUESTIONS_AND_ANSWERS_CARDS = [
    {
      Icon: <ListChecks className="size-16 text-orange-900" />,
      title: "Conference programme",
      description: (
        <span className="flex-col gap-2 flex">
          <div>
            <span className="font-semibold">Moderation:</span> Youth Work
            Synergy
          </div>
          <div>
            <span className="font-semibold">Introduction to the process:</span>{" "}
            the project and the website Presented by Youth Work Synergy (YWS)
          </div>
          <div>
            <span className="font-semibold">
              The power and language of 25 years of the TEC cycle:
            </span>{" "}
            Research presentation by Ninfea
          </div>
        </span>
      ),
    },
    {
      Icon: <Calendar1 className="size-16 text-orange-900" />,
      title: "Time and date",
      description: "Beginning at 9 April 2026, 14:30-15:30",
    },
    {
      Icon: <Headset className="size-16 text-orange-900" />,
      title: "Format",
      description: (
        <span className="flex-col gap-2">
          <div>Online via Zoom.</div>
          <div>
            If you are unable to attend live, a recording will be sent to
            everyone who has registered.
          </div>
        </span>
      ),
    },
    {
      Icon: <NotebookPen className="size-16 text-orange-900" />,
      title: "Registration",
      description: "Participation is free, but registration is required.",
    },
    {
      Icon: <MailQuestionMark className="size-16 text-orange-900" />,
      title: "Closing invitation",
      description:
        "An open call to continue contributing and stay connected with the initiative.",
    },
  ];

  return (
    <div className="flex justify-center items-center gap-6 flex-wrap">
      {QUESTIONS_AND_ANSWERS_CARDS.map(({ Icon, title, description }, i) => (
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={{
            hidden: {
              y: 200,
            },
            visible: {
              y: 0,
            },
          }}
          transition={{ ease: "easeInOut", delay: 0.125 * i, duration: 0.75 }}
          viewport={{ once: true }}
          key={i}
        >
          <GlareCard className="bg-background/15 text-center px-4 pt-6 flex flex-col items-center gap-1.5">
            {Icon}
            <h3 className="text-xl pb-1.5 font-semibold">{title}</h3>
            <span className="font-medium">{description}</span>
          </GlareCard>
        </motion.div>
      ))}
    </div>
  );
}

export default QuestionsAndAnswersCards;
