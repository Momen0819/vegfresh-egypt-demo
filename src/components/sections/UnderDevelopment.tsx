import React, { type CSSProperties } from 'react';
import Link from 'next/link';
import { href } from '@/lib/routes';
import { Leaf, SweetPotatoSketch } from '@/components/Decor';
import type { Dictionary } from '@/i18n/dictionaries/ar';
import { locales, localeNames, type Locale } from '@/i18n/config';

interface UnderDevelopmentProps {
  dict: Dictionary;
  lang: Locale;
  pageTitle?: string;
}

export default function UnderDevelopment({ dict, lang, pageTitle }: UnderDevelopmentProps) {
  const isRtl = lang === 'ar';
  const u = dict.underDev || {
    badge: 'نسخة المعاينة التجريبية (Demo)',
    title: 'الصفحة قيد التطوير والتنفيذ الفني',
    description: 'هذه الشاشة مخصصة ضمن العرض الفني الكامل وتخضع حالياً لعمليات التهيئة والتطوير وربط البيانات.',
    notice: 'يمكنك استكشاف الميزات التفاعلية الكاملة ومبدل اللغات عبر الصفحة الرئيسية.',
    backHome: 'العودة إلى الصفحة الرئيسية',
  };

  const featurePills = {
    ar: [
      { title: 'الرئيسية التفاعلية', desc: 'استعراض الأصناف والمواسم والجداول الحية' },
      { title: 'دعم 4 لغات عالمية', desc: 'العربية، الإنجليزية، الروسية، والصينية' },
      { title: 'تواصل فوري للتصدير', desc: 'ربط مباشر بمبيعات التصدير عبر واتساب' },
    ],
    en: [
      { title: 'Interactive Home', desc: 'Explore live varieties, calendar & export specs' },
      { title: '4 Global Languages', desc: 'Full support for AR, EN, RU, and ZH' },
      { title: 'Direct Export Desk', desc: 'Instant WhatsApp connection with sales team' },
    ],
    ru: [
      { title: 'Главная страница', desc: 'Интерактивный каталог сортов и график сбора' },
      { title: '4 мировых языка', desc: 'Поддержка арабского, английского, русского и китайского' },
      { title: 'Прямой экспорт', desc: 'Быстрая связь с отделом продаж через WhatsApp' },
    ],
    zh: [
      { title: '核心互动首页', desc: '查看完整产品品种、采收日历与出口规格' },
      { title: '4 种国际语言', desc: '完整支持阿拉伯语、英语、俄语及中文' },
      { title: '出口直连咨询', desc: '通过 WhatsApp 与出口销售团队即时沟通' },
    ],
  };

  const activeFeatures = featurePills[lang] || featurePills.en;

  return (
    <section className="under-dev-section" style={{ position: 'relative', overflow: 'hidden', padding: '80px 0 100px', background: '#F8FAF6' }}>
      {/* Background Ornaments */}
      <SweetPotatoSketch style={{ position: 'absolute', top: 30, right: isRtl ? 'auto' : 20, left: isRtl ? 20 : 'auto', opacity: 0.08, pointerEvents: 'none' }} />
      <Leaf width={70} style={{ position: 'absolute', bottom: 40, right: isRtl ? 40 : 'auto', left: isRtl ? 'auto' : 40, opacity: 0.25, pointerEvents: 'none', transform: 'rotate(15deg)' }} />

      <div className="wrap" style={{ maxWidth: 960, margin: '0 auto' }}>
        <div
          style={{
            background: '#ffffff',
            borderRadius: '24px',
            border: '1px solid #E3E9DE',
            boxShadow: '0 20px 48px -12px rgba(38, 48, 42, 0.08), 0 1px 3px rgba(0,0,0,0.02)',
            padding: 'clamp(32px, 5vw, 56px)',
            position: 'relative',
            zIndex: 2,
            textAlign: 'center',
          }}
        >
          {/* Status Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#EEF6EA', border: '1px solid #D5E8CD', padding: '6px 18px', borderRadius: '999px', marginBottom: '24px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#3FA535', display: 'inline-block', boxShadow: '0 0 0 3px rgba(63,165,53,0.25)', animation: 'pulse 2s infinite' }} />
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#2E6B24', letterSpacing: '0.02em' }}>
              {u.badge}
            </span>
          </div>

          {/* Title & Page context */}
          <h2
            className="title"
            style={{
              fontSize: 'clamp(28px, 3.8vw, 42px)',
              lineHeight: 1.3,
              marginBottom: '16px',
              color: 'var(--ink)',
            }}
          >
            {pageTitle ? `${pageTitle} — ` : ''}
            <span style={{ color: 'var(--orange)' }}>{u.title}</span>
          </h2>

          <p
            className="sub"
            style={{
              fontSize: 'clamp(15px, 1.4vw, 17px)',
              lineHeight: 1.8,
              color: 'var(--muted)',
              maxWidth: '680px',
              margin: '0 auto 28px',
            }}
          >
            {u.description}
          </p>

          {/* 3 Pillar Feature Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '16px',
              marginBottom: '36px',
              textAlign: isRtl ? 'right' : 'left',
            }}
          >
            {activeFeatures.map((feat, idx) => (
              <div
                key={idx}
                style={{
                  background: '#F9FAF7',
                  border: '1px solid #E8EDE4',
                  borderRadius: '16px',
                  padding: '18px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  transition: 'transform 0.2s, border-color 0.2s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: idx === 0 ? '#3FA535' : idx === 1 ? '#F07B2B' : '#2E8B2E' }} />
                  <strong style={{ fontSize: '15px', color: 'var(--ink)' }}>{feat.title}</strong>
                </div>
                <span style={{ fontSize: '13px', color: '#6A766D', lineHeight: 1.5 }}>{feat.desc}</span>
              </div>
            ))}
          </div>

          {/* Live Languages Available Bar */}
          <div
            style={{
              background: '#F4F7F2',
              borderRadius: '14px',
              padding: '12px 20px',
              marginBottom: '36px',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
            }}
          >
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#4F5D54' }}>
              {u.notice}
            </span>
            <div style={{ display: 'flex', gap: '6px' }}>
              {locales.map((loc) => (
                <span
                  key={loc}
                  style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    padding: '3px 10px',
                    borderRadius: '999px',
                    background: loc === lang ? 'var(--green)' : '#FFFFFF',
                    color: loc === lang ? '#FFFFFF' : 'var(--muted)',
                    border: '1px solid',
                    borderColor: loc === lang ? 'var(--green)' : '#DDE3D9',
                  }}
                >
                  {localeNames[loc]}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', justifyContent: 'center', alignItems: 'center' }}>
            <Link
              href={href(lang)}
              className="btn btn-g"
              style={{
                fontSize: '16px',
                padding: '0 32px',
                minHeight: '52px',
                boxShadow: '0 8px 20px rgba(63, 165, 53, 0.28)',
              }}
            >
              <span>{u.backHome}</span>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ transform: isRtl ? 'scaleX(-1)' : 'none', transition: 'transform 0.2s' }}
              >
                <path d="M5 12h14" />
                <path d="M12 5l7 7-7 7" />
              </svg>
            </Link>

            <a
              href="https://wa.me/201000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
              style={{
                background: '#FFFFFF',
                color: '#25D366',
                border: '2px solid #25D366',
                minHeight: '52px',
                padding: '0 28px',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
              </svg>
              <span>{dict.wa.short}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
