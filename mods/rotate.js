const fs = require('fs');
const path = require('path');
const { CustomStatus } = require('discord.js-selfbot-v13');

module.exports = {
  name: 'rotate',
  async execute(message, args, context) {
    const subCommand = args && args.length > 0 ? args[0].toLowerCase() : null;

    if (subCommand === 'off') {
      if (context.statusRotationInterval) {
        clearInterval(context.statusRotationInterval);
        delete context.statusRotationInterval;
        delete context.rotationTextOverride;
        
        const rpcModule = context.commands?.get('rpc');
        const targetClient = message ? message.client : context.client;

        if (rpcModule && context.lastLoadedTemplate && context.lastLoadedTemplate !== 'clear') {
          const dryArgs = context.lastLoadedTemplate.startsWith('custom:') ? [context.lastLoadedTemplate.slice(7)] : ['template', context.lastLoadedTemplate];
          await rpcModule.execute(null, dryArgs, context).catch(() => {});
        } else {
          targetClient.user.setPresence({ activities: [] });
        }
        
        if (message) await context.sendResponse(message, '🟢 Custom status rotation deactivated. Your base game profile has been preserved.');
      } else {
        if (message) await context.sendResponse(message, '❌ There is no active text status rotation running.');
      }
      return;
    }

    if (context.statusRotationInterval) {
      clearInterval(context.statusRotationInterval);
    }

    const configPath = path.join(process.cwd(), 'rpc_templates.json');
    if (!fs.existsSync(configPath)) {
      if (message) await context.sendResponse(message, '❌ Configuration database file rpc_templates.json is missing.');
      return;
    }

    const templates = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    const textArray = templates.status_rotation;

    if (!textArray || textArray.length === 0) {
      if (message) await context.sendResponse(message, '❌ No statuses found in the status_rotation section of your JSON config file.');
      return;
    }

    if (message) await context.sendResponse(message, `🔄 Dual-Mode Rotation active! Injecting text into your profile card every 1 minute.`);

    let currentIndex = 0;
    
    const changeStatus = async () => {
      try {
        const rpcModule = context.commands?.get('rpc');
        const targetClient = message ? message.client : context.client;
        
        if (rpcModule && context.lastLoadedTemplate && context.lastLoadedTemplate !== 'clear' && !context.lastLoadedTemplate.startsWith('custom:')) {
          context.rotationTextOverride = textArray[currentIndex];
          const dryArgs = ['template', context.lastLoadedTemplate];
          await rpcModule.execute(null, dryArgs, context).catch(() => {});
        } else {
          // FIXED: Appends user method targeting correctly to avoid console crashes
          const customPresence = new CustomStatus(targetClient)
            .setState(textArray[currentIndex]);
          
          targetClient.user.setPresence({ activities: [customPresence] });
        }
        
        currentIndex = (currentIndex + 1) % textArray.length;
      } catch (err) {
        console.error('[-] Status rotation sync issue:', err.message);
      }
    };

    await changeStatus();
    context.statusRotationInterval = setInterval(changeStatus, 60000);
  }
};
