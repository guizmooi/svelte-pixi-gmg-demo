# GMG Game - Developer Documentation

A modern slot game built with Svelte 5, PIXI.js, and TypeScript. This game features dynamic backgrounds, animated symbols, and comprehensive state management.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- pnpm (recommended) or npm

### Development Setup
```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Access the game at http://localhost:3001
```

### Available Scripts
```bash
pnpm dev          # Development server with HMR
pnpm build        # Production build
pnpm preview      # Preview production build
pnpm lint         # ESLint code checking
pnpm format       # Prettier code formatting
pnpm storybook    # Launch Storybook for component development
```

## 📁 Project Structure

```
src/
├── components/           # Game UI components
│   ├── Game.svelte      # Main game orchestrator
│   ├── Background.svelte # Dynamic backgrounds
│   ├── Board.svelte     # Game board rendering
│   ├── Symbol.svelte    # Individual symbol rendering
│   └── ...             # Other game components
├── game/                # Core game logic
│   ├── context.ts       # Game context management
│   ├── stateGame.svelte.ts # Game state (Svelte 5 runes)
│   ├── stateLayout.ts   # Layout calculations
│   ├── eventEmitter.ts  # Event management
│   ├── utils.ts         # Game utilities
│   └── types.ts         # TypeScript definitions
├── i18n/                # Internationalization
└── stories/             # Storybook stories & test data
```

## 🎮 Game Architecture

### State Management
The game uses **Svelte 5 runes** for reactive state management:

- `stateGame` - Core game state (board, game type, multipliers)
- `stateLayout` - Responsive layout calculations
- `stateApp` - Application-level state
- `stateXstate` - State machine for game flow

### Component Hierarchy
```
Game.svelte (Root)
├── Background.svelte (Dynamic backgrounds)
├── LoadingScreen.svelte (Initial loading)
├── Board.svelte (Game board container)
│   ├── Symbol.svelte (Individual symbols)
│   └── BoardFrame.svelte (Board decorations)
├── UI Components (Betting interface)
└── Sound.svelte (Audio management)
```

### Event System
Centralized event management via `eventEmitter`:

```typescript
// Subscribe to events
context.eventEmitter.subscribeOnMount({
  bet: handleBetLogic,
  win: handleWinAnimation
});

// Broadcast events
context.eventEmitter.broadcast({
  type: 'soundOnce',
  name: 'sfx_spin'
});
```

## 🎯 Key Features

### Dynamic Backgrounds
- **Base Game**: Standard game background with idle + dust animations
- **Feature Game**: Enhanced background for bonus rounds
- **Smooth Transitions**: Fade effects between game states

### Responsive Layout
- Automatic scaling based on viewport size
- Mobile-first design approach
- Configurable aspect ratios

### Symbol System
- **5 Symbol Types**: H1, H2, H3, H4, H5
- **Dynamic Generation**: Random board creation
- **Spine Animations**: Rich symbol animations via PIXI-Spine

### Audio Management
- **Sound Effects**: Reel stops, wins, ambient effects
- **Music**: Background music with looping
- **Volume Control**: User-configurable audio settings

## 🔧 Development Guidelines

### Code Style
- **Imports**: Grouped by category with clear sections
- **Comments**: JSDoc for components, inline for complex logic
- **TypeScript**: Strict typing with proper interfaces
- **File Organization**: Logical grouping with clear naming

### Component Structure
```typescript
<!--
  @component ComponentName

  Brief description of component purpose and functionality

  @example
  ```svelte
  <ComponentName prop="value" />
  ```
-->
<script lang="ts">
  // ===== IMPORTS =====
  import { ... } from '...';

  // ===== PROPS/STATE =====
  const { prop } = $props<{ prop: string }>();
  let state = $state(initialValue);

  // ===== DERIVED VALUES =====
  const computed = $derived(calculation);

  // ===== FUNCTIONS =====
  function handleAction() {
    // Implementation
  }
</script>

<!-- Template with clear comments -->
<div class="component">
  <!-- Content -->
</div>
```

### State Management Best Practices
1. **Centralized State**: Use context for shared state
2. **Reactive Updates**: Leverage Svelte 5 runes (`$state`, `$derived`)
3. **Event-Driven**: Use event emitter for component communication
4. **Immutable Updates**: Maintain state consistency

## 🚨 Common Pitfalls

### State Management
- ❌ Direct state mutation outside reactive contexts
- ✅ Use proper Svelte 5 runes for reactivity

### Performance
- ❌ Creating new objects in derived computations
- ✅ Cache expensive calculations and use proper dependencies

### TypeScript
- ❌ Using `any` types extensively
- ✅ Define proper interfaces and use type assertions sparingly

## 🧪 Testing & Debugging

### Storybook
Interactive component development:
```bash
pnpm storybook
```

### Debug Tools
- **Svelte DevTools**: Browser extension for state inspection
- **PIXI Inspector**: PIXI.js scene graph debugging
- **Console Logging**: Strategic logging in event handlers

### Test Data
Located in `src/stories/data/base_books.ts`:
- Pre-configured game outcomes
- Various win scenarios
- Edge case testing

## 🔄 Game Flow

1. **Initialization**: Loading screen → Context setup → UI ready
2. **Bet Placement**: User input → Balance validation → Game start
3. **Game Execution**: Symbol animation → Outcome calculation → Win display
4. **State Reset**: Prepare for next round

## 🌐 Localization

The game supports multiple languages via `@lingui/core`:
- English (default)
- Chinese (zh)
- Extensible for additional languages

## 📦 Dependencies

### Core Framework
- **Svelte 5**: Modern reactive framework
- **SvelteKit**: Full-stack framework
- **TypeScript**: Type safety

### Game Engine
- **PIXI.js**: 2D WebGL rendering
- **pixi-svelte**: Svelte-PIXI integration
- **Spine**: Skeletal animation

### Utilities
- **Lodash**: Utility functions
- **XState**: State machines (if complex flow needed)

## 🤝 Contributing

1. Follow existing code style and structure
2. Add JSDoc comments for new components
3. Test thoroughly with different game states
4. Update documentation for significant changes

## 📞 Support

For technical questions or issues:
1. Check existing documentation
2. Review component examples in Storybook
3. Examine test data in `base_books.ts`
4. Create detailed bug reports with reproduction steps