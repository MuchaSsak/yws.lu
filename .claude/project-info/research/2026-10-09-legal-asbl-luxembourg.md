# Legal facts for yws.lu (Luxembourg ASBL site): legal notice, GDPR, cookies, accessibility, image rights

Research notes, checked 2026-10-09. These are facts and quotations from official or vendor sources, with source IDs [Sx] listed under "Sources" at the end. This is **not legal advice and not a compliance assessment**. Where a rule's application to YWS depends on interpretation, the note says so and does not settle it. Legilux consolidated texts carry this warning: "Ce texte consolidé a uniquement une valeur documentaire. Il importe de noter qu'il n'a pas de valeur juridique." [S5]

## 0. What the site does today (observed 2026-10-09)
- Organisation as shown in the code (`lib/constants.ts`): "Bureau YWS a.s.b.l. : 136-138, rue Adolphe Fischer L-1521 Luxembourg" and "Siège (adresse postale) YWS a.s.b.l. : 16, rue Pierre Weydert, L-5891 Fentange". The site has no RCS number, legal notice, privacy page, or cookie page today.
- Two Google Maps iframes load straight away (with `loading="lazy"`, no click needed): `app/(components)/contact/ContactMap.tsx` uses `https://www.google.com/maps?q=…&output=embed`, and `app/AboutUs/(components)/realImpact/RealImpactMap.tsx` uses a My Maps embed, `https://www.google.com/maps/d/u/0/embed?mid=…`. There is no YouTube embed in the code.
- Images come from `tsgaliwebpcrjwtcxzdp.supabase.co`. The site links out to Google Forms (`docs.google.com/forms/...` and `forms.gle/...`), Zoom registration (`us06web.zoom.us/meeting/register/...`), and the Facebook, Instagram and LinkedIn pages.
- Live headers: `https://yws.lu` → 308 → `https://www.yws.lu/` → 200, `Server: Vercel`, and no `Set-Cookie` header on the HTML response. A request to the Supabase host returned `Server: cloudflare` and set `__cf_bm` (domain `supabase.co`, 30 min). [own test, 2026-10-09]

## 1. Legal notice ("mentions légales")

### 1.1 ASBL law: Loi du 7 août 2023 sur les associations sans but lucratif et les fondations
- Published in Mémorial A n° 592 of 19 Sept 2023 [S1]. LBR says it "est entrée en vigueur le 23 septembre 2023" [S2].
- Art. 76: "La loi modifiée du 21 avril 1928 sur les associations et les fondations sans but lucratif est abrogée." [S1]
- Art. 77(1): statutes of associations formed before the law must be brought into line "Dans un délai de vingt-quatre mois à compter de l'entrée en vigueur". From 23 Sept 2023, that is 23 Sept 2025 (my calculation). Until then they "demeurent régies par les dispositions législatives antérieures". [S1]
- Art. 1(2): at least two founding members. Art. 2(1): legal personality is acquired "à compter du jour de son immatriculation au registre de commerce et des sociétés". [S1]
- The law was amended by the Loi du 4 décembre 2024 (Mémorial A n° 492, 9 Dec 2024; bill 8420). That law changes arts. 7 and 77 only and does not touch art. 20. [S3] (Source is the Chamber dossier; the Legilux consolidated text was not opened.)
- **Art. 20 (mentions on documents), verbatim** [S1]:
  "(1) Tous les actes, factures, annonces, publications et autres pièces émanées de l'association doivent contenir les mentions suivantes : 1° la dénomination de l'association ; 2° la mention « association sans but lucratif » reproduite lisiblement et en toutes lettres ou en abrégé « a.s.b.l. » placée immédiatement avant ou après la dénomination ; 3° l'adresse précise du siège de l'association ; et 4° les mots « Registre de commerce et des sociétés, Luxembourg », ou les initiales « R.C.S. Luxembourg » suivis du numéro d'immatriculation."
  "(2) Toute personne qui intervient pour une association dans un document visé au paragraphe 1er où l'une de ces mentions ne figure pas, peut être déclarée personnellement responsable de tout ou partie des engagements qui y sont pris par l'association."
- Art. 20 does not use the words "site internet". Whether a website counts as a "publication" or "autre pièce" is a matter of interpretation and is not settled here. The four ASBL sites in §6 all show the RCS number on their legal page. [S1][S30–S33]
- Note on law versions: the guichet.lu page "Création d'une ASBL" is marked "Dernière modification le 24.12.2021". It still cites the 1928 law (legal personality from RESA publication, "au moins 3" associates). On those points it no longer matches the 2023 law. [S4]
- RCS number format, as observed: ASBL numbers are "F" + digits, for example "R.C.S. Luxembourg : F829" (Inter-Actions), "RCS F746" (Info-Handicap), "Registernummer | F 737" (CGJL), "RCS : F471" (Cercle) [S30–S33]. LBR file URLs follow the pattern `lbr.lu/mjrcs-web-front/consult-company/F3754`. I found no LBR text that defines the letter scheme.

