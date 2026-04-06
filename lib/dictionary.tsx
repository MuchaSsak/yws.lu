import type { Metadata } from "next";
import Link from "next/link";

import {
  YWS_LINKEDIN_LINK,
  DEVELOPER_GITHUB_LINK,
  YWS_FACEBOOK_LINK,
  YWS_INSTAGRAM_LINK,
  YWS_WEBSITE_LINK,
  YWS_EMAIL,
  YWS_PHONE_NUMBER,
} from "@/lib/constants";
import { TextAnimate } from "@/components/magicui/text-animate";
import { BoxReveal } from "@/components/magicui/box-reveal";

export type LanguageLocale = keyof typeof DICTIONARY;

type AvailableLanguage = {
  value: LanguageLocale;
  label: string;
  labelNative: string;
  Icon?: React.ReactNode;
};

export const AVAILABLE_LANGUAGES: AvailableLanguage[] = [
  {
    value: "en",
    label: "English",
    labelNative: "English",
    Icon: "🇬🇧",
  },
  {
    value: "fr",
    label: "French",
    labelNative: "Français",
    Icon: "🇫🇷",
  },
];

export const DICTIONARY = {
  /**
   * English
   */
  en: {
    Jobs: "Jobs",
    "Property portfolio manager": "Gestionnaire du parc immobilier",
    "6-month fixed-term contract, 20 hours per week":
      "6-month fixed-term contract, 20 hours per week",
    "TEC Conference": "TEC Conference",
    "Interested in renting your property to us?":
      "Interested in renting your property to us?",
    "Property Maintenance": "Property Maintenance",
    "Property Flexibility": "Property Flexibility",
    "Ongoing Tenant Support": "Ongoing Tenant Support",
    "Tax Benefits": "Tax Benefits",
    "Guaranteed Rent": "Guaranteed Rent",
    "Why Rent to Us?": "Why Rent to Us?",
    "Job Offers": "Job Offers",
    "Rent Out Your Property": "Rent Out Your Property",
    "Rent your property with confidence:":
      "Rent your property with confidence:",
    "safe, reliable & impactful": "safe, reliable & impactful",
    "Who Gets Priority?": "Who Gets Priority?",
    "Our Selection Process": "Our Selection Process",
    "Personal Interview": "Personal Interview",
    "Let's Talk": "Let's Talk",
    "Fill Out the Form": "Fill Out the Form",
    "Here's how it works": "Here's how it works",
    "Meet the team": "Meet the team",
    "Real impact": "Real impact",
    "Our mission": "Our mission",
    Homepage: "Homepage",
    "Looking for housing": "Looking for housing",
    "About us": "About us",
    "Who we are": "Who we are",
    "Contact us": "Contact us",
    "Rent your property": "Rent your property",
    "Apply for housing": "Apply for housing",
    "See for yourself": "See for yourself",
    "Youth-Led Projects!": "Youth-Led Projects!",
    "Apply now": "Apply now",
    "Looking for housing?": "Looking for housing?",
    "Give youth a chance for a": "Give youth a chance for a",
    "better future": "better future",
    "Learn more": "Learn more",
    "Rent out": "Rent out",
    "Rent now": "Rent now",
    your: "your",
    property: "property",
    "Cheers to them!": "Cheers to them!",
    "Credits 💖": "Credits 💖",
    "Choose your destination": "Choose your destination",
    "All rights reserved": "All rights reserved",
    "See credits": "See credits",
    Coaching: "Coaching",
    Sustainability: "Sustainability",
    Affordability: "Affordability",
    creditsDescription: (
      <span className="flex flex-col gap-2">
        <span>
          <span className="font-bold">"Cat House"</span> (
          <Link
            href="https://skfb.ly/oOAM6"
            target="_blank"
            className="hover:underline focus-visible:underline"
          >
            https://skfb.ly/oOAM6
          </Link>
          ) by <span className="font-bold">Roman_Nilikovskii</span> is licensed
          under <span className="italic">Creative Commons Attribution</span> (
          <Link
            className="hover:underline focus-visible:underline"
            href="http://creativecommons.org/licenses/by/4.0/"
            target="_blank"
          >
            http://creativecommons.org/licenses/by/4.0/
          </Link>
          ).
        </span>
        <span>
          <span className="font-bold">"Cosmonaut on a rocket"</span> (
          <Link
            href="https://skfb.ly/o6AyV"
            target="_blank"
            className="hover:underline focus-visible:underline"
          >
            https://skfb.ly/o6AyV
          </Link>
          ) by <span className="font-bold">Yury Misiyuk</span> is licensed under{" "}
          <span className="italic">Creative Commons Attribution</span> (
          <Link
            className="hover:underline focus-visible:underline"
            href="http://creativecommons.org/licenses/by/4.0/"
            target="_blank"
          >
            http://creativecommons.org/licenses/by/4.0/
          </Link>
          ).
        </span>
        <span>
          <span className="font-bold">"Heart in Love"</span> (
          <Link
            href="https://skfb.ly/6SusI"
            target="_blank"
            className="hover:underline focus-visible:underline"
          >
            https://skfb.ly/6SusI
          </Link>
          ) by <span className="font-bold">Azamuki</span> is licensed under{" "}
          <span className="italic">Creative Commons Attribution</span> (
          <Link
            className="hover:underline focus-visible:underline"
            href="http://creativecommons.org/licenses/by/4.0/"
            target="_blank"
          >
            http://creativecommons.org/licenses/by/4.0/
          </Link>
          ).
        </span>
        <span>
          <span className="font-bold">"Loft Bedroom"</span> (
          <Link
            href="https://skfb.ly/oznqR"
            target="_blank"
            className="hover:underline focus-visible:underline"
          >
            https://skfb.ly/oznqR
          </Link>
          ) by <span className="font-bold">dylanheyes</span> is licensed under{" "}
          <span className="italic">Creative Commons Attribution</span> (
          <Link
            className="hover:underline focus-visible:underline"
            href="http://creativecommons.org/licenses/by/4.0/"
            target="_blank"
          >
            http://creativecommons.org/licenses/by/4.0/
          </Link>
          ).
        </span>
        <span>
          <span className="font-bold">"Stylized Wardrobe"</span> (
          <Link
            href="https://skfb.ly/oGSTF"
            target="_blank"
            className="hover:underline focus-visible:underline"
          >
            https://skfb.ly/oGSTF
          </Link>
          ) by <span className="font-bold">stefan</span> is licensed under{" "}
          <span className="italic">Creative Commons Attribution</span> (
          <Link
            className="hover:underline focus-visible:underline"
            href="http://creativecommons.org/licenses/by/4.0/"
            target="_blank"
          >
            http://creativecommons.org/licenses/by/4.0/
          </Link>
          ).
        </span>
        <span className="my-2 h-0.5 w-full bg-muted-foreground/75" />
        <span>
          <span className="font-bold">Lead Developer</span> (
          <Link
            href={YWS_WEBSITE_LINK}
            target="_blank"
            className="hover:underline focus-visible:underline"
          >
            {YWS_WEBSITE_LINK}
          </Link>
          ){" — "}
          <Link
            href={DEVELOPER_GITHUB_LINK}
            target="_blank"
            className="font-bold hover:underline focus-visible:underline"
          >
            Mateusz Muszarski
          </Link>{" "}
          ✌️
        </span>
      </span>
    ),
    heroDescriptionHomepage: (
      <>
        <span>
          Turn your property into a home for young people in Luxembourg.
        </span>
        <span>
          We are a trusted Luxembourg-based non-profit (ASBL) working in
          collaboration with the Ministry of Housing.
        </span>
        <span>
          Partnering with us means doing good and making a smart financial
          choice — including up to 90% tax exemption on your net rental income
          and other benefits.
        </span>
      </>
    ),
    heroDescriptionJobs: (
      <>
        <span>
          Youth Work Synergy (YWS) est une association de terrain basée au
          Luxembourg, active dans le développement d’un travail de jeunesse
          innovant et inclusif. Elle combine l’accès au logement abordable avec
          l’éducation non formelle et la participation citoyenne afin de
          renforcer l’autonomie, l’engagement et les compétences transversales
          des jeunes. Partant du principe qu’offrir un toit aux personnes
          constitue la première étape d’une stabilisation personnelle,
          l’association met en œuvre des projets de colocation à destination de
          jeunes ayant moins d’opportunités. Ces actions sont complétées par des
          ateliers sur les droits sociaux, la transition écologique et la
          citoyenneté active, ainsi que par un travail de coopération et de
          plaidoyer avec les communes et les acteurs locaux.
        </span>
      </>
    ),
    heroDescriptionAboutUs: (
      <>
        <BoxReveal boxColor="#fa8534" duration={0.5}>
          <span className="font-bold">
            Rent out your property — Give youth a chance for a better future
          </span>
        </BoxReveal>
        <BoxReveal boxColor="#fa8534" duration={0.6}>
          <span>
            Turn your property into a home for young people in Luxembourg.
          </span>
        </BoxReveal>
        <BoxReveal boxColor="#fa8534" duration={0.7}>
          <span>
            We turn empty houses into real homes — and change lives in the
            process.
          </span>
        </BoxReveal>
        <BoxReveal boxColor="#fa8534" duration={0.8}>
          <span>
            In Luxembourg, hundreds of young people are struggling to find a
            place to live. Rents are high, requirements are strict, and for many
            aged 18 - 34, securing housing without family support is simply out
            of reach. That's where we come in.
          </span>
        </BoxReveal>
        <BoxReveal boxColor="#fa8534" duration={0.9}>
          <span>
            We are a Luxembourg-based non-profit (ASBL) with GLS (Gestion
            Locative Sociale) status, working in collaboration with the Ministry
            of Housing to solve the youth housing crisis.
          </span>
        </BoxReveal>
      </>
    ),
    ourMissionDescriptionAboutUs: (
      <>
        <TextAnimate animation="fadeIn" by="word" as="span" duration={0.65}>
          We help young people transition into independent, fulfilling lives by
          combining access to housing with educational and emotional support.
        </TextAnimate>
      </>
    ),
    ourMissionCardOneDescriptionAboutUs:
      "Our youth educators offer personalized coaching to help residents find jobs, training, return to school or help with their initiatives!",
    ourMissionCardTwoDescriptionAboutUs:
      "Providing affordable housing, we help youth to find a place which they can actually afford, right here in Luxembourg.",
    ourMissionCardThreeDescriptionAboutUs:
      "Sustainable living — our homes are furnished with high-quality second-hand items, proving that eco-conscious choices are both affordable and beautiful.",
    whoWeAreDescriptionHomepage: (
      <>
        <TextAnimate animation="fadeIn" by="word" as="span" duration={0.65}>
          Youth Work Synergy (YWS) is a local non-profit dedicated to tackling
          the housing crisis by offering affordable and stable coliving spaces
          for young people aged 18 - 34.
        </TextAnimate>
        <TextAnimate animation="fadeIn" by="word" as="span" duration={0.65}>
          We rent houses from private owners and sublet rooms for young tenants
          — while providing them with educational support and guidance toward
          independence.
        </TextAnimate>
      </>
    ),
    lookingForHousingDescriptionHomepage: (
      <>
        <TextAnimate animation="fadeIn" by="word" as="span" duration={0.65}>
          We provide fully furnished rooms in shared homes — with support,
          coaching, and a safe environment. Are you a young person in Luxembourg
          looking for housing?
        </TextAnimate>
        <TextAnimate animation="fadeIn" by="word" as="span" duration={0.65}>
          Complete our quick form and we'll contact you as soon as place becomes
          available.
        </TextAnimate>
      </>
    ),
    youthLedProjectsDescriptionHomepage: (
      <>
        <TextAnimate animation="fadeIn" by="word" as="span" duration={0.65}>
          The young people living in our houses don't just find a place to live
          — they find space to grow.
        </TextAnimate>
        <TextAnimate animation="fadeIn" by="word" as="span" duration={0.65}>
          We support residents in developing and running their own social,
          cultural, or educational projects. With our professional guidance and
          encouragement these initiatives reflect their creativity, resilience
          and drive to make a difference.
        </TextAnimate>
      </>
    ),
    realImpactDescriptionAboutUs: (
      // Default statistics if fetching is unsuccessful
      sharedHouses = 6,
      youngstersHelped = 30,
      youngstersWaiting = 300,
    ) => (
      <>
        <TextAnimate animation="fadeIn" by="word" as="span" duration={0.65}>
          {`Since 2023, we've already opened ${sharedHouses} shared houses across the country — providing stable homes for over ${youngstersHelped} young people. But demand is growing fast, and with over ${youngstersWaiting} requests on our waiting list, we're ready to do more — with your help.`}
        </TextAnimate>
      </>
    ),
    teamDescriptionAboutUs: (
      <>
        <TextAnimate animation="fadeIn" by="word" as="span" duration={0.65}>
          Get to know the people behind YWS.
        </TextAnimate>
        <TextAnimate animation="fadeIn" by="word" as="span" duration={0.65}>
          We're a committed group of youth workers, educators, housing
          coordinators, architects working together to make housing accessible
          to young people.
        </TextAnimate>
        <TextAnimate animation="fadeIn" by="word" as="span" duration={0.65}>
          Scroll through to see our team members and find contact details if you
          need to reach out.
        </TextAnimate>
      </>
    ),
    heroDescriptionLookingForHousing: (
      <>
        <BoxReveal boxColor="#fa8534" duration={0.5}>
          <span>
            Are you between 18 and 34 and in need of stable, affordable housing
            in Luxembourg?
          </span>
        </BoxReveal>
        <BoxReveal boxColor="#fa8534" duration={0.6}>
          <span>We're here to help</span>
        </BoxReveal>
      </>
    ),
    timelineFillOutTheFormDescriptionLookingForHousing:
      "Start by completing a short application form. This helps us understand your situation and what kind of housing you need.",
    timelineLetsTalkDescriptionLookingForHousing:
      "After we receive your application, someone from our team will contact you to schedule a meeting. We'll talk about your background, current needs, and how we can support you.",
    timelinePersonalInterviewDescriptionLookingForHousing:
      "During your appointment, we'll go into more detail and assess whether one of our houses could be a good fit for you.",
    timelineOurSelectionProcessDescriptionLookingForHousing:
      "After the interviews, our team carefully reviews all applications and selects candidates based on key criteria like urgency, motivation, and readiness for communal living.",
    whoGetsPriorityDescriptionLookingForHousing: (
      <>
        <TextAnimate animation="fadeIn" by="word" as="span" duration={0.65}>
          We prioritize young people in urgent situations — like eviction or
          sudden loss of income. We also check for basic financial stability to
          ensure long-term housing. We aim to create a respectful and balanced
          living environment, including gender diversity when possible. Due to
          high demand and limited space, we can't help everyone right away — but
          we review each request with care and responsibility.
        </TextAnimate>
      </>
    ),
    heroDescriptionRentYourProperty: (
      <>
        <BoxReveal boxColor="#fa8534" duration={0.5}>
          <span>
            We are always looking to rent any type of residential property —
            whether it's a house, apartment, or individual room.
          </span>
        </BoxReveal>
        <BoxReveal boxColor="#fa8534" duration={0.6}>
          <span>
            Our goal is to offer safe, affordable housing to young people in
            need, and we do it in partnership with property owners like you.
          </span>
        </BoxReveal>
        <BoxReveal boxColor="#fa8534" duration={0.7}>
          <span>
            By working with us, you're not only helping build someone's future —
            you also enjoy a reliable, worry-free rental experience.
          </span>
        </BoxReveal>
      </>
    ),
    whyRentToUsDescriptionRentYourProperty: (
      <>
        <TextAnimate animation="fadeIn" by="word" as="span" duration={0.65}>
          We take care of your property — from renovation to insurance.
        </TextAnimate>
        <TextAnimate animation="fadeIn" by="word" as="span" duration={0.65}>
          Whether your house needs light repairs or full renovation, we can
          manage the work professionally and at fair cost, always with your
          agreement. We prepare each property for sale, long-term use and fully
          furnish it.
        </TextAnimate>
        <TextAnimate animation="fadeIn" by="word" as="span" duration={0.65}>
          We also ensure full insurance coverage against unexpected events and
          take full responsibility for maintenance and tenant supervision.
        </TextAnimate>
        <TextAnimate animation="fadeIn" by="word" as="span" duration={0.65}>
          Renting to YWS means peace of mind, guaranteed rent, and your property
          used for a meaningful purpose.
        </TextAnimate>
      </>
    ),
    whyRentToUsGuaranteedRentRentYourProperty:
      "By signing a lease with our certified organization, you receive guaranteed rent every month, no exceptions — even if the property is temporarily vacant.",
    whyRentToUsTaxBenefitsRentYourProperty:
      "As a landlord, you benefit from a 90% tax exemption on net rental income. This significantly offsets the fact that the rent is typically 30-40% lower than private market rates.",
    whyRentToUsOngoingTenantSupportRentYourProperty:
      "All tenants are monitored and supported by trained social workers throughout the lease. If any issue arrives, our professional team intervenes directly.",
    whyRentToUsPropertyFlexibilityRentYourProperty:
      "Your property remains available to you and your family. If you ever need to reclaim it for personal use, we will handle the relocation of the current occupants swiftly and respectfully.",
    whyRentToUsPropertyMaintenanceRentYourProperty:
      "Our partner organizations have technical teams that perform regular checkups and small maintenance tasks to ensure your property is well maintained at all times.",
    interestedInRentingDescriptionRentYourProperty: (
      <>
        <TextAnimate animation="fadeIn" by="word" as="span" duration={0.65}>
          Get in touch directly. We'd love to hear from you.
        </TextAnimate>
      </>
    ),
    METADATA: {
      rootMetadata: {
        title: "Youth Work Synergy",
        description:
          "Youth Work Synergy (YWS) is a non-profit organization in Luxembourg that transforms empty homes into safe, affordable shared housing for young people aged 18–34. Partner with us to rent out your property and benefit from guaranteed rent, tax advantages, and professional maintenance — while making a real social impact.",
        keywords: [
          "Youth housing Luxembourg",
          "rent property nonprofit",
          "guaranteed rent landlord",
          "affordable housing for youth",
          "ASBL housing initiative",
          "property tax benefit Luxembourg",
          "social impact housing",
          "rent to Youth Work Synergy",
        ],
        openGraph: {
          "og:title": "Youth Work Synergy ASBL Luxembourg",
          "og:description":
            "Help tackle Luxembourg's housing crisis by renting your property to Youth Work Synergy. Guaranteed rent, tax incentives, full support — and real impact for young people.",
          "og:type": "website",
          "og:url": YWS_WEBSITE_LINK,
          "og:image": `${YWS_WEBSITE_LINK}/logo.png`,
        },
        twitter: {
          "twitter:card": "summary_large_image",
          "twitter:title": "Youth Work Synergy ASBL Luxembourg",
          "twitter:description":
            "Partner with Youth Work Synergy to rent out your property in Luxembourg. Enjoy guaranteed rent, tax benefits, and a chance to change lives.",
          "twitter:image": `${YWS_WEBSITE_LINK}/logo.png`,
        },
        alternates: {
          canonical: YWS_WEBSITE_LINK,
        },
        metadataBase: new URL(YWS_WEBSITE_LINK),
        url: YWS_WEBSITE_LINK,
        logo: `${YWS_WEBSITE_LINK}/logo.png`,
        sameAs: [YWS_FACEBOOK_LINK, YWS_INSTAGRAM_LINK, YWS_LINKEDIN_LINK],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          email: YWS_EMAIL,
          telephone: YWS_PHONE_NUMBER,
        },
        robots: "index, follow",
        creator: "Mateusz Muszarski",
      } as Metadata,
      aboutUsMetadata: {
        title: "Youth Work Synergy | About Us",
        description:
          "Youth Work Synergy is a Luxembourg-based non-profit transforming empty homes into safe, affordable shared housing for young people aged 18-34. Learn about our mission, team, and how we support youth through housing, coaching, and social projects to create real impact in the community.",
      } as Metadata,
      tecConferenceMetadata: {
        title: "Youth Work Synergy | TEC Conference",
        description:
          "Join us for the closing conference of V - Comprehensive Guide to Best Practices in Mobile Learning for Adults and discover how the knowledge, methods, and practices developed through the Training & Evaluation Cycle (TEC) can support professionals and volunteers working with people on the move.",
      } as Metadata,
      jobsMetadata: {
        title: "Youth Work Synergy | Jobs",
        description:
          "Explore job opportunities at Youth Work Synergy. Join our mission to provide safe and affordable shared housing for young people in Luxembourg while contributing to impactful social projects, coaching, and community development.",
      } as Metadata,
      lookingForHousingMetadata: {
        title: "Youth Work Synergy | Apply For Housing",
        description:
          "Looking for stable, affordable housing in Luxembourg? We offer fully furnished shared homes with support and coaching for young people aged 18-34. Apply now to secure your place and get personalized help on your journey to independent living.",
      } as Metadata,
      rentYourPropertyMetadata: {
        title: "Youth Work Synergy | Rent Your Property",
        description:
          "We are always looking to rent any type of residential property — whether it's a house, apartment, or individual room. Partner with us to provide safe, affordable housing to young people in need while enjoying a reliable, worry-free rental experience.",
      } as Metadata,
      weSparkProjectsMetadata: {
        title: "Youth Work Synergy | We Spark Projects",
        description:
          "Discover We Spark Projects — youth-led initiatives supported by Youth Work Synergy. Explore creative workshops, housing education sessions, and documentary projects that empower young people in Luxembourg to navigate housing challenges, build skills, and share their stories.",
      } as Metadata,
    },
    heroDescriptionWeSparkProjects:
      "Here's a showcase of projects we've helped to bring to life.",
    "We Spark Projects": "We Spark Projects",
    projectGetYourHomeTitleWeSparkProjects:
      "Get Your Home — Youth Housing Workshop",
    projectGetYourHomeDescriptionWeSparkProjects: `Supported by Erasmus+
Finding housing in Luxembourg has become one of the biggest challenges for young people. Many don’t know where to search, how to plan a budget, or how to convince a landlord to trust them.
Get Your Home is a project created and led by Mariia MEKHED, one of our residents, to help young people aged 18–34 navigate the housing market with confidence.

During the session, participants learn:

• Where and under what conditions they can rent housing in Luxembourg
• How to plan their budget and understand rental deposits
• What their rights are as tenants
• How to present themselves effectively to landlords

The project combines information, experience-sharing, and peer support - empowering young people to take their first independent housing steps.    
`,
    projectLockedOutTitleWeSparkProjects: "Locked Out — Youth Lens on Housing",
    projectLockedOutDescriptionWeSparkProjects: `“Locked Out” is a creative documentary project that brings together young people living in Luxembourg to explore the housing crisis through their own lens.
Participants learn the fundamentals of documentary filmmaking - from storytelling to camera work - and create short personal films that reflect their experiences, opinions, and hopes about finding a place to call home.
The project aims to give young voices a platform to express how the housing situation shapes their lives and future.
Supported by Fondation Sommer.    
`,
    projectGirlsSectiveTitleWeSparkProjects:
      "Projet : Girlssective (2024-2025)",
    projectGirlsSectiveDescriptionWeSparkProjects: `Le projet Girlssective, lancé par un groupe de 5 jeunes en collaboration avec Youth Work Synergy, est une initiative dédiée à la promotion de la diversité, de l'inclusion et à l'autonomisation des femmes, en particulier des femmes immigrées, réfugiées et expatriées âgées de 16 à 35 ans. Ce projet s'inscrit dans le cadre des projets de solidarité du European Solidarity Corps.
Objectifs principaux :
Soutenir les femmes issues de communautés marginalisées ou vulnérables en leur fournissant des ateliers, un mentorat, et un soutien personnalisé pour surmonter les défis qu'elles rencontrent.
Renforcer la confiance en soi des participantes et les aider à s'épanouir dans leurs communautés locales.
Promouvoir la diversité et l'inclusion au Luxembourg en mettant l'accent sur l'intégration des femmes immigrées et réfugiées.
Activités clés :
Organisation d'ateliers interactifs sur des sujets variés tels que le développement personnel, la gestion de carrière, et la santé mentale.
Mentorat personnalisé pour accompagner les femmes dans leur parcours de développement et de résilience.
Collaboration avec des partenaires locaux et des réseaux communautaires pour élargir l'impact du projet et offrir un soutien continu aux participantes.
Logo et symbolisme :
Le logo officiel de Girlssective représente la force, l'unité et la nouvelle aventure qui commence pour soutenir les femmes dans leur parcours vers l'autonomisation. Ce logo incarne les valeurs fondamentales du projet : diversité, inclusion et résilience.
Résultats attendus :
Le projet Girlssective vise à soutenir plusieurs dizaines de femmes en les aidant à acquérir les compétences nécessaires pour naviguer les défis de l'intégration, à développer leur confiance et à réussir dans leurs communautés. Il s'agit d'un espace sécurisé pour permettre aux femmes de se connecter, d'apprendre et de grandir ensemble.
`,
    projectMobileLearningTitleWeSparkProjects:
      "Projet V - Comprehensive Guide to Best Practices in Mobile Learning for Adults – KA210 partenariats à petite échelle – Erasmus +",
    projectMobileLearningDescriptionWeSparkProjects: `Ce projet, coordonné par Youth Work Synergy en partenariat avec NINFEA et KulturNest e.V., vise à développer un guide complet des meilleures pratiques en matière d'apprentissage mobile pour adultes. Ce projet, d'une durée de 14 mois (de septembre 2024 à octobre 2025), a pour but de renforcer les ressources du Training and Evaluation Cycle (TEC) et de promouvoir l'inclusivité et la diversité dans l'éducation des adultes.
Objectifs principaux :
Créer une plateforme collaborative pour permettre aux praticiens du TEC de partager leurs expériences et connaissances.
Développer un guide qui compile des activités et des ressources liées au TEC, spécifiquement pour l'intégration des nouveaux arrivants.
Identifier et analyser les meilleures pratiques en consultant des parties prenantes de huit pays européens.
Résultats attendus :
Création d'une plateforme numérique pour le partage des bonnes pratiques.
Production d'un guide pratique accessible aux professionnels de l'éducation et de l'intégration.
Renforcement de la collaboration internationale et amélioration des pratiques d'accueil et de coexistence interculturelle.

Activités principales :
Gestion du projet (YWS) : Planification stratégique, coordination des partenaires et gestion des ressources.
Recherche et développement de la plateforme (NINFEA) : Collecte de données sur les pratiques TEC et création d'une plateforme en ligne.
Production du guide (KulturNest) : Compilation des meilleures pratiques avec un accent sur les approches interculturelles.
Diffusion (YWS/KulturNest/NINFEA) : Distribution du guide et organisation d'ateliers et d'événements pour partager les résultats du projet.
`,
    projectSportTitleWeSparkProjects:
      "Projet : Les jeunes amis du sport Luxembourg",
    projectSportDescriptionWeSparkProjects: `Ce projet a pour ambition de proposer un programme riche et varié d'activités sportives destinées aux jeunes âgés de 15 à 25 ans. L’objectif principal est de promouvoir un mode de vie sain, tout en offrant des opportunités de socialisation, d’apprentissage et de développement personnel. Les activités choisies couvrent des sports collectifs, individuels et des expériences culturelles et éducatives, permettant ainsi de répondre aux intérêts et besoins variés des participants. 
Objectifs principaux :
Notre objectif principal est de réunir au moins 50 jeunes autour de notre projet. 
Nous souhaitons que ces jeunes aient l'opportunité de découvrir des activités sportives qu'ils ne connaissent pas, et ce de manière décontractée, conviviale, sans pressionni jugement.
L'objectif est de sortir les jeunes de leurs écrans pendant quelques heures, afin qu'ils prennent conscience du mondequi les entoure. Il est essentiel que les jeunes issus de l'immigration ne se sentent pas seuls et rejetés par la société.
Activités clés :
 L'organisation d'activités sportives telles que le football, le volleyball, la boxe, la danse, le vélo, la course et la marche en forêt en faveur de jeunes défavorisés.
 Les participants sont encouragés à suggérer les activités qu'ils aimeraient réaliser. Ces activités nécessitent de se préparer en louant un espace, recruter les participants, acheter le matériel, etc…

Résultats attendus :
Nous attendons que les jeunes qui participent au projet puissent développer de la tolérance et qu’ils s’intègrent dans notre société. Afin qu'ils puissent profiter de bons moments et qu'ils aient envie de poursuivre leur pratique sportive en trouvant un sport qui les passionne. Nous voulons aussi renforcer leur confiance en eux et en leur aptitude. En assistant à nos séances, nous espérons qu'ils éprouveront moins de solitude.
`,
    projectSelfChronicleTitleWeSparkProjects:
      "Project: The Self Chronicle (2024-2025)",
    projectSelfChronicleDescriptionWeSparkProjects: `The Self Chronicle is one of the solidarity projects run by the European Solidarity Corps. This project, launched by a group of 5 young people in collaboration with Youth Work Synergy, aims to facilitate the integration of young immigrants aged between 12 and 30 who have recently arrived in Luxembourg. The project will run for a period of 10 months, from 1 June 2024 to 31 March 2025.
Main objectives:
● To create an interactive digital workbook for young newcomers, enabling them to gain a better understanding of Luxembourg, its traditions and culture.
● Encourage their integration into Luxembourg society by providing them with tools and resources to discover local opportunities and develop a sense of belonging.
● Organise workshops in collaboration with local partners to guide young people in using the digital notebook, with a focus on civic participation and living together.
Key activities:
● Development of the digital notebook using the MIRO and SEPPO platforms, which will incorporate interactive and geolocated tasks to discover the country.
● Organisation of workshops in schools and youth centres to facilitate the use of this digital tool, while promoting social inclusion and intercultural cooperation.
● Communication with local players such as the Office National de l'Accueil (ONA), the Ministry for the Family, and other partners to promote the use of the notebook.
Expected results:
The project aims to help around 100 young people better integrate into Luxembourg society, develop digital skills and feel at home more quickly in their new country. The digital workbook will be designed to be a sustainable tool, accessible to all new arrivals, with an interactive and multilingual approach.
`,
    projectSafePathsTitleWeSparkProjects: "Safe Paths Luxembourg",
    projectSafePathsDescriptionWeSparkProjects: `Understanding your rights. Preventing violence. Finding help.

The Safe Paths Luxembourg project, supported by the Ministry of Justice, offers information, awareness, and support workshops focused on access to rights and the protection of women and children. Through a multidisciplinary approach, these sessions help participants better understand their rights, identify different forms of violence, discover protection tools, and learn about available support resources. 

The workshops combine legal content, psychological support, and awareness tools within a supportive and strictly confidential environment. Sessions are offered in both French and English to ensure that essential information is clear and accessible to a wide audience. 

Workshop Schedule
• Theoretical Workshop (FR): April 10, 2026, from 5:00 PM to 9:00 PM 
• Theoretical Workshop (EN): April 17, 2026, from 5:00 PM to 9:00 PM 
• Practical Workshop (FR): May 22, 2026, from 5:00 PM to 9:00 PM 
• Practical Workshop (EN): May 29, 2026, from 5:00 PM to 9:00 PM 

Practical Information
Location: 11C Avenue de la Porte-Neuve, L-2227 Luxembourg
Participation: Free of charge 

Registration
To participate in one of the workshops, please register via the link below:
https://forms.gle/rncBigsjMoAbYVr4A

Contact
For any questions, you can write to us at:
contact@yws.lu`,
    "Pictures gallery:": "Pictures gallery:",
    "Register now": "Register now",
    Educator: "un.e éduacteur.trice",
    "Download now": "Download now",
    "Fixed-term contract (with possibility of permanent contract)":
      "Fixed-term contract (with possibility of permanent contract)",
  },

  /**
   * French
   */
  fr: {
    Jobs: "Emplois",
    "Download now": "Télécharger maintenant",
    "6-month fixed-term contract, 20 hours per week":
      "CDD de 6 mois, 20h par semaine",
    "Fixed-term contract (with possibility of permanent contract)":
      "CDD (possible CDI)",
    "Register now": "Inscrivez-vous maintenant",
    Educator: "un.e éduacteur.trice",
    "Interested in renting your property to us?":
      "Intéressé(e) à louer votre bien à notre organisation ?",
    "Property Maintenance": "Entretien de la propriété",
    "Property Flexibility": "Flexibilité de la propriété",
    "Ongoing Tenant Support": "Soutien continu aux locataires",
    "Tax Benefits": "Avantages fiscaux",
    "Guaranteed Rent": "Loyer garanti",
    "Why Rent to Us?": "Pourquoi nous louer ?",
    "Rent Out Your Property": "Louez votre bien",
    "Rent your property with confidence:":
      "Louez votre bien en toute confiance :",
    "safe, reliable & impactful": "sûr, fiable et utile",
    "Who Gets Priority?": "Qui a la priorité ?",
    "Our Selection Process": "Notre processus de sélection",
    "Personal Interview": "Entretien personnel",
    "Let's Talk": "Parlons-en",
    "Fill Out the Form": "Remplissez le formulaire",
    "Here's how it works": "Voici comment cela fonctionne",
    "Meet the team": "Rencontrez l'équipe",
    "Real impact": "Un impact réel",
    "Our mission": "Notre mission",
    Homepage: "Page d'accueil",
    "Looking for housing": "À la recherche d'un logement",
    "About us": "À propos de nous",
    "Who we are": "Qui sommes-nous",
    "Contact us": "Contactez-nous",
    "Rent your property": "Louez votre propriété",
    "Apply for housing": "Demander un logement",
    "See for yourself": "Voyez par vous-même",
    "Youth-Led Projects!": "Projets menés par des jeunes !",
    "Apply now": "Postulez maintenant",
    "Looking for housing?": "Vous cherchez un logement ?",
    "Give youth a chance for a": "Donner aux jeunes une chance pour",
    "better future": "un avenir meilleur",
    "Learn more": "Apprendre encore plus",
    "Rent out": "Louer",
    "Rent now": "Louer maintenant",
    your: "votre",
    property: "propriété",
    "Cheers to them!": "Santé à eux !",
    "Credits 💖": "Crédits 💖",
    "Choose your destination": "Choisissez votre destination",
    "All rights reserved": "Tous droits réservés",
    "See credits": "Voir les crédits",
    Coaching: "Accompagnement",
    Sustainability: "Durabilité",
    Affordability: "Loyers accessibles",
    creditsDescription: (
      <div className="flex flex-col gap-2">
        <span>
          <span className="font-bold">"Cat House"</span> (
          <Link
            href="https://skfb.ly/oOAM6"
            target="_blank"
            className="hover:underline focus-visible:underline"
          >
            https://skfb.ly/oOAM6
          </Link>
          ) par <span className="font-bold">Roman_Nilikovskii</span> est sous
          licence <span className="italic">Creative Commons Attribution</span> (
          <Link
            className="hover:underline focus-visible:underline"
            href="http://creativecommons.org/licenses/by/4.0/"
            target="_blank"
          >
            http://creativecommons.org/licenses/by/4.0/
          </Link>
          ).
        </span>
        <span>
          <span className="font-bold">"Cosmonaut on a rocket"</span> (
          <Link
            href="https://skfb.ly/o6AyV"
            target="_blank"
            className="hover:underline focus-visible:underline"
          >
            https://skfb.ly/o6AyV
          </Link>
          ) par <span className="font-bold">Yury Misiyuk</span> est sous licence{" "}
          <span className="italic">Creative Commons Attribution</span> (
          <Link
            className="hover:underline focus-visible:underline"
            href="http://creativecommons.org/licenses/by/4.0/"
            target="_blank"
          >
            http://creativecommons.org/licenses/by/4.0/
          </Link>
          ).
        </span>
        <span>
          <span className="font-bold">"Heart in Love"</span> (
          <Link
            href="https://skfb.ly/6SusI"
            target="_blank"
            className="hover:underline focus-visible:underline"
          >
            https://skfb.ly/6SusI
          </Link>
          ) par <span className="font-bold">Azamuki</span> est sous licence{" "}
          <span className="italic">Creative Commons Attribution</span> (
          <Link
            className="hover:underline focus-visible:underline"
            href="http://creativecommons.org/licenses/by/4.0/"
            target="_blank"
          >
            http://creativecommons.org/licenses/by/4.0/
          </Link>
          ).
        </span>
        <span>
          <span className="font-bold">"Loft Bedroom"</span> (
          <Link
            href="https://skfb.ly/oznqR"
            target="_blank"
            className="hover:underline focus-visible:underline"
          >
            https://skfb.ly/oznqR
          </Link>
          ) par <span className="font-bold">dylanheyes</span> est sous licence{" "}
          <span className="italic">Creative Commons Attribution</span> (
          <Link
            className="hover:underline focus-visible:underline"
            href="http://creativecommons.org/licenses/by/4.0/"
            target="_blank"
          >
            http://creativecommons.org/licenses/by/4.0/
          </Link>
          ).
        </span>
        <span>
          <span className="font-bold">"Stylized Wardrobe"</span> (
          <Link
            href="https://skfb.ly/oGSTF"
            target="_blank"
            className="hover:underline focus-visible:underline"
          >
            https://skfb.ly/oGSTF
          </Link>
          ) par <span className="font-bold">stefan</span> est sous licence{" "}
          <span className="italic">Creative Commons Attribution</span> (
          <Link
            className="hover:underline focus-visible:underline"
            href="http://creativecommons.org/licenses/by/4.0/"
            target="_blank"
          >
            http://creativecommons.org/licenses/by/4.0/
          </Link>
          ).
        </span>
        <span className="my-2 h-0.5 w-full bg-muted-foreground/75" />
        <span>
          <span className="font-bold">Développeur principal</span> (
          <Link
            href={YWS_WEBSITE_LINK}
            target="_blank"
            className="hover:underline focus-visible:underline"
          >
            {YWS_WEBSITE_LINK}
          </Link>
          ){" — "}
          <Link
            href={DEVELOPER_GITHUB_LINK}
            target="_blank"
            className="font-bold hover:underline focus-visible:underline"
          >
            Mateusz Muszarski
          </Link>{" "}
          ✌️
        </span>
      </div>
    ),
    heroDescriptionHomepage: (
      <>
        <span>
          Transformez votre bien en un foyer pour les jeunes au Luxembourg.
        </span>
        <span>
          Nous sommes une ASBL de confiance basée au Luxembourg, travaillant en
          collaboration avec le Ministère du Logement.
        </span>
        <span>
          Devenir partenaire avec nous, c’est faire le bien tout en faisant un
          choix financier judicieux — avec jusqu’à 90 % d’exonération fiscale
          sur vos revenus locatifs nets et d’autres avantages.
        </span>
      </>
    ),
    heroDescriptionJobs: (
      <>
        <span>
          Youth Work Synergy (YWS) est une association de terrain basée au
          Luxembourg, active dans le développement d’un travail de jeunesse
          innovant et inclusif. Elle combine l’accès au logement abordable avec
          l’éducation non formelle et la participation citoyenne afin de
          renforcer l’autonomie, l’engagement et les compétences transversales
          des jeunes. Partant du principe qu’offrir un toit aux personnes
          constitue la première étape d’une stabilisation personnelle,
          l’association met en œuvre des projets de colocation à destination de
          jeunes ayant moins d’opportunités. Ces actions sont complétées par des
          ateliers sur les droits sociaux, la transition écologique et la
          citoyenneté active, ainsi que par un travail de coopération et de
          plaidoyer avec les communes et les acteurs locaux.
        </span>
      </>
    ),
    "Property portfolio manager": "Gestionnaire du parc immobilier",
    heroDescriptionAboutUs: (
      <>
        <BoxReveal boxColor="#fa8534" duration={0.5}>
          <span className="font-bold">
            Louez votre bien — Donnez une chance à la jeunesse pour un avenir
            meilleur
          </span>
        </BoxReveal>
        <BoxReveal boxColor="#fa8534" duration={0.6}>
          <span>
            Transformez votre bien en un foyer pour les jeunes au Luxembourg.
          </span>
        </BoxReveal>
        <BoxReveal boxColor="#fa8534" duration={0.7}>
          <span>
            Nous transformons des maisons vides en véritables foyers — et
            changeons des vies en cours de route.
          </span>
        </BoxReveal>
        <BoxReveal boxColor="#fa8534" duration={0.8}>
          <span>
            Au Luxembourg, des centaines de jeunes peinent à trouver un
            logement. Les loyers sont élevés, les exigences strictes, et pour
            beaucoup de 18 à 34 ans, accéder à un logement sans aide familiale
            est tout simplement hors de portée. C’est là que nous intervenons.
          </span>
        </BoxReveal>
        <BoxReveal boxColor="#fa8534" duration={0.9}>
          <span>
            Nous sommes une ASBL basée au Luxembourg, disposant du statut de GLS
            (Gestion Locative Sociale), et travaillons en collaboration avec le
            Ministère du Logement pour résoudre la crise du logement chez les
            jeunes.
          </span>
        </BoxReveal>
      </>
    ),
    ourMissionDescriptionAboutUs: (
      <>
        <TextAnimate animation="fadeIn" by="word" as="span" duration={0.65}>
          Nous aidons les jeunes à faire la transition vers une vie indépendante
          et épanouissante en combinant un accès au logement avec un
          accompagnement éducatif et émotionnel.
        </TextAnimate>
      </>
    ),
    ourMissionCardOneDescriptionAboutUs:
      "Nos éducateurs jeunesse offrent un accompagnement personnalisé pour aider les résidents à trouver un emploi, une formation, retourner à l’école ou concrétiser leurs projets !",
    ourMissionCardTwoDescriptionAboutUs:
      "En fournissant un logement abordable, nous aidons les jeunes à trouver un lieu réellement accessible, ici même au Luxembourg.",
    ourMissionCardThreeDescriptionAboutUs:
      "Un mode de vie durable — nos logements sont meublés avec des objets de seconde main de haute qualité, prouvant que faire des choix écoresponsables peut être à la fois économique et esthétique.",
    whoWeAreDescriptionHomepage: (
      <>
        <TextAnimate animation="fadeIn" by="word" as="span" duration={0.65}>
          Youth Work Synergy (YWS) est une ASBL locale engagée dans la lutte
          contre la crise du logement en proposant des espaces de colocation
          stables et abordables pour les jeunes de 18 à 34 ans.
        </TextAnimate>
        <TextAnimate animation="fadeIn" by="word" as="span" duration={0.65}>
          Nous louons des maisons à des propriétaires privés et en sous-louons
          les chambres à de jeunes locataires — tout en leur apportant un
          accompagnement éducatif vers l’autonomie.
        </TextAnimate>
      </>
    ),
    lookingForHousingDescriptionHomepage: (
      <>
        <span>
          Nous proposons des chambres entièrement meublées dans des maisons
          partagées — avec un accompagnement, du coaching, et un cadre sécurisé.
          Vous êtes un jeune au Luxembourg à la recherche d’un logement ?
        </span>
        <span>
          Remplissez notre formulaire rapide et nous vous contacterons dès
          qu’une place se libère.
        </span>
      </>
    ),
    youthLedProjectsDescriptionHomepage: (
      <>
        <TextAnimate animation="fadeIn" by="word" as="span" duration={0.65}>
          Les jeunes vivant dans nos maisons ne trouvent pas seulement un toit —
          ils trouvent un espace pour grandir.
        </TextAnimate>
        <TextAnimate animation="fadeIn" by="word" as="span" duration={0.65}>
          Nous soutenons les résidents dans le développement et la réalisation
          de leurs propres projets sociaux, culturels ou éducatifs. Avec notre
          accompagnement professionnel et nos encouragements, ces initiatives
          reflètent leur créativité, leur résilience et leur volonté de faire
          bouger les choses.
        </TextAnimate>
      </>
    ),
    realImpactDescriptionAboutUs: (
      // Default statistics if fetching is unsuccessful
      sharedHouses = 6,
      youngstersHelped = 30,
      youngstersWaiting = 300,
    ) => (
      <>
        <TextAnimate animation="fadeIn" by="word" as="span" duration={0.65}>
          {`Depuis 2023, nous avons déjà ouvert ${sharedHouses} colocations à travers le pays — offrant un logement stable à plus de ${youngstersHelped} jeunes. Mais la demande augmente rapidement, et avec plus de ${youngstersWaiting} demandes sur notre liste d'attente, nous sommes prêts à en faire plus — avec votre aide.`}
        </TextAnimate>
      </>
    ),
    teamDescriptionAboutUs: (
      <>
        <TextAnimate animation="fadeIn" by="word" as="span" duration={0.65}>
          Faites connaissance avec les personnes derrière YWS.
        </TextAnimate>
        <TextAnimate animation="fadeIn" by="word" as="span" duration={0.65}>
          Nous sommes un groupe engagé de travailleurs de jeunesse, éducateurs,
          coordinateurs de logement et architectes œuvrant ensemble pour rendre
          le logement accessible aux jeunes.
        </TextAnimate>
        <TextAnimate animation="fadeIn" by="word" as="span" duration={0.65}>
          Faites défiler pour découvrir les membres de notre équipe et trouver
          leurs coordonnées si vous souhaitez nous contacter.
        </TextAnimate>
      </>
    ),
    heroDescriptionLookingForHousing: (
      <>
        <BoxReveal boxColor="#fa8534" duration={0.5}>
          <span>
            Vous avez entre 18 et 34 ans et vous cherchez un logement stable et
            abordable au Luxembourg ?
          </span>
        </BoxReveal>
        <BoxReveal boxColor="#fa8534" duration={0.6}>
          <span>Nous sommes là pour vous aider</span>
        </BoxReveal>
      </>
    ),
    timelineFillOutTheFormDescriptionLookingForHousing:
      "Commencez par remplir un court formulaire de demande. Cela nous aide à comprendre votre situation et le type de logement dont vous avez besoin.",
    timelineLetsTalkDescriptionLookingForHousing:
      "Une fois votre demande reçue, un membre de notre équipe vous contactera pour fixer un rendez-vous. Nous discuterons de votre parcours, de vos besoins actuels et de la manière dont nous pouvons vous accompagner.",
    timelinePersonalInterviewDescriptionLookingForHousing:
      "Lors de votre rendez-vous, nous approfondirons votre situation pour évaluer si l’un de nos logements vous conviendrait.",
    timelineOurSelectionProcessDescriptionLookingForHousing:
      "Après les entretiens, notre équipe examine attentivement toutes les candidatures et sélectionne les personnes en fonction de critères clés tels que l’urgence, la motivation et la préparation à la vie en communauté.",
    whoGetsPriorityDescriptionLookingForHousing: (
      <>
        <TextAnimate animation="fadeIn" by="word" as="span" duration={0.65}>
          Nous donnons la priorité aux jeunes en situation urgente — comme une
          expulsion ou une perte soudaine de revenus. Nous vérifions également
          une certaine stabilité financière de base pour garantir un logement
          durable. Notre objectif est de créer un environnement de vie
          respectueux et équilibré, en incluant une diversité de genre lorsque
          cela est possible. En raison de la forte demande et du nombre limité
          de places, nous ne pouvons pas aider tout le monde immédiatement —
          mais chaque demande est examinée avec soin et responsabilité.
        </TextAnimate>
      </>
    ),
    heroDescriptionRentYourProperty: (
      <>
        <BoxReveal boxColor="#fa8534" duration={0.5}>
          <span>
            Nous cherchons en permanence à louer tout type de bien résidentiel —
            que ce soit une maison, un appartement ou une chambre individuelle.
          </span>
        </BoxReveal>
        <BoxReveal boxColor="#fa8534" duration={0.6}>
          <span>
            Notre objectif est d'offrir un logement sûr et abordable aux jeunes
            dans le besoin, en partenariat avec des propriétaires comme vous.
          </span>
        </BoxReveal>
        <BoxReveal boxColor="#fa8534" duration={0.7}>
          <span>
            En travaillant avec nous, vous aidez non seulement à construire
            l'avenir de quelqu'un, mais vous bénéficiez également d'une
            expérience locative fiable et sans tracas.
          </span>
        </BoxReveal>
      </>
    ),
    "Job Offers": "Offres d’emploi",
    whyRentToUsDescriptionRentYourProperty: (
      <>
        <TextAnimate animation="fadeIn" by="word" as="span" duration={0.65}>
          Nous prenons soin de votre bien — de la rénovation à l’assurance.
        </TextAnimate>
        <TextAnimate animation="fadeIn" by="word" as="span" duration={0.65}>
          Que votre bien nécessite de légères réparations ou une rénovation
          complète, nous gérons les travaux de manière professionnelle et à un
          coût raisonnable, toujours avec votre accord. Nous préparons chaque
          bien pour la vente, l’usage à long terme et le meublons entièrement.
        </TextAnimate>
        <TextAnimate animation="fadeIn" by="word" as="span" duration={0.65}>
          Nous assurons également une couverture d’assurance complète contre les
          imprévus et prenons l'entière responsabilité de l'entretien et du
          suivi des locataires.
        </TextAnimate>
        <TextAnimate animation="fadeIn" by="word" as="span" duration={0.65}>
          Louer à YWS signifie sérénité, loyer garanti et utilité sociale de
          votre bien.
        </TextAnimate>
      </>
    ),
    whyRentToUsGuaranteedRentRentYourProperty:
      "En signant un bail avec notre organisation certifiée, vous recevez un loyer garanti chaque mois, sans exception — même si le logement est temporairement vacant.",
    whyRentToUsTaxBenefitsRentYourProperty:
      "En tant que propriétaire, vous bénéficiez d'une exonération fiscale de 90 % sur les revenus locatifs nets. Cela compense largement le fait que le loyer est généralement 30 à 40 % inférieur aux prix du marché privé.",
    whyRentToUsOngoingTenantSupportRentYourProperty:
      "Tous les locataires sont suivis et encadrés par des travailleurs sociaux qualifiés tout au long du bail. En cas de problème, notre équipe professionnelle intervient directement.",
    whyRentToUsPropertyFlexibilityRentYourProperty:
      "Votre bien reste disponible pour vous et votre famille. Si vous devez le récupérer pour un usage personnel, nous gérons le relogement des occupants rapidement et avec respect.",
    whyRentToUsPropertyMaintenanceRentYourProperty:
      "Nos organisations partenaires disposent d’équipes techniques qui effectuent des contrôles réguliers et des petites réparations pour maintenir votre bien en bon état à tout moment.",
    interestedInRentingDescriptionRentYourProperty: (
      <>
        <TextAnimate animation="fadeIn" by="word" as="span" duration={0.65}>
          Contactez-nous directement. Nous serions ravis d’échanger avec vous.
        </TextAnimate>
      </>
    ),
    METADATA: {
      rootMetadata: {
        title: "Youth Work Synergy",
        description:
          "Youth Work Synergy (YWS) est une organisation à but non lucratif au Luxembourg qui transforme des logements vides en logements partagés sûrs et abordables pour les jeunes de 18 à 34 ans. Partenaire avec nous pour louer votre bien et bénéficier d'un loyer garanti, d'avantages fiscaux et d'un entretien professionnel — tout en ayant un réel impact social.",
        keywords: [
          "Logement jeunes Luxembourg",
          "location propriété association",
          "loyer garanti propriétaire",
          "logement abordable jeunes",
          "initiative ASBL logement",
          "avantages fiscaux immobilier Luxembourg",
          "logement impact social",
          "louer à Youth Work Synergy",
        ],
        openGraph: {
          "og:title": "Youth Work Synergy ASBL Luxembourg",
          "og:description":
            "Contribuez à résoudre la crise du logement au Luxembourg en louant votre bien à Youth Work Synergy. Loyer garanti, incitations fiscales, soutien complet — et un vrai impact pour les jeunes.",
          "og:type": "website",
          "og:url": YWS_WEBSITE_LINK,
          "og:image": `${YWS_WEBSITE_LINK}/logo.png`,
        },
        twitter: {
          "twitter:card": "summary_large_image",
          "twitter:title": "Youth Work Synergy ASBL Luxembourg",
          "twitter:description":
            "Associez-vous à Youth Work Synergy pour louer votre bien au Luxembourg. Profitez d'un loyer garanti, d'avantages fiscaux et de la chance de changer des vies.",
          "twitter:image": `${YWS_WEBSITE_LINK}/logo.png`,
        },
        alternates: {
          canonical: YWS_WEBSITE_LINK,
        },
        metadataBase: new URL(YWS_WEBSITE_LINK),
        url: YWS_WEBSITE_LINK,
        logo: `${YWS_WEBSITE_LINK}/logo.png`,
        sameAs: [YWS_FACEBOOK_LINK, YWS_INSTAGRAM_LINK, YWS_LINKEDIN_LINK],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "service client",
          email: YWS_EMAIL,
          telephone: YWS_PHONE_NUMBER,
        },
        robots: "index, follow",
        creator: "Mateusz Muszarski",
      } as Metadata,
      aboutUsMetadata: {
        title: "Youth Work Synergy | À propos de nous",
        description:
          "Youth Work Synergy est une ASBL luxembourgeoise qui transforme des logements vides en habitats partagés sûrs et abordables pour les jeunes de 18 à 34 ans. Découvrez notre mission, notre équipe, et comment nous soutenons les jeunes via le logement, le coaching et des projets sociaux pour avoir un réel impact dans la communauté.",
      } as Metadata,
      lookingForHousingMetadata: {
        title: "Youth Work Synergy | Demander un logement",
        description:
          "Nous proposons des chambres entièrement meublées dans des maisons partagées — avec accompagnement, coaching et un environnement sécurisé. Vous êtes un jeune au Luxembourg à la recherche d’un logement ? Remplissez notre formulaire rapide et nous vous contacterons dès qu’une place sera disponible.",
      } as Metadata,
      tecConferenceMetadata: {
        title: "Youth Work Synergy | TEC Conference",
        description:
          "Join us for the closing conference of V - Comprehensive Guide to Best Practices in Mobile Learning for Adults and discover how the knowledge, methods, and practices developed through the Training & Evaluation Cycle (TEC) can support professionals and volunteers working with people on the move.",
      } as Metadata,
      jobsMetadata: {
        title: "Youth Work Synergy | Jobs",
        description:
          "Découvrez les opportunités d’emploi chez Youth Work Synergy. Rejoignez notre mission visant à offrir des logements partagés sûrs et abordables aux jeunes au Luxembourg, tout en contribuant à des projets sociaux, au coaching et au développement de la communauté.",
      } as Metadata,
      rentYourPropertyMetadata: {
        title: "Youth Work Synergy | Louez votre propriété",
        description:
          "Nous cherchons toujours à louer tout type de bien résidentiel — qu’il s’agisse d’une maison, d’un appartement ou d’une chambre individuelle. Collaborez avec nous pour offrir un logement sûr et abordable aux jeunes dans le besoin tout en profitant d’une expérience de location fiable et sans souci.",
      } as Metadata,
      weSparkProjectsMetadata: {
        title: "Youth Work Synergy | Nous donnons vie à des projets",
        description:
          "Découvrez Nous donnons vie à des projets — des initiatives menées par des jeunes et soutenues par Youth Work Synergy. Ateliers pratiques, sessions d'information sur le logement et projets documentaires : des actions conçues pour aider les jeunes au Luxembourg à comprendre le marché du logement, développer leurs compétences et partager leurs expériences.",
      } as Metadata,
    },
    heroDescriptionWeSparkProjects:
      "Voici une sélection de projets que nous avons accompagnés jusqu’à leur réalisation.",
    "We Spark Projects": "Nous donnons vie à des projets",
    projectGetYourHomeTitleWeSparkProjects:
      "Get Your Home — Atelier Jeunesse sur le Logement",
    projectGetYourHomeDescriptionWeSparkProjects: `Soutenu par Erasmus+
Trouver un logement au Luxembourg est devenu l’un des plus grands défis pour les jeunes. Beaucoup ne savent pas où chercher, comment planifier un budget ou comment convaincre un propriétaire de leur faire confiance.
Get Your Home est un projet créé et dirigé par Mariia MEKHED, l’une de nos résidentes, pour aider les jeunes de 18 à 34 ans à naviguer sur le marché du logement en toute confiance.

Lors de la session, les participant·e·s apprennent :

• Où et dans quelles conditions ils peuvent louer un logement au Luxembourg
• Comment planifier leur budget et comprendre les cautions locatives
• Quels sont leurs droits en tant que locataires
• Comment se présenter efficacement auprès des propriétaires

Le projet combine information, partage d’expériences et soutien entre pairs — permettant aux jeunes de faire leurs premiers pas vers un logement indépendant.    
`,
    projectLockedOutTitleWeSparkProjects:
      "Locked Out — Regard Jeune sur le Logement",
    projectLockedOutDescriptionWeSparkProjects: `“Locked Out” est un projet documentaire créatif qui réunit des jeunes vivant au Luxembourg pour explorer la crise du logement à travers leur propre regard.
Les participant·e·s apprennent les bases du documentaire — de la narration au travail de caméra — et réalisent de courts films personnels reflétant leurs expériences, opinions et espoirs concernant la recherche d’un endroit à appeler chez soi.
Le projet vise à offrir aux jeunes une plateforme pour exprimer comment la situation du logement façonne leur vie et leur avenir.
Soutenu par la Fondation Sommer.
`,
    projectGirlsSectiveTitleWeSparkProjects:
      "Projet : Girlssective (2024-2025)",
    projectGirlsSectiveDescriptionWeSparkProjects: `Le projet Girlssective, lancé par un groupe de 5 jeunes en collaboration avec Youth Work Synergy, est une initiative dédiée à la promotion de la diversité, de l'inclusion et à l'autonomisation des femmes, en particulier des femmes immigrées, réfugiées et expatriées âgées de 16 à 35 ans. Ce projet s'inscrit dans le cadre des projets de solidarité du European Solidarity Corps.
Objectifs principaux :
Soutenir les femmes issues de communautés marginalisées ou vulnérables en leur fournissant des ateliers, un mentorat, et un soutien personnalisé pour surmonter les défis qu'elles rencontrent.
Renforcer la confiance en soi des participantes et les aider à s'épanouir dans leurs communautés locales.
Promouvoir la diversité et l'inclusion au Luxembourg en mettant l'accent sur l'intégration des femmes immigrées et réfugiées.
Activités clés :
Organisation d'ateliers interactifs sur des sujets variés tels que le développement personnel, la gestion de carrière, et la santé mentale.
Mentorat personnalisé pour accompagner les femmes dans leur parcours de développement et de résilience.
Collaboration avec des partenaires locaux et des réseaux communautaires pour élargir l'impact du projet et offrir un soutien continu aux participantes.
Logo et symbolisme :
Le logo officiel de Girlssective représente la force, l'unité et la nouvelle aventure qui commence pour soutenir les femmes dans leur parcours vers l'autonomisation. Ce logo incarne les valeurs fondamentales du projet : diversité, inclusion et résilience.
Résultats attendus :
Le projet Girlssective vise à soutenir plusieurs dizaines de femmes en les aidant à acquérir les compétences nécessaires pour naviguer les défis de l'intégration, à développer leur confiance et à réussir dans leurs communautés. Il s'agit d'un espace sécurisé pour permettre aux femmes de se connecter, d'apprendre et de grandir ensemble.
`,
    projectMobileLearningTitleWeSparkProjects:
      "Projet V - Comprehensive Guide to Best Practices in Mobile Learning for Adults – KA210 partenariats à petite échelle – Erasmus +",
    projectMobileLearningDescriptionWeSparkProjects: `Ce projet, coordonné par Youth Work Synergy en partenariat avec NINFEA et KulturNest e.V., vise à développer un guide complet des meilleures pratiques en matière d'apprentissage mobile pour adultes. Ce projet, d'une durée de 14 mois (de septembre 2024 à octobre 2025), a pour but de renforcer les ressources du Training and Evaluation Cycle (TEC) et de promouvoir l'inclusivité et la diversité dans l'éducation des adultes.
Objectifs principaux :
Créer une plateforme collaborative pour permettre aux praticiens du TEC de partager leurs expériences et connaissances.
Développer un guide qui compile des activités et des ressources liées au TEC, spécifiquement pour l'intégration des nouveaux arrivants.
Identifier et analyser les meilleures pratiques en consultant des parties prenantes de huit pays européens.
Résultats attendus :
Création d'une plateforme numérique pour le partage des bonnes pratiques.
Production d'un guide pratique accessible aux professionnels de l'éducation et de l'intégration.
Renforcement de la collaboration internationale et amélioration des pratiques d'accueil et de coexistence interculturelle.

Activités principales :
Gestion du projet (YWS) : Planification stratégique, coordination des partenaires et gestion des ressources.
Recherche et développement de la plateforme (NINFEA) : Collecte de données sur les pratiques TEC et création d'une plateforme en ligne.
Production du guide (KulturNest) : Compilation des meilleures pratiques avec un accent sur les approches interculturelles.
Diffusion (YWS/KulturNest/NINFEA) : Distribution du guide et organisation d'ateliers et d'événements pour partager les résultats du projet.
`,
    projectSportTitleWeSparkProjects:
      "Projet : Les jeunes amis du sport Luxembourg",
    projectSportDescriptionWeSparkProjects: `Ce projet a pour ambition de proposer un programme riche et varié d'activités sportives destinées aux jeunes âgés de 15 à 25 ans. L’objectif principal est de promouvoir un mode de vie sain, tout en offrant des opportunités de socialisation, d’apprentissage et de développement personnel. Les activités choisies couvrent des sports collectifs, individuels et des expériences culturelles et éducatives, permettant ainsi de répondre aux intérêts et besoins variés des participants. 
Objectifs principaux :
Notre objectif principal est de réunir au moins 50 jeunes autour de notre projet. 
Nous souhaitons que ces jeunes aient l'opportunité de découvrir des activités sportives qu'ils ne connaissent pas, et ce de manière décontractée, conviviale, sans pressionni jugement.
L'objectif est de sortir les jeunes de leurs écrans pendant quelques heures, afin qu'ils prennent conscience du mondequi les entoure. Il est essentiel que les jeunes issus de l'immigration ne se sentent pas seuls et rejetés par la société.
Activités clés :
 L'organisation d'activités sportives telles que le football, le volleyball, la boxe, la danse, le vélo, la course et la marche en forêt en faveur de jeunes défavorisés.
 Les participants sont encouragés à suggérer les activités qu'ils aimeraient réaliser. Ces activités nécessitent de se préparer en louant un espace, recruter les participants, acheter le matériel, etc…

Résultats attendus :
Nous attendons que les jeunes qui participent au projet puissent développer de la tolérance et qu’ils s’intègrent dans notre société. Afin qu'ils puissent profiter de bons moments et qu'ils aient envie de poursuivre leur pratique sportive en trouvant un sport qui les passionne. Nous voulons aussi renforcer leur confiance en eux et en leur aptitude. En assistant à nos séances, nous espérons qu'ils éprouveront moins de solitude.
`,
    projectSelfChronicleTitleWeSparkProjects:
      "Project: The Self Chronicle (2024-2025)",
    projectSelfChronicleDescriptionWeSparkProjects: `The Self Chronicle is one of the solidarity projects run by the European Solidarity Corps. This project, launched by a group of 5 young people in collaboration with Youth Work Synergy, aims to facilitate the integration of young immigrants aged between 12 and 30 who have recently arrived in Luxembourg. The project will run for a period of 10 months, from 1 June 2024 to 31 March 2025.
Main objectives:
● To create an interactive digital workbook for young newcomers, enabling them to gain a better understanding of Luxembourg, its traditions and culture.
● Encourage their integration into Luxembourg society by providing them with tools and resources to discover local opportunities and develop a sense of belonging.
● Organise workshops in collaboration with local partners to guide young people in using the digital notebook, with a focus on civic participation and living together.
Key activities:
● Development of the digital notebook using the MIRO and SEPPO platforms, which will incorporate interactive and geolocated tasks to discover the country.
● Organisation of workshops in schools and youth centres to facilitate the use of this digital tool, while promoting social inclusion and intercultural cooperation.
● Communication with local players such as the Office National de l'Accueil (ONA), the Ministry for the Family, and other partners to promote the use of the notebook.
Expected results:
The project aims to help around 100 young people better integrate into Luxembourg society, develop digital skills and feel at home more quickly in their new country. The digital workbook will be designed to be a sustainable tool, accessible to all new arrivals, with an interactive and multilingual approach.
`,
    projectSafePathsTitleWeSparkProjects: "Safe Paths Luxembourg",
    projectSafePathsDescriptionWeSparkProjects: `Comprendre ses droits. Prévenir les violences. Trouver de l’aide.
Le projet Safe Paths Luxembourg, soutenu par le ministère de la justice, propose des ateliers d’information, de sensibilisation et de soutien autour de l’accès aux droits et de la protection des femmes et des enfants. À travers une approche pluridisciplinaire, ces sessions permettent de mieux comprendre ses droits, d’identifier les différentes formes de violence, de découvrir des outils de protection et de connaître les ressources d’aide disponibles. 
Les ateliers combinent contenus juridiques, soutien psychologique et outils de sensibilisation, dans un cadre bienveillant et en toute confidentialité. Les sessions sont proposées en français et en anglais, afin de permettre à un public large d’accéder à des informations essentielles de manière claire et accessible. 
Programme des ateliers
•	Atelier théorique (FR) : 10 avril 2026, de 17h00 à 21h00 
•	Atelier théorique (EN) : 17 avril 2026, de 17h00 à 21h00 
•	Atelier pratique (FR) : 22 mai 2026, de 17h00 à 21h00 
•	Atelier pratique (EN) : 29 mai 2026, de 17h00 à 21h00 

Informations pratiques
Lieu : 11C Avenue de la Porte-Neuve, L-2227 Luxembourg
Participation gratuite 

Inscription
Pour participer à l’un des ateliers, merci de vous inscrire via le lien ci-dessous :
https://forms.gle/rncBigsjMoAbYVr4A

Contact
Pour toute question, vous pouvez nous écrire à :
contact@yws.lu
`,
    "Pictures gallery:": "Galerie de photos",
    "TEC Conference": "TEC Conference",
  },
};
