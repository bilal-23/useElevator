import defaultMainAudio from "../assets/elevator.mp3";
import defaultDingAudio from "../assets/ding.mp3";

/**
 * AudioManager handles the audio playback for the elevator effect
 * Encapsulates audio creation, playback and cleanup in one place
 */
export class AudioManager {
  private mainAudio: HTMLAudioElement | null;
  private endAudio: HTMLAudioElement | null;
  private isEnabled: boolean;

  /**
   * Creates a new AudioManager instance
   *
   * @param {Object} options - Audio configuration options
   * @param {boolean} options.enabled - Whether audio is enabled
   * @param {string} options.mainAudioUrl - Custom URL for the elevator music
   * @param {string} options.endAudioUrl - Custom URL for the end "ding" sound
   */
  constructor({
    enabled = true,
    mainAudioUrl,
    endAudioUrl,
  }: {
    enabled?: boolean;
    mainAudioUrl?: string;
    endAudioUrl?: string;
  }) {
    this.isEnabled = enabled;

    // Only create audio elements if audio is enabled
    if (this.isEnabled) {
      try {
        // Use custom audio URLs if provided, otherwise use defaults
        this.mainAudio = new Audio(mainAudioUrl || defaultMainAudio);
        this.endAudio = new Audio(endAudioUrl || defaultDingAudio);

        // Preload audio files for smoother playback
        this.mainAudio.preload = "auto";
        this.endAudio.preload = "auto";

        // Load audio files (important for some browsers)
        this.mainAudio.load();
        this.endAudio.load();
      } catch (error) {
        console.error("Error initializing audio:", error);
        this.mainAudio = null;
        this.endAudio = null;
      }
    } else {
      this.mainAudio = null;
      this.endAudio = null;
    }
  }

  /**
   * Updates the audio sources if they change
   *
   * @param {Object} options - Audio configuration options
   * @param {boolean} options.enabled - Whether audio is enabled
   * @param {string} options.mainAudioUrl - Custom URL for the elevator music
   * @param {string} options.endAudioUrl - Custom URL for the end "ding" sound
   */
  updateAudioSources({
    enabled = true,
    mainAudioUrl,
    endAudioUrl,
  }: {
    enabled?: boolean;
    mainAudioUrl?: string;
    endAudioUrl?: string;
  }) {
    this.isEnabled = enabled;

    if (!this.isEnabled) {
      this.stopAllAudio();
      this.mainAudio = null;
      this.endAudio = null;
      return;
    }

    try {
      // Update main audio if URL provided
      if (mainAudioUrl) {
        if (this.mainAudio) {
          this.mainAudio.pause();
        }
        this.mainAudio = new Audio(mainAudioUrl);
        this.mainAudio.preload = "auto";
        this.mainAudio.load();
      } else if (!this.mainAudio) {
        // Create default if it doesn't exist
        this.mainAudio = new Audio(defaultMainAudio);
        this.mainAudio.preload = "auto";
        this.mainAudio.load();
      }

      // Update end audio if URL provided
      if (endAudioUrl) {
        if (this.endAudio) {
          this.endAudio.pause();
        }
        this.endAudio = new Audio(endAudioUrl);
        this.endAudio.preload = "auto";
        this.endAudio.load();
      } else if (!this.endAudio) {
        // Create default if it doesn't exist
        this.endAudio = new Audio(defaultDingAudio);
        this.endAudio.preload = "auto";
        this.endAudio.load();
      }
    } catch (error) {
      console.error("Error updating audio sources:", error);
    }
  }

  /**
   * Starts playing the main elevator music
   */
  startMainAudio() {
    if (!this.isEnabled || !this.mainAudio) return;

    try {
      // Reset audio to beginning if it was already playing
      this.mainAudio.currentTime = 0;
      this.mainAudio.volume = 1.0;

      // Play as a promise to handle autoplay restrictions gracefully
      const playPromise = this.mainAudio.play();

      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          // Auto-play was prevented - no need to handle specially
          console.debug("Audio autoplay prevented:", error);
        });
      }
    } catch (error) {
      console.error("Error playing main audio:", error);
    }
  }

  /**
   * Plays the end "ding" sound and stops the main audio
   */
  playEndSound() {
    if (!this.isEnabled) return;

    try {
      // Stop main audio
      if (this.mainAudio) {
        this.mainAudio.pause();
        this.mainAudio.currentTime = 0;
      }

      // Play end sound
      if (this.endAudio) {
        this.endAudio.currentTime = 0;
        this.endAudio.volume = 1.0;

        const playPromise = this.endAudio.play();

        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.debug("Audio autoplay prevented:", error);
          });
        }
      }
    } catch (error) {
      console.error("Error playing end sound:", error);
    }
  }

  /**
   * Stops all audio playback
   */
  stopAllAudio() {
    try {
      if (this.mainAudio) {
        this.mainAudio.pause();
        this.mainAudio.currentTime = 0;
      }

      if (this.endAudio) {
        this.endAudio.pause();
        this.endAudio.currentTime = 0;
      }
    } catch (error) {
      console.error("Error stopping audio:", error);
    }
  }

  /**
   * Cleans up audio resources
   */
  cleanup() {
    this.stopAllAudio();
    this.mainAudio = null;
    this.endAudio = null;
  }
}