### 1.2 Loi modifiée du 14 août 2000 relative au commerce électronique, art. 5 (general information duty)
- Art. 5(1), verbatim (consolidated version of 16/04/2011, the latest version found on data.legilux) [S5]: "Le prestataire de services de la société de l'information doit permettre aux destinataires des services et aux autorités compétentes un accès facile, direct et permanent aux informations suivantes: a) son nom; b) l'adresse géographique où il est établi; c) les coordonnées permettant de le contacter rapidement et de communiquer directement et effectivement avec lui, y compris son adresse de courrier électronique; d) le cas échéant, son numéro d'immatriculation au registre de commerce, son numéro d'identification à la TVA et l'autorisation dont il bénéficie pour exercer son activité ainsi que les coordonnées de l'autorité ayant donné cette autorisation." Regulated professions have further items, and art. 5(2) covers prices when prices are shown.
- Scope (art. 1): "«Services de la société de l'information»: tout service presté, **normalement contre rémunération**, à distance par voie électronique et à la demande individuelle d'un destinataire de services". Whether a purely informational, non-commercial ASBL site is such a service is a question of interpretation and is not settled here. [S5]
- Art. 5 does **not** list the hosting provider, a "directeur de publication", or any data-protection contact. [S5]

### 1.3 "Directeur de la publication": Loi modifiée du 8 juin 2004 sur la liberté d'expression dans les médias
- The coordinated text of 30 April 2010 does not contain the word "directeur" (0 hits). [S6]
- Definitions (art. 3): "éditeur: toute personne physique ou morale qui, à titre d'activité principale ou régulière, conçoit et structure une publication, en assume la direction éditoriale…". "publication: ensemble d'informations mis à la disposition du public … par un éditeur moyennant recours à un média". "média: tout moyen technique, corporel ou incorporel". [S6]
- Art. 62 (non-periodic publication): it "doit indiquer l'identité et l'adresse de l'auteur ou de l'éditeur…". For a legal person, "sa dénomination et l'adresse de son siège social", plus "la date de la première mise à disposition du public". [S6]
- Art. 63 (periodic publication): requires the publisher's identity and business address, "l'identité et l'adresse professionnelle des responsables de la rédaction", and, for a legal person, "le nom de son représentant légal". [S6]
- Whether yws.lu is a "publication" by an "éditeur" under this law is a matter of interpretation. Amendments after 2010 were not checked.

### 1.4 Hosting and processor identities (from the vendors' own legal pages)
- **Vercel Inc.**: "440 N Barranca Avenue #4133 Covina, CA 91723 United States", privacy@vercel.com (Privacy Policy, last updated 1 June 2026) [S7]. The DPA (last updated 17 Mar 2026, effective 31 Mar 2026) names "Vercel Inc., a Delaware corporation", "440 N Barranca Ave #4133, Covina, CA 91723" [S8].
- **Supabase**: its DPA names "Supabase Pte. Ltd whose offices are located at 65 Chulia Street #38-02/03, OCBC Centre, Singapore 049513" (DPA "Version 1 — August 1, 2026") [S9].

## 2. GDPR (Regulation (EU) 2016/679) in Luxembourg

### 2.1 What a privacy notice must contain: Art. 13 (data collected from the person) [S10]
- 13(1): (a) identity and contact details of the controller (and its representative, if any); (b) contact details of the DPO, where applicable; (c) purposes and legal basis; (d) the legitimate interests pursued, if the basis is Art. 6(1)(f); (e) recipients or categories of recipients; (f) any intended transfer to a third country, whether an adequacy decision exists or which Art. 46/47/49 safeguards apply, and how to get a copy.
- 13(2): (a) the storage period, or the criteria used to set it; (b) the rights of access, rectification, erasure, restriction, objection and portability; (c) the right to withdraw consent, where the basis is consent; (d) the right to complain to a supervisory authority; (e) whether providing the data is a statutory or contractual requirement, and the consequences of not providing it; (f) any automated decision-making or profiling (Art. 22).
- 13(3) covers further processing for a new purpose. 13(4) exempts information the person already has. Art. 14 applies when data is not obtained from the person. Art. 12 requires "concise, transparent, intelligible and easily accessible form, using clear and plain language, in particular for any information addressed specifically to a child". [S10]
- The CNPD guide for associations (version 02.07.2018) gives the same checklist: identity and contact details, purpose, "fondement juridique", recipients, non-EU transfers ("p.ex. lorsque vous utilisez une plateforme cloud hébergée aux Etats-Unis"), retention period, rights, and the right to complain to the CNPD. It allows a short first layer at the end of a form that links to the full policy. [S11]
- Supervisory authority, as given by the CNPD: Commission nationale pour la protection des données, 1, avenue du Rock'n'roll, L-4361 Esch-sur-Alzette, tel. (+352) 26 10 60-1 [S42].

