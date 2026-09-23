"use client";

import Image from "next/image";
import { useState } from "react";

export type GalleryCategory = "field" | "station" | "ship";
export type GalleryItem = { src: string; caption: string; category: GalleryCategory };
type Filter = "all" | GalleryCategory;

export function Gallery({ items, filters }: { items: GalleryItem[]; filters: Record<Filter, string> }) {
  const [filter, setFilter] = useState<Filter>("all");
  const visible = items.filter((i) => filter === "all" || i.category === filter);

  return (
    <>
      <div className="tabs" role="group">
        {(Object.keys(filters) as Filter[]).map((f) => (
          <button key={f} type="button" aria-pressed={filter === f} onClick={() => setFilter(f)}>
            {filters[f]}
          </button>
        ))}
      </div>
      <div className="ggrid">
        {visible.map((item) => (
          // keyed by filter so items re-mount and replay the pop animation on each switch
          <figure key={`${filter}-${item.src}-${item.caption}`} className={`gi${filter === "all" ? "" : " pop"}`}>
            <div className="ph">
              <Image src={item.src} alt={item.caption} fill sizes="(max-width: 680px) 50vw, (max-width: 1100px) 33vw, 25vw" />
            </div>
            <figcaption>{item.caption}</figcaption>
          </figure>
        ))}
      </div>
    </>
  );
}
