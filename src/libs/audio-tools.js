import { Howl } from 'howler';

const howls = {
  audioAlarm: new Howl({
    src: [require('../assets/sound/alarm.ogg')],
  }),
  audioSwitch: new Howl({
    src: [require('../assets/sound/switch.ogg')],
  }),
  audioDream: new Howl({
    src: [require('../assets/sound/dream.ogg')],
  }),
};

export default {
  playAudio(options = {}) {
    const {
      refName,
      //startPosition = null,
      //loop = false,
      //volume = 1,
    } = options;
    howls[refName].play();
  },
  fadeAudio(options = {}) {
    const {
      refName,
      fadeInterval = 500,
      fadeTo = 0,
      //pauseOnComplete = true,
    } = options;

    howls[refName].fade(1, fadeTo, fadeInterval);
  },
};