### 2.2 Legal bases and processing relevant to this site
- Art. 6(1) has six bases: (a) consent, (b) contract or pre-contractual steps, (c) legal obligation, (d) vital interests, (e) public interest task, (f) legitimate interests. The CNPD lists the same six. [S10][S42] Choosing and documenting the basis for each processing activity is the controller's job (Art. 5(2) accountability). These notes do not pick one.
- **Email and phone contact**: personal data arrives whenever someone writes or calls. The CNPD guide asks associations to provide "une adresse de messagerie dédiée" or a phone number so people can exercise their rights, and to handle requests "dans des délais courts (1 mois au maximum)" [S11]. The GDPR deadline is in Art. 12(3) [S10].
- **External Google Form (housing applications)**: the YWS site links out, and answers are collected on docs.google.com under YWS's Google account. Google says "Google Workspace and Cloud Identity offer the Cloud Data Processing Addendum (CDPA)… to address Google's data processor obligations" [S13]. Whether the form owner is a Workspace or a personal Google account decides which Google terms apply. The client must confirm (see the last section). If the form asks for special-category data, Art. 9 applies. The form's fields were not reviewed.
- **Server and CDN logs**: Vercel says it collects "End User IP address, location information derived from IP address, and system configuration information" and traffic logs. It acts "as their data processor subject to our Data Processing Addendum". It states: "Customers are solely responsible for … notifying their End Users of their personal information collection, use, and disclosure under their own terms of service and privacy policies." [S7] Supabase image requests go through Cloudflare (observed `Server: cloudflare`, cookie `__cf_bm`). Cloudflare calls `__cf_bm` "strictly necessary", says it "expires after 30 minutes of continuous inactivity", and says it "does not correspond to any user ID" [S14]. Cloudflare is on Supabase's subprocessor list [S15].
- **Zoom registration and social links**: these are links only. Registration data is entered on Zoom's own pages. Zoom's terms and its DPF status were not checked.
- **Embedded third-party content and joint control**: in CJEU C-40/17 *Fashion ID* (29 July 2019), a site that embeds a Facebook "Like" plugin "can be considered to be a controller, jointly with Facebook", for collecting and passing on visitor data [S16]. The ruling was about a social plugin. Whether it extends to a map iframe is not settled here.
- **DPO**: the CNPD guide says a DPO is mandatory for an association in only three cases (public body; core activity of large-scale regular monitoring; core activity of large-scale special-category or criminal data) and that "La nomination obligatoire d'un DPO est donc très rare dans ce domaine". If a DPO is appointed, "une adresse mail spécifique sur le site internet sera suffisante" to publish the contact. [S11]
- **Retention**: set by the organisation. Art. 13(2)(a) requires stating the period or the criteria [S10]. The CNPD's example is "aussi longtemps qu'une personne est membre d'une association" [S11]. No periods are given here.

### 2.3 International transfers (status as of 2026-10-09)
- The Commission's adequacy page (updated 23 July 2026) lists the "United States (commercial organisations participating in the EU-US Data Privacy Framework)". Singapore is not on the list. [S17]
- DPF timeline:
  - Decision (EU) 2023/1795 of 10 July 2023 [S17].
  - The General Court dismissed *Latombe v Commission* (T-553/23) on 3 Sept 2025.
  - The appeal, **C-703/25 P**, was lodged on 31 Oct 2025 (OJ C/2025/6610) [S18]. It was still pending when last reported (secondary sources, Aug 2026).
  - On 29 June 2026 the US Supreme Court decided *Trump v. Slaughter* (removal protection for FTC commissioners).
  - On 31 July 2026 the EDPB asked the Commission "to closely assess whether this development affects the functioning of Commission Implementing Decision EU 2023/1795" [S19].
  - I found no withdrawal or suspension of the decision as of 2026-10-09.
  - The first periodic review report is dated 9 Oct 2024 (COM(2024) 451). The Commission planned the next review "after three years". [S20]
- **Vercel**: its Privacy Policy says it "has certified to the U.S. Department of Commerce that it adheres to the EU-U.S. Data Privacy Framework Principles" [S7]. Its DPA incorporates "the 2021 Standard Contractual Clauses … decision 2021/914" (Module Two) [S8]. Not cross-checked on dataprivacyframework.gov because the list renders in JavaScript.
- **Google LLC**: dataprivacyframework.gov/participant/5780. A search snippet shows the EU-US DPF as active, with the next certification due 13 Sept 2027. The page itself did not render for me. [S21]
- **Supabase**: its Privacy Policy does not mention the DPF. It says "The transfer is subject to standard contractual clauses" for the US and Singapore [S22]. The DPA uses SCC Modules Two/Three and stores data in the region the customer chooses [S9]. Subprocessors (list dated 1 June 2026) include Amazon Web Services, Cloudflare, Google, Fly.io and Vercel [S15]. The project's region is not visible from the hostname.

