"use client";

import { useLanguage } from "@/contexts/LanguageContext";

function ContactSection() {
  const { dictionary } = useLanguage();

  return (
    <div className="text-center flex flex-col items-center pb-32 pt-8">
      <h1 className="font-black max-sm:text-4xl sm:text-7xl text-orange-gradient sm:leading-20">
        Envoi de la candidature
      </h1>

      <p className="py-8 text-lg md:w-[32.5rem] flex flex-col items-center gap-2">
        Pour considérer votre candidature nous vous demandons de nous envoyer
        par mail: contact@yws.lu
      </p>

      <span className="flex w-fit items-center gap-2.5 text-xl font-semibold">
        - Une lettre de motivation
      </span>
      <span className="flex w-fit items-center gap-2.5 text-xl font-semibold pt-2">
        - Un CV à jour
      </span>
      <span className="flex w-fit items-center gap-2.5 text-xl font-semibold pt-2">
        - Les diplômes nécessaires à cette candidature
      </span>
    </div>
  );
}

export default ContactSection;
