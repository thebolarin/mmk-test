import { app } from './app';
import sequelize from "./database/models/sequelize";

const start = async () => {
  console.log('Starting...');

  if (!process.env.DATABASE_NAME) {
    throw new Error('DATABASE_NAME must be defined');
  }
  if (!process.env.DATABASE_PASSWORD) {
    throw new Error('DATABASE_PASSWORD must be defined');
  }

  app.listen(app.get("port"), async() => {
    console.log(
      "App is running at http://localhost:%d in %s mode",
      app.get("port"),
      app.get("env")
    );

    await sequelize
      .authenticate().then(() => console.log('Connection has been established successfully.'))
      .catch((error: any) => {
        console.error('Unable to connect to the database:', error);
        throw "error";
      });

    console.log("Press CTRL-C to stop\n");

  });
};

start();
