import Link from "next/link";
import type { CSSProperties } from "react";
import { Tear } from "@/components/Decor";

export type Crumb = { href?: string; label: string };

/** Banner at the top of every inner page: photo, title, lead and breadcrumb. */
export function PageHero({ title, lead, image, crumbs }: { title: string; lead?: string; image: string; crumbs: Crumb[] }) {
  return (
    <section className="page-hero" style={{ "--img": `url(${image})` } as CSSProperties}>
      <div className="wrap">
        <nav className="crumbs" aria-label="Breadcrumb">
          {crumbs.map((c, i) => (
            <span key={i}>
              {c.href ? <Link href={c.href}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
            </span>
          ))}
        </nav>
        <h1>{title}</h1>
        {lead && <p>{lead}</p>}
      </div>
      <Tear />
    </section>
  );
}
