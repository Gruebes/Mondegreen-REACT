import React, { Component } from 'react';
import { Card, CardHeader, CardBlock, Button, CardText, InputGroup, Input } from 'reactstrap';
import '../../css/react.scss';

export default class Console extends Component {
  render() {
    // const { question } = this.props;
    // placeholder
    const question = { misheard_lyric: 'Fill in the lyrics here' };

    console.log(this.props);

    return (
      <div className="container">
        <h1 className="title">Mondegreen</h1>
        <p className="subtitle">Guess the name of this song with this misheard lyrics.</p>
        <Card>
          <CardHeader>The Misheard Lyric:</CardHeader>
          <CardBlock>
            <CardText>{question.misheard_lyric}</CardText>
          </CardBlock>
        </Card>
        <InputGroup>
          <Input placeholder="Write Your Guess Here" />
        </InputGroup>
        <Button className="btn btn-success" onClick={this.props.next} >Go Back</Button>
        <Button className="btn btn-success" onClick={this.props.next} >Proceed</Button>
      </div>
    );
  }
}
