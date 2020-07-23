import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getEvent } from "../services/eventsAndTickets";
import QRCode from "qrcode.react";
import purpletrex from "../assets/purple-t-rex.png";

const Event = ({ user }) => {
  const [eventDetails, setEventDetails] = useState(null);

  let { id } = useParams();

  const logoSettings = {
    src: purpletrex,
    height: 64,
    width: 64,
  };

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
      {eventDetails
        ? eventDetails.ticket_IDs.map((ticket, val) => (
            <div key={val} className="ticket-tiles">
              <QRCode
                value={ticket.ticket_ID.qr_code_encrypted}
                size={256}
                level="H"
                includeMargin={true}
                imageSettings={logoSettings}
              />
            </div>
          ))
        : ""}
    </div>
  );
};

export default Event;
