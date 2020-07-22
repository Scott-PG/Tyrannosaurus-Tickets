import api from "./apiConfig";

export const signUp = async (credentials) => {
  try {
    const resp = await api.post("/signup", credentials);
    localStorage.setItem("token", resp.data.token);
    return resp.data;
  } catch (error) {
    throw error;
  }
};

export const signIn = async (credentials) => {
  try {
    const resp = await api.post("/signin", credentials);
    localStorage.setItem("token", resp.data.token);
    return resp.data;
  } catch (error) {
    throw error;
  }
};

export const signOut = async (user) => {
  try {
    await localStorage.clear();
    return true;
  } catch (error) {
    throw error;
  }
};

export const verifyUser = async () => {
  const token = localStorage.getItem("token");
  if (token) {
    const res = await api.get("/verifyuser");
    return res.data;
  }
  return false;
};