## 3. Cookies and ePrivacy in Luxembourg

### 3.1 Statute: Loi modifiée du 30 mai 2005, art. 4(3)(e) (consolidated version of 25/12/2020) [S23]
- Verbatim: "(e) ne s'applique pas au stockage d'informations, ou l'obtention de l'accès à des informations déjà stockées, dans l'équipement terminal d'un abonné ou d'un utilisateur à condition que l'abonné ou l'utilisateur ait donné son accord, après avoir reçu une information claire et complète, entre autres sur les finalités du traitement. […] Cette disposition ne fait pas obstacle à un stockage ou à un accès techniques visant exclusivement à effectuer la transmission d'une communication par la voie d'un réseau de communications électroniques, ou strictement nécessaires au fournisseur pour la fourniture d'un service de la société de l'information expressément demandé par l'abonné ou l'utilisateur."
- Art. 4(4): breaches are punishable by "un emprisonnement de huit jours à un an et d'une amende de 251 à 125.000 euros ou d'une de ces peines seulement". [S23]
- Pending at EU level: the Nov 2025 "Digital Omnibus" proposal would move terminal-equipment rules into the GDPR (Art. 88a/88b). It is not adopted. Council compromise texts were still circulating in May/June 2026 (Council doc ST 9773/2026) [S24]. Secondary sources (Sept 2026) report no Council mandate.

### 3.2 What is "strictly necessary": CNPD guidelines "cookies et autres traceurs" (version of 03.01.2022) [S25]
- Cookies the CNPD treats as essential (no consent needed): recording the cookie choice; authentication (but "cela ne sera pas le cas pour la grande majorité des cookies fournis par les réseaux sociaux"); shopping cart; contact-form answers; "Streaming de contenu — Non, à condition que l'utilisateur ait clairement indiqué sa volonté d'accéder au contenu concerné"; display and language personalisation; security, when used "pour le compte exclusif de l'éditeur".
- Analytics need consent, except under narrow conditions: data not passed to third parties, no cross-site tracking, collected "pour le compte exclusif de l'éditeur", anonymous statistics only.
- Non-essential (consent needed): tracking, profiling, ad targeting, geolocation, and "Plugins sociaux … Oui, si le plugin est lié à l'usage de cookie".
- For a feature-specific cookie (the CNPD's example is an embedded music player), "il est recommandé de ne déposer le cookie … qu'à partir du moment où l'utilisateur indique sa volonté d'utiliser le service".
- The CNPD recommends telling users about essential cookies too. Where they involve personal data, "une information conforme à l'article 13 du RGPD doit obligatoirement être fournie".
- Consent must be informed, prior, free, unambiguous and specific, refusable and withdrawable. The guidelines recommend two layers of information, with accept, refuse and choose options. [S25]

### 3.3 EU-level positions
- CJEU C-673/17 *Planet49* (1 Oct 2019): consent is not valid through "a pre-ticked checkbox which the user must deselect to refuse his consent" [S26].
- EDPB Guidelines 05/2020 on consent (v1.1, 4 May 2020): cookie walls do not give freely given consent, and "scrolling or swiping through a webpage" is not consent [S27].
- EDPB Cookie Banner Taskforce report (17 Jan 2023): a vast majority of authorities considered a banner without a reject option on any layer that has an accept button an infringement [S28].
- EDPB Guidelines 2/2023 on the technical scope of Art. 5(3), v2.0 adopted 7 Oct 2024 [S29]:
  - Art. 5(3) covers JavaScript that "instructs the browser of the user to send asynchronous requests", and also tracking pixels.
  - IP-based tracking is covered unless the entity can show the IP does not come from the user's device.
  - The guidelines "do not analyse the application of the exemptions".
- WP29 Opinion 04/2012 (WP194, 7 June 2012), cookie consent exemption [S34]:
  - "Multimedia player session cookies" are exempt for the session, but sites "must avoid the inclusion of additional information … which are not strictly necessary for the playback".
  - Social-plugin cookies need consent "from non-members and 'logged-out' members".

### 3.4 Google Maps and YouTube embeds: observed behaviour (own tests 2026-10-09, curl from a Polish IP, HTTP headers only; cookies set by JavaScript inside the iframe were not tested)
- My Maps embed (`/maps/d/u/0/embed?mid=…`, used by RealImpactMap): the first response sets `NID` on `.google.com`, expiring Apr 2027, `SameSite=none`.
- Place embed (`/maps?q=…&output=embed`, used by ContactMap): 301, then 200, with **no** `Set-Cookie` header. JavaScript and localStorage behaviour is unknown.
- `youtube.com/embed/<id>` sets `YSC`, `VISITOR_INFO1_LIVE`, `VISITOR_PRIVACY_METADATA`, `__Secure-YNID`, `__Secure-ROLLOUT_TOKEN` and `__Secure-BUCKET`. `youtube-nocookie.com/embed/<id>`: no `Set-Cookie` header (JavaScript not tested).
- Google says `NID` is used to "remember your preferences" and to "show ads in Google services for signed-out users", and "expires 6 months from a user's last use" [S35].
- YouTube says privacy-enhanced mode means the view "will not be used to personalize the YouTube browsing experience" and ads are non-personalised. The page summary does not say whether cookies are set. [S36]
- **Click-to-load facades**: I found **no** CNPD or EDPB document that deals with "click-to-load" or "two-click" facades by name. The closest official statements are the CNPD streaming row and the music-player recommendation (§3.2) and WP194 (§3.3). It is a technical fact that with a facade no request goes to Google until the click, so nothing is stored or read by Google at page load. Whether the click is valid consent to Google's non-essential cookies, or whether the exemption covers them, is not settled in the sources found.

## 4. Accessibility

### 4.1 Loi du 28 mai 2019 (websites and mobile apps of public-sector bodies) [S37]
- Art. 1(1): "s'applique à tous les sites internet et à toutes les applications mobiles des organismes du secteur public."
- Art. 2(1°): a public-sector body is the State, the communes, an "organisme de droit public au sens de l'article 2, lettre d), de la loi modifiée du 8 avril 2018 sur les marchés publics", or an association formed by such bodies.
- Art. 2 d) of the 2018 procurement law [S38]: a body governed by public law has all three of the following:
  - (i) it was "créé pour satisfaire spécifiquement des besoins d'intérêt général ayant un caractère autre qu'industriel ou commercial";
  - (ii) it has legal personality;
  - (iii) it is "financé majoritairement par l'État, les communes ou par d'autres organismes de droit public", or its management is under their control, or more than half of its board is appointed by them.
