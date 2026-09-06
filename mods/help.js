const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'help',
  category: 'Settings',
  async execute(message, args, context) {
    // 1. EXTRACT ARGUMENTS Safely
    const subHelp = args && args.length > 0 ? args[0].toLowerCase() : null;

    // 2. DYNAMIC SYSTEM DIRECTORY SCANNER
    const modsPath = path.join(process.cwd(), 'mods');
    let loadedModules = [];
    
    try {
      loadedModules = fs.readdirSync(modsPath)
        .filter(file => file.endsWith('.js'))
        .map(file => file.replace('.js', '').toLowerCase());
    } catch (err) {
      console.error('[-] Failed to dynamically read modules folder for help menu:', err.message);
    }

    // 3. DETAILED COMMAND LOOKUP CONTROLLER
    if (subHelp) {
      let specificHelpText = '';
      const cleanCmdName = subHelp.replace(context.PREFIX, '');

      switch (cleanCmdName) {
        case 'mock':
          specificHelpText = `💡 **Command Help: MOCK**\n\n• **Usage:** ${context.PREFIX}mock @user\n• **Description:** Adds target user to mirror tracking. Send ${context.PREFIX}mock off @user to turn off.`;
          break;
        case 'stop':
          specificHelpText = `💡 **Command Help: STOP**\n\n• **Usage:** ${context.PREFIX}stop\n• **Description:** Wipes out all active mock targets.`;
          break;
        case 'mode':
          specificHelpText = `💡 **Command Help: MODE**\n\n• **Usage:** ${context.PREFIX}mode\n• **Description:** Toggles aLtErNaTiNg cAsE logic mode On/Off.`;
          break;
        case 'clown':
          specificHelpText = `💡 **Command Help: CLOWN**\n\n• **Usage:** ${context.PREFIX}clown @user\n• **Description:** Automatically tracks and reacts with 🤡 emojis.`;
          break;
        case 'react':
          specificHelpText = `💡 **Command Help: REACT**\n\n• **Usage:** ${context.PREFIX}react @user <emoji>\n• **Description:** Registers custom emoji reactions. Turn off using ${context.PREFIX}react off.`;
          break;
        case 'spam':
          specificHelpText = `💡 **Command Help: REPEAT**\n\n• **Usage:** ${context.PREFIX}spam <amount> <text>\n• **Description:** Fast sequential messaging loop engine layout.`;
          break;
        case 'userinfo':
          specificHelpText = `💡 **Command Help: USERINFO**\n\n• **Usage:** ${context.PREFIX}userinfo @user\n• **Description:** Fetches user footprints data tracking configurations.`;
          break;
        case 'spy':
          specificHelpText = `💡 **Command Help: SPY**\n\n• **Usage:** ${context.PREFIX}spy @user\n• **Description:** Multi-user logger routing into spy_logs.txt. Disable via ${context.PREFIX}spy off.`;
          break;
        case 'download':
          specificHelpText = `💡 **Command Help: DOWNLOAD**\n\n• **Usage:** ${context.PREFIX}download\n• **Description:** Uploads compiled text data backup database.`;
          break;
        case 'clone':
          specificHelpText = `💡 **Command Help: CLONE**\n\n• **Usage:** ${context.PREFIX}clone\n• **Description:** Safe duplication channel template cloner script with anti-ban delays.`;
          break;
        case 'rpc':
          specificHelpText = `💡 **Command Help: RPC**\n\n• **Usage:** ${context.PREFIX}rpc <text> or ${context.PREFIX}rpc template <name>\n• **Description:** Loads custom layouts from configuration fields. Clear using ${context.PREFIX}rpc clear.`;
          break;
        case 'purge':
          specificHelpText = `💡 **Command Help: PURGE**\n\n• **Usage:** ${context.PREFIX}purge <amount>\n• **Description:** Removes specified trace message lines.`;
          break;
        case 'prefix':
          specificHelpText = `💡 **Command Help: PREFIX**\n\n• **Usage:** ${context.PREFIX}prefix <symbol>\n• **Description:** Changes bot activation criteria trigger flag.`;
          break;
        case 'status':
          specificHelpText = `💡 **Command Help: STATUS**\n\n• **Usage:** ${context.PREFIX}status\n• **Description:** Prints configurations debug states into terminal screen.`;
          break;
        case 'ghosttype':
          specificHelpText = `💡 **Command Help: GHOSTTYPE**\n\n• **Usage:** ${context.PREFIX}ghosttype\n• **Description:** Loops an infinite typing status indicator. Turn off using ${context.PREFIX}ghosttype off.`;
          break;
        case 'flood':
          specificHelpText = `💡 **Command Help: FLOOD**\n\n• **Usage:** ${context.PREFIX}flood <text>\n• **Description:** Sends massive clear spacing rows to wipe past screen visibility.`;
          break;
        case 'ghostmsg':
          specificHelpText = `💡 **Command Help: GHOSTMSG**\n\n• **Usage:** ${context.PREFIX}ghostmsg\n• **Description:** Auto-deletes custom menu UI and help layouts after a delay window. Disable using ${context.PREFIX}ghostmsg off.`;
          break;
        case 'rotate':
          specificHelpText = `💡 **Command Help: ROTATE**\n\n• **Usage:** ${context.PREFIX}rotate\n• **Description:** Cycles custom text status lines every 1 minute out of the JSON database. Disable via ${context.PREFIX}rotate off.`;
          break;
        case 'statuscycle':
          specificHelpText = `💡 **Command Help: STATUSCYCLE**\n\n• **Usage:** ${context.PREFIX}statuscycle\n• **Description:** Continuously loops profile indicator orb colors. Disable via ${context.PREFIX}statuscycle off.`;
          break;
        case 'alias':
          specificHelpText = `💡 **Command Help: ALIAS**\n\n• **Usage:** ${context.PREFIX}alias <trigger> <full_text>\n• **Description:** Registers custom dynamic shorthand text macro triggers. Clear via ${context.PREFIX}alias clear.`;
          break;
        case 'ping':
          specificHelpText = `💡 **Command Help: PING**\n\n• **Usage:** ${context.PREFIX}ping\n• **Description:** Calculates websocket system API latency roundtrips.`;
          break;
        case 'chatbackup':
          specificHelpText = `💡 **Command Help: CHATBACKUP**\n\n• **Usage:** ${context.PREFIX}chatbackup <amount>\n• **Description:** Streams recent chat histories cleanly to disk logs.`;
          break;
        case 'afk':
          specificHelpText = `💡 **Command Help: AFK**\n\n• **Usage:** ${context.PREFIX}afk <reason>\n• **Description:** Toggles automated away status indicators. Disable via ${context.PREFIX}afk off.`;
          break;
        case 'verify':
          specificHelpText = `💡 **Command Help: VERIFY**\n\n• **Usage:** ${context.PREFIX}verify\n• **Description:** Runs live diagnostics report on commands and background tasks.`;
          break;
        case 'vcghost':
          specificHelpText = `💡 **Command Help: VCGHOST**\n\n• **Usage:** ${context.PREFIX}vcghost <voice_channel_id>\n• **Description:** Spams rapid connect/disconnect network packets to trigger notification alerts for all users inside that channel room.`;
          break;
        case 'ascii':
          specificHelpText = `💡 **Command Help: ASCII**\n\n• **Usage:** ${context.PREFIX}ascii <text>\n• **Description:** Transforms your sentences into stylized, large typewriter ASCII art canvas blocks.`;
          break;
        default:
          specificHelpText = `❌ Unknown module: \`${cleanCmdName}\`. Type \`${context.PREFIX}help\` to view all active tools.`;
      }
      await context.sendResponse(message, specificHelpText);
      return;
    }

    // 4. MASTER ROOT MENU
    const formattedCommands = loadedModules.map(modName => `\`${context.PREFIX}${modName}\``).join(', ');

    const classicHelpMenu = 
      `**--- Dynamic Modular Self-Bot Menu ---**\n` +
      `*Type \`${context.PREFIX}help <command>\` for deep information on a specific feature (e.g. \`${context.PREFIX}help afk\`)*\n\n` +
      `📦 **Active Modules Detected (\`${loadedModules.length}\`):**\n` +
      `${formattedCommands}\n\n` +
      `💡 *Whenever you drop a new file into your \`mods/\` folder, it will automatically show up on this list instantly!*`;
    
    await context.sendResponse(message, classicHelpMenu);
  }
};
