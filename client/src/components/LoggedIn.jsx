import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { userEvents } from "../services/eventsAndTickets";
import "./LoggedIn.css";

const LoggedIn = ({ user }) => {
  const [events, setEvents] = useState(null);

  useEffect(() => {
    const grabEvents = async () => {
      const resp = await userEvents();
      setEvents(resp);
    };
    grabEvents();
  }, []);

  return (
    <div className="logged-in">
      <div className="welcome">
        <h2>{`Hi, ${user.user_real_name}!`}</h2>
      </div>
      <div className="upcoming-events-holder">
        <h4 className="upcoming-events-header">Upcoming Events</h4>
        {events
          ? events.map((event, val) => {
              const eventInfo = event.event_data;
              const eventTime = eventInfo.event_startTime.split(", ");

              return (
                <Link key={val} to={`/event/${event.event_data._id}`}>
                  <div className="upcoming-events-tiles">
                    <div className="upcoming-events-info">
                      <h4 className="upcoming-events-name">
                        {eventInfo.event_name}
                      </h4>
                      <p className="upcoming-events-text">
                        {eventInfo.event_location}
                      </p>
                    </div>
                    <div className="upcoming-events-time">
                      <p className="upcoming-events-text">{`${eventTime[0]}, ${eventTime[1]}`}</p>
                      <p className="upcoming-events-text">{eventTime[2]}</p>
                    </div>
                  </div>
                </Link>
              );
            })
          : "Loading"}
      </div>
    </div>
  );
};

export default LoggedIn;
