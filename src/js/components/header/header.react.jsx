import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { bindActionCreators } from "redux";
import DrumMachineActions from "../../actions/root.actions";
import { DefaultInput } from "../input/input.react.jsx";
import { DropDownMenu } from "./dropdown.react.jsx";

export let getMenuItemsFromProps = props => {
  const { dispatch } = props;
  const trackActions = bindActionCreators(DrumMachineActions.track, dispatch);
  return [{
    name: "Save Track",
    callback: () => trackActions.saveTrack(),
    condition: () => props.auth && props.auth.user && props.track.write
  }, {
    name: "Logout",
    link: "/user/logout",
    condition: () => props.auth && props.auth.user
  }, {
    name: "Login",
    link: "/user/login",
    condition: () => !(props.auth && props.auth.user)
  }];
};

export let Header = props => {
  const { dispatch } = props;
  const metaActions = bindActionCreators(DrumMachineActions.meta, dispatch);
  return <div className="header">
    <div className="tray">
      <div className="logo">
        <h1><NavLink to="/" activeClassName="active icon__logo"><span className="assistive">Drum Machine</span></NavLink></h1>
      </div>
      { props.meta.title ?
        (
          <DefaultInput disabled={ !props.track.write } value={props.meta.title} onValueChange={value => metaActions.changeTrackTitle(value)} />
        ) : null
      }
    </div>
    <div className="tray">
      <DropDownMenu items={getMenuItemsFromProps(props)}></DropDownMenu>
    </div>
  </div>
};