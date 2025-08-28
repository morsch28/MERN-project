# MERN-project

A full-stack web application built with the **MERN stack**.

---

## 📌 Overview

This project demonstrates how to build a web application using:

- **MongoDB** – NoSQL database  
- **Express.js** – Backend framework for Node.js  
- **React** – Frontend library for building UIs  
- **Node.js** – JavaScript runtime for the backend  

The goal is to provide a clean and modular starting point for MERN development.

---

## ✨ Features

- Organized **client** and **server** structure  
- Basic **CRUD operations**  
- Environment variable configuration with `.env`  
- Easily extendable architecture  

---

## ⚙️ Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18+ recommended)  
- npm or Yarn  
- [MongoDB](https://www.mongodb.com/) (local or Atlas)

---

## 🚀 Setup & Usage

Clone the repository and install dependencies:

```bash
# Clone the repo
git clone https://github.com/morsch28/MERN-project.git
cd MERN-project

Backend (Server)
cd server
npm install
cp .env.example .env   # Add your MongoDB URI & PORT
npm run dev            # Start backend server

Frontend (Client)
cd ../client
npm install
npm start              # Launch React frontend

🔑 Environment Variables

Create a .env file inside the server directory with:

MONGO_URI=your-mongodb-connection-string
PORT=


📂 Project Structure
MERN-project/
├── client/         # React front-end
├── server/         # Express + Node.js backend
├── .gitignore
└── README.md


📜 Scripts
Directory	Command	Description
root	npm run dev	Run both client & server concurrently
server	npm run dev	Start the backend server (nodemon)
client	npm start	Run the React frontend


🤝 Contributing

Contributions are welcome!

Fork this repo

Create a branch (feature/my-feature)

Commit your changes

Push and open a Pull Request

📄 License

This project is licensed under the MIT License.
(Feel free to change if needed.)

