import {
  Aref_Ruqaa,
  Cairo,
  IBM_Plex_Sans,
  Kaushan_Script,
  Marck_Script,
  Noto_Sans_SC,
  ZCOOL_KuaiLe,
} from "next/font/google";

// Self-hosted at build time by next/font — no request to Google from the visitor
// (important for China, where Google Fonts is blocked).
const cairo = Cairo({ subsets: ["arabic", "latin"], variable: "--f-cairo", display: "swap" });
const ruqaa = Aref_Ruqaa({ subsets: ["arabic", "latin"], weight: ["400", "700"], variable: "--f-ruqaa", display: "swap" });
const kaushan = Kaushan_Script({ subsets: ["latin"], weight: "400", variable: "--f-kaushan", display: "swap" });
const marck = Marck_Script({ subsets: ["cyrillic", "latin"], weight: "400", variable: "--f-marck", display: "swap", preload: false });
const plex = IBM_Plex_Sans({ subsets: ["latin", "cyrillic"], weight: ["400", "500", "600", "700"], variable: "--f-plex", display: "swap" });
const notoSC = Noto_Sans_SC({ weight: ["400", "500", "700"], variable: "--f-noto-sc", display: "swap", preload: false });
const zcool = ZCOOL_KuaiLe({ weight: "400", variable: "--f-zcool", display: "swap", preload: false });

export const fontVariables = [cairo, ruqaa, kaushan, marck, plex, notoSC, zcool]
  .map((f) => f.variable)
  .join(" ");
