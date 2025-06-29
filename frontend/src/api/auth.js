import axios from "./axios";

export const login = (email, password) =>
  axios.post("/auth/login", { email, password });

export const register = (email, password) =>
  axios.post("/auth/register", { email, password });
