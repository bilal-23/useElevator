# How useElevator Works

This document explains the implementation details of the `useElevator` hook, focusing on the animation technique and the overall flow of the code.

## Core Concepts

The `useElevator` hook provides smooth scrolling functionality through a carefully designed animation pipeline. At its heart is the browser's `requestAnimationFrame` API, which is critical for delivering smooth, performant animations.

## Why `requestAnimationFrame`?

We use `requestAnimationFrame` instead of alternatives like `setTimeout` or CSS animations for several important reasons:

1. **Performance Optimization**: `requestAnimationFrame` synchronizes with the browser's rendering cycle, ensuring animations run at the optimal time before the next repaint. This avoids unnecessary frame calculations and reduces CPU usage.

2. **Battery Efficiency**: By synchronizing with the display's refresh rate (typically 60fps), it prevents animations from running faster than necessary, conserving battery life on mobile devices.

3. **Automatic Throttling**: When a tab is inactive or the browser window is minimized, `requestAnimationFrame` automatically throttles or pauses animations, reducing resource consumption.

4. **Smooth Visual Updates**: It helps deliver consistently smooth animations by aligning with the browser's natural rendering rhythm, avoiding visual juddering or frame skipping.

## Code Flow and Execution

The animation flow can be broken down into several key phases:

### 1. Initialization

When the hook is first called, it sets up:

```javascript
// State to track animation status
const [isElevating, setIsElevating] = useState < boolean > false;

// References to maintain values across renders without causing re-renders
const animationFrameRef = (useRef < number) | (null > null);
const startPositionRef = (useRef < number) | (null > null);
const endPositionRef = (useRef < number) | (null > null);
const startTimeRef = (useRef < number) | (null > null);
```

These refs are crucial for the animation as they preserve values between animation frames without triggering re-renders.

### 2. Triggering the Animation

When `startElevating` is called:

```javascript
const startElevating = useCallback(() => {
  // Prevent starting if already active
  if (isElevating) return;

  // Set state to active
  setIsElevating(true);

  // Calculate end position based on target element or top of page
  if (targetElement) {
    endPositionRef.current = calculateElementScrollPosition(
      targetElement,
      verticalPadding
    );
  } else {
    endPositionRef.current = verticalPadding; // Top of page + padding
  }

  // Store current scroll position
  startPositionRef.current = window.scrollY;

  // Execute start callback if provided
  if (startCallback) {
    startCallback();
  }

  // Start animation loop
  animationFrameRef.current = requestAnimationFrame(animateScroll);
}, [isElevating, targetElement, verticalPadding, startCallback, animateScroll]);
```

This initiates the animation sequence by:

- Preventing multiple concurrent animations
- Recording the current scroll position
- Computing the target scroll position
- Registering the first animation frame

### 3. Animation Loop

The core animation function uses `requestAnimationFrame` to create a smooth loop:

```javascript
const animateScroll = useCallback(
  (timestamp: number) => {
    // Initialize start time on first animation frame
    if (startTimeRef.current === null) {
      startTimeRef.current = timestamp;
    }

    // Ensure required values exist
    if (startPositionRef.current === null || endPositionRef.current === null) {
      setIsElevating(false);
      return;
    }

    // Calculate animation progress
    const runtime = timestamp - startTimeRef.current;
    const distance = Math.abs(
      endPositionRef.current - startPositionRef.current
    );
    const duration = calculateScrollDuration(distance, customDuration);

    // Calculate scroll position using easing function
    const scrollPos = easeInOutQuad(
      runtime,
      startPositionRef.current,
      endPositionRef.current - startPositionRef.current,
      duration
    );

    // Perform actual scroll
    window.scrollTo(0, scrollPos);

    // Continue animation if not complete
    if (runtime < duration) {
      animationFrameRef.current = requestAnimationFrame(animateScroll);
    } else {
      // Animation complete
      if (endCallback) {
        endCallback();
      }

      // Reset state
      startTimeRef.current = null;
      startPositionRef.current = null;
      animationFrameRef.current = null;
      setIsElevating(false);
    }
  },
  [customDuration, endCallback]
);
```

This function:

1. Records the start time on the first frame
2. Calculates the elapsed time for each frame
3. Uses an easing function to determine the next scroll position
4. Updates the window scroll position
5. Either schedules the next frame or completes the animation

### 4. Easing Function

The `easeInOutQuad` function provides a natural-feeling acceleration and deceleration:

```javascript
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
```

This creates a more pleasing motion than linear scrolling by:

- Starting slowly (mimicking acceleration)
- Moving quickly through the middle section
- Gradually slowing down (mimicking deceleration)

### 5. Duration Calculation

When no explicit duration is provided, the hook calculates an appropriate duration based on scroll distance:

```javascript
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
```

This ensures that:

- Short scrolls aren't too fast to see
- Long scrolls don't take an excessive amount of time

### 6. Window Blur Handling

The hook also handles cases where the user switches tabs or windows during animation:

```javascript
useEffect(() => {
  const handleBlur = () => {
    if (!isElevating) return;

    // Cancel animation frame
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    // Jump to destination
    if (endPositionRef.current !== null) {
      window.scrollTo(0, endPositionRef.current);
    }

    // Reset state
    startTimeRef.current = null;
    startPositionRef.current = null;
    setIsElevating(false);
  };

  // Add and remove event listeners
  window.addEventListener("blur", handleBlur);
  return () => {
    window.removeEventListener("blur", handleBlur);
  };
}, [isElevating]);
```

This improves user experience by immediately completing the scroll if the user shifts focus away from the page.

### 7. Cleanup and Resource Management

The hook properly cleans up resources when the component unmounts:

```javascript
useEffect(() => {
  return () => {
    // Cancel any active animation
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  };
}, []);
```

This prevents memory leaks and ensures animations don't continue running after the component is no longer in the DOM.

## Complete Flow

When a user triggers `startElevating`:

1. The current scroll position is recorded
2. The target position is calculated (either top of page or specific element)
3. The animation loop begins with the first call to `requestAnimationFrame`
4. For each animation frame:
   - The elapsed time is calculated
   - The easing function computes the next scroll position
   - The window is scrolled to the new position
   - If the animation is incomplete, another frame is scheduled
5. Once the animation completes:
   - Any provided callback is executed
   - State is reset
   - The animation loop terminates

This orchestrated sequence creates a smooth, efficient scrolling experience that feels natural and responsive to users.

## Benefits of This Approach

- **Smoothness**: The animation feels natural due to the easing function
- **Performance**: Uses the browser's optimized animation API
- **Flexibility**: Allows customization of duration, target, and callbacks
- **Reliability**: Properly handles edge cases like tab switching
- **Efficiency**: Minimizes unnecessary re-renders during animation

By leveraging React's useRef and useCallback hooks alongside requestAnimationFrame, we achieve a high-performance animation system that works harmoniously with React's component lifecycle while delivering a polished user experience.
