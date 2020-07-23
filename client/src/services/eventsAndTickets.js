import api from "./apiConfig";

// get all events (without ticket info)
export const allEvents = async () => {
  try {
    const resp = await api.get("/events");

    return resp.data;
  } catch (error) {
    throw error;
  }
};

// get user's events (with number of tickets, no events with zero number of tickets)
export const userEvents = async () => {
  try {
    const resp = await api.get("/userevents");

    return resp.data;
  } catch (error) {
    throw error;
  }
};

// get event of id, and if user verified, with this user's ticket(s) info
export const getEvent = async (eventID) => {
  try {
    const resp = await api.get(`/userevents/${eventID}`);

    return resp.data;
  } catch (error) {
    throw error;
  }
};

// using user id of current jwt, a specified event id, and desired nameOnTicket, generate a ticket and get the ticket's info back in response 
export const generateTicket = async (event_ID, name_on_ticket) => {
  try {
    const resp = await api.post("/generateticket", {
      event_ID,
      name_on_ticket
    });

    return resp.data;
  } catch (error) {
    throw error;
  }
};
