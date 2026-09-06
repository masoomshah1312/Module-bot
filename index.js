const { Client } = require('discord.js-selfbot-v13');
const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, 'config.json');
if (!fs.existsSync(configPath)) {
  console.error('[-] CRITICAL ERROR: config.json file is missing from your project directory!');
  process.exit(1);
}
let config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

const client = new Client();

const context = {
  PREFIX: config.DEFAULT_PREFIX || '*',
  mockCaseMode: config.DEFAULT_MOCK_CASE !== undefined ? config.DEFAULT_MOCK_CASE : true,
  cloneDelayMs: config.CLONE_DELAY_MS || 1500,
  interfaceDeleteMs: config.INTERFACE_AUTO_DELETE_MS || 3000,
  ghostMsgMode: false,
  targetUserIds: new Set(),
  spyTargetIds: new Set(),
  logChannelId: null,
  activeEmoji: null,
  reactTargetId: null,
  messageMap: new Map(),
  client: client, // 👈 FIXED: Linked the core client to context globally!

  saveActiveRpcState(stateName) {
    config.LAST_ACTIVE_RPC = stateName;
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf8');
  },

  async sendResponse(message, content) {
    try {
      return await message.edit(content);
    } catch (err) {
      await message.delete().catch(() => {});
      const slowmodeSeconds = message.channel.rateLimitPerUser || 0;
      if (slowmodeSeconds > 0) {
        await new Promise(resolve => setTimeout(resolve, (slowmodeSeconds * 1000) + 100));
      }
      return await message.channel.send(content);
    }
  },
  
  applyWordReplacements(text, authorId, myId) {
    let output = text;
    if (myId && authorId) {
      const myIdRegex = new RegExp(`<@!?${myId}>|${myId}`, 'g');
      output = output.replace(myIdRegex, `<@${authorId}>`);
    }
    output = output.replace(/\bfuck me\b/gi, 'fuck you')
                   .replace(/\bme\b/gi, 'you')
                   .replace(/\bmy\b/gi, 'your')
                   .replace(/\bmine\b/gi, 'yours')
                   .replace(/\bi am\b/gi, 'you are')
                   .replace(/\bi'm\b/gi, "you're");
    return output;
  },
  toMockCase(text) {
    return text.split('').map((char, index) => (index % 2 === 0 ? char.toLowerCase() : char.toUpperCase())).join('');
  }
};

const commands = new Map();
const modsPath = path.join(__dirname, 'mods');
const commandFiles = fs.readdirSync(modsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(path.join(modsPath, file));
  if (command.name) commands.set(command.name, command);
}

// Share the maps array to make it visible across the rotator commands
context.commands = commands;

client.on('ready', () => {
  console.log(`[+] Modular selfbot configuration manager loaded!`);
  console.log(`[+] System fully active and online as: ${client.user.tag}`);

  const savedState = config.LAST_ACTIVE_RPC || 'clear';
  if (savedState !== 'clear') {
    const rpcModule = commands.get('rpc');
    if (rpcModule) {
      const dryArgs = savedState.startsWith('custom:') ? [savedState.slice(7)] : ['template', savedState];
      rpcModule.execute(null, dryArgs, context).then(() => {
        console.log(`[💾 SYSTEM] Successfully restored persistent presence state: [${savedState}]`);
      }).catch((err) => console.log('[-] Failed to restore persistent presence:', err.message));
    }
  }
});

client.on('messageCreate', async (message) => {
  if (message.author.id === client.user.id) {
    if (!message.content.startsWith(context.PREFIX)) return;

    const args = message.content.slice(context.PREFIX.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const cmd = commands.get(commandName);
    if (cmd) {
      try {
        await cmd.execute(message, args, context);

        if (context.ghostMsgMode && commandName !== 'status' && commandName !== 'purge') {
          setTimeout(async () => {
            await message.delete().catch(() => {});
          }, context.interfaceDeleteMs);
        }
      } catch (err) {
        console.error(`[-] Execution Error inside module (${commandName}):`, err);
      }
      return;
    }
  }

  if (message.author.id !== client.user.id && context.targetUserIds.has(message.author.id)) {
    const attachments = message.attachments.map(att => att.url);
    let responseText = message.content;

    if (responseText) {
      responseText = context.applyWordReplacements(responseText, message.author.id, client.user.id);
      if (context.mockCaseMode) responseText = context.toMockCase(responseText);
    }

    if (responseText || attachments.length > 0) {
      try {
        const payload = {};
        if (responseText) payload.content = responseText;
        if (attachments.length > 0) payload.files = attachments;
        if (message.reference && message.reference.messageId) {
          payload.reply = { messageReference: message.reference.messageId };
        }

        const sentMessage = await message.channel.send(payload);
        context.messageMap.set(message.id, sentMessage.id);

        if (context.messageMap.size > 200) {
          const firstKey = context.messageMap.keys().next().value;
          context.messageMap.delete(firstKey);
        }
      } catch (err) {
        console.error('[-] Send Error:', err.message);
      }
    }
  }

  if (message.author.id !== client.user.id && context.spyTargetIds.has(message.author.id)) {
    if (message.content) {
      const timestamp = new Date().toLocaleString();
      const serverName = message.guild ? message.guild.name : 'Direct Message';
      const channelName = message.guild ? message.channel.name : 'DM';

      const logLine = `[${timestamp}] [Server: ${serverName}] [Channel: #${channelName}] ${message.author.tag}: ${message.content}\n`;

      fs.appendFile('spy_logs.txt', logLine, (error) => {
        if (error) console.error('[-] Failed to write spy log:', error.message);
      });

      if (context.logChannelId) {
        const logRoom = client.channels.cache.get(context.logChannelId);
        if (logRoom) {
          logRoom.send(`📡 **[SPY LOG]** ${message.author.tag} in *${serverName}*: ${message.content}`).catch(() => {});
        }
      }
    }
  }

  if (context.reactTargetId && context.activeEmoji && message.author.id === context.reactTargetId) {
    try {
      await message.react(context.activeEmoji);
    } catch (err) {
      console.error('[-] Reaction Error:', err.message);
    }
  }
});

client.on('messageDelete', async (deletedMessage) => {
  if (deletedMessage.author && context.targetUserIds.has(deletedMessage.author.id)) {
    const myEchoedMessageId = context.messageMap.get(deletedMessage.id);
    if (myEchoedMessageId) {
      try {
        const myMsg = await deletedMessage.channel.messages.fetch(myEchoedMessageId);
        if (myMsg) await myMsg.delete();
      } catch (err) {
      } finally {
        context.messageMap.delete(deletedMessage.id);
      }
    }
  }
});

client.login(config.TOKEN);
