import { blue, yellow, red, gray } from "chalk";
import dateformat from "dateformat";
import { config } from "../Config";

export class Logger {
    public d(TAG: string, Log: string): void {
        if (config.debug) {
            const date = dateformat(new Date(), 'isoDateTime');
            console.log(`[${date}] ` + gray(`Debug/${TAG}`) + ` : ${Log}`);
        }
    }
 
	public i(TAG: string, Log: string): void {
        const date = dateformat(new Date(), 'isoDateTime');
        console.log(`[${date}] ` + blue(`Info/${TAG}`) + ` : ${Log}`);
    }

    public w(TAG: string, Log: string): void {
        const date = dateformat(new Date(), 'isoDateTime');
        console.warn(`[${date}] ` + yellow(`Warn/${TAG}`) + ` :`, Log);
    }

    public e(TAG: string, Log: string): void {
        const date = dateformat(new Date(), 'isoDateTime');
        console.error(`[${date}] ` + red(`Error/${TAG}`) + ` :`, Log);
    }

    public f(TAG: string, Log: string): void {
        const date = dateformat(new Date(), 'isoDateTime');
        console.error(`[${date}] ` + red(`Fatal/${TAG}`) + ` :`, Log);
    }
}