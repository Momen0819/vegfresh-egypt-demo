"use client";

import { useState } from "react";
import { waLink } from "@/lib/site";
import type { PagesDictionary } from "@/i18n/dictionaries/pages/ar";

type Labels = PagesDictionary["logistics"]["calc"];

const PALLETS = { c20: 10, c40: 20 } as const;
type Container = keyof typeof PALLETS;

/** Estimated net load for a reefer: pallets × packs per pallet × pack weight. Purely client-side. */
export function LoadCalculator({ t, requestTitle }: { t: Labels; requestTitle: string }) {
  const [container, setContainer] = useState<Container>("c40");
  const [packKg, setPackKg] = useState(10);
  const [perPallet, setPerPallet] = useState(100);

  const pallets = PALLETS[container];
  const packs = pallets * perPallet;
  const tons = (packs * packKg) / 1000;
  const fmt = (n: number) => n.toLocaleString("en-US", { maximumFractionDigits: 1 });

  const summary = `${requestTitle}\n${t.container}: ${t[container]}\n${t.packWeight}: ${packKg}\n${t.perPallet}: ${perPallet}\n${t.net}: ${fmt(tons)} ${t.tons}`;

  return (
    <div className="calc">
      <div className="calc-fields">
        <fieldset>
          <legend>{t.container}</legend>
          {(Object.keys(PALLETS) as Container[]).map((c) => (
            <label key={c} className={`calc-opt${container === c ? " on" : ""}`}>
              <input type="radio" name="container" value={c} checked={container === c} onChange={() => setContainer(c)} />
              {t[c]}
            </label>
          ))}
        </fieldset>
        <label className="calc-num">
          <span>{t.packWeight}</span>
          <input
            id="calc-kg"
            type="number"
            inputMode="decimal"
            min={1}
            max={1000}
            value={packKg}
            onChange={(e) => setPackKg(Math.max(0, Number(e.target.value) || 0))}
          />
        </label>
        <label className="calc-num">
          <span>{t.perPallet}</span>
          <input
            id="calc-pp"
            type="number"
            inputMode="numeric"
            min={1}
            max={500}
            value={perPallet}
            onChange={(e) => setPerPallet(Math.max(0, Math.round(Number(e.target.value) || 0)))}
          />
        </label>
      </div>
      <div className="calc-out" aria-live="polite">
        <div>
          <span className="num">{pallets}</span>
          <small>{t.pallets}</small>
        </div>
        <div>
          <span className="num">{fmt(packs)}</span>
          <small>{t.packs}</small>
        </div>
        <div className="big">
          <span className="num">
            {fmt(tons)} {t.tons}
          </span>
          <small>{t.net}</small>
        </div>
        <a className="btn btn-o" href={waLink(summary)} target="_blank" rel="noopener">
          {t.send}
        </a>
      </div>
    </div>
  );
}
