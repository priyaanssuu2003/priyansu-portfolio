# Priyansu Choudhury ? Portfolio

A premium, award-worthy personal portfolio for a Data Analyst. Built with React + Vite, Tailwind CSS, and Framer Motion.

## Portfolio Link
Link: priyansu-dev-eta.vercel.app

## Tech Stack

- **React 18** + **Vite 5** ? fast builds, HMR
- **Tailwind CSS** ? utility-first styling with custom design tokens
- **Framer Motion** ? orchestrated animations, scroll-triggered reveals
- **Lucide React** ? icon library
- **react-intersection-observer** ? performant scroll detection

## Design Highlights

- Dark-mode-first with `#090b10` background and `#5eead4` cyan / `#f5b942` amber accents
- Animated **SQL Terminal widget** in Hero that types a live query and reveals skill bars
- Conic-gradient spinning ring around profile photo
- Scroll-triggered section reveals with staggered Framer Motion animations
- `prefers-reduced-motion` fully respected
- Accessible: semantic HTML, `aria-*` attributes, keyboard focus states, skip-to-content link
- Responsive: mobile ? tablet ? desktop breakpoints

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Build for Production

```bash
npm run build
npm run preview
```

## Deploy to Vercel

Push to GitHub and import the repo on [vercel.com](https://vercel.com) ? zero config needed.
The `vercel.json` file handles SPA routing automatically.

## Customization Checklist

- [ ] Replace **project links** ? search for `PROJECT_LINK_PLACEHOLDER` in `Projects.jsx`
- [ ] Replace **resume link** ? search for `RESUME_LINK_PLACEHOLDER` in `Contact.jsx`
- [ ] Profile photo is at `src/assets/profile.png` ? swap if needed
- [ ] Update internship dates in `Experience.jsx` once confirmed
- [ ] Add `og-image.png` to `/public` for Open Graph sharing preview

## Project Structure

```
src/
  components/
    Navbar.jsx       Sticky nav with active-section tracking
    Hero.jsx         Headline + SQL terminal widget + profile photo
    About.jsx        Bio + quick-info card
    Skills.jsx       Animated proficiency bars by category
    Projects.jsx     Hover-lift project cards
    Experience.jsx   Timeline (work + education)
    Contact.jsx      Contact cards with links
    Footer.jsx       Minimal copyright footer
  App.jsx            Root layout
  main.jsx           React entry
  index.css          Global styles + Tailwind directives
```
