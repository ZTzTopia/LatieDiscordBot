import { Latie } from "../base/Latie";

export interface IEvent {
    client: Latie;
    run(args?: any[]): void;
}