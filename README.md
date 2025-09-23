# GMG Demo Project

This is a GMG company test project demonstrating a web SDK for declarative game development. The project showcases a 3×3 grid slot machine game (GMG) built with modern web technologies. It is powered by Svelte 5, PixiJS 8 and TurboRepo.

- **Purpose**: Test project for GMG company to demonstrate game development capabilities
- **Game Type**: 3×3 grid slot machine with 5 paylines (H1-H5 symbols)
- **Technology**: Full-stack game development using modern web standards


# Table of Contents

- [Get Started](#getStarted)
  - [Installation](#installation)
  - [Run in Storybook](#runInStorybook)
  - [Run in DEV Mode](#runInDevMode)
- [GMG Project Structure](#gmgProjectStructure)
- [Game Features](#gameFeatures) 

<a name="getStarted"></a>

# Get started

Here is a complete tutorial to start with the GMG slot machine game from storybook running and local development. This guide covers the 3×3 grid slot machine implementation.

<a name="installation"></a>

## Installation
We use [VSCode](https://code.visualstudio.com/download) as IDE but this is optional and it is up to you.

- Install node with version 22.16.0. [download](https://nodejs.org/en/download)

```
# Download and install nvm:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

# in lieu of restarting the shell
\. "$HOME/.nvm/nvm.sh"

# Download and install Node.js:
nvm install 22.16.0

# Verify the node versions. Should print "v22.16.0".
node -v
```

- Install pnpm with version 10.5.0.

```
# Install pnpm
npm install pnpm@10.5.0 -g

# Verify the pnpm versions. Should print "v10.5.0"
pnpm -v
```

- Clone the repo to your local in VS Code terminal or others.

```
# Clone this GMG demo project
git clone https://github.com/guizmooi/svelte-pixi-gmg-demo.git
cd svelte-pixi-gmg-demo
```

- Install dependencies.

```
pnpm install
```

WIth out any error messages showing up, you are good to continue.

<a name="runInStorybook"></a>

## Run in Storybook

```
pnpm run storybook --filter=gmg
```

- Run `pnpm run storybook --filter=gmg` in the terminal to see the GMG slot machine game storybook.
- The GMG app is located in `apps/gmg/` with `"name": "gmg"` in the [apps/gmg/package.json](/apps/gmg/package.json).
- For Windows users, you might need to add the script with "cross-env" to make it work:
```
"storybook": "cross-env PUBLIC_CHROMATIC=true storybook dev -p 6001 public",
```
- You should see this:

<img src="./documentation/get-started-storybook-run.png" alt="isolated" width="100%"/>

- Now switch to `MODE_BASE/book/random` in the left sidebar, you will see an `Action` button appear on the left right conner of the game.

<img src="./documentation/get-started-storybook-action.png" alt="isolated" width="100%"/>

- Click on the `Action` button and wait for a base game to finish.
- Now you are having a game running locally in the storybook.

<a name="runInDevMode"></a>

## Run in DEV Mode
```
pnpm run dev --filter=gmg
```
- Open up the url showed in the terminal, you should see this:

<img src="./documentation/get-started-dev.png" alt="isolated" width="100%"/>

- The GMG game runs in development mode for local testing and demonstration purposes.


<a name="gmgProjectStructure"></a>

# GMG Project Structure

The GMG demo project follows a monorepo structure with TurboRepo, organized into apps and shared packages.

## Project Overview
```
svelte-pixi-gmg-demo/
├── apps/
│   ├── gmg/                    # Main GMG slot machine game
│   ├── .../                    # other example
│   ├── .../                    # other example
│   ├── .../                    # other example
│   └── .../                    # other example
├── packages/
│   ├── pixi-svelte/           # Core PixiJS-Svelte integration
│   ├── components-ui-pixi/    # UI components for PixiJS
│   ├── components-pixi/       # Game-specific PixiJS components
│   ├── components-shared/     # Shared UI components
│   ├── state-shared/          # Global state management
│   ├── utils-*/               # Utility libraries
│   └── config-*/              # Build configurations
└── documentation/             # Project documentation
```

## GMG App Structure
```
apps/gmg/
├── src/
│   ├── components/            # Game-specific components
│   │   ├── Game.svelte       # Main game component
│   │   ├── Symbol.svelte     # Symbol rendering component
│   │   ├── SymbolSprite.svelte
│   │   └── SymbolSpine.svelte
│   ├── game/                  # Game logic and configuration
│   │   ├── assets.ts         # Asset definitions
│   │   ├── config.ts         # Game configuration
│   │   ├── constants.ts      # Game constants
│   │   ├── stateGame.svelte.ts # Game state management
│   │   ├── types.ts          # TypeScript type definitions
│   │   ├── utils.ts          # Game utility functions
│   │   └── sound.ts          # Audio configuration
│   ├── stories/               # Storybook stories
│   │   ├── data/             # Test data for stories
│   │   │   ├── base_books.ts # Game outcome scenarios
│   │   │   └── base_events.ts # Individual game events
│   │   ├── ComponentsGame.stories.svelte
│   │   ├── ComponentsSymbol.stories.svelte
│   │   ├── ComponentsBoard.stories.svelte
│   │   ├── ModeBaseBook.stories.svelte
│   │   └── ModeBaseBookEvent.stories.svelte
│   └── routes/                # SvelteKit routes
│       └── +page.svelte      # Main game page
├── static/                    # Static assets
│   └── assets/               # Game assets (spines, sprites, audio)
│       ├── spines/           # Spine animation files
│       ├── sprites/          # Sprite images and JSON
│       ├── fonts/            # Custom fonts
│       └── audio/            # Sound effects and music
├── package.json
├── vite.config.js
└── STORYBOOK.md              # Storybook documentation
```

<a name="gameFeatures"></a>

# Game Features

## GMG Slot Machine Specifications

### Game Mechanics
- **Grid**: 3×3 symbol grid
- **Paylines**: 5 total paylines
  - 3 horizontal lines (top, middle, bottom rows)
  - 2 diagonal lines (top-left to bottom-right, bottom-left to top-right)
- **Symbols**: 5 high-value symbols (H1, H2, H3, H4, H5)
- **Win Condition**: 3 matching symbols on any payline

### Symbol Values
- **H1**: 300 coins (highest value)
- **H2**: 250 coins
- **H3**: 200 coins
- **H4**: 150 coins
- **H5**: 100 coins (lowest value)

### Technical Features
- **Spine Animations**: Rich visual effects for symbols and wins
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Sound System**: Interactive audio feedback
- **State Management**: XState for game flow, Svelte stores for UI
- **Asset Loading**: Optimized loading with preload options
- **Storybook Integration**: Comprehensive component testing

### Development Features
- **TypeScript**: Full type safety
- **Component Architecture**: Modular and reusable components
- **Book System**: Deterministic game outcomes for testing
- **Hot Reload**: Instant development feedback
- **Build Optimization**: Production-ready builds

# Quick Start Commands

## Development Commands
```bash
# Install dependencies
pnpm install

# Run GMG game in development mode
pnpm run dev --filter=gmg

# Run GMG game storybook
pnpm run storybook --filter=gmg
```

## Storybook Navigation

When running the GMG storybook, you'll find these story categories:

### Components
- **`COMPONENTS/<Game>`** - Main game component testing
- **`COMPONENTS/<Symbol>`** - Symbol rendering in all states
- **`COMPONENTS/<Board>`** - Board interaction testing

### Game Modes
- **`MODE_BASE/book`** - Complete game sequence testing
  - `random` - Plays random game outcomes
- **`MODE_BASE/bookEvent`** - Individual event testing
  - `reveal` - Symbol reveal animations
  - `winInfo` - Win display logic
  - `setWin`, `setTotalWin` - Win processing

## File Structure Guide

### Key Configuration Files
- `apps/gmg/src/game/config.ts` - Game rules and settings
- `apps/gmg/src/game/constants.ts` - Symbol definitions and payouts
- `apps/gmg/src/game/assets.ts` - Asset loading configuration

### Component Files
- `apps/gmg/src/components/Game.svelte` - Main game orchestrator
- `apps/gmg/src/components/Symbol.svelte` - Symbol rendering logic

### Story Files
- `apps/gmg/src/stories/data/base_books.ts` - Predefined game outcomes
- `apps/gmg/src/stories/data/base_events.ts` - Individual game events

## Customization Guide

### Adding New Symbols
1. Add symbol definition to `constants.ts`
2. Add asset references to `assets.ts`
3. Update symbol states in `types.ts`
4. Add test data to `base_books.ts`

### Modifying Paylines
1. Update payline logic in game configuration
2. Modify win detection in game utils
3. Update test books with new payline scenarios

### Adding New Animations
1. Add Spine assets to `static/assets/spines/`
2. Register assets in `assets.ts`
3. Update symbol configurations in `constants.ts`

<a name="buildAGame"></a>