- Art. 1(2)(2°) exclusion: "les sites internet … des organisations non gouvernementales qui ne fournissent pas de services essentiels pour le public, ni de services répondant spécifiquement aux besoins des personnes handicapées". Art. 1(3)(4°) excludes "cartes et services de cartographie en ligne" (with a condition for navigation maps), and 1(3)(5°) excludes third-party content the body neither funds nor controls. [S37]
- Where the law applies: EN 301 549 V3.2.1 is the reference standard, an accessibility statement is required, and so is a feedback mechanism with a reply within one month [S39].
- Whether YWS falls in scope depends on its funding and governance, and on the NGO exclusion. Those facts are with the client, and these notes do not decide the question.

### 4.2 European Accessibility Act: Loi du 8 mars 2023 relative aux exigences en matière d'accessibilité applicables aux produits et services (Mémorial A n° 133, 15 Mar 2023) [S40][S41]
- Art. 36: "La présente loi entre en vigueur le 28 juin 2025." Art. 34(2) lets service providers keep using products they already used lawfully during a transition "s'achevant le 28 juin 2030".
- Services covered (art. 1(2)): electronic communications; access to audiovisual media services; elements of passenger transport (air, rail, waterway, bus); consumer banking; e-books; "commerce électronique".
- "services de commerce électronique": "des services fournis à distance, via des sites internet … par voie électronique et à la demande individuelle d'un consommateur, **en vue de conclure un contrat de consommation**". "consommateur": "toute personne physique qui agit à des fins qui n'entrent pas dans le cadre de son activité commerciale…". [S41]
- Micro-enterprise exemption: "Les microentreprises qui proposent des services sont exonérées de l'obligation de se conformer aux exigences en matière d'accessibilité". A microentreprise is "une entreprise qui emploie moins de dix personnes et dont le chiffre d'affaires annuel n'excède pas 2 000 000 euros ou dont le total du bilan annuel n'excède pas 2 000 000 euros". [S41]
- Neither the law nor the directive names non-profits explicitly. A purely informational site is not in the list of covered services. Whether linking to a housing application form amounts to "commerce électronique" (a "contrat de consommation") is a matter of interpretation and is not settled here.
- **Bottom line (facts only)**: WCAG/EN 301 549 conformity is a legal requirement only if YWS falls within one of the two laws above. Neither these notes nor the sources decide that for YWS. Otherwise it is best practice, and the Luxembourg portal publishes RAWeb as its evaluation method [S39].

