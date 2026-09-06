module.exports = {
  name: 'stop',
  category: 'Troll',
  async execute(message, args, context) {
    context.targetUserIds.clear();
    await message.edit('[+] Cleared all mock targets.').catch(() => {});
  }
};
