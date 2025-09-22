# Mechanical Shark Image Instructions

## How to add your mechanical shark image:

1. **Save your mechanical shark image** as:
   - `apps/gmg/static/assets/sprites/background/mechanical_shark.webp`
   - OR `apps/gmg/static/assets/sprites/background/mechanical_shark.png`

2. **Image requirements:**
   - Transparent background (PNG/WebP)
   - Recommended size: 400-600px wide
   - Should be facing left (will swim left to right)
   - High quality for crisp rendering

3. **Current animation settings:**
   - Moves from left-bottom to right-middle
   - 8-second animation cycle with smooth easing
   - Subtle rotation and breathing effects
   - Positioned behind game board (z-index: -0.5)

4. **To test:**
   - Replace the placeholder image with your mechanical shark
   - Start the dev server: `pnpm dev`
   - Check browser console for position logs
   - Shark should smoothly swim across the background

## File paths that need your image:
- `/apps/gmg/static/assets/sprites/background/mechanical_shark.webp` (preferred)
- `/apps/gmg/static/assets/sprites/background/mechanical_shark.png` (fallback)

The code is ready - just add your image file!