import React from "react";

import ContactInfo from "@/app/(components)/contact/ContactInfo";
import ContactMap from "@/app/(components)/contact/ContactMap";

export const CONTACT_SECTION_ID = "contact-section";

function ContactSection() {
  return (
    <section
      id={CONTACT_SECTION_ID}
      className="pb-32 flex px-side max-xl:flex-col max-sm:items-center xl:items-center max-xl:gap-12"
    >
      {/* Info */}
      <ContactInfo />

      {/* Map */}
      <ContactMap />
    </section>
  );
}

export default ContactSection;
