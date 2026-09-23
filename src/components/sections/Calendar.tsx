import type { Locale } from "@/i18n/config";
import type { MonthState } from "@/lib/catalog";

/** Localised short month names, Jan…Dec. */
export const monthNames = (lang: Locale) =>
  Array.from({ length: 12 }, (_, m) =>
    new Intl.DateTimeFormat(lang === "ar" ? "ar-EG" : lang, { month: "short", timeZone: "UTC" }).format(new Date(Date.UTC(2026, m, 15))),
  );

type Legend = { harvest: string; peak: string; available: string };
const stateLabel = (s: MonthState, l: Legend) => (s === "h" ? l.harvest : s === "p" ? l.peak : s === "a" ? l.available : "");

export function CalendarLegend({ legend }: { legend: Legend }) {
  return (
    <div className="cal-legend">
      <span>
        <i className="m-h" />
        {legend.harvest}
      </span>
      <span>
        <i className="m-p" />
        {legend.peak}
      </span>
      <span>
        <i className="m-a" />
        {legend.available}
      </span>
    </div>
  );
}

/** One product's 12-month availability strip. */
export function MonthBar({ lang, months, legend }: { lang: Locale; months: MonthState[]; legend: Legend }) {
  const names = monthNames(lang);
  return (
    <div className="mbar-wrap">
      <ol className="mbar">
        {months.map((s, i) => (
          <li key={i} className={s ? `m-${s}` : undefined} title={stateLabel(s, legend) || undefined}>
            <span>{names[i]}</span>
          </li>
        ))}
      </ol>
      <CalendarLegend legend={legend} />
    </div>
  );
}
