import React from "react";
import "./App.css";
import { useElevator } from "use-elevator";
import bearImg from "./assets/bear.png";
import bear2Img from "./assets/bear-2.png";
import cameraImg from "./assets/camera.png";
import chickImg from "./assets/chick.png";
import downImg from "./assets/down.png";
import elevatorImg from "./assets/elevator.png";
import hedgehogImg from "./assets/hedgehog.png";
import kittyImg from "./assets/kitty.png";
import roseImg from "./assets/rose.png";
import sunImg from "./assets/sun.png";
import upImg from "./assets/up.png";

// Images collection
const images = {
  bear: bearImg,
  bear2: bear2Img,
  camera: cameraImg,
  chick: chickImg,
  down: downImg,
  elevator: elevatorImg,
  hedgehog: hedgehogImg,
  kitty: kittyImg,
  rose: roseImg,
  sun: sunImg,
  up: upImg,
};

// Section data
const sections = [
  {
    text: "Let's make our way to the page's end.",
    image: images.bear2,
    name: "Friendly Bear",
  },
  {
    text: "Remember, we're starting from the very top.",
    image: images.bear,
    name: "Sleepy Bear",
  },
  {
    text: 'Thus, a "back to top" feature isn\'t immediately necessary.',
    image: images.camera,
    name: "Camera",
  },
  {
    text: "Heading deeper and deeper.",
    image: images.chick,
    name: "Little Chick",
  },
  {
    text: "Quite the journey with all this scrolling, isn't it?",
    image: images.down,
    name: "Down Arrow",
  },
  {
    text: "The payoff for this scroll had better be significant.",
    image: images.elevator,
    name: "Elevator",
  },
  {
    text: "Returning to the top seems like it'll be a lengthy endeavor.",
    image: images.hedgehog,
    name: "Hedgehog",
  },
  {
    text: "Wishing for a simpler method to ascend...",
    image: images.kitty,
    name: "Kitty",
  },
  {
    text: "...one that's not only efficient but also entertaining.",
    image: images.rose,
    name: "Rose",
  },
  {
    text: 'I prefer to think of "back to top" options as elevators...',
    image: images.sun,
    name: "Sunshine",
  },
  {
    text: "...and they ought to mimic the real experience more closely.",
    image: images.down,
    name: "Downward Path",
  },
  {
    text: "Finally, we've reached our destination... go ahead and activate that elevator!",
    image: images.elevator,
    name: "Elevator Ride",
  },
];

// Section Component
interface SectionProps {
  text: string;
  image: string;
  id: number;
  name: string;
}

const Section = ({ text, image, id, name }: SectionProps) => {
  return (
    <section id={id.toString()} className="section">
      <div>
        <img src={image} alt={name} className="section-image" />
      </div>
      <h3 className="section-name">{name}</h3>
      <p className="section-text">{text}</p>
    </section>
  );
};

// Settings type
interface ElevatorSettings {
  duration: number;
  targetElement: string | undefined;
}

// ScrollToTop Component with Settings
const ScrollToTop = React.memo(() => {
  const [settings, setSettings] = React.useState<ElevatorSettings>({
    duration: 5000,
    targetElement: undefined,
  });

  const { startElevating, isElevating } = useElevator({
    duration: settings.duration,
    targetElement: settings.targetElement,
  });

  const handleSettingsChange = (
    key: keyof ElevatorSettings,
    value: number | string | undefined
  ) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="scroll-to-top-container">
      <div className="elevator-settings">
        <div className="setting-group">
          <label htmlFor="duration">Duration (ms):</label>
          <input
            id="duration"
            type="range"
            min="500"
            max="10000"
            step="500"
            value={settings.duration}
            onChange={(e) =>
              handleSettingsChange("duration", Number(e.target.value))
            }
          />
          <span className="duration-value">{settings.duration}ms</span>
        </div>

        <div className="setting-group">
          <label htmlFor="target-element">Target Element:</label>
          <select
            id="target-element"
            value={settings.targetElement || ""}
            onChange={(e) =>
              handleSettingsChange("targetElement", e.target.value || undefined)
            }
            className="pastel-dropdown"
          >
            <option value="">Top of page</option>
            {sections.map((section, index) => (
              <option key={index} value={index.toString()}>
                {section.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="scroll-to-top" onClick={startElevating}>
        <img src={images.up} alt="up arrow" />
        <p>{isElevating ? "Going up..." : "Lessgoooo"}</p>
      </div>
    </div>
  );
});

// HeroButton Component
const HeroButton = ({
  text,
  link,
  primary = false,
  icon = null,
}: {
  text: string;
  link: string;
  primary?: boolean;
  icon?: React.ReactNode;
}) => (
  <a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className={`hero-button ${primary ? "primary" : "secondary"}`}
  >
    {icon && <span className="button-icon">{icon}</span>}
    {text}
  </a>
);

// GithubIcon Component
const GithubIcon = () => (
  <svg
    height="20"
    width="20"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="github-icon"
  >
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
  </svg>
);

function App() {
  return (
    <div className="app">
      <div className="hero">
        <div className="hero-content">
          <div className="hero-title-wrapper">
            <h1 className="title-container">
              <p className="title">useElevator</p>
              <span className="title-tag">React Hook</span>
            </h1>
            <p className="subtitle">
              A smooth scrolling React hook with elevator music, inspired by{" "}
              <a
                href="https://tholman.com/elevator.js/"
                target="_blank"
                rel="noopener noreferrer"
              >
                elevator.js
              </a>
              . Fixes those awkward "scroll to top" moments the old fashioned
              way.
            </p>
          </div>

          <div className="hero-buttons">
            <HeroButton
              text="View on GitHub"
              link="https://github.com/bilal-23/useElevator"
              primary={true}
              icon={<GithubIcon />}
            />
          </div>

          <div className="hero-image">
            <img
              src={images.elevator}
              alt="Elevator"
              className="elevator-hero-image"
            />
          </div>

          <div className="author">
            <a
              href="https://github.com/bilal-23"
              target="_blank"
              rel="noopener noreferrer"
            >
              By Bilal
            </a>
          </div>
        </div>
      </div>

      {sections.map((item, index) => (
        <Section
          key={index}
          id={index}
          text={item.text}
          image={item.image}
          name={item.name}
        />
      ))}

      <ScrollToTop />
    </div>
  );
}

export default App;
