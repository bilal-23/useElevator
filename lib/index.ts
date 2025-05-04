/**
 * useElevator - A React hook for smooth scrolling with elevator music
 * @module use-elevator
 */

// Export the main hook
export { useElevator } from "./useElevator";

// Export types for TypeScript users
export type { UseElevatorOptions, UseElevatorResult } from "./types";

// Export utilities for advanced use cases
export { AudioManager } from "./utils/audio";
export {
  easeInOutQuad,
  calculateElementScrollPosition,
  calculateScrollDuration,
} from "./utils/animation";
