import React from "react";
import Slide from "react-reveal/Slide";
import VolumeControls from "./volume_controls";

class PlayControls extends React.Component {
  constructor(props) {
    super(props);
    this.initProgress = this.initProgress.bind(this);
    this.seek = this.seek.bind(this);
    this.initialized = false;
    this.seekId = null;
    this.state = {
      // allows cycling through the different repeat icon css classes
      repeating: [
        "player-repeat-off",
        "player-repeat-one",
        "player-repeat-all",
      ],
      shuffle: false,
    };
  }

  componentDidUpdate() {
    this.playPauseButton = document.getElementById("play-pause");
    if (this.audio === undefined) {
      return;
    }
    if (this.props.currentlyPlaying.playing) {
      this.audio.play();
      this.playPauseButton.classList.remove("player-play");
      this.playPauseButton.classList.add("player-pause");
    } else {
      this.audio.pause();
      this.playPauseButton.classList.remove("player-pause");
      this.playPauseButton.classList.add("player-play");
    }
    let seek = this.props.currentlyPlaying.seek;
    if (seek && seek.origin === "waveform" && this.seekId !== seek.id) {
      // seek id prevents old seek data from triggering again
      this.seekId = seek.id;
      this.audio.currentTime = seek.position * this.audio.duration;
    }
  }

  initProgress() {
    if (!this.initialized) {
      // save pointers to elements that need updating
      this.initialized = true;
      this.audio = document.getElementById("audio-element");
      this.progress = document.getElementById("progress-bar");
      this.progress.addEventListener("click", this.seek);
      this.playerTimeElement = document.getElementById("current-time");
      this.songDurationElement = document.getElementById("song-duration");
    }
    this.songDurationElement.innerHTML = this.convertTime(this.audio.duration);
    let currentTime = this.audio.currentTime;
    let duration = this.audio.duration;
    let nextValue = currentTime / duration;
    this.playerTimeElement.innerHTML = this.convertTime(currentTime);
    if (nextValue === 1) {
      if (this.state.repeating[0] === "player-repeat-one"){
        this.playFromStart();
      } else {
        this.playNext();
      }
    }
    if (!!nextValue) {
      // fixes bug where switching songs causes audio duration to briefly be 0
      this.progress.value = nextValue;
    }
  }

  convertTime(seconds) {
    let currentSecond = Math.floor(seconds % 60);
    let currentMinute = Math.floor(seconds / 60);
    if (Number.isNaN(currentMinute) || Number.isNaN(currentSecond)) {
      return "--:--";
    }
    currentSecond = currentSecond < 10 ? "0" + currentSecond : currentSecond;
    currentMinute = currentMinute < 10 ? "0" + currentMinute : currentMinute;
    return `${currentMinute}:${currentSecond}`;
  }

  seek(e) {
    let percent = e.offsetX / this.progress.offsetWidth;
    this.audio.currentTime = percent * this.audio.duration;
    this.props.seek("playControls", percent);
  }

  playNext() {
    // update queue and play next song
    if (this.props.queue.length > 1) {
      this.props.playNext();
      this.props.selectSong(this.props.queue[this.props.queue.length - 1]);
      this.initialized = false;
    }
  }

  playFromStart(){
    this.audio.currentTime = 0;
    this.props.seek("playControls", 0);
    this.progress.value = 0;
  }
  
  playPrevious() {
    // if song has played for more than 2 seconds, play from beginning
    if (this.audio.currentTime > 2) {
      this.playFromStart();

      // if at least one song has been played before, update queue and play it
    } else if (this.props.played) {
      this.props.playPrevious();
      this.props.selectSong(this.props.queue[this.props.queue.length - 1]);
    }
  }

  toggleRepeat() {
    this.setState({
      repeating: [].concat(
        this.state.repeating.slice(1),
        this.state.repeating[0]
      ),
    });
  }

  toggleShuffle(){
    this.setState({
      shuffle: !this.state.shuffle
    })
    this.props.toggleShuffle();
  }

  render() {
    if (this.props.currentlyPlaying === null) {
      return null;
    } else {
      return (
        <Slide bottom>
          <span id="play-controls">
            <audio
              id="audio-element"
              onTimeUpdate={this.initProgress}
              autoPlay
              src={this.props.currentlyPlaying.fileUrl}
            ></audio>
            <div id="player">
              <div
                className="player-previous player-button"
                onClick={() => this.playPrevious()}
              ></div>
              <div
                id="play-pause"
                className="player-pause player-button"
                onClick={() => this.props.playPauseSong()}
              ></div>
              <div
                className="player-next player-button"
                onClick={() => this.playNext()}
              ></div>
              <div
                className={`${
                  this.state.shuffle ? "player-shuffle-on" : "player-shuffle-off"
                } player-button`}
                onClick={() => this.toggleShuffle()}
              ></div>
              <div
                className={`${this.state.repeating[0]} player-button`}
                onClick={() => this.toggleRepeat()}
              ></div>
              <div id="timeline">
                <div id="current-time">--:--</div>
                <progress value="0" max="1" id="progress-bar"></progress>
                <div id="song-duration">--:--</div>
              </div>
              <VolumeControls />
            </div>
            <div className="currently-playing-song-data">
              <div>
                <img
                  src={this.props.currentlyPlaying.photoUrl}
                  alt={this.props.currentlyPlaying.title}
                />
              </div>
              <div>
                <p className="uploader">{this.props.currentlyPlaying.artist}</p>
                <p className="song-title">
                  {this.props.currentlyPlaying.title}
                </p>
              </div>
            </div>
          </span>
        </Slide>
      );
    }
  }
}

export default PlayControls;
