import React, { Component } from 'react'
import { Container/*, Search */} from 'semantic-ui-react'
// import { find } from './youtube'

const itemToResult = (item) => ({
  title: item.snippet.title,
  description: item.snippet.title
})

class Creator extends Component {
  constructor(props) {
    super(props)

    this.state = {
      results: [],
      video: '',
      audio: [],
      audioElem: [0]
    }

    this.clearResults = this.clearResults.bind(this)
    this.onPageLoad = this.onPageLoad.bind(this)
    this.handleVideoChange = this.handleVideoChange.bind(this);
    this.handleAudioChange = this.handleAudioChange.bind(this);
    this.makeCake = this.makeCake.bind(this);
    this.getID = this.getID.bind(this);
  }

  clearResults() {
    this.setState({ results: [] })
  }

  onPageLoad(items) {
    this.setState({ results: this.state.results.concat(items.map(itemToResult)) })
  }

  getID(url) {
    var key = 'watch?v=';

    var start = url.indexOf(key) + key.length;

    if(start - key.length === -1) {
      return "";
    }

    var end = url.indexOf('&');
    end = end === -1 ? url.length : end;

    var id = url.substring(start, end);

    return id;
  }

  handleVideoChange(event) {
    this.setState({video: this.getID(event.target.value)});
  }

  handleAudioChange(event) {
    this.state.audio[event.target.className] = this.getID(event.target.value);
    if (this.state.audioElem.length - 1 === parseInt(event.target.className, 10) && this.state.audio[event.target.className].length > 0) {
      this.state.audioElem.push(parseInt(event.target.className, 10) + 1);
    }

    if (this.state.audioElem.length - 2 === parseInt(event.target.className, 10) && event.target.value.length === 0) {
      this.state.audioElem.pop();
    }

    this.forceUpdate();
  }

  makeCake() {
    // get v dynamicly like eventually
    var url = 'http://localhost:3000';

    if (this.state.video.length > 0 && this.state.audio.length > 0) {
      // final result after eventual checks for good data
      window.location.replace(url + '/view/' + this.state.video + '/' + this.state.audio.join(','));
    }
  }

  render() {
    return (
      <Container text>
        <h2>Layer Cake</h2>
        <div id="container">
          <div className="visual input">
            Visual Element <input type="text" placeholder="YouTube video URL" value={this.video} onChange={this.handleVideoChange}/><br/>
          </div>
          <div className="audio input" id="audioInput">
            Audio Element
            {this.state.audioElem.map(elemNum => {
              return <div><input type="text" placeholder="YouTube video URL" className={elemNum} value={this.audio} onChange={this.handleAudioChange}/><br/></div>
            })}
          </div>
          <button id="make" onClick={this.makeCake}>Make a Cake</button>
        </div>      
      </Container>
    )
  }
}

export default Creator
