# Portfolio Website

My personal website. Built it to have a clean space to show my research and projects without the usual portfolio template bloat.

## What it does

Scrolling highlights the section you're reading with a blue left border. Individual items (projects, education entries, etc.) also get highlighted as you scroll through them. Dark mode works and remembers your preference. Mobile menu appears on smaller screens.

The whole thing uses vanilla JavaScript - no frameworks beyond Bootstrap for the grid. Wanted to keep it simple and fast.

## Running it locally

```bash
python3 -m http.server 8000
```

Open `localhost:8000` in your browser.

## Structure

```
index.html          - everything is here
static/css/style.css - all the styles
public/images/      - just the profile photo
```

## The highlighting system

Wrote some JavaScript that tracks scroll position and applies CSS classes:
- `.section-active` on the main section cards when in viewport
- `.item-active` on individual items (education, projects, etc.)

Uses `requestAnimationFrame` to avoid jank. Offset is 200px from top to account for the sticky header.

## Design choices

Went with JetBrains Mono for headings because I like monospace fonts and it doesn't look too "coder-bro". Inter for body text. Blue accent color that works in both light and dark mode.

No animations or transitions beyond the border highlighting. The Bay Area Post Club style is about restraint - lots of white space, clear hierarchy, no unnecessary motion.

## Contact form

Uses Formspree. Just sends the form data to my email. Works fine for a personal site.

## Browser stuff

Works in modern browsers. Tested on Chrome, Firefox, Safari. Mobile Safari can be finicky with the sticky header but it's fine.

## Why I built it this way

Most portfolio templates are overdesigned. I wanted something that loads fast, looks professional, and doesn't distract from the actual content. The highlighting helps readers follow along without needing a flashy design.

Also wanted to own the code. When I need to update something, I can just edit the HTML directly instead of fighting with a static site generator or CMS.

---

Roshani Pawar
roshani.n.pawar@gmail.com
