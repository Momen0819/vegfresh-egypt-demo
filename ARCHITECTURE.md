# Architecture rules — data fetching

These rules apply to all work in this Next.js project.

## Goal

Use this flow:

`Page → Server-side data fetching → Data source → Render page`

Not this one:

`Page → Client/API fetch → Next.js Route Handler → Data source`

There is no internal API or Route Handler layer for page-content `GET` requests.

## Rules

- No unnecessary Route Handlers (`app/api/**/route.ts`, `route.js`, etc.). Do not add API endpoints or Route Handlers for page content.
- The page or Server Component that needs data fetches it directly on the server, before rendering.
- Page-content requests are read-only `GET`s, so there is no internal API layer.
- Keep existing data sources, endpoints, query parameters, auth requirements and response handling unchanged, unless direct server-side fetching requires a change.
- Prefer Server Components and server-side functions. Add `"use client"` only when a component needs client-side interactivity or browser APIs.
- If several server components on one page need the same data, don't request it twice. Restructure the fetching, or use React/Next.js caching (for example `cache()`).
- Client components handle presentation and client-side interactions only. Pass them server-fetched data as props.
- Do not swap server fetching for client-side `useEffect` or browser fetching.
- Do not build a client-side API abstraction to stand in for removed Route Handlers.

## Constraints

- Do not change public routes.
- Do not change external API contracts.
- Never expose server-only credentials or secrets to the client. Sensitive operations stay on the server.
- Keep strict TypeScript types.
- Follow the project's existing conventions.
- Make the smallest clean change needed. Don't rewrite unrelated code.

## When removing an existing Route Handler

1. Find the page or component that consumes it.
2. Identify its data source and request parameters.
3. Move the fetching logic into a server-side function, or directly into the page or server component.
4. Update the consumer to use the server-fetched data.
5. Delete the Route Handler once nothing depends on it.
6. Delete API/client-fetching utilities, types and dependencies that are no longer used.
7. Check that no references to the removed handler remain.

## Validation after changes

- No unnecessary Route Handlers remain.
- Every affected page gets its data on the server.
- No client-side fetches have replaced the old server/API flow.
- `npm run build` succeeds (static export to `/out`).
- `npm run lint` and `npx tsc --noEmit` pass. Run tests when the project has them.
- Summarize the files changed and the new data-fetching flow.

## How this project applies it

- **Content:** the four dictionaries in `src/i18n/dictionaries/*.ts`, loaded by `getDictionary()` (`server-only`) in `src/app/[lang]/page.tsx` and `layout.tsx`.
- **Company facts:** `src/lib/site.ts`, a constants file with no fetching.
- **Rendering:** fully static (`output: "export"`). Every page × language is pre-rendered (44 HTML files: home + 7 inner pages + 3 product pages, × 4 languages).
- **Client components** (`"use client"`), for interactivity only: header menu/scroll state, language switcher, gallery filter, quote form (opens WhatsApp), load calculator (pure arithmetic, no fetching), floating WhatsApp/back-to-top buttons, and scroll-reveal animation. They get their text as props from the server page.
- **APIs:** none for now. When one is added, follow the rules above: fetch in the server page or component, never through a Route Handler.
