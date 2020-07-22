import React from 'react'

export default function TicketInfo(props) {
  const { ticket } = props
  if (!ticket) {
    return null
  }
  else {
    const event = ticket.event_ID 
    const name = ticket.name_on_ticket 
    const checkedIn = ticket.ticket_scanned 
    return (
      <div>
        <h1>Ticket for {name}</h1>
        <h1 style={{color: checkedIn ? "red" : "green"}}> {checkedIn ? "Already Checked In!" : "Just Checked In!"} </h1>
        <h2>Event: {event.event_name}</h2>
        <h3>Location: {event.event_location}</h3>
        <h3>Starting At: {event.event_startTime}</h3>
        <p style={{ border: '1px solid black', padding: '10px' }}>
          <strong> Description:  </strong>
          <br />
          {event.event_description}
        </p>
        <div>
          <p><strong>{ticket.ticket_details.length > 0 ? "Ticket Details" : null}</strong></p>
          {ticket.ticket_details.map((detail, ind) => {
            return <p key={ind}>{detail}</p>
          })}
        </div>
      </div>
    )
  }
}
