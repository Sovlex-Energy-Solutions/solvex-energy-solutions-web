---
version: alpha
name: Superpower
description: A clean, high-contrast health membership system with spacious editorial typography and rounded utility actions.
colors:
  primary: "#059669"
  primary-hover: "#047857"
  secondary: "#71717A"
  tertiary: "#18181B"
  neutral: "#FFFFFF"
  surface: "#FFFFFF"
  on-surface: "#18181B"
  border: "#0000001A"
  muted-border: "#D4D4D8"
  overlay: "#000000CC"
  soft-overlay: "#00000080"
  error: "#EF4444"
typography:
  headline-display:
    fontFamily: "Nb International Pro Webfont"
    fontSize: 60px
    fontWeight: 400
    lineHeight: 60px
    letterSpacing: -1.2px
  headline-lg:
    fontFamily: "Nb International Pro Webfont"
    fontSize: 43px
    fontWeight: 400
    lineHeight: 60px
    letterSpacing: -1.2px
  headline-md:
    fontFamily: "Nb International Pro Webfont"
    fontSize: 31px
    fontWeight: 400
    lineHeight: 57.6px
    letterSpacing: -1.08px
  headline-sm:
    fontFamily: "Nb International Pro Webfont"
    fontSize: 22px
    fontWeight: 400
    lineHeight: 26px
    letterSpacing: -0.24px
  body-lg:
    fontFamily: "Nb International Pro Webfont"
    fontSize: 18px
    fontWeight: 400
    lineHeight: 28px
    letterSpacing: -0.2px
  body-md:
    fontFamily: "Nb International Pro Webfont"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 24px
    letterSpacing: -0.2px
  body-sm:
    fontFamily: "Nb International Pro Webfont"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 20px
    letterSpacing: -0.1px
  label-lg:
    fontFamily: "Nb International Pro Webfont"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 24px
    letterSpacing: -0.2px
  label-md:
    fontFamily: "Nb International Pro Webfont"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 20px
    letterSpacing: -0.1px
  label-sm:
    fontFamily: "Nb International Pro Webfont"
    fontSize: 12px
    fontWeight: 400
    lineHeight: 16px
    letterSpacing: 0em
rounded:
  none: 0px
  sm: 4px
  md: 8px
  lg: 16px
  xl: 24px
  full: 9999px
spacing:
  xs: 6px
  sm: 16px
  md: 24px
  lg: 32px
  xl: 64px
  gutter: 20px
  section: 120px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral}"
    typography: "{typography.body-md}"
    rounded: "{rounded.full}"
    padding: "14px 20px"
    height: "50px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "{colors.neutral}"
    typography: "{typography.body-md}"
    rounded: "{rounded.full}"
    padding: "14px 20px"
    height: "50px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.neutral}"
    typography: "{typography.body-md}"
    rounded: "{rounded.full}"
    padding: "14px 20px"
    height: "50px"
  button-secondary-hover:
    backgroundColor: "{colors.soft-overlay}"
    textColor: "{colors.neutral}"
    typography: "{typography.body-md}"
    rounded: "{rounded.full}"
    padding: "14px 20px"
    height: "50px"
  button-tertiary:
    backgroundColor: "transparent"
    textColor: "{colors.secondary}"
    typography: "{typography.body-md}"
    rounded: "{rounded.none}"
    padding: "0px"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: "24px 32px"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.full}"
    padding: "14px 20px"
  chip:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.full}"
    padding: "6px 10px"
---
# Superpower

## Overview
Superpower feels modern, calm, and premium, with a health-tech confidence that stays approachable rather than clinical. The interface is intentionally spacious, using large editorial headlines and a stark black-and-white palette to keep the experience clear and decisive. Rounded actions and restrained motion cues soften the system, giving it a friendly membership-brand tone.

