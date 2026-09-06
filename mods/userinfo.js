module.exports = {
  name: 'userinfo',
  async execute(message, args, context) {
    const targetUser = message.mentions.users.first() || message.author;
    const targetMember = message.guild ? await message.guild.members.fetch(targetUser.id).catch(() => null) : null;

    const mutualServers = [];
    const nonMutualVisibleServers = [];

    for (const guild of message.client.guilds.cache.values()) {
      if (guild.members.cache.has(targetUser.id)) {
        mutualServers.push(guild.name);
      } else {
        nonMutualVisibleServers.push(guild.name);
      }
    }

    let infoResponse = 
      `👤 **--- USER INFORMATION ---**\n` +
      `• **Username:** ${targetUser.tag}\n` +
      `• **ID:** \`${targetUser.id}\`\n` +
      `• **Created:** ${targetUser.createdAt.toDateString()}\n`;

    if (targetMember) {
      if (targetMember.nickname) infoResponse += `• **Nickname:** ${targetMember.nickname}\n`;
      const memberRoles = targetMember.roles.cache.filter(r => r.name !== '@everyone').map(r => r.name);
      infoResponse += `🎖️ **Server Roles (${memberRoles.length}):** \`${memberRoles.join(', ') || 'None'}\`\n`;
    }

    infoResponse += `\n🤝 **Mutual Servers (${mutualServers.length}):** \`${mutualServers.slice(0, 5).join(', ') || 'None'}\`\n`;
    infoResponse += `🚫 **Non-Mutual Seen (${nonMutualVisibleServers.length}):** \`${nonMutualVisibleServers.slice(0, 5).join(', ') || 'None'}\``;

    await message.edit(infoResponse).catch(() => {});
  }
};
