---
title: FAQ & TROUBLESHOOT
prev:
  text: "Configuration"
  link: "/guide/configuration.md"
next:
  text: "Docs for Devs (Contributors)"
  link: "/devDocs/docsdev.md"
---
# FAQ & Troubleshooting

Here you’ll find answers to common issues and questions when working with the bot.


# The bot doesn’t start. What should I do?

1. Check if dependencies are installed:

```py
poetry install   # if using Poetry
```

```py
pip install -r requirements.txt  # if using pip
```

2. Ensure your `.env` file contains the correct `DISCORD_TOKEN`.


3. Run the bot again:

```py
poetry run python bot.py
```

or

```py
python bot.py
```


# The bot says “Invalid Token”.

- Double-check your `DISCORD_TOKEN` in `.env`.

- Ensure the token hasn’t been reset from the [Discord Developer Portal](https://discord.com/developers/applications).

- If unsure, generate a new token and update your `.env`.


# Commands are not responding.

- Make sure the command prefix in `bot.py` matches what you are typing.

- Verify that the bot has permissions to `read` and `send messages` in the channel.

- Check bot logs.


#  How do I self-host the bot?

- Follow the **installation** and **configuration** steps.

Deploy on your preferred environment:

- Local machine

- VPS (e.g., DigitalOcean, Linode)

- Cloud services (e.g., AWS, GCP)

- Use a process manager like PM2 or systemd to keep the bot running.


#  I’m not using Poetry. What should I do?

No worries! You can install dependencies with pip instead:

```py
pip install -r requirements.txt
```

and run bot with:

```py
python bot.py
```

#  Still stuck?

- Check the logs for errors.

- Review your configuration in .env and bot.py

- Visit the GitHub Issues page to see if others faced the same problem.

- Or open a new issue with details about your problem.
