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
    "Interested in renting your property to us?":
      "Interested in renting your property to us?",
    "Property Maintenance": "Property Maintenance",
    "Property Flexibility": "Property Flexibility",
    "Ongoing Tenant Support": "Ongoing Tenant Support",
    "Tax Benefits": "Tax Benefits",
    "Guaranteed Rent": "Guaranteed Rent",
    "Why Rent to Us?": "Why Rent to Us?",
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
      youngstersWaiting = 300
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
          Fill out the contact form or get in touch directly. We'd love to hear
          from you.
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
    },
  },

  /**
   * French
   */
  fr: {
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
    "Give youth a chance for a": "Donner aux jeunes une chance de",
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
    Coaching: "Entraînement",
    Sustainability: "Durabilité",
    Affordability: "Abordabilité",
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
      youngstersWaiting = 300
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
          Remplissez le formulaire de contact ou contactez-nous directement.
          Nous serions ravis d’échanger avec vous.
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
      rentYourPropertyMetadata: {
        title: "Youth Work Synergy | Louez votre propriété",
        description:
          "Nous cherchons toujours à louer tout type de bien résidentiel — qu’il s’agisse d’une maison, d’un appartement ou d’une chambre individuelle. Collaborez avec nous pour offrir un logement sûr et abordable aux jeunes dans le besoin tout en profitant d’une expérience de location fiable et sans souci.",
      } as Metadata,
    },
  },

  /**
   * Luxembourgish
   */
  lb: {
    "Interested in renting your property to us?":
      "Interesséiert, Äert Besëtz un eis ze verlounen?",
    "Property Maintenance": "Ënnerhalt vun Immobilien",
    "Property Flexibility": "Flexibilitéit vun der Immobilie",
    "Ongoing Tenant Support": "Lafend Ënnerstëtzung vun de Locataire",
    "Tax Benefits": "Steiervirdeeler",
    "Guaranteed Rent": "Garantéiert Loyer",
    "Why Rent to Us?": "Firwat bei eis lounen?",
    "Rent Out Your Property": "Verlount Äert Besëtz",
    "Rent your property with confidence:":
      "Verlount Äert Besëtz mat Vertrauen:",
    "safe, reliable & impactful": "sécher, zouverlässeg & sënnvoll",
    "Who Gets Priority?": "Wien kritt Prioritéit?",
    "Our Selection Process": "Eise Selektiounsprozess",
    "Personal Interview": "Perséinlecht Interview",
    "Let's Talk": "Loosst eis schwätzen",
    "Fill Out the Form": "Fëllt de Formulaire aus",
    "Here's how it works": "Hei ass wéi et funktionéiert",
    "Meet the team": "Trefft d'Equipe",
    "Real impact": "Reellen Impakt",
    "Our mission": "Eis Missioun",
    Homepage: "Haaptsäit",
    "Looking for housing": "No Wunneng sichen",
    "About us": "Iwwer eis",
    "Who we are": "Wien mir sinn",
    "Contact us": "Kontaktéiert eis",
    "Rent your property": "Verlount Är Immobilie",
    "Apply for housing": "Fir Wunneng ufroen",
    "See for yourself": "Iwwerzeegt Iech selwer",
    "Youth-Led Projects!": "Jugendgeleet Projeten!",
    "Apply now": "Elo ufroen",
    "Looking for housing?": "No Wunneng sichen?",
    "Give youth a chance for a": "Gitt de Jonken eng Chance op eng",
    "better future": "besser Zukunft",
    "Learn more": "Méi gewuer ginn",
    "Rent out": "Verlounen",
    "Rent now": "Elo verlounen",
    your: "Är",
    property: "Immobilie",
    "Cheers to them!": "Merci un si!",
    "Credits 💖": "Credits 💖",
    "Choose your destination": "Wielt Äert Zil",
    "All rights reserved": "All Rechter virbehalen",
    "See credits": "Credits kucken",
    Coaching: "Berodung",
    Sustainability: "Nohaltegkeet",
    Affordability: "Bezuelbarkeet",
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
          ) vum <span className="font-bold">Roman_Nilikovskii</span> steet ënner
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
          <span className="font-bold">"Cosmonaut on a rocket"</span> (
          <Link
            href="https://skfb.ly/o6AyV"
            target="_blank"
            className="hover:underline focus-visible:underline"
          >
            https://skfb.ly/o6AyV
          </Link>
          ) vum <span className="font-bold">Yury Misiyuk</span> steet ënner{" "}
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
          ) vum <span className="font-bold">Azamuki</span> steet ënner{" "}
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
          ) vum <span className="font-bold">dylanheyes</span> steet ënner{" "}
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
          ) vum <span className="font-bold">stefan</span> steet ënner{" "}
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
          Maacht aus Ärer Immobilie e richtegt Doheem fir jonk Leit zu
          Lëtzebuerg.
        </span>
        <span>
          Mir sinn eng zouversiichtlech Lëtzebuerger Associatioun (ASBL) an
          Zesummenaarbecht mam Wunnengsministère.
        </span>
        <span>
          Eng Partnerschaft mat eis bedeit Gutes maachen an eng smart finanziell
          Entscheedung treffen — inklusiv bis zu 90 % Steierbefreiung op Äert
          Nettoloyerakommes an aner Virdeeler.
        </span>
      </>
    ),
    heroDescriptionAboutUs: (
      <>
        <BoxReveal boxColor="#fa8534" duration={0.5}>
          <span className="font-bold">
            Verlount Är Immobilie — Gitt de Jonken eng Chance op eng besser
            Zukunft
          </span>
        </BoxReveal>
        <BoxReveal boxColor="#fa8534" duration={0.6}>
          <span>
            Maacht aus Ärer Immobilie e richtegt Doheem fir jonk Leit zu
            Lëtzebuerg.
          </span>
        </BoxReveal>
        <BoxReveal boxColor="#fa8534" duration={0.7}>
          <span>
            Mir maachen aus eidel Haiser richteg Doheem — a veränneren dobäi
            Liewen.
          </span>
        </BoxReveal>
        <BoxReveal boxColor="#fa8534" duration={0.8}>
          <span>
            Zu Lëtzebuerg hu vill jonk Leit Schwieregkeeten, eng Wunneng ze
            fannen. D’Loyeren si héich, d’Ufuerderunge streng, an ouni
            Familljënnerstëtzung ass et fir vill tëschent 18 a 34 bal
            onméiglech. An hei komme mir an d'Spill.
          </span>
        </BoxReveal>
        <BoxReveal boxColor="#fa8534" duration={0.9}>
          <span>
            Mir sinn eng Lëtzebuerger Associatioun (ASBL) mam GLS (Gestion
            Locative Sociale) Statut, a schaffen a Partnerschaft mam
            Wunnengsministère un enger Léisung fir d'Jugendwunnengskris.
          </span>
        </BoxReveal>
      </>
    ),
    ourMissionDescriptionAboutUs: (
      <>
        <TextAnimate animation="fadeIn" by="word" as="span" duration={0.65}>
          Mir hëllefen jonke Leit den Iwwergank an en onofhängegt a erfüllend
          Liewen duerch Wunnen a kombinéiert pedagogesch an emotional
          Ënnerstëtzung.
        </TextAnimate>
      </>
    ),
    ourMissionCardOneDescriptionAboutUs:
      "Eis Jugendpedagogen bidden individuell Berodung fir d’Bewunner: Aarbecht fannen, Formatiounen, zréck an d'Schoul oder eegene Projeten ëmsetzen!",
    ourMissionCardTwoDescriptionAboutUs:
      "Mat bezuelbare Wunnenge bidden mir Jonken eng realistesch Wunnoptioun — direkt hei zu Lëtzebuerg.",
    ourMissionCardThreeDescriptionAboutUs:
      "Nohaltegt Wunnen — eis Wunnenge si mat héichwäertege gebrauchten Miwwele mat Stil ageriicht.",
    whoWeAreDescriptionHomepage: (
      <>
        <TextAnimate animation="fadeIn" by="word" as="span" duration={0.65}>
          Youth Work Synergy (YWS) ass eng lokal Associatioun déi d'Wunnengskris
          ugoe wëll andeems se bezuelbar, stabil Wunnstrukturen fir jonk Leit
          tëschent 18 a 34 ubitt.
        </TextAnimate>
        <TextAnimate animation="fadeIn" by="word" as="span" duration={0.65}>
          Mir lounen Haiser vu Privatleit an ënnerverloenen Zëmmeren u jonk
          Bewunner — mat edukativer Ënnerstëtzung a Weessung op dem Wee an
          d’Onofhängegkeet.
        </TextAnimate>
      </>
    ),
    lookingForHousingDescriptionHomepage: (
      <>
        <TextAnimate animation="fadeIn" by="word" as="span" duration={0.65}>
          Mir bidden voll ageriicht Zëmmeren an WGs — mat Ënnerstëtzung,
          Coaching an enger séchere Ëmwelt. Bass Du eng jonk Persoun zu
          Lëtzebuerg a sichs eng Wunneng?
        </TextAnimate>
        <TextAnimate animation="fadeIn" by="word" as="span" duration={0.65}>
          Fëll eis kuerz Ufro aus — mir mellen eis soubal e Plaz fräi gëtt.
        </TextAnimate>
      </>
    ),
    youthLedProjectsDescriptionHomepage: (
      <>
        <TextAnimate animation="fadeIn" by="word" as="span" duration={0.65}>
          Jonk Leit an eise Wunnenge fannen net nëmmen eng Plaz fir ze liewen —
          si fannen och Plaz fir ze wuessen.
        </TextAnimate>
        <TextAnimate animation="fadeIn" by="word" as="span" duration={0.65}>
          Mir ënnerstëtzen si dobäi, eegen sozial, kulturell oder edukativ
          Projeten ze entwéckelen an ëmzesetzen — mat professioneller Weessung a
          Motivatioun, déi hir Kreativitéit, Ausdauer a Verännerungswëllen
          reflektéieren.
        </TextAnimate>
      </>
    ),
    realImpactDescriptionAboutUs: (
      // Default statistics if fetching is unsuccessful
      sharedHouses = 6,
      youngstersHelped = 30,
      youngstersWaiting = 300
    ) => (
      <>
        <TextAnimate animation="fadeIn" by="word" as="span" duration={0.65}>
          {`Zënter 2023 hu mir schonn ${sharedHouses} Wunnengsgemeinschaften am ganze Land opgemaach — a stabile Wunnraum fir méi wéi ${youngstersHelped} jonk Leit geschaf. Mee d'Nofro wiisst séier, an mat iwwer ${youngstersWaiting} Ufragen op eiser Waardelëscht si mir prett nach méi ze maachen — mat Ärer Hëllef.`}
        </TextAnimate>
      </>
    ),
    teamDescriptionAboutUs: (
      <>
        <TextAnimate animation="fadeIn" by="word" as="span" duration={0.65}>
          Léier d'Leit hannert YWS kennen.
        </TextAnimate>
        <TextAnimate animation="fadeIn" by="word" as="span" duration={0.65}>
          Mir si eng engagéiert Equipe vu Jugendaarbechter, Educateuren,
          Wunnengskoordinatoren an Architekten, déi zesumme schaffen, fir
          Wunnenge fir jonk Leit zougänglech ze maachen.
        </TextAnimate>
        <TextAnimate animation="fadeIn" by="word" as="span" duration={0.65}>
          Scroll weider fir eis Team-Memberen ze entdecken a
          Kontaktinformatioune ze fannen, falls s du eis wëlls erreechen.
        </TextAnimate>
      </>
    ),
    heroDescriptionLookingForHousing: (
      <>
        <BoxReveal boxColor="#fa8534" duration={0.5}>
          <span>
            Bass du tëscht 18 a 34 Joer an op der Sich no engem stabilem an
            bezuelbare Wunnraum zu Lëtzebuerg?
          </span>
        </BoxReveal>
        <BoxReveal boxColor="#fa8534" duration={0.6}>
          <span>Mir si fir dech do</span>
        </BoxReveal>
      </>
    ),
    timelineFillOutTheFormDescriptionLookingForHousing:
      "Fang mat engem kuerzen Umeldungsformular un. Dëst hëlleft eis, deng Situatioun an deng Wunnbedierfnesser besser ze verstoen.",
    timelineLetsTalkDescriptionLookingForHousing:
      "Nodeems mir deng Demande kruten, wäert een aus eisem Team dech kontaktéieren fir en Gespréich ze fixéieren. Mir schwätzen iwwer deng Liewenssituatioun, deng aktuell Besoinen a wéi mir dech ënnerstëtze kënnen.",
    timelinePersonalInterviewDescriptionLookingForHousing:
      "Beim Rendez-vous gi mir méi an d'Déift a kucken, ob ee vun eise Wunnengen gutt bei dech géif passen.",
    timelineOurSelectionProcessDescriptionLookingForHousing:
      "Nom Gespréich kuckt eis Equipe all Demande grëndlech duerch a wielt op Basis vu wichtege Kritären aus, wéi Noutwendegkeet, Motivatioun an Bereetschaft fir d’Liewe an enger Gemeinschaft.",
    whoGetsPriorityDescriptionLookingForHousing: (
      <>
        <TextAnimate animation="fadeIn" by="word" as="span" duration={0.65}>
          Mir ginn jonke Leit a kritesche Situatiounen de Virzuch — wéi bei
          enger Wunnungsverloscht oder engem plötzleche Verloscht vum Akommes.
          Mir kucken och no enger gewësser finanzieller Stabilitéit, fir
          laangfristeg Wunnméiglechkeeten ze garantéieren. Eist Zil ass et, e
          respektvollen an equilibréierte Liewensëmfeld ze schafen, mat
          Geschlechterdiversitéit, wou méiglech. Wéinst der grousser Nofro an
          der limitéierter Zuel u Plazen, kënne mir net jiddereen direkt
          ënnerstëtzen — mee all Ufro gëtt mat Opmierksamkeet a Verantwortung
          gekuckt.
        </TextAnimate>
      </>
    ),
    heroDescriptionRentYourProperty: (
      <>
        <BoxReveal boxColor="#fa8534" duration={0.5}>
          <span>
            Mir sichen stänneg no all Typ vu Wunnraum — egal ob Haus,
            Appartement oder eenzel Zëmmer.
          </span>
        </BoxReveal>
        <BoxReveal boxColor="#fa8534" duration={0.6}>
          <span>
            Eist Zil ass et, jonke Leit an Nout eng sécher a bezuelbar Wunneng
            ze bidden — zesumme mat Besëtzer wéi Iech.
          </span>
        </BoxReveal>
        <BoxReveal boxColor="#fa8534" duration={0.7}>
          <span>
            Andeems Dir mat eis zesummeschafft, hëlleft Dir net nëmmen engem
            säin Zukunft opzebauen, mee Dir profitéiert och vun enger
            zouverlässeger a stressfreier Locatiounserfarung.
          </span>
        </BoxReveal>
      </>
    ),
    whyRentToUsDescriptionRentYourProperty: (
      <>
        <TextAnimate animation="fadeIn" by="word" as="span" duration={0.65}>
          Mir këmmeren eis ëm Äert Besëtz — vu Renovatioun bis Versécherung.
        </TextAnimate>
        <TextAnimate animation="fadeIn" by="word" as="span" duration={0.65}>
          Egal ob Äert Haus just e bëssen opgefrëscht muss ginn oder komplett
          renovéiert — mir iwwerhuelen d’Aarbechten professionell a fair, ëmmer
          an Ofsprooch mat Iech. Mir bereeden d’Wunneng fir de Verkaf oder
          laangfristege Gebrauch vir a möbléieren se komplett.
        </TextAnimate>
        <TextAnimate animation="fadeIn" by="word" as="span" duration={0.65}>
          Mir suergen och fir eng ëmfaassend Versécherung géint onerwaart
          Evenementer a droen déi ganz Verantwortung fir Ënnerhalt an
          Iwwerwaachung vun den Awunner.
        </TextAnimate>
        <TextAnimate animation="fadeIn" by="word" as="span" duration={0.65}>
          U YWS ze verlounen bedeit Rou, garantéiert Loyer an eng sënnvoll
          Notzung vun Ärem Besëtz.
        </TextAnimate>
      </>
    ),
    whyRentToUsGuaranteedRentRentYourProperty:
      "Mat engem Locatiounskontrakt iwwer eis zertifizéiert Organisatioun kritt Dir all Mount e garantéierte Loyer — och wann d’Wunneng kuerzfristeg net beluecht ass.",
    whyRentToUsTaxBenefitsRentYourProperty:
      "Als Proprietär profitéiert Dir vun enger 90 % Steierbefreiung op d’nett Locatiounsakommes. Dat kompenséiert däitlech de reduzéierte Loyer (30–40 % ënner dem private Marché).",
    whyRentToUsOngoingTenantSupportRentYourProperty:
      "All Awunner ginn duerch ausgebilte Sozialaarbechter ënnerstëtzt a begleet. Bei Problemer gräift eis professionell Ekipp direkt an.",
    whyRentToUsPropertyFlexibilityRentYourProperty:
      "Äert Besëtz bleift fir Iech an Är Famill disponibel. Falls Dir et fir perséinlech Zwecker zeréck braucht, organiséieren mir séier a respektvoll den Ëmzuge vun den Awunner.",
    whyRentToUsPropertyMaintenanceRentYourProperty:
      "Eis Partnerorganisatioune stellen technesch Ekippen zur Verfügung, déi reegelméisseg Kontroll- a Maintenance-Aarbechten ausféieren, fir Äert Besëtz gutt an Stand ze halen.",
    interestedInRentingDescriptionRentYourProperty: (
      <>
        <TextAnimate animation="fadeIn" by="word" as="span" duration={0.65}>
          Fëllt de Kontaktformulaire aus oder mellt Iech direkt bei eis. Mir
          géifen eis freeën, vun Iech ze héieren.
        </TextAnimate>
      </>
    ),
    METADATA: {
      rootMetadata: {
        title: "Youth Work Synergy",
        description:
          "Youth Work Synergy (YWS) ass eng net-kommerziell Organisatioun zu Lëtzebuerg, déi eidel Wunnenge an sécher, bezuelbar Deele-Wunnenge fir Jonker tëscht 18 a 34 Joer ëmwandelt. Zesumme mat eis kënnt Dir Äert Immobilie lounen an profitéiert vu garantéierten Lounen, Steiervirdeeler an professioneller Ënnerhalt — an dobäi eng reell sozial Auswierkung hunn.",
        keywords: [
          "Jugendwunneng Lëtzebuerg",
          "Immobilie lounen Associatioun",
          "garantéiert Loun Verméigenbesëtzer",
          "bezuelbar Wunneng fir Jonker",
          "ASBL Wunneng Initiative",
          "Steiervirdeeler Immobilie Lëtzebuerg",
          "sozial Auswierkung Wunneng",
          "lounen un Youth Work Synergy",
        ],
        openGraph: {
          "og:title": "Youth Work Synergy ASBL Lëtzebuerg",
          "og:description":
            "Hëlleft d’Wunnengskris zu Lëtzebuerg ze léisen andeems Dir Är Immobilie un Youth Work Synergy lount. Garantéiert Loun, Steierincentiver, komplett Ënnerstëtzung — an eng reell Auswierkung fir Jonker.",
          "og:type": "website",
          "og:url": YWS_WEBSITE_LINK,
          "og:image": `${YWS_WEBSITE_LINK}/logo.png`,
        },
        twitter: {
          "twitter:card": "summary_large_image",
          "twitter:title": "Youth Work Synergy ASBL Lëtzebuerg",
          "twitter:description":
            "Zesumme mat Youth Work Synergy kënnt Dir Är Immobilie zu Lëtzebuerg lounen. Profitéiert vun garantéierten Lounen, Steiervirdeeler an enger Geleeënheet fir d'Liewen z'änneren.",
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
          contactType: "Clientssupport",
          email: YWS_EMAIL,
          telephone: YWS_PHONE_NUMBER,
        },
        robots: "index, follow",
        creator: "Mateusz Muszarski",
      } as Metadata,
      aboutUsMetadata: {
        title: "Youth Work Synergy | Iwwer eis",
        description:
          "Youth Work Synergy ass eng lëtzebuergesch Non-Profit-Organisatioun, déi eidel Wunnenge an sécher a bezuelbar gemeinsamt Wunnraum fir Jonker vun 18 bis 34 Joer transforméiert. Entdeckt eis Missioun, eist Team a wéi mir Jonker mat Wunnraum, Coaching an sozialen Projeten ënnerstëtzen, fir eng reell Auswierkung an der Gemeinschaft ze schafen.",
      } as Metadata,
      lookingForHousingMetadata: {
        title: "Youth Work Synergy | Bewerbung fir Wunneng",
        description:
          "Mir bidden voll möbléiert Zëmmeren an deelen Haiser un — mat Ënnerstëtzung, Coaching an engem sécherem Ëmfeld. Sidd Dir e jonke Mënsch zu Lëtzebuerg, deen no Wunnraum sicht? Fëllt eise kuerze Formulaire aus, a mir kontaktéieren Iech soubal eng Plaz fräi gëtt.",
      } as Metadata,
      rentYourPropertyMetadata: {
        title: "Youth Work Synergy | Lount Är Immobilie",
        description:
          "Mir sichen ëmmer no all Zort Wunnraum — egal ob Haus, Appartement oder eenzel Zëmmer. Schafft mat eis zesummen fir jonke Leit an Nout sécher an bezuelbar Wunnraum ze bidden an dobäi eng zouverlässeg a suerglos Vermietungserfarung ze genéissen.",
      } as Metadata,
    },
  },
};
