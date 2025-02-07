import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./database";
import Property from "../models/Property";
import fs from "fs";
import path from "path";
import User from "../models/User";
import { IProperty } from "@/types/property.types";

// Load environment variables
dotenv.config();

const usersData = [
  { email: "alice@example.com", username: "Alice", image: "" },
  { email: "bob@example.com", username: "Bob", image: "" },
  { email: "charlie@example.com", username: "Charlie", image: "" },
  { email: "dave@example.com", username: "Dave", image: "" },
];

const seedDatabase = async () => {
  await connectDB(); // Ensure MongoDB is connected

  const filePath = path.join(__dirname, "seed_properties.json");

  try {
    await User.deleteMany();
    await Property.deleteMany();
    const users = await User.insertMany(usersData);
    console.log("Users seeded successfully!");

    const filePath = path.join(__dirname, "seed_properties.json");
    const rawData = fs.readFileSync(filePath, "utf-8");

    const properties = JSON.parse(rawData);

    properties.forEach((property: IProperty, index: number) => {
      property._id = new mongoose.Types.ObjectId();
      property.owner = users[index % users.length]._id;
      property.images = [];
    });

    await Property.insertMany(properties);
    console.log("Properties seeded successfully!");

    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding database:", error);
    mongoose.connection.close();
  }
};

seedDatabase();
