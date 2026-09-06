module.exports = {
  name: 'stop',
  async execute(message, args, context) {
    context.targetUserIds.clear();
    await message.edit('[+] Cleared all mock targets.').catch(() => {});
  }
};
