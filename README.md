# useElevator

A React hook for smooth scrolling. Inspired by [Elevator.js](https://tholman.com/elevator.js/).

## Installation

```bash
npm install use-elevator
```

or using yarn:

```bash
yarn add use-elevator
```

## Features

- Smooth scrolling to the top of the page or a specified element
- Customizable animation duration
- Callback functions for scroll start and end
- TypeScript support

## How It Works

The `useElevator` hook is designed to create a smooth, pleasant scrolling experience. Here's a detailed breakdown of how it works:

### Core Animation

1. **Animation Loop**: The hook uses `requestAnimationFrame` to create a smooth animation loop that updates the scroll position on each frame.

2. **Easing Function**: Rather than linear scrolling, the hook uses a quadratic easing function (`easeInOutQuad`) that starts slow, accelerates in the middle, and decelerates at the end - mimicking a real elevator's movement.

3. **Duration Calculation**: If no duration is provided, the hook automatically calculates an appropriate duration based on the scroll distance - longer distances get proportionally longer durations (with a maximum cap).

### DOM Handling

1. **Target Element Resolution**: When a target element ID is provided, the hook calculates its position by traversing the DOM, accounting for nested offset parents.

2. **Vertical Padding**: You can add padding to stop before the target element (useful for fixed headers).

3. **Window Blur Handling**: If the user switches tabs during animation, the hook gracefully jumps to the destination.

### Performance Optimizations

1. **Refs for State**: The hook uses React refs to store animation state, avoiding unnecessary re-renders during the animation.

2. **Dependency Optimization**: `useCallback` dependencies are minimized to prevent function recreation.

3. **Memory Management**: All resources are properly cleaned up on unmount, including animation frames.

### Safety Features

1. **Error Handling**: The hook contains comprehensive error handling around DOM operations.

2. **Type Safety**: Built with TypeScript, providing complete type definitions for all options and return values.

3. **Restart Prevention**: The hook prevents starting multiple elevator animations simultaneously.

### Event Handling

1. **Callbacks**: The hook provides `startCallback` and `endCallback` options to execute custom code at the beginning and end of the animation.

2. **State Management**: The hook provides an `isElevating` state that components can use to update UI accordingly.

The combination of these features creates a delightful scrolling experience that stands out from typical "back to top" buttons, adding personality to your application while still being fully functional.

## Architecture

The useElevator hook is designed with a modular architecture for maintainability and testability:

```
lib/
├── utils/
│   └── animation.ts     # Animation utility functions
├── types.ts             # TypeScript interfaces
├── useElevator.ts       # Main hook implementation
└── index.ts             # Public exports
```

### Core Components:

1. **Main Hook (useElevator.ts)**

   - React hook that coordinates the scrolling animation
   - Manages state and lifecycle events
   - Handles user interactions

2. **Animation Utilities (utils/animation.ts)**

   - Provides easing functions for smooth scrolling
   - Calculates element positions and scroll distances
   - Determines optimal animation durations

3. **Type Definitions (types.ts)**
   - TypeScript interfaces for hook options and returns
   - Ensures type safety across the library

This modular approach allows for:

- Easy testing of individual components
- Clear separation of concerns
- Simplified maintenance and future enhancements

## Basic Usage

```jsx
import { useElevator } from "use-elevator";

function ScrollToTopButton() {
  const { startElevating, isElevating } = useElevator({
    duration: 2000,
  });

  return (
    <button onClick={startElevating} disabled={isElevating}>
      {isElevating ? "Going up..." : "Back to top"}
    </button>
  );
}
```

## API Reference

### Options

| Property        | Type     | Default   | Description                                                                                                             |
| --------------- | -------- | --------- | ----------------------------------------------------------------------------------------------------------------------- |
| targetElement   | string   | undefined | The ID of the element to scroll to. If not provided, scrolls to the top of the page.                                    |
| duration        | number   | 0 (auto)  | Duration of the scroll animation in milliseconds. If not provided, the duration is calculated based on scroll distance. |
| verticalPadding | number   | 0         | Padding from the target element to stop above it.                                                                       |
| startCallback   | function | undefined | Function to call when scrolling starts.                                                                                 |
| endCallback     | function | undefined | Function to call when scrolling ends.                                                                                   |

### Returns

| Property       | Type     | Description                                       |
| -------------- | -------- | ------------------------------------------------- |
| startElevating | function | Function to trigger the scroll animation.         |
| isElevating    | boolean  | Whether the scroll animation is currently active. |

## Examples

### Scroll to Specific Element

```jsx
const { startElevating } = useElevator({
  targetElement: "contact-section",
  verticalPadding: 20,
});
```

### With Callbacks

```jsx
const { startElevating } = useElevator({
  startCallback: () => console.log("Starting elevator ride"),
  endCallback: () => console.log("Arrived at destination"),
});
```

## Advanced Usage

### Multiple Elevator Instances

You can create multiple elevator instances with different configurations:

```jsx
function App() {
  // Elevator to the top of the page
  const topElevator = useElevator({
    duration: 2000,
  });

  // Elevator to a specific section
  const sectionElevator = useElevator({
    targetElement: "contact-section",
    verticalPadding: 80,
  });

  return (
    <div>
      <button onClick={topElevator.startElevating}>Back to Top</button>

      <button onClick={sectionElevator.startElevating}>Jump to Contact</button>
    </div>
  );
}
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

MIT © [Bilal Mansuri](https://github.com/bilal-23)
