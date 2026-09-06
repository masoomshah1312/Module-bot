module.exports = {
  name: 'flood',
  category: 'Troll',
  async execute(message, args, context) {
    const optionalText = args.length > 0 ? args.join(' ') : '...';
    const clearBlock = '\n'.repeat(80);
    await message.edit(`⚠️ **Chat cleared** ${clearBlock} ${optionalText}`).catch(() => {});
  }
};
