import React from "react";

const DocsPage: React.FC = () => {
  return (
    <div className="docs-page">
      <h2>useElevator Documentation</h2>

      <section className="docs-section">
        <h3>Installation</h3>
        <div className="code-block">
          <pre>npm install use-elevator</pre>
        </div>
        <p>or using yarn:</p>
        <div className="code-block">
          <pre>yarn add use-elevator</pre>
        </div>
      </section>

      <section className="docs-section">
        <h3>Basic Usage</h3>
        <div className="code-block">
          <pre>{`import { useElevator } from 'use-elevator';

function ScrollToTopButton() {
  const { startElevating, isElevating } = useElevator({
    audio: true,
    duration: 2000
  });

  return (
    <button 
      onClick={startElevating}
      disabled={isElevating}
    >
      {isElevating ? 'Going up...' : 'Back to top'}
    </button>
  );
}`}</pre>
        </div>
      </section>

      <section className="docs-section">
        <h3>API Reference</h3>
        <h4>Options</h4>
        <table className="props-table">
          <thead>
            <tr>
              <th>Property</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>targetElement</td>
              <td>string</td>
              <td>undefined</td>
              <td>
                The ID of the element to scroll to. If not provided, scrolls to
                the top of the page.
              </td>
            </tr>
            <tr>
              <td>duration</td>
              <td>number</td>
              <td>0 (auto)</td>
              <td>
                Duration of the scroll animation in milliseconds. If not
                provided, the duration is calculated based on scroll distance.
              </td>
            </tr>
            <tr>
              <td>mainAudioUrl</td>
              <td>string</td>
              <td>Default elevator music</td>
              <td>URL of the audio to play during scrolling.</td>
            </tr>
            <tr>
              <td>endAudioUrl</td>
              <td>string</td>
              <td>Default ding sound</td>
              <td>URL of the audio to play when scrolling finishes.</td>
            </tr>
            <tr>
              <td>audio</td>
              <td>boolean</td>
              <td>true</td>
              <td>Whether to play audio during the scroll animation.</td>
            </tr>
            <tr>
              <td>verticalPadding</td>
              <td>number</td>
              <td>0</td>
              <td>Padding from the target element to stop above it.</td>
            </tr>
            <tr>
              <td>startCallback</td>
              <td>function</td>
              <td>undefined</td>
              <td>Function to call when scrolling starts.</td>
            </tr>
            <tr>
              <td>endCallback</td>
              <td>function</td>
              <td>undefined</td>
              <td>Function to call when scrolling ends.</td>
            </tr>
          </tbody>
        </table>

        <h4>Returns</h4>
        <table className="props-table">
          <thead>
            <tr>
              <th>Property</th>
              <th>Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>startElevating</td>
              <td>function</td>
              <td>Function to trigger the scroll animation.</td>
            </tr>
            <tr>
              <td>isElevating</td>
              <td>boolean</td>
              <td>Whether the scroll animation is currently active.</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="docs-section">
        <h3>Examples</h3>

        <h4>Scroll to Specific Element</h4>
        <div className="code-block">
          <pre>{`const { startElevating } = useElevator({
  targetElement: 'contact-section',
  verticalPadding: 20,
  audio: true
});`}</pre>
        </div>

        <h4>Custom Audio</h4>
        <div className="code-block">
          <pre>{`const { startElevating } = useElevator({
  mainAudioUrl: '/path/to/custom-music.mp3',
  endAudioUrl: '/path/to/custom-ding.mp3',
  audio: true
});`}</pre>
        </div>

        <h4>With Callbacks</h4>
        <div className="code-block">
          <pre>{`const { startElevating } = useElevator({
  startCallback: () => console.log('Starting elevator ride'),
  endCallback: () => console.log('Arrived at destination')
});`}</pre>
        </div>
      </section>
    </div>
  );
};

export default DocsPage;
