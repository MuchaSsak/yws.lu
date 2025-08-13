import { Montserrat, Noto_Color_Emoji } from "next/font/google";

export const montserratSans = Montserrat({
  variable: "--font-montserrat-sans",
  subsets: ["latin"],
});

export const notoColorEmoji = Noto_Color_Emoji({
  variable: "--font-emoji",
  subsets: ["emoji"],
  weight: "400",
});
