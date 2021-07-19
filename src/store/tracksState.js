import {
  makeAutoObservable,
  extendObservable,
  autorun,
  observable,
} from "mobx";
import { uuid } from "uuidv4";
import { musicData } from "../constants";

class TracksState {
  trackList = [];
  syncCopytrackList;
  loop = false;

  constructor() {
    makeAutoObservable(this, { trackList: observable }, { deep: true });
  }

  findTrackInList(id) {
    return this.trackList.find((item) => item.id === id);
  }

  removeTrack(id) {
    this.findTrackInList(id).audio.pause();
    this.trackList = this.trackList.filter((item) => item.id !== id);
  }

  addTrack(id) {
    const oldTrack = musicData.find((track) => track.id === id);
    const newTrack = {
      ...oldTrack,
      id: uuid(),
      bits: 0,
      audio: new Audio(oldTrack.url),
    };
    newTrack.audio.addEventListener("loadedmetadata", (event) => {
      this.calculateBits(event.path[0].duration, newTrack);
      newTrack.audio.volume = 0.3;
      this.trackList.push(newTrack);
    });
  }

  calculateBits = (time, track) => {
    track.bits = Math.floor((track.bpm / 60) * time);
  };

  loopTracks() {
    this.currentTrack.audio.removeEventListener("ended", this.loopTracks);
    const trackIndex = this.trackList.indexOf(this.currentTrack);
    this.handleTrack(this.trackList[trackIndex + 1].id);
  }

  handleTrack(id) {
    const findedItem = this.findTrackInList(id);
    findedItem.audio.loop = false
    if (this.loop) {
      this.currentTrack = findedItem;
      findedItem.audio.addEventListener("ended", this.loopTracks);
    }

    if (findedItem.audio.paused) {
      findedItem.audio.play();
    } else {
      findedItem.audio.pause();
    }
    this.trackList = this.trackList.map((track) =>
      track.id === id ? findedItem : track
    );
  }

  handleVolume(id, value) {
    this.findTrackInList(id).audio.volume = value;
  }

  handlePlayAll() {
    this.loop = !this.loop;
    this.trackList.forEach((track) => {
      track.audio.pause();
      track.audio.loop = false;
      track.audio.currentTime = 0;
      if (this.loop) {
        track.audio.play();
        track.audio.loop = true;
      }
    });
  }

  handleSync(sync) {
    if (sync) {
      this.syncCopytrackList = [...this.trackList];
      this.trackList.sort((prev, next) => {
        return next.bpm - prev.bpm;
      });
    } else {
      this.trackList = this.syncCopytrackList;
    }
    this.handlePlayAll();
  }
}

export default new TracksState();
