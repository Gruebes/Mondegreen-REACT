

import { Button, Jumbotron, Navbar, NavbarBrand } from 'reactstrap';
import React from 'react';
import { Link } from 'react-router-dom';
import Video from './VideoComponent';

export default function ProfilePage(props) {
  const { match } = props;

  return (
    
    <section className="page-content">
  
      <div className="container">
        <div className="row">
        <Jumbotron>
        <h1 className="display-3">Mondegreen</h1>
        <p> /ˈmɒndɪɡriːn/ - a misunderstood or misinterpreted word or phrase resulting from a mishearing of the lyrics of a song</p>
        <hr />
        <Button id="start" color="info" size="lg" tag={Link} to={`/game_console/${match.params.id}`}>Start Playing!</Button>
      </Jumbotron>
        
          
          <Video />
        </div>
      </div>
    </section>
  );
}








