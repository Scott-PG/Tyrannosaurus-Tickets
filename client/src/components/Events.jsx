import React, { useState, useEffect } from "react";
import { userEvents } from "../services/eventsAndTickets";
import { Link } from "react-router-dom";

const Events = ({ user }) => {
  const [events, setEvents] = useState(null);

  useEffect(() => {
    const grabEvents = async () => {
      const resp = await userEvents();
      console.log(resp);
      setEvents(resp);
    };
    grabEvents();
  }, []);

  return (
    <div>
      {events
        ? events.map((event, val) => (
            <Link key={val} to={`/events/${event.event_data._id}`}>
              <div className="events-tiles">
                <h2>{event.event_data.event_name}</h2>
                <p>{event.event_data.event_startTime}</p>
              </div>
            </Link>
          ))
        : "Loading"}
    </div>
  );
};

export default Events;
