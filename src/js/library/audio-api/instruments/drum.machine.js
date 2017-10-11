import { getAudioContext } from "../context";
import { get } from "../load.sounds";
import { numberToArrayLength, zip, last } from "../../natives/array";
import { panPercentageToValue } from "../pan";
import { loadSounds } from "../load.sounds";
import { buffersSinceId } from "../buffer";
import { pitchToPlaybackRate } from "../playback.rate";
import { decayPercentageToValue } from "../decay";
import { triggerBuffer } from "./trigger.buffer";

export let createDrumMachine = () => {
  let context = getAudioContext();
  let channelNodes = [];
  let sounds = {};
  let lastBufferId = undefined;
  let output = context.createGain();
  let send1 = context.createGain();
  let send2 = context.createGain();

  let init = () => {
    channelNodes = numberToArrayLength(9)
      .map(channel => ({
        send1: context.createGain(),
        send2: context.createGain(),
        volume: context.createGain(),
        master: context.createGain(),
        pan: context.createPanner()
      }));
  
    channelNodes
      .forEach(channelNode => {
        channelNode.master.connect(channelNode.volume);
        channelNode.volume.connect(channelNode.pan);
        channelNode.pan.connect(output);
        channelNode.master.connect(channelNode.send1);
        channelNode.master.connect(channelNode.send2);
        channelNode.send1.connect(send1);
        channelNode.send2.connect(send2);
        channelNode.pan.panningModel = "equalpower";
      });
  };

  let update = (instrument, state) => {
    updateSounds(instrument, state);
    updateGains(instrument, state);
    updateSoundTriggers(instrument, state);
  };

  let updateSounds = (instrument, state) => {
    sounds = loadSounds(state);
  };

  let updateGains = (instrument, state) => {
    let { machineId } = instrument;
    let { drumMachine } = state;
    let machine = drumMachine[machineId];

    let atLeastOneChannelSolod = machine.reduce(((prev, channel) => prev || channel.solo), false);

    zip([machine, channelNodes])
      .forEach(([channel, channelNode], index) => {
        channelNode.master.gain.value = channel.mute ? 0: channel.solo ? 1: atLeastOneChannelSolod ? 0 : 1;
        channelNode.volume.gain.value = channel.volume * 0.01;
        channelNode.pan.setPosition(...panPercentageToValue(channel.pan));
        channelNode.send1.gain.value = channel.reverb ? 1 : 0;
        //Unused at the moment
        channelNode.send2.gain.value = 0;
      });
  };

  let updateSoundTriggers = (instrument, state) => {
    let { machineId } = instrument;
    let { drumMachine, buffer, patterns, playState } = state;
    let machine = drumMachine[machineId];
    
    if(!playState.isPlaying) {
      lastBufferId = undefined;
      return;
    }

    let buffers = lastBufferId ? buffersSinceId(lastBufferId, buffer) : buffer;
    if(buffers.length) {
      lastBufferId = last(buffers).id;
    }

    buffers.forEach(item => {
      let { time, index, bar } = item;

      machine.forEach((channel, channelIndex) => {
        let { sound, pitch, decay } = channel;
        pitch = pitchToPlaybackRate(pitch);
        let pattern = patterns[channel.patterns[bar]];
        let soundPromise = sound.sound;
        if(!(pattern && pattern[index])) return;
        soundPromise.then(soundBuffer => {
          if(context.time > time) return;
          let node = triggerBufferAndDecay(context, soundBuffer, pitch, time, decay);
          node.connect(channelNodes[channelIndex]);
        });
      });
    });
  };

  let remove = () => {
    context = null;
    channelNodes = null;
  };

  init();

  return {
    update,
    remove,
    outputs: {
      main: output,
      send1,
      send2,
      channels: channelNodes
    }
  }
};