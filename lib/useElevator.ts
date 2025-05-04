import { useState, useEffect, useCallback, useRef } from "react";
import {
  calculateElementScrollPosition,
  calculateScrollDuration,
  easeInOutQuad,
} from "./utils/animation";
import { AudioManager } from "./utils/audio";
import { UseElevatorOptions, UseElevatorResult } from "./types";

/**
 * A React hook that provides a smooth scrolling effect with elevator music.
 * Inspired by elevator.js but reimagined as a React hook with TypeScript support.
 *
 * @param {UseElevatorOptions} options - Configuration options for the elevator effect
 * @returns {UseElevatorResult} Object containing the startElevating function and isElevating state
 *
 * @example
 * ```jsx
 * const { startElevating, isElevating } = useElevator({
 *   audio: true,
 *   duration: 2000,
 *   targetElement: 'section-id'
 * });
 *
 * return (
 *   <button onClick={startElevating} disabled={isElevating}>
 *     {isElevating ? 'Going up...' : 'Back to top'}
 *   </button>
 * );
 * ```
 */
export const useElevator = ({
  targetElement,
  duration: customDuration = 0,
  mainAudioUrl,
  endAudioUrl,
  audio = true,
  verticalPadding = 0,
  startCallback,
  endCallback,
}: UseElevatorOptions): UseElevatorResult => {
  // Track whether the elevator is currently active
  const [isElevating, setIsElevating] = useState<boolean>(false);

  // Use refs to avoid recreating functions on each render
  const animationFrameRef = useRef<number | null>(null);
  const startPositionRef = useRef<number | null>(null);
  const endPositionRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  // Create audio manager and store in ref to persist across renders
  const audioManagerRef = useRef<AudioManager | null>(null);

  // Initialize audio manager on first render and when audio options change
  useEffect(() => {
    // Create audio manager if it doesn't exist
    if (!audioManagerRef.current) {
      try {
        audioManagerRef.current = new AudioManager({
          enabled: audio,
          mainAudioUrl,
          endAudioUrl,
        });
      } catch (error) {
        console.error("Failed to initialize audio manager:", error);
      }
    } else {
      // Update audio sources if they've changed
      audioManagerRef.current.updateAudioSources({
        enabled: audio,
        mainAudioUrl,
        endAudioUrl,
      });
    }

    // Cleanup audio resources when component unmounts
    return () => {
      if (audioManagerRef.current) {
        audioManagerRef.current.cleanup();
      }
    };
  }, [audio, mainAudioUrl, endAudioUrl]);

  // Handle window blur - stop animation and jump to end position
  useEffect(() => {
    const handleBlur = () => {
      if (!isElevating) return;

      // Cancel animation frame
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }

      // Stop audio
      audioManagerRef.current?.stopAllAudio();

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

  // Cleanup function on unmount or when dependencies change
  useEffect(() => {
    return () => {
      // Cancel any active animation
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  /**
   * The core animation function that handles the scrolling effect.
   * Uses requestAnimationFrame for smooth animation.
   */
  const animateScroll = useCallback(
    (timestamp: number) => {
      // Initialize start time on first animation frame
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }

      // Ensure required values exist
      if (
        startPositionRef.current === null ||
        endPositionRef.current === null
      ) {
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
        // Animation complete - play end sound
        audioManagerRef.current?.playEndSound();

        // Execute callback if provided
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

  /**
   * Start the elevator effect - initiates scrolling with audio.
   */
  const startElevating = useCallback(() => {
    // Prevent starting if already active
    if (isElevating) return;

    // Start elevator music
    try {
      audioManagerRef.current?.startMainAudio();
    } catch (error) {
      console.error("Failed to play audio:", error);
    }

    // Set state to active
    setIsElevating(true);

    // Calculate end position
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
  }, [
    isElevating,
    targetElement,
    verticalPadding,
    startCallback,
    animateScroll,
  ]);

  return { startElevating, isElevating };
};
