module.exports = {
  name: 'spam',
  category: 'Troll',
  async execute(message, args, context) {
    if (args.length < 2) {
      await message.edit(`❌ Format: ${context.PREFIX}spam <amount> <message>`).catch(() => {});
      return;
    }

    const amount = parseInt(args[0], 10);
    const textToSpam = args.slice(1).join(' ');

    if (isNaN(amount) || amount <= 0) {
      await message.edit('❌ Please provide a valid number.').catch(() => {});
      return;
    }

    await message.delete().catch(() => {});

    for (let i = 0; i < amount; i++) {
      message.channel.send(textToSpam).catch(() => {});
    }
  }
};
