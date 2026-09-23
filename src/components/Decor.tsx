import type { CSSProperties } from "react";

const TEAR =
  "M0,40 L0,20 L30,14 L55,24 L90,12 L120,22 L150,10 L185,20 L210,8 L245,18 L280,12 L310,24 L345,14 L380,22 L410,10 L445,20 L480,12 L515,24 L545,14 L580,20 L615,8 L650,18 L685,12 L715,22 L750,10 L785,20 L815,14 L850,24 L885,12 L915,20 L950,8 L985,18 L1020,12 L1050,24 L1085,14 L1120,22 L1150,10 L1185,20 L1220,12 L1250,22 L1285,14 L1320,24 L1350,12 L1385,20 L1415,10 L1440,18 L1440,40 Z";

/** Torn-paper edge between sections. */
export function Tear({ flip = false }: { flip?: boolean }) {
  return (
    <svg className={`tear${flip ? " top-edge" : ""}`} viewBox="0 0 1440 40" preserveAspectRatio="none" aria-hidden="true">
      <path fill="#fff" d={TEAR} />
    </svg>
  );
}

/** Swaying leaf ornament. */
export function Leaf({ dark = false, width, style }: { dark?: boolean; width: number; style?: CSSProperties }) {
  return (
    <svg
      className={`leaf${dark ? " d" : ""}`}
      viewBox="0 0 60 40"
      width={width}
      height={Math.round((width * 2) / 3)}
      style={style}
      aria-hidden="true"
    >
      <path d="M2 20 C 14 2, 44 0, 58 20 C 44 40, 14 38, 2 20 Z" />
      <path d="M6 20 C 22 18, 40 18, 54 20" />
    </svg>
  );
}

/** Pencil sketch of a sweet potato used as section background. */
export function SweetPotatoSketch({ style }: { style?: CSSProperties }) {
  return (
    <svg className="sk" viewBox="0 0 220 120" width="280" height="153" style={style} aria-hidden="true">
      <path d="M20 70 C 40 30, 120 20, 180 45 C 205 56, 212 70, 200 80 C 170 100, 90 108, 45 95 C 25 90, 14 82, 20 70 Z" />
      <path d="M200 80 C 210 84, 216 90, 218 100" />
      <path d="M20 70 C 12 66, 6 60, 2 52" />
      <path d="M70 55 C 75 53, 80 53, 85 55M120 80 C 126 82, 132 82, 138 80M150 50 C 155 51, 160 54, 163 57" />
    </svg>
  );
}
