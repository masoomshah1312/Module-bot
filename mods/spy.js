module.exports = {
  name: 'spy',
  category: 'Media',
  async execute(message, args, context) {
    const subCommand = args[0] ? args[0].toLowerCase() : null;
    if (subCommand === 'off') {
      context.spyTargetIds.clear();
      context.logChannelId = null;
      await message.edit('🟢 Spy log transmission terminated for all targets.').catch(() => {});
      return;
    }

    const targetMention = message.mentions.users.first();
    if (!targetMention) {
      await message.edit(`❌ Format: ${context.PREFIX}spy @user or ${context.PREFIX}spy off`).catch(() => {});
      return;
    }

    context.logChannelId = message.channel.id;

    if (context.spyTargetIds.has(targetMention.id)) {
      context.spyTargetIds.delete(targetMention.id);
      await message.edit(`[-] Stopped tracking ${targetMention.username}. Remaining: ${context.spyTargetIds.size}`).catch(() => {});
    } else {
      context.spyTargetIds.add(targetMention.id);
      await message.edit(`🛰️ Relay active. Tracking ${targetMention.username}! (Total: ${context.spyTargetIds.size})`).catch(() => {});
    }
  }
};
