module.exports = {
  name: 'clown',
  async execute(message, args, context) {
    const targetMention = message.mentions.users.first();
    if (targetMention) {
      context.reactTargetId = targetMention.id;
      context.activeEmoji = '🤡';
      await message.edit(`[+] Reacting 🤡 to ${targetMention.tag}`).catch(() => {});
    } else {
      await message.edit('❌ Please mention a valid user.').catch(() => {});
    }
  }
};
