module.exports = {
  name: 'ghosttype',
  category: 'Status',
  async execute(message, args, context) {
    const subCommand = args[0] ? args[0].toLowerCase() : null;

    if (subCommand === 'off') {
      if (context.typingInterval) {
        clearInterval(context.typingInterval);
        delete context.typingInterval;
        await message.edit('🟢 Continuous typing status disabled.').catch(() => {});
      } else {
        await message.edit('❌ No active typing loop is running.').catch(() => {});
      }
      return;
    }

    if (context.typingInterval) {
      clearInterval(context.typingInterval);
    }

    const currentChannel = message.channel;
    await message.edit('🔮 Infinite typing loop activated...').catch(() => {});

    context.typingInterval = setInterval(() => {
      currentChannel.sendTyping().catch((err) => {
        console.error('[-] Typing loop fail:', err.message);
      });
    }, 9000);
  }
};
