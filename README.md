# 🥷 Advanced Modular Node.js Selfbot Workspace

A high-performance, lightweight, and completely open-source modular framework built for personal user accounts using `discord.js-selfbot-v13` and Node.js. 

> **Disclaimer:** This project is open-source and intended purely for personal automation, educational analysis, and private workspace optimization.
> **CRITICAL DISCLAIMER**: Discord selfbots are a direct violation of the official Discord Terms of Service (ToS). Utilizing this software carries an inherent risk of permanent account suspension or termination by Discord's automated engineering filters. By executing this script, you acknowledge that I am not responsible for your account being banned or restricted in any capacity. Use entirely at your own discretion and risk.

---

## 🛠️ 1. Installation Guide

Follow these steps to deploy the workspace shell environment locally on your computer:

1. **Download Environment Node:** Ensure you have [Node.js](https://nodejs.org) installed (Tested and fully stable on Node.js v24+).
2. **Extract Project Assets:** Unpack the project repository files cleanly into an isolated workspace directory.
3. **Assemble Dependencies:** Open your terminal/command prompt inside the root project directory and initialize the required dependencies:
   ```bash
   npm install discord.js-selfbot-v13
   ```
4. **Configure Parameters:** Open your `config.json` file and input your account authorization details:
   ```json
   {
     "TOKEN": "YOUR_SECRET_USER_TOKEN_HERE",
     "DEFAULT_PREFIX": "*",
     "CLONE_DELAY_MS": 1500,
     "DEFAULT_MOCK_CASE": true,
     "INTERFACE_AUTO_DELETE_MS": 3000
   }
   ```
5. **Boot up Engine:** Launch your main runtime orchestration thread wrapper loop:
   ```bash
   node index.js
   ```

---

## 📦 2. Active Command Modules Index

The system includes **18 functional utility command files** resting inside your isolated `mods/` directory folder.

### 🎭 Repetition & Mocking Systems
* `*mock @user` — Binds an account handle to the replication mirror set. 
* `*mock off @user` — Unbinds and drops tracking rules for the targeted user.
* `*stop` — Flushes out all targets currently saved inside your active memory cache.
* `*mode` — Alternates the alphanumeric output character casing logic loop (`ON`/`OFF`).

### 🛰️ Tracking & Analytics
* `*clown @user` — Locks down automated targets, placing a  clowns emoji reaction hook onto every new message they post.
* `*react @user <emoji>` — Overwrites base arrays to deploy a completely customized emoji tracker.
* `*react off` — Completely terminates background emoji listener activities.
* `*userinfo @user` — Compiles mutual server footprints, channel footprints, and lists current server roles.
* `*spy @user` — Intercepts and records text inputs from multiple targets simultaneously, compiling them locally into a disk-file backup registry named `spy_logs.txt`.
* `*spy off` — Wipes active spy radar arrays clear.
* `*download` — Safely binds your local disk logging tracking file and uploads `spy_logs.txt` straight to your active Discord channel.

### 🔮 Visual Transformations & Fun
* `*spam <amount> <text>` — Fires off a rapid sequence loop duplication array.
* `*flood` — Injects heavy lines of whitespace rows to clear up previous channel views.
* `*ghosttype` — Loops an infinite background API indication message signaling that you are continuously typing.
* `*ghosttype off` — Halts your channel typing status loops.
* `*ghostmsg` — Configures an automatic cleanup tracker that wipes out help menus and command confirmations after a short countdown delay (`*ghostmsg off` to disable).

### ⚙️ Rich Presence & Status Systems
* `*rpc <text>` — Rewrites the raw status activity description fields layout directly to your text entry.
* `*rpc template <name>` — Pulls custom structure data arrays from your `rpc_templates.json` configuration file (`gaming`, `streaming`, `anime`).
* `*rpc clear` — Drops custom presence data layers entirely.
* `*rotate` — Automatically cycles your custom status line every 1 minute using the string arrays inside your config files.
* `*statuscycle` — Loops your profile presence dot status color sequentially through Online 🟢, Idle 🟡, and DND 🔴.
* `*prefix <symbol>` — Binds the system runtime validation prefix parameter token dynamically to a new trigger symbol.
* `*purge <amount>` — Cleans up your recent message entries sequentially from chat logs.
* `*status` — Outputs debugging states array data into your computer terminal console view window.
* `*clone` — Clones an entire server structure channels layout into an empty server using a built-in rate-limit delay pacing bumper.

---

## 🏗️ 3. How to Add Your Own Custom Modules

The engine features a **dynamic module loader**. You do not need to rewrite your central `index.js` loop to implement new functions. To append a new command, follow this development blueprint template:

1. Create a new file ending with `.js` inside your `mods/` directory (e.g. `mods/hello.js`).
2. Populate the file using this exact explicit full variable scope skeleton layout:

```javascript
module.exports = {
  name: 'hello', // The command call validation keyword trigger (e.g. *hello)
  
  async execute(message, args, context) {
    // 1. Put your custom execution loops here
    // 2. All variables pass through context securely
    
    const sentence = args.length > 0 ? args.join(' ') : 'No parameters passed!';
    
    // Use the smart unified response layer to update chat text frames safely
    await context.sendResponse(message, `👋 Hello! Your arguments: **${sentence}**`);
  }
};
```
