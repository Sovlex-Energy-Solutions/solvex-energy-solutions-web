# Animation Style --- T.D. Lovera

**Reference:** https://td-lovera.framer.website/\
**Purpose:** A practical motion-spec for recreating the site's animation
language in another project.

> **Accuracy note:** This is a style extraction and implementation guide
> based on the publicly readable page structure and its repeated visual
> patterns, not a verified export of the original Framer animation
> settings. Exact durations, easing curves, scroll thresholds, and
> interaction triggers are not exposed in the page text, so the values
> below are recommended approximations. Verify against the live page
> visually before treating them as exact.

## 1. Motion direction

The site's overall direction is **editorial, bold, polished, and
continuous** rather than playful or overly springy. Motion should
support oversized typography, project imagery, service lists, stats, and
pricing content without competing with them.

-   **Primary feel:** smooth, deliberate, premium studio portfolio.
-   **Movement:** restrained vertical reveals, subtle image scaling,
    horizontal marquee movement, and responsive hover feedback.
-   **Hierarchy:** headline and key imagery first; supporting copy and
    metadata follow.
-   **Continuity:** repeated service labels, project cards, and calls to
    action should share consistent motion rules.
-   **Avoid:** excessive bounce, random rotations, long cinematic
    delays, or animating every element independently.

## 2. Animation inventory

The items below are the recommended recreation of the site's motion
language. Treat triggers and timings as implementation targets until
confirmed through direct visual testing.

  -----------------------------------------------------------------------
  Element / pattern       Recommended behavior    Suggested timing
  ----------------------- ----------------------- -----------------------
  Hero headline and intro Reveal upward from a    650--900 ms; 80--140 ms
                          small offset while      stagger
                          fading in; stagger      
                          headline, supporting    
                          text, then CTA          

  Navigation and utility  Quick opacity/position  160--240 ms
  links                   transition on hover or  
                          menu open               

  Primary CTA             Slight text/arrow shift 180--260 ms
                          or subtle background    
                          transition on hover;    
                          clear pressed state     

  Client / service ticker Seamless horizontal     Continuous; roughly
                          loop with duplicated    25--45 s per loop,
                          content; constant speed depending on width
                          and no visible jump     

  Section headings        Fade and move upward as 500--750 ms
                          the section enters the  
                          viewport                

  Large statement /       Reveal by line or       500--800 ms
  editorial text          grouped line, with      
                          small stagger; keep     
                          text readable           
                          throughout              

  Project cards and       Image gently scales or  250--400 ms
  thumbnails              shifts on hover; card   
                          text/arrow responds     
                          slightly                

  Project grid entrance   Stagger cards in a      60--120 ms between
                          short sequence rather   cards
                          than revealing all at   
                          once                    

  Metrics / statistics    Optional count-up when  700--1,200 ms
                          first visible; avoid    
                          replaying on every      
                          scroll                  

  Service list /          Smooth height and       220--350 ms
  accordion               opacity transition when 
                          expanding; icon rotates 
                          or changes state        

  Pricing billing toggle  Animate the selected    200--300 ms
                          state and update price  
                          content without         
                          shifting the whole      
                          layout                  

  Process timeline        Reveal steps in         250--450 ms per state
                          sequence; emphasize the 
                          active step as it       
                          enters view             

  Testimonial / quote     Gentle fade-up; image   450--700 ms
  block                   and attribution follow  
                          the quote               

  Footer / final CTA      Simple fade-up or short 450--650 ms
                          upward reveal; no       
                          oversized exit          
                          animation               
  -----------------------------------------------------------------------

## 3. Timing and easing tokens

Use these as a coherent starting system. They are not claimed to be the
site's original values.

``` css
:root {
  --motion-fast: 180ms;
  --motion-standard: 280ms;
  --motion-reveal: 650ms;
  --motion-stagger: 100ms;

  --ease-standard: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-ui: cubic-bezier(0.2, 0.7, 0.2, 1);
}
```

Guidelines: - Use `--ease-standard` for entrances and image movement. -
Use shorter durations for hover, focus, and pressed states. - Keep most
entrance movement within **12--28 px**; use larger travel only for a
deliberate hero transition. - Use opacity plus transform for simple
reveals. Avoid animating layout properties such as `top`, `left`, or
arbitrary dimensions when a transform will do. - Keep looping marquees
linear so their speed stays constant.

## 4. Scroll reveal recipe

For headings, body copy, metrics, and cards:

1.  Initial state: `opacity: 0`, `transform: translateY(20px)`.
2.  When the element enters the viewport: transition to `opacity: 1`,
    `transform: translateY(0)`.
3.  Use a one-time reveal for ordinary content; avoid repeatedly hiding
    and showing content during small scroll reversals.
