import {
	CHANGE_SELECTED_CHANNEL,
	TOGGLE_SOLO_CHANNEL,
	TOGGLE_MUTE_CHANNEL,
	CHANGE_VOLUME_TO_AMOUNT,
	CHANGE_PITCH_TO_AMOUNT,
	CHANGE_DECAY_TO_AMOUNT,
	CHANGE_PAN_TO_AMOUNT,
	TOGGLE_REVERB
} from "../constants/drum.machine.constants";

export function changeVolumeToAmount(channelId, value){
	return {
		type: CHANGE_VOLUME_TO_AMOUNT,
		channelId,
		value
	};
}

export function changePitchToAmount(channelId, value){
	return {
		type: CHANGE_PITCH_TO_AMOUNT,
		channelId,
		value
	};
}

export function changeDecayToAmount(channelId, value){
	return {
		type: CHANGE_DECAY_TO_AMOUNT,
		channelId,
		value
	};
}

export function changePanToAmount(channelId, value){
	return {
		type: CHANGE_PAN_TO_AMOUNT,
		channelId,
		value
	};
}

export function toggleReverb(channelId, value){
	return {
		type: TOGGLE_REVERB,
		channelId,
		value
	};
}

export function changeSelectedChannel(newChannelId) {
	return {
		type: CHANGE_SELECTED_CHANNEL,
		value: newChannelId
	};
}

export function toggleSoloChannel(channelId) {
	return {
		type: TOGGLE_SOLO_CHANNEL,
		value: channelId
	};
}

export function toggleMuteChannel(channelId) {
	return {
		type: TOGGLE_MUTE_CHANNEL,
		value: channelId
	};
}