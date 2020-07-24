import React, { Component } from 'react'
import { allEvents, generateTicket } from '../services/eventsAndTickets'
import './Events.css'
import { Link } from "react-router-dom";
import back from "../assets/back.png";
import Footer from "./shared/Footer";

export default class TicketGeneration extends Component {
  constructor(props) {
    super(props)

    this.state = {
      events: [],
      nameOnTicket: '',
      info: ''
    }
  }

  async componentDidMount() {
    const response = await allEvents()

    console.log(response)
    console.log(this.props.user)

    let nameOnTicket = ''

    try {
      nameOnTicket = this.props.user.user_real_name
    } catch (error) {
      console.log(error)
    }

    this.setState({
      events: response,
      nameOnTicket
    })
  }

  handleChange = (e, stateName) => {
    this.setState({
      [stateName]: e.target.value 
    })
  }

  handleClickTicket = async (eventID) => {
    try {
      console.log('--Starting Ticket Generation--')

      const response = await generateTicket(eventID, this.state.nameOnTicket)

      console.log(response)

      this.setState({
        info: `Ticket bought with ticket id: ${response._id}. Please hit the arrow button on top to see all events you have tickets for! `
      })
    } catch (error) {
      console.log(error)
      this.setState({
        info: error.message 
      })
    }

  }

  updateInfo = (str) => {
    const timeNow = new Date()

    this.setState({
      info: `${str} at ${timeNow.toLocaleString()}`
    })
  }

  // have an input on top of the page for the name of the person you want to have on the ticket 
  // render a button for each event that runs the api call to generate a ticket for that event
  render() {
    if (this.state.events.length === 0) {
      return (
        <h1>Loading...</h1>
      )
    } else {
      return (
        <div className="events-page">
        
          <div className="back-holder">
            <Link className="back-button" to="/events">
              <img src={back} alt="back" />
            </Link>
          </div>
          
          <h3 style={{marginTop: "44px"}}>Get Tickets!</h3>

          <label htmlFor="nameOnTicket"><h3 className="events-text">Name To Put On Ticket</h3></label>
          <input name="nameOnTicket" value={this.state.nameOnTicket} onChange={(e) => this.handleChange(e, 'nameOnTicket')} style={{display: "block", margin: "0 auto 10px auto"}} />

          {this.state.info ? <h1 style={{color: "red", textShadow: "0 0 5px white", fontSize: "16px", margin: "15px"}}>{this.state.info}</h1> : null}

          <div className="events-holder">
            {
              this.state.events.map((event, ind) => {
                return (
                  <div className="events-tiles" style={{ width: "80%" }} key={ind}
                  onClick={() => this.handleClickTicket(event._id)}
                  >
                    <div className="events-info">
                      <p className="events-text">Buy a ticket for: {event.event_name}</p>
                    </div>
                  </div>
                )
              })
            }
          </div>

          <Footer page="wallet" />
        </div>
      )
    }
  }
}
