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

// LinkIcon Component
const LinkIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    className="link-icon"
    color="currentColor"
    fill="currentColor"
  >
    <path d="M12.705 2.273h6.158L17.73 1.14V7.3a1.18 1.18 0 0 0 .331.8c.443.44 1.157.44 1.6 0 .208-.215.327-.5.33-.8V1.14A1.15 1.15 0 0 0 18.86.008h-6.158a1.18 1.18 0 0 0-.8.331c-.44.443-.44 1.157 0 1.6.215.207.5.326.8.33z" />
    <path d="M9.446 12.16L19.668 1.936c.44-.443.44-1.157 0-1.6a1.14 1.14 0 0 0-.8-.331 1.19 1.19 0 0 0-.8.331L14.61 3.792 11.653 6.74l-3.8 3.812c-.44.443-.44 1.157 0 1.6a1.14 1.14 0 0 0 .8.331 1.19 1.19 0 0 0 .8-.331zm8.287-.33v4.867a6.02 6.02 0 0 1-.016.809l.04-.3c-.02.13-.052.258-.1.38l.113-.27a1.73 1.73 0 0 1-.208.36l.177-.23c-.086.108-.184.206-.292.292l.23-.177c-.1.084-.232.154-.36.208l.27-.113a1.69 1.69 0 0 1-.381.1l.3-.04a4.29 4.29 0 0 1-.566.016H2.723a1.58 1.58 0 0 1-.231-.016l.3.04c-.13-.02-.258-.052-.38-.1l.27.113c-.128-.055-.25-.124-.36-.208l.23.177a1.78 1.78 0 0 1-.295-.295l.177.23c-.084-.1-.154-.232-.208-.36l.113.27a1.69 1.69 0 0 1-.1-.38l.04.3c-.018-.188-.023-.377-.016-.566v-14.2a1.58 1.58 0 0 1 .016-.231l-.04.3c.02-.13.052-.258.1-.38l-.113.27c.055-.128.124-.25.208-.36l-.177.23c.086-.108.184-.206.292-.292l-.23.177c.1-.084.232-.154.36-.208l-.27.113a1.69 1.69 0 0 1 .381-.1l-.3.04a5.27 5.27 0 0 1 .682-.016h4.994a1.18 1.18 0 0 0 .8-.331c.44-.443.44-1.157 0-1.6-.215-.208-.5-.327-.8-.33h-5.45A2.76 2.76 0 0 0 1.33.4a2.55 2.55 0 0 0-.612.5 2.61 2.61 0 0 0-.442.657 3.39 3.39 0 0 0-.186.485 3.62 3.62 0 0 0-.084.56v13.936a7.27 7.27 0 0 0 .066 1.332c.1.516.37.988.75 1.354.188.187.404.344.64.464.16.08.324.146.494.2a3.08 3.08 0 0 0 .54.093 3.14 3.14 0 0 0 .4.016h14.38a3.03 3.03 0 0 0 1.257-.3 2.62 2.62 0 0 0 1.112-1.08 2.82 2.82 0 0 0 .344-1.325v-5.448a1.18 1.18 0 0 0-.331-.8c-.443-.44-1.157-.44-1.6 0a1.25 1.25 0 0 0-.322.811z" />
  </svg>
);

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

function App() {
  return (
    <div className="app">
      <div className="hero">
        <h1 className="title-container">
          <p className="title">
            <a
              href="https://tholman.com/elevator.js/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkIcon />
            </a>
            useElevator
          </p>
          <span className="title-tag">(React Hook)</span>
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
          . Fixes those awkward "scroll to top" moments the old fashioned way.
        </p>
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

      {sections.map((item, index) => (
        <Section key={index} id={index} text={item.text} image={item.image} />
      ))}

      <ScrollToTop />
    </div>
  );
}

export default App;
