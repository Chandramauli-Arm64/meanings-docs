---
title: Paginator.py
prev:
  text: "Bot.py"
  link: "/devDocs/bot.md"
next:
  text: "Contributors"
  link: "/License-Credits/contributor.md"
---

# paginator.py — The Pagination Engine

Welcome to this section for `paginator.py` — the custom pagination system powering the Meanings Discord Bot’s rich, interactive list and results navigation!
This document is designed for contributors and advanced users who want to understand, extend, or debug the bot’s button-based, multi-format pagination.

---

## Table of Contents

- [Overview](#overview)
- [Role in the Bot Architecture](#role-in-the-bot-architecture)
- [Key Concepts & Types](#key-concepts--types)
- [The ButtonPaginator Class](#the-buttonpaginator-class)
  - [Constructor & Initialization](#constructor--initialization)
  - [Page Handling and Formatting](#page-handling-and-formatting)
  - [Button Navigation](#button-navigation)
  - [Permissions & Interaction Checks](#permissions--interaction-checks)
  - [Message Lifecycle Management](#message-lifecycle-management)
- [How Pagination Works: User Flow](#how-pagination-works-user-flow)
- [Extending & Customizing Pagination](#extending--customizing-pagination)
- [References](#references)

---

## Overview

The `paginator.py` file encapsulates a **button-based paginator** using Discord UI components, enabling the Meanings Bot to:
- Display long lists (e.g., all words, search results) in manageable, interactive pages.
- Let users navigate with "Previous", "Next", and "Stop" buttons.
- Paginate any combination of Discord content types: text, embeds, files, attachments.

It is a **core utility** used by commands like `?list` and any feature that presents multi-page information.

---

## Role in the Bot Architecture

- **Reusable utility:** Imported by [`bot.py`](https://github.com/xFanexx/meanings/blob/main/bot.py) and used anywhere paginated output is needed.
- **UI-first design:** Uses Discord’s `discord.ui.View` and buttons for a modern, reactive experience.
- **Permission-aware:** Can restrict interaction to the command invoker (author).
- **Flexible:** Supports paginating strings, embeds, files, attachments, or custom dict payloads.

> **See it in action:** [list_meanings in bot.py](https://github.com/xFanexx/meanings/blob/main/bot.py#L264-L285)

---

## Key Concepts & Types

`paginator.py` is strongly typed and generic, supporting all relevant Discord content types.

- **Page:** A single item that can be displayed (string, embed, file, attachment, or dict).
- **Sequence:** A list or tuple of `Page` objects.
- **Author Restriction:** Optionally restricts pagination controls to the command author only.
- **Per Page:** Supports displaying multiple items per page.

```python
Page = Union[
    str,
    Sequence[str],
    discord.Embed,
    Sequence[discord.Embed],
    discord.File,
    Sequence[discord.File],
    discord.Attachment,
    Sequence[discord.Attachment],
    Dict[str, Any],
]
```

---

## The `ButtonPaginator` Class

The heart of `paginator.py` is the `ButtonPaginator` class, a subclass of `discord.ui.View` with dynamic, type-safe pagination logic.

### Constructor & Initialization

```python
def __init__(
    self,
    pages: Sequence[PageT_co],
    *,
    author_id: Optional[int] = None,
    timeout=None,
    delete_message_after: bool = False,
    per_page: int = 1,
)
```

- **pages:** The list/tuple of items to paginate.
- **author_id:** (Optional) Only this user can interact with buttons.
- **timeout:** Auto-stop after inactivity.
- **delete_message_after:** Delete the paginator message when stopped?
- **per_page:** How many items per page (default: 1).

Calculates `max_pages` and prepares internal state for navigation.

---

### Page Handling and Formatting

- **get_page:** Returns the correct slice of items for the given page index.
- **format_page:** Hook for subclasses; can alter output formatting.
- **get_page_kwargs:** Assembles the correct Discord message arguments (`content`, `embeds`, `files`, etc.) based on the page content.

```python
def get_page(self, page_number: int) -> Union[PageT_co, Sequence[PageT_co]]:
    ...
def format_page(self, page) -> ...:
    ...
async def get_page_kwargs(self, page, skip_formatting=False) -> Dict[str, Any]:
    ...
```

- Handles all Discord content types (string, embed, file, attachment, dict).
- Allows for recursive formatting of lists/tuples.

---

### Button Navigation

Three buttons are defined using Discord UI:

- **Previous** ⬅️: Go to the previous page
- **Next** ➡️: Advance to the next page
- **Stop** ⏹️: End the pagination session

```python
@discord.ui.button(label="Previous", style=discord.ButtonStyle.blurple, emoji="⬅️")
async def previous_page(self, interaction, button): ...
@discord.ui.button(label="Next", style=discord.ButtonStyle.blurple, emoji="➡️")
async def next_page(self, interaction, button): ...
@discord.ui.button(label="Stop", style=discord.ButtonStyle.red, emoji="⏹️")
async def stop_paginator(self, interaction, button): ...
```

- Buttons are **dynamically enabled/disabled** depending on the current page.
- `update_page` handles button state and message edits.

---

### Permissions & Interaction Checks

```python
async def interaction_check(self, interaction: Interaction) -> bool:
    if not self.author_id:
        return True
    if self.author_id != interaction.user.id:
        await interaction.response.send_message("You cannot interact with this menu.", ephemeral=True)
        return False
    return True
```

- Prevents unauthorized users from hijacking the pagination UI.
- Sends an ephemeral error if a non-author tries to interact.

---

### Message Lifecycle Management

- **start:** Begins the paginator session (handles both `Interaction` and `Messageable` objects).
- **stop:** Cleans up (optionally deletes the message), disables further interaction.
- **reset_files:** Ensures file handles can be sent again if needed.

```python
async def start(self, obj: Union[Interaction, Messageable], **send_kwargs: Any) -> Optional[Message]:
    ...
def stop(self) -> None:
    ...
def reset_files(self, page_kwargs: dict[str, Any]) -> None:
    ...
```

---

## How Pagination Works: User Flow

1. **User invokes a paginated command** (e.g., `?list`).
2. **Bot creates a ButtonPaginator** with the results, passing in the invoking user’s ID.
3. **Paginator sends the first page** (with navigation buttons).
4. **User clicks "Next"/"Previous"** to navigate pages:
    - The paginator checks permissions and updates the message with the next/previous content.
5. **User clicks "Stop"** or timeout occurs:
    - The paginator disables buttons (and optionally deletes the message).

> **See also:**
[Meanings list command using paginator](https://github.com/xFanexx/meanings/blob/main/bot.py#L264-L285)

---

## Extending & Customizing Pagination

- **Custom page formatting:** Override `format_page` for new output types or layouts.
- **New controls:** Add more buttons (e.g., jump to first/last) via additional `@discord.ui.button` methods.
- **Role-based permissions:** Swap `author_id` logic for role checks for more granular access.
- **Per-page size:** Change `per_page` parameter to show more/less content per page.
- **Custom end-of-session behavior:** Update `stop_paginator` for different UX (e.g., archival, logs).

---

## References

- [`paginator.py` — source on GitHub](https://github.com/xFanexx/meanings/blob/main/paginator.py)
- [discord.py UI/Views documentation](https://discordpy.readthedocs.io/en/latest/ui/views.html)
- [`bot.py` — see where paginator is used](https://github.com/xFanexx/meanings/blob/main/bot.py)

---

::: tip <Icon icon="octicon:light-bulb-16" /> Pro Tip
For best UX, always pass `author_id` to restrict interactions, and set a timeout to avoid orphaned paginators!
:::

---

**Ready to paginate?**
Use `ButtonPaginator` anytime you want interactive, scalable, and user-friendly navigation in your Discord bot!
