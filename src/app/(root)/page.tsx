import Image from "next/image";
import Link from "next/link";
import { defaultLocale, localeNames, locales } from "@/i18n/config";

// Static export has no server redirects, so "/" picks the language in the browser:
// saved choice → browser language → Arabic. Without JS the links below still work.
const redirectScript = `(function(){var L=${JSON.stringify(locales)},l;try{l=localStorage.getItem('vf-lang')}catch(e){}
if(L.indexOf(l)<0){var n=(navigator.language||'').slice(0,2);l=L.indexOf(n)>-1?n:'${defaultLocale}'}
location.replace('/'+l+'/'+location.hash)})();`;

export default function RootPage() {
  return (
    <main className="redirect">
      <script dangerouslySetInnerHTML={{ __html: redirectScript }} />
      <Image src="/vf-logo.png" alt="Veg Fresh Egypt" width={160} height={169} priority />
      <nav aria-label="Language">
        {locales.map((l) => (
          <Link key={l} className="btn btn-g" href={`/${l}/`} hrefLang={l} lang={l}>
            {localeNames[l]}
          </Link>
        ))}
      </nav>
    </main>
  );
}
