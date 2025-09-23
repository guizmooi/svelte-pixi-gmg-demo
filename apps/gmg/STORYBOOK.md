# GMG Game Storybook

This Storybook setup provides comprehensive testing and development environment for the GMG (3×3 grid slot machine) game.

## Running Storybook

```bash
# From project root
pnpm run storybook --filter=gmg

# Or directly from gmg app
cd apps/gmg
pnpm run storybook
```

## Story Structure

### COMPONENTS
Stories for testing individual game components in isolation:

- **`<Game>`** - Main game component with various states
  - `component (loadingScreen)` - Full game with loading screen
  - `preSpin` - Game with pre-spin animation
  - `emitterEvent: boardHide` - Test board hide functionality
  - `emitterEvent: boardShow` - Test board show functionality

- **`<Symbol>`** - Individual symbol component testing
  - `component` - Single symbol with controls
  - `symbols` - Grid showing all symbols in all states

- **`<Board>`** - Game board component testing
  - `board show` - Show board animation
  - `board hide` - Hide board animation
  - `anticipation` - Anticipation effects

### MODE_BASE
Stories for testing base game functionality:

- **`book`** - Complete game sequences
  - `random` - Plays a random book from the base_books data

- **`bookEvent`** - Individual game events
  - `reveal` - Symbol reveal animation
  - `winInfo` - Win information display
  - `setWin` - Win amount setting
  - `setTotalWin` - Total win calculation
  - `finalWin` - Final win presentation

## Game Data

### Base Books (`/stories/data/base_books.ts`)
Contains predefined game outcomes including:
- No-win scenarios
- Single payline wins (top row, middle row, diagonal)
- Multiple payline combinations
- Various win levels

### Base Events (`/stories/data/base_events.ts`)
Individual book events for isolated testing:
- `reveal` - Board reveal with 3×3 symbol grid
- `winInfo` - Win information with payline details
- `setWin`, `setTotalWin`, `finalWin` - Win processing events

## Symbol Configuration

The GMG game uses 5 high-value symbols:
- `H1` - Highest value symbol (300 for 3-of-a-kind)
- `H2` - Second highest (250 for 3-of-a-kind)
- `H3` - Medium value (200 for 3-of-a-kind)
- `H4` - Lower value (150 for 3-of-a-kind)
- `H5` - Lowest value (100 for 3-of-a-kind)

## Paylines

5 paylines total:
1. Top row: [0,0,0]
2. Middle row: [1,1,1]
3. Bottom row: [2,2,2]
4. Diagonal TL→BR: [0,1,2]
5. Diagonal BL→TR: [2,1,0]

## Development Workflow

1. **Component Development**: Use `COMPONENTS/<ComponentName>` stories to develop and test individual components
2. **Event Testing**: Use `MODE_BASE/bookEvent` stories to test individual game events
3. **Game Flow Testing**: Use `MODE_BASE/book` stories to test complete game sequences
4. **Visual Testing**: Use the symbols story to verify all symbol states render correctly

## Adding New Stories

1. Create new `.stories.svelte` files in `/src/stories/`
2. Follow the naming convention: `ComponentsName.stories.svelte` or `ModeTypeName.stories.svelte`
3. Use the `defineMeta` function to set story titles
4. Implement the `template` snippet for consistent story structure
5. Add story data to `/stories/data/` if needed

## Assets

All game assets are configured in `/src/game/assets.ts` and include:
- Spine animations for symbols
- UI sprites and fonts
- Background images
- Sound effects

The Storybook automatically loads these assets for visual testing.