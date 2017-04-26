import React, { Component } from 'react'
import ReactPlayer from 'react-player'

const youtubeUrl = (videoId) => `https://www.youtube.com/watch?v=${videoId}`

class Cake extends Component {

  constructor(props) {
    super(props)
    this.state = {
      playing: false,
      width: window.innerWidth,
      height: window.innerHeight
    }
    this.play = this.play.bind(this)
    this.pause = this.pause.bind(this)
  }

  play() {
    this.setState({ playing: true })
  }

  pause() {
    this.setState({ playing: false })
  }

  updateDimensions() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    })
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  render() {
    const { visual, audio } = this.props
    return (
      <div>
        <ReactPlayer
          controls
          volume={0.00}
          width={this.state.width}
          height={this.state.height}
          url={youtubeUrl(visual)}
          playing={this.state.playing}
          onPlay={this.play}
          onPause={this.pause}
          onEnded={this.pause}
        />
        {audio.map((a, index) => (
          <ReactPlayer
            hidden
            volume={((audio.length - index) / audio.length)}
            url={youtubeUrl(a)}
            playing={this.state.playing}
            onPlay={this.play}
            onPause={this.pause}
          />
        ))}
      </div>
    )
  }
}

export default Cake
