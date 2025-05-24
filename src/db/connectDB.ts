import mongoose from "mongoose";

export const connectBD = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI n'est pas défini dans les variables d'environnement");
    }

    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.log("Erreur de connexion à MongoDB :", error.message);
    process.exit(1);
  }
};
