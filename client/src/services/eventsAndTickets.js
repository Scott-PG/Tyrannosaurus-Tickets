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
