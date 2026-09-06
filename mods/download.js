const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'download',
  async execute(message, args, context) {
    const filePath = path.join(process.cwd(), 'spy_logs.txt');
    
    if (!fs.existsSync(filePath)) {
      await message.edit('❌ No log file found yet.').catch(() => {});
      return;
    }

    await message.edit('📂 Uploading your text registry logs document...').catch(() => {});
    
    await message.channel.send({ files: [filePath] }).then(() => {
      message.delete().catch(() => {});
    }).catch(() => {});
  }
};
