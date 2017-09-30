import React from 'react';
import $ from 'jquery';

class AudioPlayer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      player: false,
    };
    console.log(this.props);
  }

  componentDidMount() {
    const $player = $('.player');

    // Event listeners
    $player.on('play', (e) => {
      e.preventDefault();
      this.playLocation();
    });
  }

  playLocation() {
    this.setState({ player: $('.player')[0] }, () => {
      const playbackTime = localStorage.getItem('ReactPlayer');

      if (playbackTime !== null) {
        this.state.player.currentTime = this.props.start_time;
      }

      const playPromise = this.state.player.play();
      const timeout = this.props.duration * 1000;

      if (playPromise !== undefined) {
        playPromise.then(() => {
          // Automatic playback started!
          // Show playing UI.
          // We can now safely pause video...
          setTimeout(() => {
            this.state.player.pause();
          }, timeout);
        })
        .catch((error) => {
          // Auto-play was prevented
          // Show paused UI.
        });
      }
    });
  }

  render() {
    return (
      <div className="audio-player">
        <audio controls className="player" preload="auto">
          <source src={this.props.audio_track} type="audio/mp3" />
          <track kind="captions" />
        </audio>
      </div>
    );
  }
}

export default AudioPlayer;
