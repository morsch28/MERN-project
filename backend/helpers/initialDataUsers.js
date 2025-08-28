// initialDataUsers.js
import bcrypt from "bcrypt";
import { User } from "../model/user.js";

const users = [
  {
    name: { first: "Mor", last: "User" },
    email: "mor.user@example.com",
    password: "UserPass123!",
    image: {
      url: "https://i.pravatar.cc/150?img=12",
      alt: "regular user",
    },
    isAdmin: false,
  },
  {
    name: { first: "Admin", last: "User" },
    email: "admin@example.com",
    password: "AdminPass123!",
    image: {
      url: "https://i.pravatar.cc/150?img=15",
      alt: "admin user",
    },
    isAdmin: true,
  },
];

async function initialUsers() {
  for (const u of users) {
    const exist = await User.exists({ email: u.email });
    if (!exist) {
      const hashed = await bcrypt.hash(u.password, 10);
      await new User({ ...u, password: hashed }).save();
    }
  }
}

export default initialUsers;
