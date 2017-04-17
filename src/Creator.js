import React, { Component } from 'react'
import { Container, Search } from 'semantic-ui-react'
import { find } from './youtube'

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
      audio: ''
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

  handleVideoChange(event) {
    this.setState({video: event.target.value});
  }

  handleAudioChange(event) {
    this.setState({audio: event.target.value});
  }

  render() {
    return (
      <Container text>
        <h2>Layer Cake</h2>
        <div id="container">
          <div className="visual input">
            Visual Element <input type="text" placeholder="YouTube video URL" value={this.video} onChange={this.handleVideoChange}/><br/>
          </div>
          <div className="audio input">
            Audio Element <input type="text" placeholder="YouTube video URL" value={this.audio} onChange={this.handleAudioChange}/><br/>
          </div>
          <button id="make" onClick={this.makeCake}>Make a Cake</button>
        </div>      
      </Container>
    )
  }

  makeCake() {
    // get v dynamicly like eventually
    var url = 'http://localhost:3000/';

    if (this.state.video.length > 0 && this.state.audio.length > 0) {
      var vidID = this.getID(this.state.video);
      var audID = this.getID(this.state.audio);

      // final result after eventual checks for good data
      window.location.replace('http://localhost:3000/view/' + vidID + '/' + audID);
    }
  }

  getID(url) {
    var key = 'watch?v=';

    // currently no lists for audio
    var start = url.indexOf(key) + key.length;
    var end = url.indexOf('&');
    end = end === -1 ? url.length : end;

    var id = url.substring(start, end);

    return id;
  }
}

// Somewhat functional search code
// <Search results={this.state.results} onSearchChange={(event, value) => {
//     this.clearResults()
//     find(value, 10, this.onPageLoad)
//   }}/>

export default Creator
