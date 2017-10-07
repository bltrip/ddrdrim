import React from "react";
import { expect } from "chai";
import td from "testdouble";
import { createDrumMachine } from "../drum.machine";
import { getStubContext } from "../../../test-helpers/stubs/audio.api";
import * as _context from "../../context";

describe("Drum Machine", () => {
  it("creates a drum machine", () => {
    let context = getStubContext();
    td.replace(_context, "getAudioContext", () => context.context);
    let drumMachine = createDrumMachine();
    td.reset();
  });
  it("sets gains to correct values", () => {
    let context = getStubContext();
    td.replace(_context, "getAudioContext", () => context.context);
    let drumMachine = createDrumMachine();
    let state = {
      drumMachine: {
        0: [{
          mute: false,
          solo: false,
          pan: 50,
          volume: 100
        }]
      },
      instruments: [{
        id: 0,
        type: "drumMachine",
        machineId: 0
      }]
    };
    drumMachine.update(state.instruments["0"], state);
    expect(drumMachine.outputs.channels[0].master.gain.value).to.equal(1);
    expect(drumMachine.outputs.channels[0].volume.gain.value).to.equal(1);
    td.reset();
  });
});