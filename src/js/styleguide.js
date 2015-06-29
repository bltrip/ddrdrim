import * as React from "react";
import { Display } from "./components/display/display.react";

React.render(
	(<div className="drum-machine">
		<Display name="Tempo" value="120" />
	</div>),
	document.getElementById("drum-machine")
);