import httpServices from "./httpServices";
import { jwtDecode } from "jwt-decode";

const TOKEN_KEY = "token";

function createUser(user) {
  return httpServices.post("/users", user);
}

async function signIn(credential) {
  try {
    const response = await httpServices.post("/users/sign-in", credential);
    setToken(response.data);
    return response;
  } catch (error) {
    throw error;
  }
}

function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
  refreshToken();
}

function refreshToken() {
  httpServices.setDefaultHeader("x-auth-token", getJWT());
}

function getJWT() {
  return localStorage.getItem(TOKEN_KEY);
}

function logout() {
  localStorage.removeItem(TOKEN_KEY);
}

function getUserFromToken() {
  const token = getJWT();
  if (!token) {
    return null;
  }
  return jwtDecode(token);
}

async function getAllUsers() {
  const response = await httpServices.get("/users");
  return response.data;
}

async function getUserById(id) {
  const response = await httpServices.get(`/users/${id}`);
  console.log("response:", response);
  return response.data;
}

async function updateUser(id, user) {
  const response = await httpServices.put(`/users/${id}`, user);
  return response.data;
}

async function deleteUser(id) {
  const response = await httpServices.delete(`/users/${id}`);
  return response.data;
}

const userServices = {
  deleteUser,
  updateUser,
  getAllUsers,
  getUserById,
  getUserFromToken,
  logout,
  signIn,
  createUser,
  refreshToken,
};

export default userServices;
