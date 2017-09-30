import React, { Component } from 'react';
import { Card, Button, CardTitle, CardText, Input, FormGroup, Form, Label, Collapse } from 'reactstrap';
import '../../css/react.scss';
import AudioPlayer from '../audioplayer/audioplayer';
import $ from 'jquery';

export default class Console extends Component {
  constructor(props) {
    super(props);

    this.state = {
      correct: 0,
      total: 20,
      collapse: false,
    };
    console.log(props.question);

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.checkInput = this.checkInput.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  checkInput() {
    const { userInput } = this.props;
    const songTitle = this.props.question.song_title;
    console.log(songTitle);


    if (userInput.toLowerCase().indexOf(songTitle.toLowerCase()) > -1) {
      console.log(true);
      this.state.correct = this.state.correct + 1;
      $('#comment').text('Correct!');
      this.props.next();
    }
    else {
      $('#comment').text('Wrong! Try Again!');
    }

    console.log(`%c User input string = ${userInput} `, 'color: white; background: blue;');
    console.log(`%c Song Title = ${songTitle} `, 'color: white; background: green;');

    console.log(`Number of Correct answers = ${this.state.correct} `);
    console.log(`Total number of questions = ${this.state.total} `);
  }

  handleChange(event) {
    this.props.updateInput(event.target.value);
  }

  // catch enter clicks
  handleKeyPress(event) {
    // event.preventDefault();
    if (event.which === 13) {
      event.preventDefault();
      this.checkInput();
    }
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  render() {
    const { question } = this.props;
    console.log('inConsole:', this.props);

    return (
      <div className="container">
        <Card block inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
          <h3>Identfy the song this misheard lyric belongs to</h3>
          <br />
          <CardTitle>Misheard Lyric: {question.misheard_lyric}</CardTitle>
          <CardText>Artist: {question.artist}
          </CardText>
          <br />
          <Form>
            <FormGroup>
              <Label for="userInput">Input Answer Below</Label>
              <Input type="text" autoComplete="off" name="userInput" id="userInput" onKeyPress={this.handleKeyPress} value={this.props.userInput} onChange={this.handleChange} />
            </FormGroup>
            <Button onClick={this.checkInput}>Submit</Button>
            <Button id="hintBtn" onClick={this.toggle} style={{ marginLeft: '1rem' }}>Hint</Button>
            <Collapse isOpen={this.state.collapse}>
              <Card block inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
                <AudioPlayer
                  audio_track={question.audio_track}
                  start_time={question.start_time}
                  duration={question.duration}
                />
              </Card>
            </Collapse>
            <div id="comment" />
            <div id="score">Score: {this.state.correct}/{this.state.total}</div>
          </Form>
        </Card>
      </div>
    );
  }
}
