import React from 'react';
import Nav from '../nav/Nav.js'
import running from './running.png'
import { MainDiv, TopHr, BottomHr } from './started_css.js'
import { Link } from "react-router-dom";
import { CreateLink, ContainLink } from '../events2/eventlist_css.js';
import DrawerBar from "../drawer/Drawer";

class GetStarted extends React.Component {
  constructor(){
    super();
    this.state = {};
  }

  componentDidMount(){

  }

  render() {
    return (
      <div>
        <DrawerBar />
        <TopHr />
        <MainDiv>
          <div>
            <div>
              <h2>Welcome to<br/>Lets Get Tacos</h2>
              <h3>A free taco event site</h3>
            </div>
            <p>
              Make events, make friends, share memories, and most importantly share Tacos.
              Feel to view all the users to see what is going on. Check the up coming calendar to see what events popular.
              Create your own event too. Don't forget to share on social media! Lets eat!
            </p>
            <ContainLink>
              <Link to="events_create"><CreateLink>Create Event</CreateLink></Link>
            </ContainLink>
          </div>
          <div>
            <img src={running}/>
          </div>
        </MainDiv>
        <BottomHr/>
      </div>
    )
  }
}

export default GetStarted;