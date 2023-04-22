import { Config, Message } from "./types.ts";

export default class Mailgun {
  private basic: string;
  private endpoint: string;

  constructor(config: Config) {
    const base64 = btoa(`api:${config.key}`);

    this.basic = `Basic ${base64}`;
    this.endpoint =
      typeof config.region !== "undefined" && config.region === "eu"
        ? `https://api.eu.mailgun.net/v3/${config.domain}/messages`
        : `https://api.mailgun.net/v3/${config.domain}/messages`;
  }

  send(message: Message) {
    const form = new FormData();

    for (const property in message) {
      if (Object.prototype.hasOwnProperty.call(message, property)) {
        const key = property as keyof Message;
        const value = message[key];

        this.mailgunStringify(key, value, form);
      }
    }

    const method = "POST";
    const headers = { Authorization: this.basic };

    return fetch(this.endpoint, { method, headers, body: form });
  }

  private mailgunStringify(
    key: keyof Message,
    value: Message[keyof Message],
    form: FormData
  ): void {
    if (value !== undefined) {
      let parsedValue = ``;

      if (typeof value === "boolean") {
        parsedValue = value.toString();
      } else if (Array.isArray(value)) {
        parsedValue = value.join(",");
      } else {
        parsedValue = value as string;
      }

      form.append(key, parsedValue);
    }
  }
}
