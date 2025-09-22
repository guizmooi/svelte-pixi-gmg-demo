# GMG Development Guide

## 🔧 Development Environment Setup

### Required Tools
```bash
# Node.js (18+)
node --version

# Package manager
pnpm --version

# Git
git --version
```

### IDE Setup
**Recommended: VS Code with extensions:**
- Svelte for VS Code
- TypeScript Hero
- Prettier
- ESLint
- Auto Rename Tag

### Environment Variables
Create `.env.local` if needed:
```bash
# Development settings
PUBLIC_CHROMATIC=true
VITE_DEV_MODE=true
```

## 🏗️ Architecture Deep Dive

### Context System
The game uses a centralized context system for state management:

```typescript
// Context provides unified access to:
const context = getContext();
context.stateGame        // Game-specific state
context.stateLayout      // Responsive layout
context.eventEmitter     // Event communication
context.i18nDerived      // Internationalization
```

### State Management Layers

#### 1. Game State (`stateGame.svelte.ts`)
```typescript
export const stateGame = $state({
  board: generatedBoard,           // 3x3 symbol grid
  gameType: 'basegame',           // 'basegame' | 'freegame'
  multiplierBoard: [],            // Multiplier symbols
  scatterCounter: 0               // Scatter symbol count
});
```

#### 2. Layout State (`stateLayout.ts`)
```typescript
// Responsive calculations
const boardLayout = () => ({
  x: mainWidth * 0.5,
  y: mainHeight * 0.5 - 20,
  anchor: { x: 0.5, y: 0.5 },
  // ... positioning logic
});
```

#### 3. External State (`state-shared`)
```typescript
import { stateBet, stateModal } from 'state-shared';
// Shared across multiple games
// Balance, betting, modal management
```

### Event Flow

#### Event Emitter Pattern
```typescript
// Subscribe to events
context.eventEmitter.subscribeOnMount({
  bet: async () => {
    // Handle bet logic
  },
  win: (amount: number) => {
    // Handle win animation
  },
  soundOnce: ({ name }) => {
    // Play sound effect
  }
});

// Broadcast events
context.eventEmitter.broadcast({
  type: 'win',
  amount: 1000
});
```

## 🎨 Component Development

### Component Template
```svelte
<!--
  @component ComponentName

  Description of what this component does.
  Include usage examples and props documentation.

  @example
  ```svelte
  <ComponentName required="value" optional={false} />
  ```
-->
<script lang="ts">
  import type { ComponentProps } from './types';

  // ===== PROPS =====
  interface Props {
    required: string;
    optional?: boolean;
  }

  const { required, optional = false }: Props = $props();

  // ===== STATE =====
  let localState = $state(initialValue);

  // ===== DERIVED =====
  const computed = $derived(() => {
    // Expensive computation
    return processData(localState);
  });

  // ===== FUNCTIONS =====
  /**
   * Handle user interaction
   */
  function handleClick(event: MouseEvent) {
    // Implementation
  }

  // ===== EFFECTS =====
  $effect(() => {
    // Side effects
    return () => {
      // Cleanup
    };
  });
</script>

<!-- Template with semantic HTML -->
<div class="component-name" class:active={computed}>
  <button onclick={handleClick}>
    {required}
  </button>
</div>

<style>
  .component-name {
    /* Component-specific styles */
  }
</style>
```

### PIXI Component Integration
```svelte
<script lang="ts">
  import { Container, Graphics } from 'pixi-svelte';

  function drawCustomGraphics(graphics: PIXI.Graphics) {
    if (!graphics) return;

    graphics.clear();
    graphics.beginFill(0xFF0000);
    graphics.drawRect(0, 0, 100, 100);
    graphics.endFill();
  }
</script>

<Container x={100} y={100}>
  <Graphics draw={drawCustomGraphics} />
</Container>
```

## 🎯 Game Logic Implementation

### Symbol Management
```typescript
// Symbol generation
function generateRandomBoard(): RawSymbol[][] {
  return _.range(BOARD_DIMENSIONS.x).map(() =>
    _.times(BOARD_DIMENSIONS.y, () => _.sample(ALL_SYMBOLS)!)
  );
}

// Symbol state management
interface SymbolState {
  isLocked: boolean;
  isHighlighted: boolean;
  animationState?: 'idle' | 'spinning' | 'landing';
}
```

### Win Calculation
```typescript
// Win processing
const processWins = (board: RawSymbol[][], betAmount: number) => {
  const wins = calculateWinLines(board);
  const totalWin = wins.reduce((sum, win) => sum + win.amount, 0);

  return {
    wins,
    totalWin: totalWin * betAmount,
    multiplier: calculateMultiplier(wins)
  };
};
```

