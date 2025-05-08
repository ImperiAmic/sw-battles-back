import createDebug from "debug";
import mongoose from "mongoose";

const debug = createDebug("battles:database:connect");

const connectToDatabase = async (connectionString: string): Promise<void> => {
  try {
    await mongoose.connect(connectionString);

    debug("Connected to database");
  } catch (error) {
    debug("Failed connecting to database: " + error.message);

    process.exit(1);
  }
};

export default connectToDatabase;
