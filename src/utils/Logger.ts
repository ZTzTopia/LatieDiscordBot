import { config } from "../Config";

export enum Colors {
  Reset = "\x1b[0m",
  Red = "\x1b[31m",
  Yellow = "\x1b[33m",
  Green = "\x1b[32m",
  Blue = "\x1b[34m",
}

export class Logger {
  public d(...message: any[]): void {
    if (config.debug) {
      this.log("debug", message);
    }
  }

  public e(...message: any[]): void {
    this.log("error", message);
  }

  public i(...message: any[]): void {
    this.log("info", message);
  }

  public w(...message: any[]): void {
    this.log("warn", message);
  }

  private log(Levels: "info" | "debug" | "error" | "warn" = "info", ...message: any[]): void {
    console[Levels](
      `${Levels === "debug" ? Colors.Blue : Levels === "error" ? Colors.Red : Levels === "warn" ? Colors.Yellow : Colors.Green}[${this._formatDatetime("hh:ii:ss yyyy-mm-dd")}] [${Levels}]: ${message.map((x) => String(x)).join(" ")} ${
        Colors.Reset
      }`
    );
  }
  private _formatDatetime(format: string) {
    const _date = new Date();
    const _padStart = (value: number): string => value.toString().padStart(2, "0");
    return format
      .replace(/yyyy/g, _padStart(_date.getFullYear()))
      .replace(/dd/g, _padStart(_date.getDate()))
      .replace(/mm/g, _padStart(_date.getMonth() + 1))
      .replace(/hh/g, _padStart(_date.getHours()))
      .replace(/ii/g, _padStart(_date.getMinutes()))
      .replace(/ss/g, _padStart(_date.getSeconds()));
  }
}
