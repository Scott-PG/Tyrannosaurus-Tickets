import React, { useState, useEffect } from "react";
import { userEvents } from "../services/eventsAndTickets";
import { Link } from "react-router-dom";
import "./Events.css";
import back from "../assets/back.png";
import Footer from "./shared/Footer";

const Events = ({ user }) => {
  const [events, setEvents] = useState(null);

  useEffect(() => {
    const grabEvents = async () => {
      const resp = await userEvents();
      setEvents(resp);
    };
    grabEvents();
  }, []);

  return (
    <div className="events-page">
      <div className="back-holder">
        <Link className="back-button" to="/">
          <img src={back} alt="back" />
        </Link>
      </div>
      <div className="events-holder">
        <h4 className="events-header">My Wallet</h4>
        {events
          ? events.map((event, val) => {
              const eventInfo = event.event_data;
              const eventTime = eventInfo.event_startTime.split(", ");

              return (
                <Link key={val} to={`/event/${event.event_data._id}`}>
                  <div className="events-tiles">
                    <div className="events-info">
                      <h4 className="events-name">{eventInfo.event_name}</h4>
                      <p className="events-text">{eventInfo.event_location}</p>
                      <p className="events-text">{`${event.user_ticket_count} ${
                        event.user_ticket_count === 1 ? "Ticket" : "Tickets"
                      }`}</p>
                    </div>
                    <div className="events-time">
                      <p className="events-text">{`${eventTime[0]}, ${eventTime[1]}`}</p>
                      <p className="events-text">{eventTime[2]}</p>
                    </div>
                  </div>
                </Link>
              );
            })
          : "Loading"}
      </div>
      <Footer page="wallet" />
    </div>
  );
};

export default Events;
