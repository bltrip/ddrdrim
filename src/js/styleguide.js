import * as React from "react";
import { Display } from "./components/display/display.react";
import { Beat } from "./components/beat/beat.react";
import { PlayHeading } from "./components/play-heading/play.heading.react";
import { Channel } from "./components/channel/channel.react";
import { Rotator } from "./components/rotator/rotator.react";
import { SourceSelector } from "./components/source-selector/source.selector.react";
import { Pattern } from "./components/pattern/pattern.react";
import { PatternBeat } from "./components/pattern/pattern.beat.react";

React.render(
	(
		<div className="drum-machine">
			<PlayHeading isPlaying={true} value="00:01" />
			<Display name="Tempo" value="120" />
			<Display name="Signature" value="4/4" />
			<div className="channels">
				<Channel>
					<SourceSelector selectedIndex={0} options={["Kick", "Clap"]} />
					<Rotator name="Volume" />
					<Rotator name="Attack" />
					<Rotator name="Decay" />
					<Rotator name="Tuning" />
					<Rotator name="Send" />
					<Pattern>
						<PatternBeat index={0} current={true} selected={true} />
						<PatternBeat index={1} current={false} selected={false} />
						<PatternBeat index={2} current={false} selected={true} />
					</Pattern>
				</Channel>
				<Channel>
					<SourceSelector selectedIndex={1} options={["Kick", "Clap"]} />
					<Rotator name="Volume" />
					<Rotator name="Attack" />
					<Rotator name="Decay" />
					<Rotator name="Tuning" />
					<Rotator name="Send" />
					<Pattern>
						<PatternBeat index={0} current={true} selected={false} />
						<PatternBeat index={1} current={false} selected={false} />
						<PatternBeat index={2} current={false} selected={true} />
					</Pattern>
				</Channel>
			</div>
		</div>
	),
	document.getElementById("drum-machine")
);