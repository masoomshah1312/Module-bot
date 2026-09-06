const { RichPresence, CustomStatus } = require('discord.js-selfbot-v13');
const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'rpc',
  category: 'Status',
  async execute(message, args, context) {
    if (!args || args.length === 0) {
      if (message) await context.sendResponse(message, `❌ Format: ${context.PREFIX}rpc <text> or ${context.PREFIX}rpc template <name>`);
      return;
    }

    const firstArgument = args[0].toLowerCase();
    const configPath = path.join(process.cwd(), 'rpc_templates.json');
    const targetClient = message ? message.client : context.client;

    if (firstArgument === 'clear') {
      targetClient.user.setPresence({ activities: [] });
      context.lastLoadedTemplate = 'clear';
      context.saveActiveRpcState('clear');
      if (message) await context.sendResponse(message, '✨ Rich Presence profile cleared successfully.');
      return;
    }

    if (firstArgument === 'template') {
      const templateName = args[1] ? args[1].toLowerCase() : null;

      if (!templateName) {
        if (message) await context.sendResponse(message, `❌ Please provide a template name (e.g. ${context.PREFIX}rpc template gaming).`);
        return;
      }

      if (!fs.existsSync(configPath)) {
        if (message) await context.sendResponse(message, '❌ Configuration file rpc_templates.json is missing.');
        return;
      }

      const templates = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      const activeTemplate = templates[templateName];

      if (!activeTemplate) {
        if (message) await context.sendResponse(message, `❌ Template profile ${templateName} does not exist inside your config file.`);
        return;
      }

      try {
        const rpc = new RichPresence(targetClient)
          .setApplicationId(activeTemplate.applicationId || '367827983903490050')
          .setType(activeTemplate.type || 'PLAYING')
          .setName(activeTemplate.name || 'Custom Application');

        if (activeTemplate.timestampType === 'ELAPSED') {
          rpc.setStartTimestamp(Date.now());
        } else if (activeTemplate.timestampType === 'COUNTDOWN' && activeTemplate.countdownMinutes) {
          rpc.setEndTimestamp(Date.now() + (activeTemplate.countdownMinutes * 60 * 1000));
        }

        if (activeTemplate.details) rpc.setDetails(activeTemplate.details);
        if (activeTemplate.state) rpc.setState(activeTemplate.state);
        if (activeTemplate.url && activeTemplate.type === 'STREAMING') rpc.setURL(activeTemplate.url);
        if (activeTemplate.largeImageKey) rpc.setAssetsLargeImage(activeTemplate.largeImageKey);
        if (activeTemplate.largeText) rpc.setAssetsLargeText(activeTemplate.largeText);
        if (activeTemplate.smallImageKey) rpc.setAssetsSmallImage(activeTemplate.smallImageKey);
        if (activeTemplate.smallText) rpc.setAssetsSmallText(activeTemplate.smallText);

        if (activeTemplate.buttons && Array.isArray(activeTemplate.buttons)) {
          for (const btn of activeTemplate.buttons.slice(0, 2)) {
            if (btn.label && btn.url) rpc.addButton(btn.label, btn.url);
          }
        }

        const presenceActivities = [rpc];
        if (context.statusRotationInterval && context.rotationTextOverride) {
          const syncedCustomStatus = new CustomStatus(targetClient)
            .setState(context.rotationTextOverride);
          presenceActivities.push(syncedCustomStatus);
        }

        targetClient.user.setPresence({ activities: presenceActivities });
        
        context.lastLoadedTemplate = templateName;
        context.saveActiveRpcState(templateName);
        if (message) await context.sendResponse(message, `🎮 Layout template **${templateName}** loaded completely from config!`);
      } catch (err) {
        console.error('[-] RPC Build Failure:', err.message);
        if (message) await context.sendResponse(message, `❌ Error compiling RPC template details: ${err.message}`);
      }
      return;
    }

    const customText = args.join(' ');
    const customRpc = new RichPresence(targetClient)
      .setApplicationId('367827983903490050')
      .setType('PLAYING')
      .setName('Custom Manager')
      .setDetails(customText)
      .setStartTimestamp(Date.now());

    targetClient.user.setPresence({ activities: [customRpc] });
    
    context.lastLoadedTemplate = `custom:${customText}`;
    context.saveActiveRpcState(`custom:${customText}`);
    if (message) await context.sendResponse(message, `✅ Rich Presence custom status updated directly to: "${customText}"`);
  }
};