## Colors
- **Primary (#059669):** Vibrant clean-energy Emerald is the primary brand anchor, representing Solvex's commitment to renewable solar power. It is used for primary CTA buttons, key brand highlights, interactive accents, and active states.
- **Secondary (#71717A):** A neutral gray used for supporting text, subtle navigation items, and secondary informational copy.
- **Tertiary (#18181B):** An almost-black text tone that keeps buttons and utility text legible without feeling harsh.
- **Neutral / Surface (#FFFFFF):** Clean white is the default canvas for the page chrome, cards, and pill buttons.
- **Border (#0000001A):** A very light translucent black line used for card outlines and quiet separation.
- **Muted Border (#D4D4D8):** Soft gray border support for secondary-outline treatment and subtle definition.
- **Overlay (#000000CC) and Soft Overlay (#00000080):** Dark translucent layers help buttons and overlays sit over photography without losing contrast.
- **Error (#EF4444):** Reserved for alerts, badges, or destructive states; it should stay visually distinct from the otherwise minimal palette.

## Typography
All typography uses **Nb International Pro Webfont** with graceful fallbacks to Arial and sans-serif. The system is lightweight and editorial: headlines stay at font-weight 400, which makes the large sizes feel elegant instead of heavy. Large headings use tight negative letter-spacing, while body copy is compact and readable with a 16px / 24px rhythm.

Use the headline scale to create hierarchy:
- **headline-display** for the main hero statement.
- **headline-lg** and **headline-md** for secondary landing page headers and section leads.
- **headline-sm** for card or module titles.

Body and label styles should remain calm and highly legible:
- **body-lg** and **body-md** for marketing copy and longer descriptions.
- **body-sm** for captions, support text, and legal notes.
- **label-lg**, **label-md**, and **label-sm** for navigation, button text, and microcopy.

The source does not rely on uppercase branding or wide tracking; instead it uses clean sentence case with subtle negative letter-spacing for a refined, contemporary feel.

## Layout
The layout is wide and immersive, built around a full-bleed hero with generous top navigation spacing. Content breathes with a clear rhythm: 6px for tiny adjustments, 16px for standard gaps, 32px and 64px for larger separations, and 120px for major page-section spacing. Cards and panels use compact internal padding rather than dense grids, reinforcing the premium, uncluttered feel.

The system reads best with a fluid container approach and generous horizontal margins, especially on marketing pages. Large imagery dominates the composition, while text blocks remain left-aligned and vertically stacked for fast scanning.

## Elevation & Depth
The design is mostly flat and relies on contrast, overlays, and image depth rather than shadows. There is little to no traditional elevation; instead, hierarchy comes from dark-on-light contrast, rounded white buttons over dark imagery, and subtle borders around panels. The soft shadow token should be used sparingly, if at all, because the visual language is intentionally crisp and minimal.

## Shapes
The shape language is soft and modern. Interactive controls use full pill radii, creating a friendly, consumer-oriented feel that contrasts with the strong typography. Cards use a modest 8px radius, which keeps containers tidy without introducing visual noise. Overall, the system balances architectural restraint with gentle rounding.

## Components
**Buttons**
- Primary buttons use `button-primary`: vibrant emerald fill (`#059669`), crisp white text, full pill radius, and a 50px height. Hover state smoothly transitions to a deeper emerald (`#047857`).
- Secondary buttons use `button-secondary`: transparent or dark-overlay treatment over imagery, also pill-shaped and 50px tall.
- Tertiary buttons use `button-tertiary` for plain text actions or navigation links with minimal chrome.
- Button padding should stay around 14px 20px to preserve the compact pill silhouette.
- Hover states should slightly shift tone, not add heavy shadows or outlines.

**Cards**
- Cards use `card` with a white background, a subtle border, 8px radius, and 24px 32px padding.
- Keep card content structured and calm; do not stack dense components too tightly.
- Use cards for notices, cookie prompts, and information panels where separation from the background is needed.

**Inputs**
- Inputs follow the same pill geometry as buttons, using `input` with full rounding and 14px 20px padding.
- Borders should remain minimal and low-contrast.
- Form fields should feel light, not boxed.

**Chips and badges**
- Chips use `chip` for compact status pills or lightweight labels with emerald primary styling.
- Keep them small, highly legible, and consistent with the brand’s rounded utility language.

**Navigation**
- Top navigation should stay sparse and text-led, with small gray utility items and a centered logo.
- Primary nav actions may reuse the pill button treatment to maintain consistency across the header and hero.

**Cookie or consent panels**
- Use a card-like container with restrained copy, rounded corners, and one strong action plus one secondary action.
- The panel should feel embedded, not intrusive.

## Do's and Don'ts
- Do keep the interface airy and editorial, with large type and generous negative space.
- Do use pill-shaped actions for key interactions and keep their heights consistent.
- Do use vibrant emerald (#059669) as the primary brand color for high-intent CTAs, interactive highlights, and clean-energy visual focus.
- Do favor subtle borders and contrast over shadows for separation.
- Don't introduce ornate gradients, heavy depth, or colorful UI chrome.
- Don't make headings bold; the system depends on large, light-weight typography.
- Don't use tight, grid-heavy layouts that crowd the hero or reduce image impact.
- Don't round cards as aggressively as buttons; reserve full pills for interactive controls only.