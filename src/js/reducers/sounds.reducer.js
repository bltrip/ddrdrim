//Sounds from http://bedroomproducersblog.com/2014/04/24/roland-tr-909-samples/

const initialState = {
	0: {
		name: "Bass Drum",
		path: "samples/909/bd01.WAV"
	},
	1: {
		name: "Snare Drum",
		path: "samples/909/sd01.WAV"
	},
	2: {
		name: "Low Tom",
		path: "samples/909/lt01.WAV"
	},
	3: {
		name: "Mid Tom",
		path: "samples/909/mt01.WAV"
	},
	4: {
		name: "Hi Tom",
		path: "samples/909/ht01.WAV"
	},
	5: {
		name: "Rim Shot",
		path: "samples/909/rs01.WAV"
	},
	6: {
		name: "Hand Clap",
		path: "samples/909/cp01.WAV"
	},
	7: {
		name: "Hi Hat",
		path: "samples/909/hh01.WAV"
	},
	8: {
		name: "Cymbal",
		path: "samples/909/rd01.WAV"
	}
};

export default function sounds(state = initialState, action) {
	switch (action.type) {
		default:
			return state;
	}
}