## 5. Image rights and photos of young people
- Luxembourg has no specific statute on image rights. The CNPD: "Alors même qu'il n'existe pas de texte spécifique portant sur le droit à l'image en droit luxembourgeois, la jurisprudence en la matière l'a clairement consacré", mostly based on art. 1 of the Loi du 11 août 1982 ("chacun a droit au respect de sa vie privée") and Art. 8 ECHR. [S11][S42]
- Consent is needed twice. "une personne qui donne son consentement pour la prise de photos ne le donne pas nécessairement pour la publication … Il y a donc lieu de collecter un double consentement". Publication on social networks counts as publication. Consent does not carry over from one medium to another: "l'autorisation de publication d'un cliché dans un journal imprimé n'inclut pas le consentement à la publication sur un site en ligne". Silence "équivaut en principe à un refus". The person who publishes carries the burden of proof. [S42]
- Minors: "Pour les mineurs, il faut recueillir le consentement auprès des représentants légaux". From the "âge de discernement" ("en principe à partir de 13 ans", citing Belgian and French case law), the CNPD recommends getting the minor's consent as well. For associations, the CNPD recommends a consent form once a year that lists purposes and media (internet, social networks, etc.) and allows a yes for one medium and a no for another. Withdrawal is possible at any time. [S11][S42]
- Events: at a public event an association organises, photos may be taken and published without consent on freedom-of-expression grounds. If someone objects, the association should, "dans la mesure du possible", remove or blur them. The duty to inform still applies. [S11]
- GDPR side: an image of an identifiable person is personal data, and the GDPR applies outside purely private use. The CNPD notes that tacit consent accepted for image rights is not consent under the GDPR, so the controller may need another basis, for example legitimate interests. [S42]
- Age of digital consent: Art. 8(1) GDPR sets **16** and lets Member States go down to 13 [S10]. The Loi du 1er août 2018 (CNPD / GDPR implementation) has no age provision; a text search of the published law for "enfant", "mineur" or "16 ans" found nothing [S43]. The CNPD states that for information-society services offered directly to children, "le consentement des mineurs d'au moins 16 ans est suffisant selon l'article 8 RGPD" [S42]. Art. 8 covers consent to information-society services. It is not the image-rights rule above.
- Other texts the CNPD cites on minors: Loi du 10 août 1992 relative à la protection de la jeunesse, art. 38; Code pénal arts. 383, 383bis, 385. The CNPD guidelines date from 2018, and their Constitution article references (art. 11(3), 24) use the pre-revision numbering. [S42]

## 6. Real Luxembourg ASBL examples (observed 2026-10-09; listed as structural examples, not judged for compliance)
1. **CGJL a.s.b.l. ("de Jugendrot", youth umbrella body)**, https://www.jugendrot.lu/impressum/ [S30]. Impressum shows: name with "a.s.b.l.", address, phone, email, "Vertrueden duerch | Président …", "Registergeriicht | R.C.S. Luxembourg", "Registernummer | F 737", "Siège social", and a link to a separate "Dateschutzerklärung". The site has a cookie banner.
2. **Inter-Actions a.s.b.l.**, https://inter-actions.lu/mentions-legales/ and https://inter-actions.lu/protection-des-donnees/ [S31]. Legal notice: name, address, phone, fax, email, "R.C.S. Luxembourg : F829", "COPYRIGHT", and "CLAUSE DE RESPONSABILITÉ" for external links. Privacy page: controller statement; 1 data collected; 2 purposes; 3 legal bases; 4 recipients (including a statement on non-EU processing); 5 security; 6 retention (gives specific periods); 7 rights plus DPO email; 8 changes; 9 contact; then "II. Politique relative aux cookies", which mentions YouTube cookies when a video is played.
3. **Info-Handicap – Conseil National des Personnes Handicapées asbl**, https://info-handicap.lu/impressum/ and https://info-handicap.lu/datenschutz/ [S32]. Impressum: name with "asbl", address, phone, email, "RCS F746", agrément number, public-utility recognition decree, IBAN/BIC, Peppol ID. Datenschutz: contact for data requests (dedicated email), purposes, legal bases, retention heading, data categories (including special categories), services used (self-hosted Matomo, Mailchimp, YouTube IFrame Player, OpenStreetMap widget, Billetweb), cookies, rights, and the CNPD complaint address. The footer also links to an "Erklärung zur Barrierefreiheit" (accessibility statement).
4. **Cercle de Coopération des ONGD du Luxembourg**, https://cercle.lu/mentions-legales/ [S33]. A single page with: "Éditeur responsable" plus address; site technology and host (WordPress, Domain Factory); plugins and Google Analytics; "Contenu et liens d'autres sites" (embedded content may set cookies); "Utilisation des images et vidéos" (asks permission, with a removal contact); the data-protection policy (data, purposes, bases, retention, security, rights, a named GDPR contact, CNPD complaint); and "RCS : F471". The page shows two different addresses.
- Common sections across the four: identity block (name, a.s.b.l., seat, RCS F-number, contact); representative or "éditeur"; IP/copyright; link-liability disclaimer; privacy (controller, data, purposes, bases, recipients/transfers, retention, rights, contact or DPO, CNPD complaint); cookies; sometimes host, image-use and accessibility statement.

