module.exports = {
  name: 'react',
  async execute(message, args, context) {
    const subCommand = args[0] ? args[0].toLowerCase() : null;
    
    if (subCommand === 'off' || subCommand === 'stop') {
      context.reactTargetId = null;
      context.activeEmoji = null;
      await message.edit('[+] Stopped emoji reactions.').catch(() => {});
      return;
    }

    const targetMention = message.mentions.users.first();
    const emoji = args[1];

    if (targetMention && emoji) {
      context.reactTargetId = targetMention.id;
      context.activeEmoji = emoji;
      await message.edit(`[+] Reacting ${emoji} to ${targetMention.tag}`).catch(() => {});
    } else {
      await message.edit(`❌ Format: ${context.PREFIX}react @user <emoji> or ${context.PREFIX}react off`).catch(() => {});
    }
  }
};
