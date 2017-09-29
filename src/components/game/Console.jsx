import React, { Component } from 'react';
import { Card, Button, CardTitle, CardText, Input, FormGroup, Form, Label } from 'reactstrap';

export default class Console extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.checkInput = this.checkInput.bind(this);
  }

  checkInput() {
    const { userInput } = this.props;
    const { misheard_string } = this.props.question;


    if (userInput.indexOf(misheard_string) > -1) {
      console.log(true);
      this.props.next();
    }
    console.log(`User input string = ${userInput}`);
    console.log(`Misheard string = ${misheard_string}`);
  }

  handleChange(event) {
    this.props.updateInput(event.target.value);
  }


  render() {
    const { question } = this.props;
    console.log('inConsole:', this.props);

    return (
      <div className="container">
        <Card block inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
          <h3>Identfy the incorrect part of this lyric</h3>
          <br />
          <CardTitle>Misheard Lyric: {question.misheard_lyric}</CardTitle>
          <CardText>Artist: {question.artist}
          </CardText>
          <br />
          <Form>
            <FormGroup>
              <Label for="userInput">Input Answer Below</Label>
              <Input type="text" name="userInput" id="userInput" value={this.props.userInput} onChange={this.handleChange} />
            </FormGroup>
            <Button onClick={this.checkInput}>Submit</Button>
          </Form>
        </Card>
      </div>
    );
  }
}
