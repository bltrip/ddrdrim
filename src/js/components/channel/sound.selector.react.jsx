import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Modal } from "../modal/modal.react.jsx";
import { objectToArrayWithKeyValue } from "../../library/natives/array";
import { getValueFromPath } from "../../library/natives/object";
import { Tabs } from "../tabs/tabs.react.jsx";

const LibraryTab = props => {
  let { onChange, selectedId, librarySounds } = props;
  const librarySoundsList = objectToArrayWithKeyValue(librarySounds);
  return <ul className="generic-list striped">
    {
      librarySoundsList.map(({
        key: id,
        value: { name }
      }) => {
        let selected = "" + id === "" + selectedId;
        return <li>
          <label className="choice-item">
            <input type="radio" name="sound-choice" value={id} checked={selected} onChange={(event) => onChange(event.target.value)} />
            <span>{name}</span>
            <span className="assistive">{selected ? " - Selected" : ""}</span>
          </label>
        </li>;
      }
    )}
  </ul>
};

const UploadsTab = props => {
  let { onChange, selectedId, track, match } = props;
  let userId = getValueFromPath(match, "params/userId");
  return <ul className="generic-list striped">
    <li className="cta-item">
      {
        track.write ?
          (<Link to={`/users/${userId}/uploads/`}>
            Upload samples
          </Link>)
        : null
      }
    </li>
    <li>Blahh</li>
  </ul>
};

class SoundSelector extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      selectedId: this.props.soundId,
      selectedTab: "library-sounds"
    };
  }

  soundHasChanged(){
    return this.state.selectedId !== this.props.soundId;
  }

  onChange(value) {
    this.setState({
      selectedId: value
    });
  }
  
  onTabChange(id) {
    this.setState({
      selectedTab: id
    });
  }

  getSelectedTab(){
    switch(this.state.selectedTab){
      case "library-sounds":
        return LibraryTab;
      case "uploads":
        return UploadsTab;
    }
  }

  render(){
    const { librarySounds, channel, soundId, onSoundChange } = this.props;
    const librarySoundsList = objectToArrayWithKeyValue(librarySounds);
    const Tab = this.getSelectedTab();
    return <Modal {...this.props} title="Change Sound" icon="folder">
      { ({ onClose }) => 
        <div className="sound-selector">
          <Tabs onTabChange={id => this.onTabChange(id)} selected={this.state.selectedTab} tabs={[{
            name: "Library Sounds",
            id: "library-sounds"
          }, {
            name: "Uploads",
            id: "uploads"
          }]} />
          <Tab {...this.props} selectedId={this.state.selectedId} onChange={id => this.onChange(id)} />
          <div className="button-tray">
            <button className="button" onClick={() => { onSoundChange(this.state.selectedId); onClose();}} disabled={!this.soundHasChanged()}>Update</button>
          </div>
      </div>
      }
    </Modal>;
  }
}

export { SoundSelector };