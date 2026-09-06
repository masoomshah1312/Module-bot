module.exports = {
  name: 'mock',
  async execute(message, args, context) {
    const targetMention = message.mentions.users.first();
    const subCommand = args[0] ? args[0].toLowerCase() : null;
    
    if (subCommand === 'off' || subCommand === 'unmock') {
      if (targetMention) {
        context.targetUserIds.delete(targetMention.id);
        await context.sendResponse(message, `[-] Stopped mocking: ${targetMention.tag}`);
      } else {
        await context.sendResponse(message, `❌ Format: ${context.PREFIX}mock off @user`);
      }
      return;
    }

    if (targetMention) {
      context.targetUserIds.add(targetMention.id);
      await context.sendResponse(message, `[+] Now mocking: ${targetMention.tag}`);
    } else {
      await context.sendResponse(message, `❌ Please mention a valid user (e.g. ${context.PREFIX}mock @user).`);
    }
  }
};