## Facts the client must supply
- Exact registered name as on the RCS ("Youth Work Synergy a.s.b.l."?), the **RCS number (F + digits)**, and the registered seat. The code shows Fentange as "Siège (adresse postale)" and Rue Adolphe Fischer as office; confirm which is the statutory seat.
- Who legally represents the ASBL (president or board; any "délégué à la gestion journalière" registered with LBR) and who is responsible for site content.
- VAT number, if any. Any agrément or authorisation (e.g., a ministry approval for youth work or housing) and the authority that granted it. Public-utility status, if any.
- Contact channel for data-protection requests (dedicated email). Whether a DPO is appointed (and its contact, if so).
- Retention periods for each processing activity: contact emails and calls, housing applications, event registrations, photos, logs. These are set by the organisation.
- Google account type behind the Forms (Workspace/Nonprofits vs personal), the form fields (any Art. 9 data, ID documents, income, nationality), who sees the answers, and where they are exported.
- Zoom account type and who receives registrant data. Any other tools (newsletter, CRM, Drive).
- Supabase project region. Vercel plan, log settings and function region. Whether Vercel Web Analytics or Speed Insights is or will be enabled.
- Photo consent process: forms for minors and parents, coverage of the website and social media, the withdrawal contact, and whether the identifiable people on the current site have consented.
- Funding and governance (share of public funding; State-appointed board members) and headcount and annual turnover or balance sheet. These are needed to place YWS against the 2019 accessibility law and the EAA micro-enterprise threshold.
- Languages the legal pages must be available in (FR/EN/DE/LU).

