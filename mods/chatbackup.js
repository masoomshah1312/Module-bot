const fs = require('fs');

module.exports = {
  name: 'chatbackup',
  category: 'Media',
  async execute(message, args, context) {
    const messageLimitInput = parseInt(args[0], 10) || 50;
    
    await context.sendResponse(message, `⏳ Fetching historical timeline records (Limit: ${messageLimitInput})...`);

    const historicalMessagesCache = await message.channel.messages.fetch({ limit: messageLimitInput }).catch(() => null);
    if (!historicalMessagesCache || historicalMessagesCache.size === 0) {
      await message.channel.send('❌ Failed to fetch channel text history entries.').catch(() => {});
      return;
    }

    const timestampHeader = new Date().toLocaleString();
    let textBufferString = `=========================================\nCHAT LOG BACKUP - ${timestampHeader}\nChannel: #${message.channel.name || 'DM'}\n=========================================\n\n`;

    // Process cache items backwards so the text reads from oldest to newest
    const orderedMessageArray = Array.from(historicalMessagesCache.values()).reverse();

    for (const historicMsg of orderedMessageArray) {
      const msgTimestamp = historicMsg.createdAt.toLocaleString();
      const attachmentsList = historicMsg.attachments.map(att => att.url).join(', ');
      
      textBufferString += `[${msgTimestamp}] [${historicMsg.author.tag}]: ${historicMsg.content || ''}`;
      if (attachmentsList) textBufferString += ` [Attachments: ${attachmentsList}]`;
      textBufferString += '\n';
    }

    // Append compiled string straight into your local workspace storage
    fs.appendFile('chat_history_backup.txt', textBufferString, async (error) => {
      if (error) {
        console.error('[-] Failed to stream chat history data to disk:', error.message);
        return;
      }
      await message.channel.send(`💾 Success! Backed up chat logs into \`chat_history_backup.txt\`.`).catch(() => {});
    });
  }
};