4.  Stagger related children lightly. Keep the total delay for a group
    under about 400 ms.
5.  Use a larger reveal only for the primary hero content; later
    sections should feel faster.

Example CSS:

``` css
.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 650ms cubic-bezier(0.22, 1, 0.36, 1),
    transform 650ms cubic-bezier(0.22, 1, 0.36, 1);
}

.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .reveal,
  .reveal.is-visible {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
```

Use `IntersectionObserver` or the animation system already present in
the project to add `is-visible`. Do not add a new animation library if
the existing stack already handles viewport reveals.

## 5. Image and project-card hover

Keep the image movement subtle and clipped to its container. Avoid
zooming so far that the subject is cropped awkwardly.

``` css
.project-card__media {
  overflow: hidden;
}

.project-card__image {
  transform: scale(1);
  transition: transform 400ms cubic-bezier(0.22, 1, 0.36, 1);
}

.project-card:hover .project-card__image,
.project-card:focus-visible .project-card__image {
  transform: scale(1.035);
}
```

Optional supporting details: - Move an arrow or small icon by 3--5 px. -
Increase contrast or change the overlay slightly on hover. - Preserve a
visible keyboard focus state; hover must not be the only way to discover
an action.

## 6. Seamless marquee / ticker

For repeated client names, service labels, or decorative ticker content:

-   Duplicate the content track so the loop can restart without a blank
    gap.
-   Animate the track with `translateX`, not `left`.
-   Use `linear` timing and a long duration.
-   Pause on hover only if it improves readability; otherwise keep the
    motion consistent.
-   On small screens, reduce the amount of simultaneous content rather
    than speeding the ticker up.
-   Respect reduced-motion preferences by stopping the loop or rendering
    a static, non-duplicated row.

Example:

``` css
.marquee {
  overflow: hidden;
  white-space: nowrap;
}

.marquee__track {
  display: flex;
  width: max-content;
  animation: marquee-scroll 32s linear infinite;
}

@keyframes marquee-scroll {
  to {
    transform: translateX(-50%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .marquee__track {
    animation: none;
    transform: none;
  }
}
```

Ensure the second half of the track is an exact visual duplicate of the
first. Otherwise the reset may be noticeable.

## 7. Interaction rules

-   **Buttons:** clear hover, focus-visible, and pressed states; do not
    delay navigation with decorative animation.
-   **Navigation / menu:** animate opacity and a small vertical offset;
    keep the menu usable immediately and ensure it works by keyboard and
    touch.
-   **Accordions:** animate content height only when the implementation
    supports it cleanly; keep state changes accessible with proper
    button semantics and `aria-expanded`.
-   **Pricing toggle:** transition the active indicator and price
    values; avoid layout jumps when numbers change.
-   **Cards:** apply hover effects to pointer devices, but keep the
    default state informative on touch devices.
-   **Repeated interactions:** every animation must settle into a stable
    end state and work when triggered multiple times.

## 8. Reduced motion and performance

-   Support `prefers-reduced-motion: reduce`; disable non-essential
    loops, large transforms, and staggered entrance effects.
-   Never hide important content permanently if JavaScript or an
    observer fails. Content should remain readable as a fallback.
-   Animate `transform` and `opacity` where possible.
-   Avoid scroll handlers that run expensive calculations on every
    frame.
-   Do not animate every section at once. Motion should clarify
    hierarchy, not slow the page down.
-   Test at mobile widths, with keyboard navigation, and with reduced
    motion enabled.

## 9. Implementation checklist

-   [ ] Hero content enters in a clear sequence.
-   [ ] Section reveals are consistent and do not replay distractingly.
-   [ ] Tickers loop seamlessly with no visible jump.
-   [ ] Project images have restrained, clipped hover movement.
-   [ ] Buttons and navigation provide fast interaction feedback.
-   [ ] Service and pricing interactions animate between meaningful
    states.
-   [ ] Mobile layout does not rely on hover.
-   [ ] Reduced-motion preferences are respected.
-   [ ] No content remains invisible when JavaScript fails.
-   [ ] Exact timing and triggers have been visually checked against the
    reference.

## 10. Suggested implementation priority

1.  **First:** hero entrance, section reveals, project-image hover.
2.  **Second:** marquee/ticker and button feedback.
3.  **Third:** service/pricing transitions and metric count-ups, only
    where the reference visibly uses them.
4.  **Final pass:** tune stagger, duration, and easing across the whole
    page; remove motion that adds no meaning.

## Reference

-   Live page: https://td-lovera.framer.website/
-   Framer animation principles:
    https://www.framer.com/academy/lessons/bringing-websites-to-life-with-animation
-   Framer component interactions:
    https://www.framer.com/academy/lessons/framer-animations-component-interactions