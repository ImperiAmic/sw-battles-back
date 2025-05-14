import chalk from "chalk";
import app from "./app.js";
import createDebug from "debug";

const debug = createDebug("battles:server:start");

const startServer = (port: number) => {
  app.listen(port, () => {
    debug("🟢👂");
    debug("Server listening at...");
    debug(chalk.bold.green(`http://localhost:${port}`));
    debug("🟢👂");
  });
};

export default startServer;
