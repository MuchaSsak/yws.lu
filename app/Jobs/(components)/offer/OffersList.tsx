"use client";

import OfferCard from "@/app/Jobs/(components)/offer/OfferCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { BookOpenText, SquareChartGantt } from "lucide-react";

function OffersList() {
  const { dictionary } = useLanguage();

  return (
    <div className="sm:py-12 max-sm:pb-12 max-sm:pt-4 gap-16 flex flex-col">
      <OfferCard
        title={dictionary["Property portfolio manager"]}
        description={
          <>
            <span className="font-semibold">Tâches</span>
            <span className="font-semibold">
              Au quotidien, la personne salariée est en charge de :
            </span>
            <span>
              ● Assurer la gestion, l’entretien et la valorisation des maisons
              louées ;
            </span>
            <span>
              ● Superviser les opérations de maintenance des logements et mettre
              en place une planification du suivi des travaux ;
            </span>
            <span>
              ● Gérer les relations avec les prestataires de services, les
              propriétaires et les locataires ;
            </span>
            <span>
              ● Veiller au respect des réglementations locales et nationales en
              vigueur ;
            </span>
            <span>
              ● La prospection de nouveaux logements et la négociation avec les
              propriétaires ;
            </span>
            <span>
              ● Respecter les engagements de l’association (avec les
              propriétaires, les financeurs et le ministère du Logement) ;
            </span>
            <span>
              ● Représenter l'association sur des stands de promotion des
              activités de l'association ;
            </span>
            <span>
              ● Travail en lien avec la personne chargée du suivi administratif
              et le·a éducateur·rice gradué·e.
            </span>
          </>
        }
        competences={
          <>
            <span className="font-semibold">Compétences & qualifications</span>

            <span>
              ● Tout diplôme et certification permettant la prise en main
              immédiate de cette fonction
            </span>
            <span>
              ● Idéalement 2 ans minimum d'expérience dans une fonction
              similaire
            </span>
            <span>
              ● Connaissance approfondie des règles luxembourgeoises de
              l'ensemble des secteurs concernés (architecture, urbanisme,
              règlements communaux…)
            </span>
            <span>● Sensibilité aux questions sociales et écologiques</span>
            <span>
              ● Maîtrise des outils informatiques et conception de plans
            </span>
            <span>
              ● Excellentes compétences organisationnelles et capacité à gérer
              simultanément divers projets
            </span>
            <span>
              ● Excellentes compétences en communication orale et écrite, en
              relations interpersonnelles et en motivation personnelle
            </span>
            <span>● Capacité de travail en autonomie et en équipe</span>
            <span>● Esprit d'équipe positif, proactif et adaptatif</span>
            <span>
              ● Intérêt particulier pour le renforcement du pouvoir des
              personnes marginalisées afin de lutter pour la justice sociale et
              économique
            </span>
            <span>
              ● Langues parlées : luxembourgeois, français, anglais, et toute
              autre langue constitue un atout
            </span>
          </>
        }
        href="/files/CDD_de_6_mois_-_Gestionnaire_du_parc_immobilier_20h_par_semaine.pdf"
      >
        <SquareChartGantt className="max-md:size-12 md:size-16 text-red-900" />
      </OfferCard>

      <OfferCard
        title={dictionary["Educator"]}
        description={
          <>
            <span className="font-semibold">Tâches</span>
            <span className="font-semibold">
              Au quotidien, la personne salariée est en charge de :
            </span>
            <span>
              ● Assurer l’accueil et l’orientation des jeunes en demande de
              logement
            </span>
            <span>
              ● Assurer le recrutement des jeunes pour l'accès au logement et
              faire le suivi des demandes (analyse des profils, entretiens,
              coordination avec d'autres acteur.rices du secteur pour
              orientation éventuelles vers d'autres services);
            </span>
            <span>
              ● Préparer des jeunes à l'intégration des logements gérés
              (règlement, collaboration, vivre ensemble en collocation...) et
              suivi (ateliers dans les maisons pour répartition des tâches et
              responsabilités et respect des engagements);
            </span>
            <span>● Gérer les conflits, le cas échéant;</span>
            <span>● Soutenir les jeunes dans leur accès aux droits;</span>
            <span>
              ● Faire du coaching pour le renforcement de l'employabilité des
              jeunes (rédaction de CV, préparation à l’entretien, accompagnement
              à l’orientation vers l’emploi ou la formation) et la stabilisation
              personnelle;
            </span>
            <span>
              ● Représenter l'association sur des stands de promotion des
              activités de l'association;
            </span>
            <span>
              ● Travailler en lien avec la personne chargée du suivi
              administratif et celle en charge du parc immobilier géré par
              l’association.
            </span>
          </>
        }
        competences={
          <>
            <span className="font-semibold">Compétences et qualifications</span>
            <span>● Diplôme d'éducateur·rice graduée</span>
            <span>
              ● Idéalement 2 ans minimum d'expérience dans une fonction
              similaire
            </span>
            <span>
              ● Connaissance approfondie de l'écosystème associatif
              luxembourgeois de l'ensemble des secteurs concernés
            </span>
            <span>● Sensibilité aux questions sociales et écologiques</span>
            <span>
              ● Maîtrise des outils informatiques pour la gestion et le suivi
              quotidien des jeunes
            </span>
            <span>
              ● Excellentes compétences organisationnelles et capacité à gérer
              simultanément divers projets
            </span>
            <span>
              ● Excellentes compétences en communication orale et écrite, en
              relations interpersonnelles et en motivation personnelle
            </span>
            <span>● Capacité de travail en autonomie et en équipe</span>
            <span>● Esprit d'équipe positif, proactif et adaptatif</span>
            <span>
              ● Intérêt particulier pour le renforcement du pouvoir des
              personnes marginalisées afin de lutter pour la justice sociale et
              économique
            </span>
            <span>
              ● Langues parlées : luxembourgeois (obligatoire), français,
              anglais et toute autre langue constitue un atout
            </span>
          </>
        }
        href="/files/CDD_(possible_CDI)_éducateur_trice.pdf"
      >
        <BookOpenText className="max-md:size-12 md:size-16 text-red-900" />
      </OfferCard>
    </div>
  );
}

export default OffersList;
