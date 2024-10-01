// Database.js
import mongoose from "mongoose";
import logger from "../logger.js";

class Database {
  constructor({ uri, debug = false }) {
    this.uri = uri;
    this.debug = debug;
    this.validateUri(uri); // Validate the URI on instantiation
  }

  validateUri(uri) {
    if (typeof uri !== "string" || uri.trim() === "") {
      logger.error("Invalid MongoDB URI: Must be a non-empty string.");
      throw new Error("Invalid MongoDB URI: Must be a non-empty string.");
    }
  }

  async connect() {
    try {

      await mongoose.connect(this.uri, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
      });

      if (this.debug) {
        mongoose.set("debug", true);
      }

      logger.info("MongoDB connected successfully");
    } catch (err) {
      logger.error("Error connecting to MongoDB:", err);
      process.exit(1); // Exit the process if the connection fails
    }
  }

  async disconnect() {
    try {
      await mongoose.disconnect();
      logger.info("MongoDB disconnected successfully");
    } catch (err) {
      logger.error("Error disconnecting from MongoDB:", err);
    }
  }
}

export default Database;
