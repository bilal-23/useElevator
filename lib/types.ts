/**
 * Options for configuring the useElevator hook.
 */
export interface UseElevatorOptions {
  /**
   * The ID of the element to scroll to. If not provided, scrolls to the top of the page.
   */
  targetElement?: string;

  /**
   * Duration of the scroll animation in milliseconds.
   * If not provided, the duration is calculated based on scroll distance.
   */
  duration?: number;

  /**
   * Padding from the target element to stop above it.
   * @default 0
   */
  verticalPadding?: number;

  /**
   * Callback function to execute when scrolling starts.
   */
  startCallback?: () => void;

  /**
   * Callback function to execute when scrolling ends.
   */
  endCallback?: () => void;
}

/**
 * Return value from the useElevator hook.
 */
export interface UseElevatorResult {
  /**
   * Function to trigger the elevator scrolling effect.
   */
  startElevating: () => void;

  /**
   * Whether the elevator effect is currently active.
   */
  isElevating: boolean;
}
