// config/database.config.ts
import mongoose from "mongoose";

export const connectDatabase = async () => {
  try {
    const dbName = "task_manager";
    const mongoUri = `${process.env.MONGODB_URI}/${dbName}`;

    await mongoose.connect(mongoUri);

    const connection = mongoose.connection;

    connection.on("error", (error) => {
      console.error("❌ Error en la conexión de MongoDB:", error);
    });

    connection.once("open", () => {
      console.log("📦 Conexión a MongoDB establecida correctamente");
      console.log(`📊 Base de datos: ${dbName}`);
    });

    connection.on("disconnected", () => {
      console.warn("⚠️ MongoDB desconectado");
    });

    process.on("SIGINT", async () => {
      await connection.close();
      console.log("✋ Conexión a MongoDB cerrada");
      process.exit(0);
    });

    return connection;
  } catch (error) {
    console.error("❌ Error al conectar con MongoDB:", error);
    process.exit(1);
  }
};
