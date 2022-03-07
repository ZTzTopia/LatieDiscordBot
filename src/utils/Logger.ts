import { config } from "../Config";

export enum Colors {
    Reset = "\x1b[0m",
    Red = "\x1b[31m",
    Yellow = "\x1b[33m",
    Green = "\x1b[32m",
    Blue = "\x1b[34m",
    Grey = "\x1b[90m"
}

export class Logger {
    public d(tag: string, ...message: unknown[]): void {
        if (config.debug) {
          this.log("debug", tag, message);
        }
    }
    
    public e(tag: string, ...message: unknown[]): void {
        this.log("error", tag, message);
    }
    
    public i(tag: string, ...message: unknown[]): void {
        this.log("info", tag, message);
    }
    
    public w(tag: string, ...message: unknown[]): void {
        this.log("warn", tag, message);
    }
    
    private log(levels: "info" | "debug" | "error" | "warn" = "info", tag: string, ...message: unknown[]): void {
        console[levels](
            `${levels === "debug" ? Colors.Grey : levels === "error" ? Colors.Red : levels === "warn" ? Colors.Yellow : Colors.Blue}[${this.formatDateTime("hh:ii:ss yyyy-mm-dd")}] ${levels}/${tag}: ${message.map((x) => String(x)).join(" ")} ${
                Colors.Reset
            }`
        );
    }

    private formatDateTime(format: string) {
        const date = new Date();
        const padStart = (value: number): string => value.toString().padStart(2, "0");
        return format
            .replace(/yyyy/g, padStart(date.getFullYear()))
            .replace(/dd/g, padStart(date.getDate()))
            .replace(/mm/g, padStart(date.getMonth() + 1))
            .replace(/hh/g, padStart(date.getHours()))
            .replace(/ii/g, padStart(date.getMinutes()))
            .replace(/ss/g, padStart(date.getSeconds()));
    }
}