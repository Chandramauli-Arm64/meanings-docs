---
title: Installation
prev:
  text: "Introduction"
  link: "/guide/intro.md"
next:
  text: "Command Reference"
  link: "/guide/commands-reference.md"
---

# Installation & Setup

This section will guide you through setting up the **Meanings** bot on your own Discord server.


### Invite Link

To use the bot, you’ll first need to create it on the **Discord Developer Portal** and generate an **invite link**.


## Creating a Bot on Discord Developer Portal

1. Go to the [<Icon icon="mdi:discord" /> Discord Developer Portal](https://discord.com/developers/applications)
2. Click on **"New Application"**.
3. Enter your bot's name (e.g., `Meanings`) and click **Create**.
4. Navigate to the **Bot** tab and click **"Add Bot"**.
5. Enable the **Privileged Gateway Intents** your bot needs (such as `MESSAGE CONTENT INTENT`).

![New Application Creation Screen](/images/application.jpg)
---

## Getting Your Bot Token

1. In the **Bot** tab, click **"Reset Token"** to get your bot’s token.
2. Copy and save it somewhere safe — **never share this token publicly**.

::: danger <Icon icon="typcn:warning-outline" /> WARNING
If your token is leaked, **reset it immediately** from the Developer Portal.
:::

![Bot Token](/images/token.jpg)

---

## Invite Link & Required Permissions

1. Go to the **OAuth2 > URL Generator** section.
2. Under **Scopes**, select:
   - `bot`
   - (Optional) `applications.commands` — if you want to implement slash commands in bot.py and use it instead of default prefix based commands.
3. Under **Bot Permissions**, select:
   - `Send Messages`
   - `Read Message History`
   - `Manage Messages` (if moderation features are used)
   - Any other permissions required for your specific setup.
4. Copy the generated URL and paste it into your browser to invite the bot to your server.

![Scope](/images/scope.jpg)

![Permission](/images/permission.jpg)

![Url Generation](/images/urlgen.jpg)



# Setup & Configuration of The Bot

This section walks you through configuring and launching your Discord bot.
You’ll establish the runtime environment, install dependencies, and initialize the bot with your credentials.

##  What You'll Accomplish

1. <Icon icon="mdi:application" /> **Environment Setup**
   Install Python 3.12+ and a dependency manager.

2. <Icon icon="mdi:keyboard" /> **Configuration**
   Set up environment variables and your Discord bot token.

3. <Icon icon="mdi:package-variant-closed" /> **Dependency Installation**
   Install required packages with Poetry (recommended) or pip.

4. <Icon icon="mdi:play-circle" /> **Bot Initialization**
   Launch your bot instance.


::: details 📋 Prerequisite Checklist
- [ ] **Python 3.12+** (`python --version`)
- [ ] **Poetry** ([install guide](https://python-poetry.org/docs/#installation)) or pip
- [ ] **Discord Bot Token** from the [Developer Portal](https://discord.com/developers)
- [ ] **Git** installed ([download here](https://git-scm.com))
- [ ] **UserID** for adding in whiteliste Section
- [ ] **Curl 8.15.x** installed ([download here](https://curl.se/download.html))
:::


## Requirements

- **Python** 3.12+
- **Poetry** 2.x
- **Discord bot token** (`.env` file)
- **UserID** For adding in whitelisted section for admin Commands.
- **Curl** 8.15.x

## 🚀 Getting Started
1. Clone the repo:

```sh
 git clone https://github.com/xFanexx/meanings.git
```

## Install Poetry (if not installed)
1. From offical site:
  - Linux, macOS, Windows (WSL)

```bash
curl -sSL https://install.python-poetry.org | python3 -
```
  - Windows (Powershell)

```bash
(Invoke-WebRequest -Uri https://install.python-poetry.org -UseBasicParsing).Content | py -
```

> [!NOTE] <Icon icon="fluent:note-16-filled" /> NOTE
> If you have installed Python through the Microsoft Store, replace `py` with `python` in the command above.

Check their offical **Documentation** for more information. [Python-Poerty](https://python-poetry.org/docs/#installing-with-the-official-installer)

2. With **PIP**:

```py
pip install poetry
```

> [!IMPORTANT]  <Icon icon="proicons:comment-exclamation" /> IMPORTANT
> When you are installing **Poetry** via `pip`, always check if **Rust** is installed in your system because one of its dependencies (`maturin`) needs Rust to build and top of that do not forget to update `pip` or its **prebuilt wheels**. So, you don't get any errors.

## Install dependencies

```py
poetry install
```

> [!NOTE] <Icon icon="fluent:note-16-filled" /> NOTE
> This installs all dependencies listed in `pyproject.toml` inside a virtual environment.
>
>
> Since this project is a **Discord bot** (not a distributed Python package), we set:
>
> ```toml
> [tool.poetry]
> package-mode = false
> ```
>
> This ensures that `poetry install` only installs dependencies and does not fail with a *“No file/folder found for package”* error.


# For Non-Poetry Users

If you don’t have **Poetry** installed, you can still run this project using only `pip` and `requirements.txt`.

### Installation

```py
pip install --no-deps -r requirements.txt
```

> [!IMPORTANT]  <Icon icon="proicons:comment-exclamation" /> IMPORTANT
> When using `requirements.txt` exported from Poetry, the `--no-deps` flag is required.
>
> This is because the exported file already includes **all direct and transitive dependencies** with exact versions or resolved hashes.
> Running pip without `--no-deps` may cause it to try **re-resolving dependencies**, which can lead to conflicts or errors—especially for Git-based dependencies.


# Environment Variables
Create a `.env` file in the project root:

```sh
DISCORD_TOKEN=your_discord_token_here
```

> [!WARNING] <Icon icon="typcn:warning-outline" /> WARNING
> Do not commit `.env` to version control.

After this also copy your **UserID** to past in `bot.py`:

```py
# Whitelisted user IDs who can add meanings
WHITELISTED_USERS = [ADD_USER_ID_HERE]  # Add more user IDs here
```

## Updating Dependencies (PIP)

1. **Upgrade a single dependency**:

```py
pip install --upgrade <package-name>
```

**Example**:

```py
pip install --upgrade discord.py
```

**Then regenerate `requirements.txt`**:

- Create a virtual environment:

  - Linux / MacOS

```bash
python3 -m venv venv
```

  - Windows (Powershell and CMD)

```bash
python -m venv venv
```

This creates a folder called venv in your project.

- Activate the virtual environment:

  - Linux / MacOS

```bash
source venv/bin/activate
```

**Replace `venv` with the name of your virtual environment folder**.

  - Windows (Powershell and CMD)

```bash
# Powershell
.\venv\Scripts\Activate.ps1

# CMD
venv\Scripts\activate.bat
```

> [!NOTE] <Icon icon="fluent:note-16-filled" /> NOTE
> If you encounter a "cannot be loaded because running scripts is disabled" error, you may need to run `Set-ExecutionPolicy RemoteSigned -Scope Process` in your PowerShell window to temporarily allow script execution.

Then regenerate the `.txt`:

```py
pip freeze > requirements.txt
```

After that deactivate it:

```bash
# Linux, MacOS and Windows
deactivate
```

2. **Upgrade all dependencies**:

```py
pip install --upgrade -r requirements.txt
```

> [!WARNING] <Icon icon="typcn:warning-outline" /> WARNING
> This respects the pinned versions in `requirements.txt`. If you want latest versions, remove version numbers from the file before running.


### Regenerate requirements.txt

After any upgrade activate the virtual environment and update it:

```py
pip freeze > requirements.txt
```

> [!TIP] <Icon icon="octicon:light-bulb-16" /> TIP
> Using `pyproject.toml` with **Poetry** is recommended for consistent, reproducible environments — but `requirements.txt` works for quick installs and deployment.


# Updating Dependencies

- To update a single dependency:

```py
poetry update discord-py
```

- To update all dependencies:

```py
poetry update
```

- Regenerate requirements.txt after updates:

```bash
source $(poetry env info --path)/bin/activate
pip freeze > requirements.txt
deactivate
```

# Launching the Bot

After completing all the steps mentioned above, you can run the bot as follows:

**If you are using Poetry run**:

```py
poetry run python bot.py
```

This ensures the bot runs inside the Poetry-managed virtual environment.

**If you are not using Poetry (pip users) simply run**:

```py
python bot.py
```

This works if you have installed all required dependencies with pip.

**If you are intrested in Contributing to this project, please kindly refer to [Contribution](/devDocs/docsdev.md).**
