import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getEvent } from "../services/eventsAndTickets";
import { Carousel } from "react-responsive-carousel";
import QRCode from "qrcode.react";
import "./Event.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";
import back from "../assets/back.png";

const Event = () => {
  const [eventDetails, setEventDetails] = useState(null);

  let { id } = useParams();

  useEffect(() => {
    const grabEventInfo = async () => {
      const resp = await getEvent(id);
      console.log(resp);
      setEventDetails(resp);
    };
    grabEventInfo();
  }, [id]);

  return (
    <div className="event-page">
      <div className="back-holder">
        <Link className="back-button" to="/events">
          <img src={back} alt="back" />
        </Link>
      </div>
      {eventDetails ? (
        eventDetails.ticket_IDs.length > 0 ? (
          <Carousel showThumbs={false} infiniteLoop={false}>
            {eventDetails.ticket_IDs.map((ticket, val) => (
              <div key={val} className="ticket-tile">
                {ticket.ticket_ID.ticket_details.length > 0 ? (
                  <div className="ticket-details">
                    {ticket.ticket_ID.ticket_details.map((detail, val) => (
                      <p className="ticket-detail" key={val}>
                        {detail}
                      </p>
                    ))}
                  </div>
                ) : (
                  ""
                )}
                <QRCode
                  value={ticket.ticket_ID.qr_code_encrypted}
                  size={256}
                  level="M"
                  includeMargin={true}
                  // imageSettings={logoSettings}
                />
                <p>{ticket.ticket_ID.name_on_ticket}</p>
              </div>
            ))}
          </Carousel>
        ) : (
          ""
        )
      ) : (
        ""
      )}
      {eventDetails ? (
        <div className="event-details">
          <h3>{eventDetails.event_name}</h3>
          <p>{eventDetails.event_startTime}</p>
          <h4>Location</h4>
          <p>{eventDetails.event_location}</p>
          <h4>Event Description</h4>
          <p>{eventDetails.event_description}</p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Event;
