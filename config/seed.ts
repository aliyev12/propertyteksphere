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

const seedDatabase = async () => {
  await connectDB(); // Ensure MongoDB is connected

  const adminEmail = "dev7c4@gmail.com";

  try {
    const foundUser = await User.findOne({ email: adminEmail });

    if (foundUser) {
      const adminUserId = foundUser._id;

      await Property.deleteMany();

      const filePath = path.join(__dirname, "seed_properties.json");
      const rawData = fs.readFileSync(filePath, "utf-8");

      const properties = JSON.parse(rawData);

      properties.forEach((property: IProperty, index: number) => {
        property._id = new mongoose.Types.ObjectId().toString();
        property.owner = new mongoose.Types.ObjectId(adminUserId);
      });

      await Property.insertMany(properties);
      console.log("Properties seeded successfully!");
    } else {
      console.log(
        `Failed to see the properties. User with email ${adminEmail} was not found.`
      );
    }

    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding database:", error);
    mongoose.connection.close();
  }
};

seedDatabase();
