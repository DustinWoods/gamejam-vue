export default {
  playAudio(options = {}) {
    const {
      refName,
      startPosition = null,
      loop = false,
      volume = 1,
    } = options;
    const $ref = this.$refs[refName];
    $ref.volume = volume;
    if(startPosition !== null) {
      $ref.currentTime = startPosition;
    }
    $ref.loop = loop;
    setTimeout($ref.play.bind($ref), 100);
  },
  fadeAudio(options = {}) {
    const {
      refName,
      fadeInterval = 500,
      fadeTo = 0,
      pauseOnComplete = true,
    } = options;
    const $ref = this.$refs[refName];
    const fadeDelta = (lastTimeMs, fadeTo, fadeInterval, $audio) => {
      const nowMs = Date.now();
      const deltaTimeMs = nowMs - lastTimeMs;
      $audio.volume -= Math.min(deltaTimeMs / fadeInterval, $audio.volume - fadeTo);
      if($audio.volume > fadeTo) {
        setTimeout(fadeDelta.bind(null, nowMs, fadeTo, fadeInterval, $audio), 100);
      } else if(pauseOnComplete) {
        $audio.pause();
      }
    }

    fadeDelta(Date.now(), fadeTo, fadeInterval, $ref);
  },
};