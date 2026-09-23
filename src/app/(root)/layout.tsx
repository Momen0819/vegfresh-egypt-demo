import type { Metadata } from "next";
import "../globals.css";
import { fontVariables } from "@/lib/fonts";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "Veg Fresh Egypt",
  robots: { index: false },
};

/** Root layout for "/" only — the language picker/redirect page. */
export default function RootRedirectLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ar" className={fontVariables}>
      <body>{children}</body>
    </html>
  );
}
