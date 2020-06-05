import { promises as fsPromises } from "fs";
import logger from "./logger";

export default class FileWriter {
  private readonly fullPath: string;

  private readonly fullFileName: string;

  constructor(
    private contents: string,
    baseDirectory: string,
    private subDir: string | null,
    private fileName: string
  ) {
    this.fullPath = baseDirectory;
    if (this.subDir) {
      this.fullPath = `${this.fullPath}/${this.subDir}`;
    }
    this.fullFileName = `${this.fullPath}/${this.fileName}`;
  }

  async writeFile(): Promise<void> {
    try {
      await fsPromises.mkdir(this.fullPath, { recursive: true });
      await fsPromises.writeFile(this.fullFileName, this.contents);
    } catch (err) {
      logger.error(err);
      throw new Error(`Unable to write file ${this.fullFileName}`);
    }
  }
}
