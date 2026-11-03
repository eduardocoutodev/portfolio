# Scope: Find relevant work

## Summary

Give potential employers and clients a short route from the problem they need solved to Eduardo's relevant projects, experience, and contact details. Three dedicated pages cover AI applications, backend systems, and websites.

## Classification

Small feature — one implementation session.

## Target outcome

A visitor can discover the guide from the homepage, select a focus, inspect existing evidence, and contact Eduardo. Each focus has a directly shareable, indexable URL.

## Ideas considered

1. Audience-specific work guide: selected because the existing portfolio already contains the evidence, but visitors must assemble it themselves.
2. Detailed technical case studies: useful later; new accounts of engineering decisions require Eduardo's input.
3. Interactive architecture demo: memorable, but more maintenance and a weaker connection to hiring or client enquiries.

## Key decisions

- Assume the audience is employers and clients, based on the site's existing positioning.
- Reuse existing project and experience records; add no unsupported results or claims.
- Use ordinary links between server-rendered pages so the guide works without JavaScript.
- Retain the site's existing visual language and analytics conventions.

## In scope

- Three focus pages with relevant projects, professional experience, and contact actions.
- Homepage discovery link, canonical metadata, and sitemap entries.
- Browser checks for navigation, keyboard access, mobile layout, and unknown routes.

## Out of scope

New backend services, AI chat, invented case studies, availability promises, and a site redesign.

## Dependencies

Existing Next.js, Tailwind, portfolio data, tracked links, and Playwright.

## Open questions

None blocking: the user authorized exploring, choosing, implementing, and opening a PR.

## Recommended next step

Implement the selected small feature directly, then validate and open a PR.
