/**
 * useElevator - A React hook for smooth scrolling
 * @module use-elevator
 */

// Re-export the hook
export { useElevator } from "./useElevator";

// Re-export types
export type { UseElevatorOptions, UseElevatorResult } from "./types";

// Export utilities for advanced use cases
export {
  easeInOutQuad,
  calculateElementScrollPosition,
  calculateScrollDuration,
} from "./utils/animation";
