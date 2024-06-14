import './styles/styles.css'
import React from 'react'
import ReactDOM from 'react-dom'
import useEffectReducer from 'react'
// sounds
const firstSoundsSerie = [
  {
    keyCode: 81,
    key: "Q",
    id: "Heater-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
  },
  {
    keyCode: 87,
    key: "W",
    id: "Heater-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
  },
  {
    keyCode: 69,
    key: "E",
    id: "Heater-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
  },
  {
    keyCode: 65,
    key: "A",
    id: "Heater-4",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
  },
  {
    keyCode: 83,
    key: "S",
    id: "Clap",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
  },
  {
    keyCode: 68,
    key: "D",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
  },
  {
    keyCode: 90,
    key: "Z",
    id: "Kick-n'-Hat",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
  },
  {
    keyCode: 88,
    key: "X",
    id: "Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
  },
  {
    keyCode: 67,
    key: "C",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
  }
];

const secondSoundsSerie = [
  {
    keyCode: 81,
    key: "Q",
    id: "Chord-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3"
  },
  {
    keyCode: 87,
    key: "W",
    id: "Chord-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3"
  },
  {
    keyCode: 69,
    key: "E",
    id: "Chord-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3"
  },
  {
    keyCode: 65,
    key: "A",
    id: "Shaker",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3"
  },
  {
    keyCode: 83,
    key: "S",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3"
  },
  {
    keyCode: 68,
    key: "D",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3"
  },
  {
    keyCode: 90,
    key: "Z",
    id: "Punchy-Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3"
  },
  {
    keyCode: 88,
    key: "X",
    id: "Side-Stick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3"
  },
  {
    keyCode: 67,
    key: "C",
    id: "Snare",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"
  }
];

const soundsName = {
  heaterKit: "Heater Kit",
  smoothPianoKit: "Smooth Piano Kit"
};

const soundsSerie = {
  heaterKit: firstSoundsSerie,
  smoothPianoKit: secondSoundsSerie
};

const unplugAudio = (audio) => {
  setAudio(!audio);
};
// component for every key on the drum keyboard
const KeyboardKey = ({ play, unplugAudio, sound: { id, key, url, keyCode } }) => {
  const handleKeydown = (event) => {
    if (keyCode === event.keyCode) {
      const audio = document.getElementById(key);
      play(key, id);
      unplugAudio(audio);
    }
  };

  React.useEffect(() => {
    document.addEventListener("keydown", handleKeydown, []);
  });

  return (
    <button
      value="test"
      id={keyCode}
      className="drum-pad"
      onClick={() => play(key, id)}
    >
      <audio className="clip" src={url} id={key} />
      {key}
    </button>
  );
};
// component
const Keyboard = ({ sounds, play, power, unplugAudio }) => (
  <div className="keyboard">
    {power
      ? sounds.map((sound) => (
          <KeyboardKey sound={sound} play={play} unplugAudio={unplugAudio} />
        ))
      : sounds.map((sound) => (
          <KeyboardKey
            sound={{ ...sound, url: "#" }}
            play={play}
            unplugAudio={unplugAudio}
          />
        ))}
  </div>
);

// component to manage drum controls
const DrumControl = ({
  stop,
  name,
  power,
  volume,
  handleVolumeChange,
  changeSoundsSerie
}) => (
  <div className="control">
    <h6>Power</h6>
    <br />
    <button type="button" id="power" onClick={stop}>
      {power ? "ON" : "OFF"}
    </button>
    <br />
    <br />
    <h6>Volume</h6>
    <input
      max="1"
      min="0"
      step="0.01"
      type="range"
      value={volume}
      onChange={handleVolumeChange}
    />
    <h2 id="display">{name}</h2>
    <h6>Change Bank</h6>
    <br />
    <button type="button" id="bank" onClick={changeSoundsSerie}>
      Bank
    </button>
  </div>
);
// App
export default function App() {
  const [power, setPower] = React.useState(true);
  const [volume, setVolume] = React.useState(1);
  const [soundsName, setSoundName] = React.useState("");
  const [soundType, setSoundType] = React.useState("heaterKit");
  const [sounds, setSounds] = React.useState(soundsSerie[soundType]);

  const play = (key, sound) => {
    setSoundName(sound);
    const audio = document.getElementById(key);
    audio.currentTime = 0;
    audio.play();
    unplugAudio(audio)
  };

  const stop = () => {
    setPower(!power);
  };

  const changeSoundsSerie = () => {
    setSoundName("");
    if (soundType === "heaterKit") {
      setSoundType("smoothPianoKit");
      setSounds(soundsSerie.smoothPianoKit);
    } else {
      setSoundType("heaterKit");
      setSounds(soundsSerie.heaterKit);
    }
  };

  const handleVolumeChange = (event) => {
    setVolume(event.target.value);
  };

  const setKeyVolume = () => {
    const audioes = sounds.map((sound) => document.getElementById(sound.key));
    audioes.forEach((audio) => {
      if (audio) {
        audio.volume = volume;
      }
    });
  };

  return (
    <body>
      <div id="title">
        <h1>Drum Machine</h1>
      </div>
      <div id="drum-machine">
        {setKeyVolume()}
        <div className="wrapper">
          <Keyboard sounds={sounds} play={play} power={power} />
          <DrumControl
            stop={stop}
            power={power}
            volume={volume}
            name={soundsName || soundsName[soundType]}
            changeSoundsSerie={changeSoundsSerie}
            handleVolumeChange={handleVolumeChange}
          />
        </div>
      </div>
      <div id="copy">
        <h5>Created by Ariana Spretz - Copyright 2022</h5>
      </div>
    </body>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
