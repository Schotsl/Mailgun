<a href="https://uwuifier.com">
    <img src="logo.svg" alt="Mailgun logo" title="Mailgun" align="right" height="60" />
</a>

Mailgun for Deno
======================

This simple package allows you to send emails using the Mailgun API! If you find any bugs or have any feature requests you can create a pull request and I’ll see what I can do!

The `Mailgun` class supports multiple regions and the `Message` object supports even more properties. Such as `cc`, `bcc`, `html, and much more! You should be able to explore all these properties using Typescript

# Example

```typescript
// Import the Mailgun class
import Mailgun from "./index.ts";

// Create a instance using your Mailgun API key and domain
const mailgun = new Mailgun({
  key: "YOUR_API_KEY",
  region: "eu",
  domain: "YOUR_DOMAIN",
});

// Send your message off to Mailgun!
await mailgun.send({
  to: "foo@bar.com",
  from: "bar@foo.com",
  text: "How are you doing my friend?",
  subject: "Just checking up!"
});
```

# License

This project is licensed under the MIT License - see the
[LICENSE.md](LICENSE.md) file for details
