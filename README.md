# 🥷 Open-Source Automated Modular Selfbot Engine

A high-speed, fully dynamic, completely decoupled automation framework designed for Discord user accounts using `discord.js-selfbot-v13` and Node.js. 

> ⚠️ **CRITICAL DISCLAIMER:** Discord selfbots are a direct violation of the official **Discord Terms of Service (ToS)**. Utilizing this software carries an inherent risk of permanent account suspension or termination by Discord's automated engineering filters. By executing this script, you acknowledge that **I am not responsible for your account being banned** or restricted in any capacity. Use entirely at your own discretion and risk.

---

## 🛠️ 1. Installation & Deployment

1. **Prerequisites:** Ensure you have [Node.js](https://nodejs.org) installed (Tested and fully stable on Node.js v24+).
2. **Clone/Extract Workspace:** Drop the script files cleanly into an isolated project directory folder.
3. **Assemble Dependencies:** Open your terminal inside the root project directory and initialize the required dependencies:
   ```bash
   npm install discord.js-selfbot-v13 @discordjs/voice
   ```
4. **Configure Parameters:** Open your `config.json` file and input your authorization signatures:
   ```json
   {
     "TOKEN": "YOUR_SECRET_USER_TOKEN_HERE",
     "DEFAULT_PREFIX": "+",
     "CLONE_DELAY_MS": 1500,
     "DEFAULT_MOCK_CASE": true,
     "INTERFACE_AUTO_DELETE_MS": 3000,
     "LAST_ACTIVE_RPC": "clear"
   }
   ```
5. **Boot Up Engine:** Launch your application terminal instance:
   ```bash
   node index.js
   ```

---

## 📂 2. Categorized Modules Blueprint

Your system features **25 active modules** automatically grouped into categories. Dropping a new file into `mods/` adds it to your system without changing your central core code.

### 🟢 Status Categories
* `+rpc template <name>` — Deploys interactive buttons arrays, elapsed counters, countdown timelines, and asset image bindings from `rpc_templates.json`.
* `+rotate` — Cycles your user text status line every 1 minute smoothly using your configuration arrays without clearing active game panels.
* `+statuscycle` — Sequentially loops your profile online status color dot through Online 🟢, Idle 🟡, and DND 🔴.
* `+ghosttype` — Forces an endless, infinite "typing..." status indicator inside your active chat window.

### 🔴 Troll Categories
* `+mock @user` — Hooks a reflection mirror pipeline. Every time the target user types, you mock them back automatically.
* `+stop` — Flushes out all active mirror targets from memory.
* `+mode` — Toggles the aLtErNaTiNg cAsE modification filter on and off.
* `+clown @user` — Automatically slaps a 🤡 reaction to every message the target writes.
* `+react @user <emoji>` — Targets a user with a customizable emoji reaction hook.
* `+spam <amount> <text>` — Runs a rapid message duplication loop block.
* `+flood` — Clears your local display screen by sending heavy whitespace blank lines.

### 🔵 General & Media Categories
* `+userinfo @user` — Pulls profile join dates, shared mutual servers, and current custom server roles maps.
* `+ping` — Calculates actual roundtrip execution latency delay and websocket processing times.
* `+afk <reason>` — Activates an away handler that auto-responds to DMs or tags with your custom notice note.
* `+spy @user` — Intercepts text streams across shared chats, saving data straight to a local file database named `spy_logs.txt`.
* `+download` — Attaches and uploads your `spy_logs.txt` database registry file straight to chat.
* `+chatbackup <amount>` — Streams recent channel chat feed histories cleanly to a local backup text file.

### 🎨 Fun Categories
* `+ascii <text>` — Transforms your sentences into stylized, large typewriter ASCII art canvas blocks.

### 🟡 Settings, Server & Misc Categories
* `+clone` — Safely clones an entire server's categories, text channels, and voice rooms layout into a new server via an anti-ban pacing delay loop.
* `+purge <amount>` — Sweeps and deletes your own recent text trail lines from chat history feeds.
* `+prefix <symbol>` — Changes your selfbot validation prefix activator trigger to a new token key.
* `+alias <trigger> <full_text>` — Maps rapid shorthand text macro replacements inline on the fly.
* `+verify` — Runs a diagnostic parameters overview mapping active intervals loop states and file engine cache counts.

---

## 🏗️ 3. How to Create an Independent Module

Your `index.js` acts as a blind event distributor. To add a new command, just build a file inside `mods/` using this exact structural skeleton:

```javascript
module.exports = {
  name: 'hello',       // The prefix command call trigger word (e.g. +hello)
  category: 'Misc',    // The category group filter (Status, Troll, General, Media, Server, Moderation, Settings, Misc, Fun)

  async execute(message, args, context) {
    // 1. Run your normal manual trigger actions here
    await context.sendResponse(message, '👋 Hello from our independent module!');
  },

  // OPTIONAL: If your module requires background event scanning, index.js hooks this automatically!
  initBackground(context) {
    context.registerBackgroundHandler(async (message) => {
      if (message.content === 'test') {
         console.log('Background interceptor captured data!');
      }
    });
  }
};
```
(its videcoded with google ai chat overview)
