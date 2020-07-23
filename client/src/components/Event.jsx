import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getEvent } from "../services/eventsAndTickets";
import { Carousel } from "react-responsive-carousel";
import QRCode from "qrcode.react";
// import purpletrex from "../assets/purple-t-rex.png";

const Event = () => {
  const [eventDetails, setEventDetails] = useState(null);

  let { id } = useParams();

  // const logoSettings = {
  //   src: purpletrex,
  //   height: 64,
  //   width: 64,
  // };

  useEffect(() => {
    const grabEventInfo = async () => {
      const resp = await getEvent(id);
      console.log(resp);
      setEventDetails(resp);
    };
    grabEventInfo();
  }, [id]);

  return (
    <div>
      {eventDetails ? (
        eventDetails.ticket_IDs.length > 0 ? (
          <Carousel showThumbs={false} infiniteLoop={false}>
            {eventDetails.ticket_IDs.map((ticket, val) => (
              <div key={val} className="ticket-tiles">
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
    </div>
  );
};

export default Event;
