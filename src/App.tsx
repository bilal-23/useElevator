import "./App.css";
import { useElevator } from "../lib/useElevator";
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
  { text: "Let's make our way to the page's end.", image: images.bear2 },
  { text: "Remember, we're starting from the very top.", image: images.bear },
  {
    text: 'Thus, a "back to top" feature isn\'t immediately necessary.',
    image: images.camera,
  },
  { text: "Heading deeper and deeper.", image: images.chick },
  {
    text: "Quite the journey with all this scrolling, isn't it?",
    image: images.down,
  },
  {
    text: "The payoff for this scroll had better be significant.",
    image: images.elevator,
  },
  {
    text: "Returning to the top seems like it'll be a lengthy endeavor.",
    image: images.hedgehog,
  },
  { text: "Wishing for a simpler method to ascend...", image: images.kitty },
  {
    text: "...one that's not only efficient but also entertaining.",
    image: images.rose,
  },
  {
    text: 'I prefer to think of "back to top" options as elevators...',
    image: images.sun,
  },
  {
    text: "...and they ought to mimic the real experience more closely.",
    image: images.down,
  },
  {
    text: "Finally, we've reached our destination... go ahead and activate that elevator!",
    image: images.elevator,
  },
];

// Section Component
interface SectionProps {
  text: string;
  image: string;
  id: number;
}

const Section = ({ text, image, id }: SectionProps) => {
  return (
    <section id={id.toString()} className="section">
      <div>
        <img src={image} alt="section image" className="section-image" />
      </div>
      <p className="section-text">{text}</p>
    </section>
  );
};

// ScrollToTop Component
const ScrollToTop = () => {
  const { startElevating } = useElevator({
    audio: true,
    duration: 5000,
  });

  return (
    <div className="scroll-to-top" onClick={startElevating}>
      <img src={images.up} alt="up arrow" />
      <p>Lessgoooo</p>
    </div>
  );
};

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
        <Section key={index} id={index} text={item.text} image={item.image} />
      ))}

      <ScrollToTop />
    </div>
  );
}

export default App;
