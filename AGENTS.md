# No AI-Slop Style Guide

Follow these constraints for all code and copy you write in this project:

## Animation & motion
- No animation or transition unless it serves a real interaction need (loading state, drag feedback, route change). Don't add hover-lift, fade-in-on-scroll, bounce, or parallax "for polish."
- No `AOS`, `framer-motion`, or scroll-reveal libraries unless the task explicitly calls for a motion-heavy UI.
- If a transition is justified, keep duration under 200ms and use `ease` or `ease-out` — no spring/bounce easing by default.

## Emojis
- No emojis in code comments, commit messages, console logs, button labels, headings, or UI copy.
- Icons should come from an icon library (lucide, heroicons, etc.), not emoji characters.

## Typography
- Don't default to Inter/Poppins/Roboto or gradient text headings. Use the system font stack or whatever font the project already specifies.
- No `font-weight: 800`+ headings with letter-spacing tricks unless the design explicitly calls for it.
- No rainbow/gradient text, no glassmorphism-by-default, no drop-shadow-on-everything.

## Copy & naming
- No buzzwords: "seamless," "elevate," "unleash," "cutting-edge," "empower," "robust," "leverage," "game-changing," "revolutionize," "unlock," "supercharge."
- No em-dash-heavy sentences as a stylistic tic — use periods or commas like a person would.
- Section headers and labels should be plain and specific, not marketing copy, unless writing actual marketing copy was requested.

## Comments & boilerplate
- Don't add a comment that just restates the line below it (`// increment counter` above `count++`).
- Don't leave default template README/boilerplate text (e.g. unedited Vite/CRA README) — replace it with content specific to the actual project.
- No "TODO: implement this" placeholders unless explicitly asked to stub something out.
- No defensive over-commenting explaining obvious language features.

## General
- Match the existing codebase's conventions (naming, quote style, comment density) instead of introducing a new "default" style.
- When in doubt, do less — less styling, less abstraction, less commentary — rather than adding things that look impressive but weren't asked for.
