import Rx from "rxjs/Rx";

export var createIntervalStream = (getNow, getIntervalTime, callback, cancelCallback) => Rx.Observable.create(function (observer) {
	let frameId,
		loop,
		tick,
		prevTime;

	loop = function() {
		let now = getNow();
		prevTime = prevTime || now;
		let deltaTime = now - prevTime;
		let interval = getIntervalTime() / 1000;
		let bufferLength = interval / 2;

		if(deltaTime >= bufferLength) {
			observer.next(prevTime + interval);
			prevTime = prevTime + interval;
		}
		tick();
	};

	tick = function() {
		frameId = callback(loop);
	};

	loop();

    return function () {
		if(!cancelCallback) return;
        cancelCallback(frameId);
    };
});

export let intervalGenerator = function*(shouldContinue, timeout){
	while(shouldContinue()){
		yield timeout();
	}
};

export let timeout = {
	get: () => new Promise(window.requestAnimationFrame)
};