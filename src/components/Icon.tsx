const paths = {
  pin: (
    <>
      <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </>
  ),
  chat: <path d="M4 20l1.4-4.2A8 8 0 1 1 8.4 19z" />,
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.8 3 2.8 15 0 18M12 3c-2.8 3-2.8 15 0 18" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  snow: <path d="M12 2v20M4.9 6l14.2 12M19.1 6L4.9 18M9 3l3 2 3-2M9 21l3-2 3 2" />,
  ruler: (
    <>
      <path d="M3 17L17 3l4 4L7 21H3z" />
      <path d="M7 13l2 2M10 10l2 2M13 7l2 2" />
    </>
  ),
  ship: (
    <>
      <path d="M2 17h20l-2 4H4z" />
      <path d="M5 17V9h6v8M11 12h6v5M7 9V6h2v3" />
    </>
  ),
  talk: (
    <>
      <path d="M21 12a8 8 0 0 1-11.6 7.1L4 21l1.9-5.4A8 8 0 1 1 21 12z" />
      <path d="M8.5 11h7M8.5 14h4.5" />
    </>
  ),
  bubble: <path d="M21 12a8 8 0 0 1-11.6 7.1L4 21l1.9-5.4A8 8 0 1 1 21 12z" />,
  whatsapp: (
    <>
      <path d="M4 20l1.4-4.2A8 8 0 1 1 8.4 19z" />
      <path d="M9 9.5c.3 2 2.5 4.2 4.5 4.5l1-1 1.5.8" />
    </>
  ),
  youtube: (
    <>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="M10 9.5v5l4.5-2.5z" />
    </>
  ),
  facebook: <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </>
  ),
  up: <path d="M12 19V5M5 12l7-7 7 7" />,
} as const;

export type IconName = keyof typeof paths;

export function Icon({ name, size = 24 }: { name: IconName; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className="ic" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}
