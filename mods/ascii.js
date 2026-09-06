const https = require('https');

module.exports = {
  name: 'ascii',
  category: 'Fun',
  async execute(message, args, context) {
    if (!args || args.length === 0) {
      await context.sendResponse(message, `❌ Format: \`${context.PREFIX}ascii <text>\``);
      return;
    }

    const textToConvert = encodeURIComponent(args.join(' '));
    await context.sendResponse(message, '🎨 Rendering text canvas structures blocks... ⏳');

    https.get(`https://herokuapp.com{textToConvert}`, (res) => {
      let dataChunks = '';
      res.on('data', chunk => dataChunks += chunk);
      res.on('end', async () => {
        if (dataChunks.length > 1900) {
          await context.sendResponse(message, '❌ Error: Rendered text layout boundaries exceed raw Discord character constraints!');
          return;
        }
        await context.sendResponse(message, `\`\`\`\n${dataChunks}\n\`\`\``);
      });
    }).on('error', async () => {
      await context.sendResponse(message, '❌ Operational network error parsing fonts mapping data.');
    });
  }
};
