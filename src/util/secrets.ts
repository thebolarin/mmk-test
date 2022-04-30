import dotenv from "dotenv";
import fs from "fs";

if (fs.existsSync(".env")) {
    console.log("Using .env file to supply config environment variables");
    dotenv.config({ path: ".env" });
} else {
    console.log("Using .env.example file to supply config environment variables");
    dotenv.config({ path: ".env.example" });  // you can delete this after you create your own .env file!
}
export const ENVIRONMENT = process.env.NODE_ENV;
const prod = ENVIRONMENT === "production"; // Anything else is treated as 'dev'

export const NODE_ENV = process.env["NODE_ENV"] || "development";
export const DATABASE_HOST = process.env["DATABASE_HOST"];
export const DATABASE_USERNAME = process.env["DATABASE_USERNAME"];
export const DATABASE_PASSWORD = process.env["DATABASE_PASSWORD"];
export const DATABASE_NAME = process.env["DATABASE_NAME"];
export const DATABASE_PORT = process.env["DATABASE_PORT"] || "5432";