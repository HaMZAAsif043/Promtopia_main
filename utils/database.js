import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("mongoDB already connected");
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "Promptopia",
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
      socketTimeoutMS: 45000,
    });
    mongoose.set("debug", true);
    mongoose.connection.on("error", (error) => {
      console.error("Error connecting to database", error);
    });
    isConnected = db.connections[0].readyState;
    console.log("Connected to Database");
  } catch (error) {
    console.error("Error connecting to database", error);
  }
};
