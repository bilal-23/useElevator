/**
 * Easing function for smooth scrolling animation with quadratic acceleration and deceleration.
 *
 * @param {number} time - Current time position in the animation
 * @param {number} start - Starting value
 * @param {number} change - Change in value
 * @param {number} duration - Total duration of animation
 * @returns {number} The calculated position value for the current time
 */
export const easeInOutQuad = (
  time: number,
  start: number,
  change: number,
  duration: number
): number => {
  time /= duration / 2;
  if (time < 1) return (change / 2) * time * time + start;
  time--;
  return (-change / 2) * (time * (time - 2) - 1) + start;
};

/**
 * Calculates the scroll position to an element, accounting for its offset parents.
 *
 * @param {string} elementId - ID of the target element to scroll to
 * @param {number} padding - Vertical padding to apply from the element (default: 0)
 * @returns {number} The vertical scroll position in pixels
 */
export const calculateElementScrollPosition = (
  elementId: string,
  padding: number = 0
): number => {
  const element = document.getElementById(elementId);
  if (!element) return padding; // Return just padding if element not found

  let verticalOffset = 0;
  let currentElement: HTMLElement | null = element;

  // Traverse up through offset parents to calculate total offset
  while (currentElement) {
    verticalOffset += currentElement.offsetTop || 0;
    currentElement = currentElement.offsetParent as HTMLElement | null;
  }

  return verticalOffset - padding;
};

/**
 * Calculates optimal animation duration based on scroll distance.
 *
 * @param {number} distance - Distance to scroll in pixels
 * @param {number} customDuration - Optional user-defined duration
 * @returns {number} The calculated duration in milliseconds
 */
export const calculateScrollDuration = (
  distance: number,
  customDuration?: number
): number => {
  if (customDuration) return customDuration;

  // Base duration on distance with diminishing returns for long scrolls
  const baseDuration = Math.abs(distance) * 1.5;
  const maxDuration = 2000; // Cap at 2 seconds for very long scrolls

  return Math.min(baseDuration, maxDuration);
};
