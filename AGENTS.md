# Project instructions — CASA ACTIVA

- Static, dependency-free, Spanish, mobile-first app. Preserve all existing exercises, data, layout, JSON backup schema version 1 and features unless asked otherwise.
- Target GitHub Pages at a repository subpath. Use relative asset paths and keep manifest id, scope and start_url relative. Do not assume the app is deployed at origin `/`.
- No analytics, tracking pixels, server-side user data or embedded credentials. Do not commit personal JSON backups, logs, weights or profile data.
- Treat localStorage as untrusted. Escape dynamic strings, validate imports and preserve safeguards. Keep namespaced storage compatible with future updates; never erase it on a service-worker update.
- Keep the two-phase photo mapping correct (especially the floor press). Nine exercises have realistic AI images; the other nine retain vector illustrations. Do not claim that all photos have been replaced or professionally validated.
- Images must remain local and preserve full limbs with object-fit:contain. Keep health citations and safety notices; avoid adding personalized medical guidance.
- Edit service-worker logic in tools/sw.template.js. Run `python tools/update_cache.py` after any application asset change, and commit generated sw.js in the same change. Never indiscriminately delete other apps' caches on the shared GitHub Pages origin.
- Do not force reloads during an active workout. Explicit update confirmation must pause/save before reload; abort on failed persistence.
- Review at 320, 390, 768 and 1365px, all tabs, dialogs, image expansion, favorites, backup import/export, session recovery, offline resources, installability, and update lifecycle.
- Distinguish DOM/unit test results from a real browser installation or live deployment. Never report a site as published without a successful deployment and accessible URL.
