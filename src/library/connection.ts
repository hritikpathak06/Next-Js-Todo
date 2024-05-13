import mongoose from "mongoose";



export const connectToDatabase = () => {
  try {
    mongoose.connect(
      "mongodb+srv://phritik06:zfXJ65SNiZoXhayt@eccom.zqrt7ny.mongodb.net/Auth?retryWrites=true&w=majority"
    );
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("Database Connected Successfully");
    });
    connection.on("error", (err: any) => {
      console.log(
        "MongoDb error.Please Make Sure Your Database is Connected" + err
      );
    });
  } catch (error) {
    console.log("Something went wrong Please try to connect again", error);
  }
};
