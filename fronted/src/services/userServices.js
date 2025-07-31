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
  try {
    const token = getJWT();
    return jwtDecode(token);
  } catch (error) {
    console.log(error);
  }
}

async function getAllUsers() {
  try {
    const response = await httpServices.get("/users");
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

async function getUserById(id) {
  try {
    const response = await httpServices.get(`/users/${id}`);
    console.log("response:", response);

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

async function updateUser(id, user) {
  try {
    const response = await httpServices.put(`/users/${id}`, user);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

async function deleteUser(id) {
  try {
    const response = await httpServices.delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
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
