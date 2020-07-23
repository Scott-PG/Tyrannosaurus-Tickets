import React, { Component } from 'react'
import { allEvents, generateTicket } from '../services/eventsAndTickets'

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

    this.setState({
      events: response,
      nameOnTicket: this.props.user.user_real_name 
    })
  }

  handleChange = (e, stateName) => {
    this.setState({
      [stateName]: e.target.value 
    })
  }

  handleClickTicket = async (eventID) => {
    try {
      const response = await generateTicket(eventID, this.state.nameOnTicket)

      console.log(response)

      this.setState({
        info: `Ticket bought with ticket id: ${response._id} `
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
        <div>
        
          <label htmlFor="nameOnTicket"><h3>Name To Put On Ticket</h3></label>
          <input name="nameOnTicket" value={this.state.nameOnTicket} onChange={this.handleChange} />

          {this.state.info ? <h1 style={{color: "red"}}>{this.state.info}</h1> : null}

          {
            this.state.events.map((event, ind) => {
              return (
                <div style={{ border: "1px solid black", margin: "30px", padding: "20px 0" }} key={ind}
                onClick={() => this.handleClickTicket(event._id)}
                >
                  <h1>Buy a ticket for: {event.event_name}</h1>
                </div>
              )
            })
          }

        </div>
      )
    }
  }
}
