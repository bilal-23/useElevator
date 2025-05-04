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
   * URL of the audio to play during scroll.
   * Defaults to the built-in elevator music if audio is enabled.
   */
  mainAudioUrl?: string;

  /**
   * URL of the audio to play once scrolling finishes.
   * Defaults to the built-in "ding" sound if audio is enabled.
   */
  endAudioUrl?: string;

  /**
   * Whether to play audio during the scroll.
   * @default true
   */
  audio?: boolean;

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
