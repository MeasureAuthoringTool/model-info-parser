import {promises as fsPromises} from "fs";

const baseDir = `${__dirname}/../generated`;

export default class FileWriter {
  private fullPath: string;
  private fullFileName: string;

  constructor(private contents: string, private subDir: string | null, private fileName: string) {
    this.fullPath = baseDir;
    if (this.subDir) {
      this.fullPath = `${this.fullPath}/${this.subDir}`
    }
    this.fullFileName = `${this.fullPath}/${this.fileName}`;
  }

  async writeFile() {
    try {
      await fsPromises.mkdir(this.fullPath, {recursive: true});
      await fsPromises.writeFile(this.fullFileName, this.contents);
    } catch (err) {
      console.error(err);
      throw new Error(`Unable to write file ${this.fullFileName}`);
    }
  }
};
