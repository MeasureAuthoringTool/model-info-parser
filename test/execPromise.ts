import { exec } from "child_process";
import logger from "../src/logger";

async function execPromise(command: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        logger.error(stderr);
        reject(error);
      } else {
        resolve(stdout);
      }
    });
  });
}

export default execPromise;
