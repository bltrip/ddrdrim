import { createStore } from "redux";

// Represents the state of the synth as a snapshot in time
// which will change over time
//TODO: action will represent keys pressed state and a time
//keys should be filtered by the max voices and ordered by startTime
//keys should persist even after key up
//but there should only be one key item per note e.g. only one a1
//the resolution at which the fn is called will determine the "responsiveness" / quality of the envlopes
//action = {
//  time: 1234
//  keys: [{ key: "a0", startTime: 0, endTime: 1111 }]
//  synth: 
//}
let initialState = {
  time: 0,
  oscillators: {
    osc1: {
      waveType: "sine",
      frequency: 110,
      amp: 0
    },
    osc2: {
      waveType: "square",
      frequency: 220,
      amp: 0
    }
  },
  envelopes: {
    amp: 0,
    filter: 0
  }
};

export let synthReducer = (state = initialState, action) => {
  switch(action.type) {
    case "TIME_PASSED":
      return {
        ...state,
        time: action.time,
        envelopes: {
          ...state.envelopes,
          amp: Math.max(100, state.envelopes.amp + 1)
        }
      };
  }
  return state;
};

export let synthStore = () => createStore(synthReducer, initialState);