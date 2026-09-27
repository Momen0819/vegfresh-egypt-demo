import React from 'react';
import Link from 'next/link';
import { Construction, ArrowLeft, ArrowRight, Home, Sparkles } from 'lucide-react';
import type { Dictionary } from '@/i18n/dictionaries/ar';
import type { Locale } from '@/i18n/config';

interface UnderDevelopmentProps {
  dict: Dictionary;
  lang: Locale;
  pageTitle?: string;
}

export default function UnderDevelopment({ dict, lang, pageTitle }: UnderDevelopmentProps) {
  const isRtl = lang === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-4">
      <div className="max-w-xl w-full text-center space-y-6 bg-white/80 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-emerald-100 shadow-xl shadow-emerald-500/5">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
          <span>{dict.underDev?.badge || 'Demo Preview'}</span>
        </div>

        <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shadow-inner">
          <Construction className="w-10 h-10 animate-bounce" />
        </div>

        <div className="space-y-3">
          {pageTitle && (
            <div className="text-sm font-medium text-emerald-700 tracking-wide uppercase">
              {pageTitle}
            </div>
          )}
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight">
            {dict.underDev?.title || 'Page Under Active Development'}
          </h1>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            {dict.underDev?.description}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-500">
          {dict.underDev?.notice}
        </div>

        <div className="pt-2">
          <Link
            href={`/${lang}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-sm transition-all duration-200 shadow-lg shadow-emerald-700/20 active:scale-95"
          >
            <Home className="w-4 h-4" />
            <span>{dict.underDev?.backHome || 'Back to Home Page'}</span>
            <ArrowIcon className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