### Animation Coordination
```typescript
// Coordinated animations
async function playSpinSequence() {
  // Start all reels spinning
  await Promise.all(reels.map(reel => reel.startSpin()));

  // Stop reels with delay
  for (let i = 0; i < reels.length; i++) {
    await wait(REEL_STOP_DELAY);
    await reels[i].stopSpin();
  }

  // Evaluate wins
  const wins = evaluateBoard();
  if (wins.length > 0) {
    await playWinAnimation(wins);
  }
}
```

## 🔍 Debugging Strategies

### State Inspection
```typescript
// Add reactive logging
$effect(() => {
  console.log('Game state changed:', {
    gameType: stateGame.gameType,
    board: stateGame.board,
    timestamp: Date.now()
  });
});
```

### Event Debugging
```typescript
// Event logging middleware
const originalBroadcast = eventEmitter.broadcast;
eventEmitter.broadcast = (event) => {
  console.log('Event broadcast:', event);
  return originalBroadcast(event);
};
```

### PIXI Debugging
```typescript
// PIXI Inspector integration
if (import.meta.env.DEV) {
  // @ts-ignore
  globalThis.__PIXI_APP__ = pixiApp;
}

// Performance monitoring
const stats = new Stats();
document.body.appendChild(stats.dom);
pixiApp.ticker.add(() => stats.update());
```

## 🧪 Testing Approaches

### Component Testing
```typescript
// Test component in isolation
import { render } from '@testing-library/svelte';
import Component from './Component.svelte';

test('component renders correctly', () => {
  const { getByText } = render(Component, {
    props: { required: 'test' }
  });

  expect(getByText('test')).toBeInTheDocument();
});
```

### Game Logic Testing
```typescript
// Test game mechanics
describe('Win calculation', () => {
  test('calculates correct win amount', () => {
    const board = [
      [{ name: 'H1' }, { name: 'H1' }, { name: 'H1' }],
      [{ name: 'H2' }, { name: 'H3' }, { name: 'H4' }],
      [{ name: 'H5' }, { name: 'H1' }, { name: 'H2' }]
    ];

    const wins = calculateWins(board);
    expect(wins.length).toBe(1);
    expect(wins[0].symbol.name).toBe('H1');
  });
});
```

### Integration Testing
```typescript
// Test full game flow
test('complete game round', async () => {
  // Setup game state
  context.stateGame.gameType = 'basegame';
  stateBet.betAmount = 100;
  stateBet.balanceAmount = 1000;

  // Trigger bet
  await context.eventEmitter.broadcast({ type: 'bet' });

  // Verify results
  expect(stateBet.balanceAmount).toBeLessThan(1000);
  expect(context.stateGame.board).toHaveLength(3);
});
```

## 🚀 Performance Optimization

### Bundle Analysis
```bash
# Analyze bundle size
npx vite-bundle-analyzer

# Check for duplicate dependencies
npx depcheck
```

### PIXI Optimization
```typescript
// Texture management
const textureCache = new Map<string, PIXI.Texture>();

function getTexture(name: string): PIXI.Texture {
  if (!textureCache.has(name)) {
    textureCache.set(name, PIXI.Texture.from(name));
  }
  return textureCache.get(name)!;
}

// Object pooling for frequently created objects
class SpritePool {
  private pool: PIXI.Sprite[] = [];

  get(): PIXI.Sprite {
    return this.pool.pop() || new PIXI.Sprite();
  }

  release(sprite: PIXI.Sprite) {
    sprite.texture = PIXI.Texture.EMPTY;
    this.pool.push(sprite);
  }
}
```

### Memory Management
```typescript
// Component cleanup
$effect(() => {
  const cleanup = setupResources();

  return () => {
    cleanup(); // Always cleanup on destroy
  };
});

// PIXI resource disposal
onDestroy(() => {
  pixiApp.destroy(true, {
    children: true,
    texture: true,
    baseTexture: true
  });
});
```

## 📝 Code Quality

### Linting Rules
```javascript
// .eslintrc.cjs
module.exports = {
  extends: ['eslint-config-custom'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'warn',
    'svelte/no-at-html-tags': 'error',
    'prefer-const': 'error'
  }
};
```

### Type Safety
```typescript
// Strict type definitions
interface GameState {
  readonly board: ReadonlyArray<ReadonlyArray<RawSymbol>>;
  gameType: GameType;
  multiplierBoard: MultiplierSymbol[][];
  scatterCounter: number;
}

// Runtime type validation
function validateGameState(state: unknown): state is GameState {
  return (
    typeof state === 'object' &&
    state !== null &&
    'board' in state &&
    'gameType' in state
  );
}
```

## 🔄 Continuous Integration

### Pre-commit Hooks
```json
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{ts,svelte}": ["eslint --fix", "prettier --write"]
  }
}
```

### Build Pipeline
```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: pnpm install
      - run: pnpm lint
      - run: pnpm build
```