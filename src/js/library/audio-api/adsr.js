export const MAX_OUTPUT = 100;
export const MIN_INPUT = 1;

export let adsr = (keyPressed, elapsedTime, {
    attack,
    decay,
    sustain,
    release
  }, {
    phase = "attack",
    value = 0,
    time = 0
  }) => {
    attack = Math.max(MIN_INPUT, attack);
    decay = Math.max(MIN_INPUT, decay);
    sustain = Math.max(MIN_INPUT, sustain);
    release = Math.max(MIN_INPUT, release);
  phase = keyPressed ? phase : "release";
  switch(phase) {
    case "attack":
      value += 0.1 * ((101 - attack) * elapsedTime)
      if(value >= MAX_OUTPUT) {
        value = MAX_OUTPUT;
        phase = "decay"
      }
      break;
    case "decay":
      value -= 0.1 * (decay * elapsedTime)
      if(value <= sustain) {
        value = sustain;
        phase = "sustain"
      }
      break;
    case "release":
      value -= 0.1 * ((101 - release) * elapsedTime)
      if(value <= 0) {
        value = 0;
      }
      break;
  }
  return {
    phase,
    value,
    time: time + elapsedTime
  };
};