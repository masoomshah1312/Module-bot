module.exports = {
  name: 'purge',
  async execute(message, args, context) {
    const amount = parseInt(args[0], 10);
    if (!isNaN(amount) && amount > 0) {
      const fetchedMessages = await message.channel.messages.fetch({ limit: 100 });
      const myMessages = fetchedMessages.filter(m => m.author.id === message.client.user.id);
      let deletedCount = 0;
      
      for (const targetMsg of myMessages.values()) {
        if (deletedCount >= amount) break;
        await targetMsg.delete().catch(() => {});
        deletedCount++;
      }
    }
  }
};
