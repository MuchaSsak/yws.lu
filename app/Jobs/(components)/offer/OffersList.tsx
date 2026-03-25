"use client";

import OfferCard from "@/app/Jobs/(components)/offer/OfferCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { BookOpenText, SquareChartGantt } from "lucide-react";

function OffersList() {
  const { dictionary } = useLanguage();

  return (
    <div className="sm:py-12 max-sm:pb-12 max-sm:pt-4 max-sm:gap-16 sm:gap-8 flex flex-col">
      <OfferCard
        title={dictionary["Property portfolio manager"]}
        description={
          dictionary["6-month fixed-term contract, 20 hours per week"]
        }
        href="/files/CDD_de_6_mois_-_Gestionnaire_du_parc_immobilier_20h_par_semaine.docx"
      >
        <SquareChartGantt className="max-md:size-12 md:size-16 text-red-900" />
      </OfferCard>

      <OfferCard
        isAlignedLeft={false}
        title={dictionary["Educator"]}
        description={
          dictionary[
            "Fixed-term contract (with possibility of permanent contract)"
          ]
        }
        href="/files/CDD_(possible_CDI)_éducateur_trice.docx"
      >
        <BookOpenText className="max-md:size-12 md:size-16 text-red-900" />
      </OfferCard>
    </div>
  );
}

export default OffersList;
