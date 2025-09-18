---
title: FAQ & Troubleshooting
prev:
  text: "Configuration"
  link: "/guide/configuration.md"
next:
  text: "Docs for Devs (Contributors)"
  link: "/devDocs/overview.md"
---

# Frequently Asked Questions & Troubleshooting

Below are answers to common questions and steps to resolve frequent issues when setting up or running the bot. For complete installation and configuration instructions, refer to the [README](../README.md).

## Bot Fails to Start

::: details **Expand for step-by-step troubleshooting**
1. **Install Dependencies**
   Ensure all required Python packages are installed:
   ```bash
   # If using Poetry
   poetry install

   # Or, using pip
   pip install --no-deps -r requirements.txt
   ```

2. **Configure Environment Variables**
   Confirm that your `.env` file contains a valid `DISCORD_TOKEN`.
   See [Configuration Guide](installation.md) for details.

3. **Run the Bot**
   ```bash
   # Using Poetry
   poetry run python bot.py

   # Using Python directly
   python bot.py
   ```
:::

---

## “Invalid Token” Error

- Verify your `DISCORD_TOKEN` value in `.env` is correct.
- Ensure the token is active and has not been regenerated in the [Discord Developer Portal](https://discord.com/developers/applications).
- If in doubt, generate a new token and update `.env`.

---

## Bot Commands Not Responding

- Check that your command prefix in `bot.py` matches what you are typing.
- Confirm the bot has permission to **Read Messages** and **Send Messages** in the channel.
- Inspect bot logs for errors or permission issues.

---

## Self-Hosting the Bot

Refer to the [Installation](installation.md) for installation instructions.
You can deploy the bot on:

- Local machine
- VPS (e.g., DigitalOcean, Linode)
- Cloud services (e.g., AWS, GCP)

To keep the bot running continuously, consider using a process manager such as **systemd** or **PM2**.

---

## Not Using Poetry?

You may use `pip` as an alternative:

```bash
pip install --no-deps -r requirements.txt
python bot.py
```

---

## Still Need Help?

- Review logs for error messages.
- Double-check your `.env` and `bot.py` configurations.
- Browse existing [GitHub Issues](https://github.com/Chandramauli-Arm64/meanings-docs/issues), or [open a new issue](https://github.com/Chandramauli-Arm64/meanings-docs/issues/new) with detailed information.

> [!NOTE] <Icon icon="fluent:note-16-filled" /> NOTE
> For full installation, configuration, and usage guidance, see the [README](../README.md).

---

## Contributing & Support

If you wish to contribute or need further assistance, refer to [Docs for Devs (Contributors)](/devDocs/bot.md).
You may also reach out via GitHub Issues or Discussion.

