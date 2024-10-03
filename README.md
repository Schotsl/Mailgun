<a href="https://github.com/Schotsl/Mailgun">
    <img src="logo.svg" alt="Mailgun logo" title="Mailgun" align="right" height="60" />
</a>

# Mailgun for Deno

This simple and lightweight Deno package allows you to easily send emails using
the Mailgun API! If you find any bugs or have any feature requests, feel free to
create a pull request, and I’ll see what I can do!

The `Mailgun` class supports multiple regions, specifically `"us"` for the
United States and `"eu"` for Europe. **If no region is provided, the default
will be `"us"`.** Ensure you set the correct region according to your Mailgun
account's location. Using the wrong region can result in a `401 Unauthorized`
error, so double-check that you are setting it correctly!

The `Message` object also supports a variety of properties, such as `cc`, `bcc`,
`html`, and more! You should be able to explore all these properties using
TypeScript.

# Example

```typescript
// Import the Mailgun class
import Mailgun from "https://deno.land/x/mailgun@v1.3.0/index.ts";

// Create an instance using your Mailgun API key, region, and domain
const mailgun = new Mailgun({
  key: "YOUR_KEY",
  region: "us", // or "eu" depending on your Mailgun region
  domain: "YOUR_DOMAIN",
});

// Send your message off to Mailgun!
await mailgun.send({
  to: "foo@bar.com",
  from: "bar@foo.com",
  text: "How are you doing my friend?",
  reply: "replies@foo.com",
  subject: "Just checking up!",
});
```

# License

This project is licensed under the MIT License - see the
[LICENSE.md](LICENSE.md) file for details
