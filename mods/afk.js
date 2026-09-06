module.exports = {
  name: 'afk',
  category: 'General',
  
  // 1. The standard execution command trigger (*afk or *afk off)
  async execute(message, args, context) {
    const subCommand = args && args.length > 0 ? args[0].toLowerCase() : null;

    if (subCommand === 'off') {
      if (context.afkReasonMessage) {
        context.afkReasonMessage = null;
        await context.sendResponse(message, '🟢 Welcome back! AFK mode has been deactivated.');
      } else {
        await context.sendResponse(message, '❌ You are not currently marked as AFK.');
      }
      return;
    }

    const customReason = args.length > 0 ? args.join(' ') : 'Away from keyboard right now.';
    context.afkReasonMessage = customReason;
    await context.sendResponse(message, `💤 AFK Mode active: "${customReason}".`);
  },

  // 2. 🚀 THE AUTO-INJECTION LOOP HOOK
  // Index.js reads this on boot and hooks it to your message loops automatically!
  initBackground(context) {
    context.registerBackgroundHandler(async (message) => {
      // Ensure we don't reply to our own messages, and check if AFK mode is on
      if (message.author.id !== context.client.user.id && context.afkReasonMessage) {
        // Reply if you get tagged or if someone sends you a direct message (DM)
        if (message.mentions.has(context.client.user.id) || !message.guild) {
          await message.reply(`[Auto-Response] I am currently away: *${context.afkReasonMessage}*`).catch(() => {});
        }
      }
    });
  }
};
