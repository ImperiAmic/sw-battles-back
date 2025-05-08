import createDebug from "debug";
import app from "./app.js";
import chalk from "chalk";

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
