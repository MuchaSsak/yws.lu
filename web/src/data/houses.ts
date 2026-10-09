import { msg } from "@lingui/core/macro";
import type { MessageDescriptor } from "@lingui/core";
import type { ImageMetadata } from "astro";

import house1 from "~/assets/houses/yws-shared-house-1.webp";
import house2 from "~/assets/houses/yws-shared-house-2.webp";
import house3 from "~/assets/houses/yws-shared-house-3.jpg";
import house4 from "~/assets/houses/yws-shared-house-4.jpg";
import house5 from "~/assets/houses/yws-shared-house-5.jpg";
import house6 from "~/assets/houses/yws-shared-house-6.jpg";
import house7 from "~/assets/houses/yws-shared-house-7.jpg";

/**
 * The shared houses' pictures on About us (wiki: content/content-model.md § House pictures): the client's photos, in
 * the repo since the Supabase bucket was retired [user 2026-10-09], in the 2025 carousel order. They go through the
 * image pipeline (AVIF/WebP at real widths) and sit in the HTML with an alt that says what each shows, per locale, so
 * search engines index them. Neutral file names and no village in the alt: residents' privacy (open-questions Q34).
 */
export interface HousePicture {
  image: ImageMetadata;
  alt: MessageDescriptor;
}

export const HOUSE_PICTURES: HousePicture[] = [
  { image: house1, alt: msg`A YWS shared house in Luxembourg: a grey three-storey town house with white window surrounds` },
  { image: house2, alt: msg`A YWS shared house in Luxembourg: a narrow sandstone town house with carved window frames` },
  { image: house3, alt: msg`A YWS shared house in Luxembourg: a white detached house among fields, seen from above` },
  { image: house4, alt: msg`A YWS shared house in Luxembourg: a modern white villa with wide windows above garden steps` },
  { image: house5, alt: msg`A YWS shared house in Luxembourg: a three-storey corner building with a café on the ground floor` },
  { image: house6, alt: msg`A YWS shared house in Luxembourg: a beige bungalow at the end of a paved driveway` },
  { image: house7, alt: msg`A YWS shared house in Luxembourg: a white house with a dark tiled roof, a lawn and a fir tree` },
];
