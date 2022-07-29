import {Latie} from "../base/Latie";

export abstract class EventContext {
  client: Latie;

  public constructor(client: Latie) {
    this.client = client;
  }

  public abstract run(unknown?: unknown, args?: string[]): void;
}
