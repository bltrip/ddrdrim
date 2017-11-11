import { init } from "./firebase";

let getNewTrackKey = (userId) => {
  return init()
    .then(() =>{
      var database = firebase.database();
      return database.ref("users/" + userId).child("tracks").push().key      
    });
};

let saveTrack = (userId, trackId, json) => {
  return init()
    .then(() => {
      var database = firebase.database();
      return database.ref("users/" + userId + "/tracks/" + trackId)
        .set(json);
    });
};

export { getNewTrackKey, saveTrack };