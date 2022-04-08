import { Config, Message } from "./types.ts";

export default class Mailgun {
  private basic: string;
  private endpoint: string;

  constructor(config: Config) {
    this.basic = btoa(`api:${config.key}`);
    this.endpoint =
      typeof config.region !== "undefined" && config.region === "eu"
        ? `https://api.eu.mailgun.net/v3/${config.domain}/messages`
        : `https://api.mailgun.net/v3/${config.domain}/messages`;
  }

  async send(message: Message) {
    const body = new FormData();
    const keys = Object.keys(message);
    const method = "POST";
    const headers = { Authorization: this.basic };

    keys.forEach((key: string) => body.append(key, message[key]));

    return fetch(this.endpoint, { method, headers, body });
  }
}
