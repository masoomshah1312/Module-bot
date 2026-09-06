module.exports = {
  name: 'help',
  async execute(message, args, context) {
    // FIXED: Safely grab the first item inside the array before running string conversions
    const subHelp = args && args[0] ? args[0].toLowerCase() : null;

    if (subHelp) {
      let specificHelpText = '';
      switch (subHelp) {
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
          specificHelpText = `💡 **Command Help: RPC**\n\n• **Usage:** ${context.PREFIX}rpc <text> or ${context.PREFIX}rpc template <name>\n• **Description:** Loads layouts from config database. Clear using ${context.PREFIX}rpc clear.`;
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
        default:
          specificHelpText = `❌ Unknown module: ${subHelp}. Type ${context.PREFIX}help to view all active tools.`;
      }
      await context.sendResponse(message, specificHelpText);
      return;
    }

    const defaultHelpMenu = 
      `**--- Modular Self-Bot Manual ---**\n` +
      `*Type ${context.PREFIX}help <command> for deep info on specific features*\n\n` +
      `\`${context.PREFIX}mock @user\` - Add user to mock repetition list\n` +
      `\`${context.PREFIX}mock off @user\` - Remove user from mock list\n` +
      `\`${context.PREFIX}stop\` - Wipe active mock targets memory\n` +
      `\`${context.PREFIX}mode\` - Turn aLtErNaTiNg cAsE logic On/Off\n` +
      `\`${context.PREFIX}clown @user\` - Target account with automatic 🤡 reactions\n` +
      `\`${context.PREFIX}react @user <emoji>\` - Deploy customizable emoji listeners\n` +
      `\`${context.PREFIX}react off\` - Terminate emoji reaction loops\n` +
      `\`${context.PREFIX}spam <amount> <text>\` - Multiplies message text sequences sequentially\n` +
      `\`${context.PREFIX}userinfo @user\` - Scans footprints & local custom roles\n` +
      `\`${context.PREFIX}spy @user\` - Adds/removes target profile from multi-file log radar\n` +
      `\`${context.PREFIX}spy off\` - Completely drops all target spy records\n` +
      `\`${context.PREFIX}download\` - Uploads the compiled spy_logs.txt registry\n` +
      `\`${context.PREFIX}clone\` - Safely replicates current server layout via delay\n` +
      `\`${context.PREFIX}rpc <text/template>\` - Sets custom raw texts or presets from file\n` +
      `\`${context.PREFIX}purge <amount>\` - Deletes specified amount of recent messages\n` +
      `\`${context.PREFIX}prefix <symbol>\` - Modifies command prefix settings\n` +
      `\`${context.PREFIX}ghosttype\` - Loops an infinite "typing..." status indicator\n` +
      `\`${context.PREFIX}flood\` - Injects heavy whitespace rows to mask preceding items\n` +
      `\`${context.PREFIX}ghostmsg\` - Auto-deletes menu command layouts after a delay window\n` +
      `\`${context.PREFIX}rotate\` - Cycles your custom status lines every 1 minute out of JSON\n` +
      `\`${context.PREFIX}statuscycle\` - Cycles presence indicator orb color profiles\n` +
      `\`${context.PREFIX}status\` - Prints current debug metrics to your local terminal`;
    
    await context.sendResponse(message, defaultHelpMenu);
  }
};