## Sources (all checked 2026-10-09 unless noted)
- S1 Loi du 7 août 2023, Mémorial A 592 (official PDF/A copy, hosted on benevolat.lu): https://benevolat.lu/uploads/site/eli-etat-leg-loi-2023-08-07-a592-jo-fr-pdfa.pdf (Legilux ELI: https://legilux.public.lu/eli/etat/leg/loi/2023/08/07/a592/jo, which renders in JavaScript)
- S2 LBR Circulaire 23/02 (22 Nov 2023): https://lbrcontent.public.lu/dam-assets/code-legal/circular/rcs/fr/circulaire-23-2.pdf
- S3 Chamber dossier 8420 (law of 4 Dec 2024): https://chd.lu/en/dossier/8420 (seen through search results)
- S4 guichet.lu, Création d'une ASBL: https://guichet.public.lu/fr/citoyens/loisirs/milieu-associatif/engagement-benevole/creation-asbl.html
- S5 Loi 14 août 2000, consolidated 16/04/2011: https://legilux.public.lu/eli/etat/leg/loi/2000/08/14/n8/consolide/20110416
- S6 Loi 8 juin 2004, coordinated text 30 Apr 2010: https://data.legilux.public.lu/file/eli-etat-leg-tc-2010-04-30-n1-jo-fr-html.html
- S7 Vercel Privacy Policy: https://vercel.com/legal/privacy-policy
- S8 Vercel DPA: https://vercel.com/legal/dpa
- S9 Supabase DPA: https://supabase.com/legal/customer-resources/data-processing-addendum
- S10 GDPR, EUR-Lex: https://eur-lex.europa.eu/eli/reg/2016/679/oj (EUR-Lex returned a bot challenge on 2026-10-09; the article content is from the official text and was cross-checked with S11)
- S11 CNPD, RGPD guide for associations (02.07.2018): https://cnpd.public.lu/content/dam/cnpd/fr/dossiers-thematiques/guidance-associations/CNPD-Guidance-Associations.pdf
- S12 CNPD, legal bases for associations (web version of S11; not opened, seen through search results): https://cnpd.public.lu/fr/dossiers-thematiques/associations/guide-monde-associatif/legitimite-traitement.html
- S13 Google Workspace CDPA page: https://knowledge.workspace.google.com/admin/compliance/privacy-compliance-and-records-for-google-workspace-and-cloud-identity
- S14 Cloudflare cookies: https://developers.cloudflare.com/fundamentals/reference/policies-compliances/cloudflare-cookies/
- S15 Supabase subprocessors (1 June 2026): https://supabase.com/legal/subprocessor-list/June-1-2026.pdf
- S16 CJEU C-40/17 press release: https://curia.europa.eu/site/upload/docs/application/pdf/2019-07/cp190099en.pdf
- S17 Commission adequacy list: https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection/adequacy-decisions_en
- S18 C-703/25 P notice of appeal, OJ C/2025/6610: https://eur-lex.europa.eu/eli/C/2025/6610/oj (seen through search results)
- S19 EDPB letter of 31 July 2026: https://www.edpb.europa.eu/system/files/2026-08/edpb_letter_20260731_us_supremecourt_judgment_trump_v_slaughter_en.pdf
- S20 Commission DPF first review report COM(2024) 451: https://commission.europa.eu/document/download/25695177-8073-4ce3-bf81-eb816dc6b468_en (seen through search results)
- S21 DPF list, Google LLC: https://www.dataprivacyframework.gov/participant/5780 (status from a search snippet; the page did not render)
- S22 Supabase Privacy Policy: https://supabase.com/privacy
- S23 Loi 30 mai 2005, consolidated 25/12/2020: https://legilux.public.lu/eli/etat/leg/loi/2005/05/30/n4 (later amendments not checked)
- S24 Council doc ST 9773/2026: https://data.consilium.europa.eu/doc/document/ST-9773-2026-INIT/en/pdf (seen through search results)
- S25 CNPD cookie guidelines (03.01.2022): https://cnpd.public.lu/content/dam/cnpd/fr/dossiers-thematiques/cookies/CNPD-LD-Cookies.pdf and https://cnpd.public.lu/fr/dossiers-thematiques/cookies0/cookies/principes-applicables.html
- S26 CJEU C-673/17 Planet49: https://eur-lex.europa.eu/legal-content/en/TXT/?uri=CELEX%3A62017CJ0673
- S27 EDPB Guidelines 05/2020: https://www.edpb.europa.eu/our-work-tools/our-documents/guidelines/guidelines-052020-consent-under-regulation-2016679_en
- S28 EDPB Cookie Banner Taskforce report: https://www.edpb.europa.eu/system/files/2023-01/edpb_20230118_report_cookie_banner_taskforce_en.pdf
- S29 EDPB Guidelines 2/2023 v2: https://www.edpb.europa.eu/system/files/documents/2024-10/edpb_guidelines_202302_technical_scope_art_53_eprivacydirective_v2_en_0.pdf
- S30 https://www.jugendrot.lu/impressum/
- S31 https://inter-actions.lu/mentions-legales/ and https://inter-actions.lu/protection-des-donnees/
- S32 https://info-handicap.lu/impressum/ and https://info-handicap.lu/datenschutz/
- S33 https://cercle.lu/mentions-legales/
- S34 WP29 WP194: https://ec.europa.eu/justice/article-29/documentation/opinion-recommendation/files/2012/wp194_en.pdf
- S35 Google, How Google uses cookies: https://policies.google.com/technologies/cookies?hl=en
- S36 YouTube Help, Embed videos: https://support.google.com/youtube/answer/171780?hl=en
- S37 Loi du 28 mai 2019: https://legilux.public.lu/eli/etat/leg/loi/2019/05/28/a373/jo
- S38 Loi 8 avril 2018 marchés publics, consolidated 01/02/2023: https://legilux.public.lu/eli/etat/leg/loi/2018/04/08/a243/consolide/20230201
- S39 accessibilite.public.lu obligations: https://accessibilite.public.lu/fr/obligations.html
- S40 EAA law (German translation PDF): https://accessibilite-produits-services.public.lu/dam-assets/lgislation/de-loi-du-8-mars-2023-relative-aux-exigences-en-matire-daccessibilit-applicables-aux-produits-et-services.pdf
- S41 Loi du 8 mars 2023 (FR, Legilux): https://legilux.public.lu/eli/etat/leg/loi/2023/03/08/a133/jo
- S42 CNPD image-rights guidelines (20.07.2018): https://cnpd.public.lu/content/dam/cnpd/fr/dossiers-thematiques/droit-image/CNPD-Lignes-directrices-droit-a-l-image-protection-donnees-personnelles.pdf
- S43 Loi du 1er août 2018: https://legilux.public.lu/eli/etat/leg/loi/2018/08/01/a686/jo

Not covered: legal advice or any finding that YWS complies; drafting the legal notice, privacy or cookie texts; consent-management tool choice; the Digital Services Act (DSA) and platform rules; copyright licences for site photos, fonts and logos; donation, fundraising or tax rules (public-utility status, tax receipts); EU-grant publicity rules (Erasmus+/ESC visibility obligations); housing and rental law for the housing programme; employment, volunteer or child-protection safeguarding rules beyond image rights; Zoom's, Meta's and LinkedIn's own terms; full Legilux consolidations after the versions cited (in particular any post-2020 amendment to the 2005 law and post-2010 amendments to the 2004 media law); JavaScript-level cookie behaviour inside the Google Maps iframes; French LCEN-style hosting-identification rules, which apply in France and not in Luxembourg.
