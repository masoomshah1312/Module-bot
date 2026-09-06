module.exports = {
  name: 'clone',
  category: 'Server',
  async execute(message, args, context) {
    if (!message.guild) {
      await message.edit('❌ Move into a server context channel first.').catch(() => {});
      return;
    }

    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const API_DELAY = context.cloneDelayMs;

    const sourceGuild = message.guild;
    await message.edit(`🌀 Cloning framework structure layout maps for ${sourceGuild.name} safely...`).catch(() => {});

    try {
      const newGuild = await message.client.guilds.create(`Clone of ${sourceGuild.name}`);
      await sleep(API_DELAY);
      
      const initialChannels = await newGuild.channels.fetch();
      for (const channel of initialChannels.values()) {
        await channel.delete().catch(() => {});
        await sleep(API_DELAY);
      }

      const sourceChannels = await sourceGuild.channels.fetch();
      const sortedChannels = Array.from(sourceChannels.values()).sort((a, b) => a.type === 'GUILD_CATEGORY' ? -1 : 1);
      const categoryMap = new Map();

      for (const channel of sortedChannels) {
        let parentId = null;
        if (channel.parentId && categoryMap.has(channel.parentId)) {
          parentId = categoryMap.get(channel.parentId);
        }

        const createdChannel = await newGuild.channels.create(channel.name, {
          type: channel.type,
          parent: parentId
        }).catch(() => null);

        if (createdChannel && channel.type === 'GUILD_CATEGORY') {
          categoryMap.set(channel.id, createdChannel.id);
        }
        await sleep(API_DELAY);
      }

      await message.channel.send(`✅ Safe cloning completed! Server made: ${newGuild.name}`).catch(() => {});
    } catch (err) {
      await message.channel.send(`❌ Clone aborted structural error: ${err.message}`).catch(() => {});
    }
  }
};
