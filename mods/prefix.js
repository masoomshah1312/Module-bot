module.exports = {
  name: 'prefix',
  category: 'Settings',
  async execute(message, args, context) {
    const newPrefix = args[0];
    if (newPrefix) {
      context.PREFIX = newPrefix;
      await message.edit(`[+] Prefix changed to: ${context.PREFIX}`).catch(() => {});
    } else {
      await message.edit(`❌ Format: ${context.PREFIX}prefix <symbol>`).catch(() => {});
    }
  }
};
